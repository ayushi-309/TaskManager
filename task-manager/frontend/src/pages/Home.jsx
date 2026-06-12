import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, deleteTask, updateTask } from "../api/taskApi";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks(search, statusFilter);
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";

      await updateTask(task._id, {
        status: newStatus,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <TaskForm onTaskCreated={fetchTasks} />

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {loading ? (
        <p className="text-center text-gray-500 mb-4">
          Loading tasks...
        </p>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}

    </div>
  );
}

export default Home;