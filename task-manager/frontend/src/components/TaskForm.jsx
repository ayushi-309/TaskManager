function TaskForm() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Add New Task
      </h2>

      <form>
        <input
          type="text"
          placeholder="Enter task title"
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Enter task description"
          className="w-full border p-2 rounded mb-3"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;