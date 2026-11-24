import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, deleteTask, updateTask } from "../api/taskApi";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const data = await getTasks(search, statusFilter);
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, search, statusFilter]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, fetchTasks]);

  // Handle instant delete
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  // Handle instant status toggle
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    await updateTask(task._id, {
      status: newStatus,
    });
    fetchTasks();
  };

  // Instant demo login helper for guests
  const handleQuickDemo = async () => {
    try {
      setDemoLoading(true);
      await login("alex.morgan@taskflow.dev", "TaskMaster2026!");
    } catch (err) {
      console.error(err);
    } finally {
      setDemoLoading(false);
    }
  };

  // -------------------------------------------------------------
  // GUEST LANDING VIEW (User NOT logged in)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-indigo-50/25 to-slate-100 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-gradient-to-tr from-blue-300/20 via-indigo-300/20 to-purple-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Task Management Simplified</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
            Organize your day.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Accomplish your goals with ease.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Please <strong>sign in</strong> or <strong>create an account</strong> to unlock your personal workspace, create tasks, and track your daily productivity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Create Free Account</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300/80 shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Account</span>
            </Link>

            <button
              type="button"
              onClick={handleQuickDemo}
              disabled={demoLoading}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-sm border border-indigo-200/80 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {demoLoading ? (
                <span>Loading Demo...</span>
              ) : (
                <>
                  <span>⚡ Try 1-Click Demo</span>
                </>
              )}
            </button>
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Instant Task Creation</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Zero-lag instant additions with optimistic updates and local sync.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Status Tracking</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Track pending vs. completed items with real-time status counters.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Personal & Secure</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Your tasks belong to your account with password encryption and JWT.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED WORKSPACE VIEW (User IS logged in)
  // -------------------------------------------------------------
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/60 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Authenticated User Header Banner */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Workspace
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {user?.email}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {user?.name?.split(" ")[0] || "User"}
                </span>{" "}
                👋
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Organize, prioritize, and check off your tasks for today.
              </p>
            </div>
          </div>
        </div>

        {/* Task Creation Form (Unlocked after login) */}
        <TaskForm onTaskCreated={fetchTasks} />

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tasks by title or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
              >
                <option value="">All Tasks (Overview)</option>
                <option value="pending">⏳ Pending Tasks</option>
                <option value="completed">✅ Completed Tasks</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Metrics Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tasks</h3>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">{tasks.length}</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-xs text-center bg-gradient-to-b from-amber-50/30 to-white">
            <h3 className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending</h3>
            <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {tasks.filter((task) => task.status === "pending").length}
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs text-center bg-gradient-to-b from-emerald-50/30 to-white">
            <h3 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Completed</h3>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              {tasks.filter((task) => task.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Task List Component */}
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default Home;
