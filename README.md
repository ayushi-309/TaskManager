# ✅ Task Manager | MERN Stack

A full-stack **Task Management Application** built using the **MERN stack**. Task Manager allows users to create, view, update, delete, search, and manage tasks through a clean and responsive interface.

## 🌐 Live Demo

🚀 **[Task Manager – Live Demo](https://task-manager-neon-psi.vercel.app/)**

## 📌 About The Project

Task Manager is a CRUD-based web application developed to practice and demonstrate full-stack web development using **React.js, Node.js, Express.js, and MongoDB**.

The application provides an easy way to organize daily tasks, update their status, search for specific tasks, and filter tasks based on their current status.

## ✨ Features

* 🔐 User Authentication (Sign In & Sign Up with JWT and secure password hashing)
* 🎨 Modern Glassmorphism UI with Tailwind CSS v4 & responsive design
* 📊 Interactive password strength meter & real-time validation
* ➕ Create new tasks
* 📋 View all tasks
* ✏️ Edit and update tasks
* 🗑️ Delete tasks
* 🔄 Update task status
* 🔍 Search tasks
* 🎯 Filter tasks by status
* ⏳ Loading state handling
* 📱 Fully responsive user interface
* 🔗 RESTful API integration with local preview fallback
* 🗄️ MongoDB database integration
* ⚡ Automatic task list updates

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **JavaScript**
* **Tailwind CSS**
* **Axios**
* **Vite**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **REST API**

### Development Tools

* Git
* GitHub
* VS Code
* Nodemon

## 🏗️ Project Structure

```text
TaskManager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

## 🔄 Application Workflow

```text
User
  ↓
React Frontend
  ↓
Axios API Request
  ↓
Express.js REST API
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB
  ↓
Response
  ↓
React UI Update
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ayushi-309/TaskManager.git
```

```bash
cd TaskManager
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will run on the local Vite development URL shown in your terminal.

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description                         | Access  |
| ------ | -------------------- | ----------------------------------- | ------- |
| POST   | `/api/auth/register` | Register a new user                 | Public  |
| POST   | `/api/auth/login`    | Log in user and return JWT token    | Public  |
| GET    | `/api/auth/me`       | Get authenticated user profile      | Private |

### 📋 Tasks

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| GET    | `/api/tasks/:id` | Get a single task |
| POST   | `/api/tasks`     | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

## 🎯 Key Skills Demonstrated

* MERN Stack Development
* React Component Development
* CRUD Operations
* RESTful API Development
* Express.js Backend Development
* MongoDB & Mongoose
* Frontend–Backend Integration
* Axios API Requests
* Search & Filtering
* State Management
* Responsive UI Development
* Error Handling
* Git & GitHub
* Full-Stack Deployment

## 📚 What I Learned

Through this project, I gained practical experience in building a complete full-stack application from frontend to backend and database. I learned how to design REST APIs, perform CRUD operations with MongoDB, connect a React frontend with an Express backend, handle application states, and deploy a full-stack project.

## 🚀 Future Improvements

* 🔐 User authentication with JWT
* 👤 User-specific tasks
* 📅 Task due dates and reminders
* 🔔 Notifications
* 📊 Task analytics dashboard
* 🏷️ Task categories and priorities
* 🌙 Dark mode

## 👩‍💻 Author

**Ayushi Tiwari**

GitHub: **[@ayushi-309](https://github.com/ayushi-309)**

---

⭐ If you found this project useful, consider giving it a star!
