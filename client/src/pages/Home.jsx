import React from "react";
import TrashInput from "../components/TrashInput";
import { useAuth } from "../contexts/AuthContext"; // make sure this path is correct

function Home() {
  const { currentUser } = useAuth();
  // Use a fallback name if displayName is not set
  const username = currentUser && currentUser.displayName ? currentUser.displayName : "Friend";
  
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-4">
        Hello {username}, how are you saving the planet today?
      </h2>
      <TrashInput />
    </div>
  );
}

export default Home;
