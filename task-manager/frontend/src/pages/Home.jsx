import TaskForm from "../components/TaskForm";

function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Task Manager
      </h1>

      <TaskForm />
    </div>
  );
}

export default Home;