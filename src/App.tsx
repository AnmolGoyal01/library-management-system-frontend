import { useEffect } from "react";
import AuthManager from "./redux/auth/authActions";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const authManager = new AuthManager(dispatch);

  const getCurrentUser = async () => {
    await authManager.getCurrentUser();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
