import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { FiSun, FiMoon } from "react-icons/fi";
import AuthManager from "../redux/auth/authActions";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const authManager = new AuthManager(dispatch);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    await authManager.logout();
  };

  return (
    <nav className="pt-1 bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              <NavLink to="/">Library</NavLink>
            </div>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden md:flex md:justify-center md:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-800 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium ${
                  isActive
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                `text-gray-800 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium ${
                  isActive
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-800"
                }`
              }
            >
              Add Book
            </NavLink>
            <NavLink
              to="/borrow-return"
              className={({ isActive }) =>
                `text-gray-800 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium ${
                  isActive
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-800"
                }`
              }
            >
              Borrow/Return
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-800 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium ${
                  isActive
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-800"
                }`
              }
            >
              Dashboard
            </NavLink>
          </div>

          {/* Right Section: User Profile and Dark Mode */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle Icon */}
            <button
              onClick={toggleDarkMode}
              className="hidden md:block text-gray-800 dark:text-gray-200 p-2 rounded-full"
            >
              {document.documentElement.classList.contains("dark") ? (
                <FiSun className="w-6 h-6" />
              ) : (
                <FiMoon className="w-6 h-6" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800 dark:text-gray-200 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* User Profile / Login Button */}
            <div className="relative">
              {user ? (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user?.name?.charAt(0)}
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-10 right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg py-2 z-50">
                      <p className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <strong>Name:</strong> {user?.name}
                      </p>
                      <p className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <strong>Email:</strong> {user?.email}
                      </p>
                      <p className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <strong>Admin:</strong> {user?.isAdmin ? "Yes" : "No"}
                      </p>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="hidden md:block text-gray-800 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login/Signup
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col justify-center items-center bg-white dark:bg-gray-800 shadow-md space-y-4 py-4">
          <NavLink
            to="/"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 block px-4 py-2 rounded-md text-sm font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/add-book"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 block px-4 py-2 rounded-md text-sm font-medium"
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-return"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 block px-4 py-2 rounded-md text-sm font-medium"
          >
            Borrow/Return
          </NavLink>
          <NavLink
            to="/dashboard"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 block px-4 py-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </NavLink>
          <div
            onClick={toggleDarkMode}
            className="text-center text-gray-800 dark:text-gray-200 block w-full text-left px-4 py-2 rounded-md text-sm font-medium"
          >
            Toggle Dark Mode
          </div>
          {user ? (
            <div className="flex items-center justify-center">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 cursor-pointer w-full px-4 py-2"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {user?.name?.charAt(0)}
                </div>
                <p className="text-gray-800 dark:text-gray-200">{user?.name}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <NavLink
                to="/login"
                className="text-gray-800 dark:text-gray-200 hover:text-blue-500 block px-4 py-2 rounded-md text-sm font-medium"
              >
                Login/Signup
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
