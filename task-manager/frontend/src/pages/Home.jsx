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
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    await updateTask(task._id, {
      status: newStatus,
    });

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Task Manager
          </h1>
          <p className="text-slate-500 mt-1">
            Create, track, search and manage your daily tasks.
          </p>
        </div>

        <TaskForm onTaskCreated={fetchTasks} />

        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border shadow-sm text-center">
            <h3 className="text-sm text-gray-500">Total</h3>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm text-center">
            <h3 className="text-sm text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {tasks.filter((task) => task.status === "pending").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm text-center">
            <h3 className="text-sm text-gray-500">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {tasks.filter((task) => task.status === "completed").length}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>
    </div>
  );
}

export default Home;