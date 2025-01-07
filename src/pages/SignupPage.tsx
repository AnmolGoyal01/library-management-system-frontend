import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthManager from "../redux/auth/authActions";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const authManager = new AuthManager(dispatch);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data before making the API call
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const registered = await authManager.registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.isAdmin
      );
      if (registered) {
        navigate("/");
      } else {
        setError("Signup failed. Please try again.");
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
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Sign Up
        </h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <InputField
          label="Name"
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label
            htmlFor="isAdmin"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            <input
              type="checkbox"
              id="isAdmin"
              checked={formData.isAdmin}
              onChange={() =>
                setFormData({ ...formData, isAdmin: !formData.isAdmin })
              }
              className="mr-2"
            />
            Register as Admin
          </label>
        </div>
        <div
          className="w-full mb-4 text-right px-1 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 hover:cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Existing User? Login
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
