import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; // Adjust the import path as needed.
import { signOut } from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);

  // Monitor auth state to know if the user is logged in.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar fixed-bottom navbar-light bg-light border-top">
      <div className="container d-flex justify-content-around align-items-center">
        <Link className="nav-link" to="/home">
          Home
        </Link>
        <Link className="nav-link" to="/friends">
          Friends
        </Link>
        <Link className="nav-link" to="/daily">
          Daily
        </Link>
        <Link className="nav-link" to="/leaderboard">
          Leaderboard
        </Link>
        
        {/* Conditionally render based on login state */}
        {user ? (
          <button className="btn btn-outline-danger" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <Link className="nav-link" to="/signinup">
            Sign In/Up
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
