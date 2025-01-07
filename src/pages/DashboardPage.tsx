import React, { useEffect, useState } from "react";
import DashboardService from "../services/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    totalAvailableBooks: 0,
    borrowedBooks: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await DashboardService.getDashboard();
        if (data && data.success) {
          setDashboardData(data.data);
        } else {
          setError("Failed to fetch dashboard data.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold text-red-600 dark:text-red-400">
          <span onClick={() => navigate("/login")} className="hover:underline">
            Login to see the dashboard!
          </span>
        </p>
      </div>
    );
  }
  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold text-red-600 dark:text-red-400">
          Only Admins can see the dashboard!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Dashboard
      </h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Total Books
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {dashboardData.totalBooks}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Available Books
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {dashboardData.totalAvailableBooks}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Borrowed Books
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {dashboardData.borrowedBooks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
