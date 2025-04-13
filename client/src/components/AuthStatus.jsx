import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // adjust path if needed
import { onAuthStateChanged } from "firebase/auth";

function AuthStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="text-center my-3">
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <p>User ID: {user.uid}</p>
        </div>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
  );
}

export default AuthStatus;
