// client/src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // If there is no authenticated user, redirect to sign in/up
  if (!currentUser) {
    return <Navigate to="/signinup" />;
  }
  
  return children;
}

export default ProtectedRoute;
