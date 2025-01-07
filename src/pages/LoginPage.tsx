import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthManager from "../redux/auth/authActions";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const authManager = new AuthManager(dispatch);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error on new login attempt
    setError(null);

    // Validate input fields
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const loggedIn = await authManager.loginUser(email, password);
      if (loggedIn) {
        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err : any) {
      setError(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Login
        </h2>

        {/* Display error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <InputField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="w-full mb-4 text-right px-1 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 hover:cursor-pointer"
          onClick={() => navigate("/register")}
        >
          New user? Register
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
