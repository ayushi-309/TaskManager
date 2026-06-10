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
                        <div key={task._id} className="border p-3 rounded">
                            <h3 className="font-semibold">{task.title}</h3>

                            <p className="text-gray-600">{task.description}</p>

                            <p className="text-sm">Status: {task.status}</p>

                            <button
                                onClick={() => onToggleStatus(task)}
                                className="mt-3 mr-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                                {task.status === "pending" ? "Mark Completed" : "Mark Pending"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;