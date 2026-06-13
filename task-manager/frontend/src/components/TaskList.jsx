function TaskList({ tasks, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        All Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-slate-500">No tasks found.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task._id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-slate-800">{task.title}</h3>
              <p className="text-slate-600 mt-1">{task.description}</p>

              <p className="text-sm mt-2">
                Status:{" "}
                <span className="font-medium">{task.status}</span>
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onToggleStatus(task)}
                  className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                >
                  {task.status === "pending"
                    ? "Mark Completed"
                    : "Mark Pending"}
                </button>

                <button
                  onClick={() => onDelete(task._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;