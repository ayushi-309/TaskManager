import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="group focus:outline-none">
            <Logo size="md" />
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className={`text-sm font-semibold px-3.5 py-2 rounded-lg transition-colors ${
                location.pathname === "/"
                  ? "text-blue-600 bg-blue-50/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Dashboard
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
                {/* User avatar & info */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
                    {getInitials(user?.name)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">
                      {user?.name || "User"}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-tight truncate max-w-[140px]">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 px-3 py-2 rounded-lg hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-slate-200">
                <Link
                  to="/login"
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                    location.pathname === "/login"
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  Create Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
