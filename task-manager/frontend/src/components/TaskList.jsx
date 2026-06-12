function TaskList({ tasks, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">
        All Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border p-3 rounded"
            >
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="text-gray-600">
                {task.description}
              </p>

              <p className="text-sm mb-2">
                Status: {task.status}
              </p>

              <button
                onClick={() => onToggleStatus(task)}
                className="mr-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                {task.status === "pending"
                  ? "Mark Completed"
                  : "Mark Pending"}
              </button>

              <button
                onClick={() => onDelete(task._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;