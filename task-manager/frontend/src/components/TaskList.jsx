function TaskList({ tasks, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-700">No tasks found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Create a new task above or adjust your search / filter criteria to view tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            Your Tasks ({tasks.length})
          </h2>
          <p className="text-xs text-slate-500">Track and update completion progress</p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const isCompleted = task.status === "completed";
          return (
            <div
              key={task._id}
              className={`group rounded-xl p-4 sm:p-5 border transition-all duration-200 ${
                isCompleted
                  ? "bg-slate-50/70 border-slate-200/60 opacity-80"
                  : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {/* Status Toggle Checkbox */}
                  <button
                    type="button"
                    onClick={() => onToggleStatus(task)}
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                      isCompleted
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 hover:border-blue-500 bg-white"
                    }`}
                    title={isCompleted ? "Mark Pending" : "Mark Completed"}
                  >
                    {isCompleted && (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-sm font-semibold tracking-tight transition-all ${
                        isCompleted
                          ? "line-through text-slate-400"
                          : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isCompleted ? "line-through text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : "bg-amber-50 text-amber-700 border-amber-200/60"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCompleted ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        {isCompleted ? "Completed" : "Pending"}
                      </span>

                      {task.createdAt && (
                        <span className="text-[11px] text-slate-400">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(task)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      isCompleted
                        ? "text-slate-600 hover:bg-slate-100"
                        : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60"
                    }`}
                  >
                    {isCompleted ? "Undo" : "Done"}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(task._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Task"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskList;
