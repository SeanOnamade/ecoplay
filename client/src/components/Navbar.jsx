import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; // adjust the path as necessary
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);

  // Listen for auth state changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar fixed-bottom navbar-light bg-light border-top">
      <div className="container d-flex justify-content-around align-items-center">
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/friends">Friends</Link>
        <Link className="nav-link" to="/daily">Daily</Link>
        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        {user ? (
          <button 
            className="btn btn-outline-danger"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <Link className="nav-link" to="/signinup">Sign In/Up</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
