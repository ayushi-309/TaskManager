import axios from "axios";

// Configured API base: local backend first, fallback to env or render
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000, // 3-second hard timeout so requests never hang
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("taskmanager_token") ||
    sessionStorage.getItem("taskmanager_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to get active user ID
const getActiveUserId = () => {
  try {
    const raw =
      localStorage.getItem("taskmanager_user") ||
      sessionStorage.getItem("taskmanager_user");
    if (!raw) return "guest";
    const user = JSON.parse(raw);
    return user._id || user.email || "guest";
  } catch (e) {
    return "guest";
  }
};

// Storage key helper per user
const getStorageKey = () => `taskflow_tasks_${getActiveUserId()}`;

// Sample default tasks for fresh accounts
const getDefaultTasks = () => [
  {
    _id: "sample_1",
    title: "👋 Welcome to TaskFlow!",
    description: "Click the circle on the left to mark this task as completed.",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample_2",
    title: "🎯 Create your first custom task",
    description: "Use the form above to add an action item for your day.",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample_3",
    title: "🚀 Explore filters & search",
    description: "Filter tasks by Pending/Completed or search by keyword.",
    status: "completed",
    createdAt: new Date().toISOString(),
  },
];

// Read tasks from local storage
export const getLocalTasks = () => {
  const key = getStorageKey();
  const raw = localStorage.getItem(key);
  if (!raw) {
    const defaults = getDefaultTasks();
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return getDefaultTasks();
  }
};

// Save tasks to local storage
export const saveLocalTasks = (tasks) => {
  const key = getStorageKey();
  localStorage.setItem(key, JSON.stringify(tasks));
};

// Create a new task (INSTANT optimistic update)
export const createTask = async (taskData) => {
  const newTask = {
    _id: "task_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
    title: taskData.title.trim(),
    description: (taskData.description || "").trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  // 1. Immediately store locally (0ms latency)
  const currentTasks = getLocalTasks();
  const updatedTasks = [newTask, ...currentTasks];
  saveLocalTasks(updatedTasks);

  // 2. Try syncing with backend in background without blocking UI
  api
    .post("/tasks", taskData)
    .then((res) => {
      if (res.data && res.data._id) {
        // Swap temp id with real backend id if synced
        const tasks = getLocalTasks();
        const idx = tasks.findIndex((t) => t._id === newTask._id);
        if (idx !== -1) {
          tasks[idx]._id = res.data._id;
          saveLocalTasks(tasks);
        }
      }
    })
    .catch((err) => {
      // Backend unavailable or slow: silently keep local task
      console.info("Task preserved locally (Backend not responding or slow)");
    });

  // Return immediately so user experiences instant response!
  return newTask;
};

// Fetch tasks (Instant local response with background sync)
export const getTasks = async (search = "", status = "") => {
  let tasks = getLocalTasks();

  // Try background fetch if backend is alive
  try {
    const response = await api.get(
      `/tasks?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`
    );
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      tasks = response.data;
      saveLocalTasks(tasks);
    }
  } catch (err) {
    // Backend offline or timeout: use local tasks seamlessly
  }

  // Filter tasks locally by search & status
  let filtered = tasks;
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }
  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }

  return filtered;
};

// Delete a task (INSTANT local removal)
export const deleteTask = async (id) => {
  // 1. Instantly remove locally
  const currentTasks = getLocalTasks();
  const updated = currentTasks.filter((t) => t._id !== id);
  saveLocalTasks(updated);

  // 2. Try syncing with backend
  api.delete(`/tasks/${id}`).catch(() => {});

  return { success: true, id };
};

// Update task status or fields (INSTANT update)
export const updateTask = async (id, taskData) => {
  // 1. Instantly update locally
  const currentTasks = getLocalTasks();
  const updated = currentTasks.map((t) => {
    if (t._id === id) {
      return { ...t, ...taskData, updatedAt: new Date().toISOString() };
    }
    return t;
  });
  saveLocalTasks(updated);

  // 2. Try syncing with backend
  api.put(`/tasks/${id}`, taskData).catch(() => {});

  const updatedItem = updated.find((t) => t._id === id);
  return updatedItem || { _id: id, ...taskData };
};
