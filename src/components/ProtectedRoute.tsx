import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const ProtectedRoute = ({
  children,
  authentication = true,
}: {
  children?: React.ReactNode;
  authentication?: boolean;
}) => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth)
  const isAuthenticated = user ? true : false;
  

  useEffect(() => {
    if (authentication && isAuthenticated != authentication) {
      navigate("/login");
    } else if (!authentication && isAuthenticated != authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [isAuthenticated, authentication, navigate]);

  return loader ? (
    <div className="p-10 text-xl">Loading...</div>
  ) : (
    <div className="w-full">{children}</div>
  );
};

export default ProtectedRoute;
