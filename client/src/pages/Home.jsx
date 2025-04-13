import React, { useEffect, useState } from "react";
import TrashInput from "../components/TrashInput";
import { useAuth } from "../contexts/AuthContext"; // make sure this path is correct
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);

  // Fetch the user's points/stats from Firestore.
  useEffect(() => {
    async function fetchStats() {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const snapshot = await getDoc(userDocRef);
        if (snapshot.exists()) {
          setStats(snapshot.data());
        } else {
          // Optionally, initialize if no document exists
          setStats({ dailyTotal: 0, lifetimeTotal: 0, streak: 0 });
        }
      }
    }
    fetchStats();
  }, [currentUser]);

  // Determine the username for greeting, using a default value if not set.
  const username =
    currentUser && currentUser.displayName
      ? currentUser.displayName
      : "Friend";

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-4">
        Hello {username}, how are you saving the planet today?
      </h2>
      
      {/* Display the user stats if available */}
      {stats && (
        <div className="mb-4 text-center">
          <p>
            <strong>Daily Total:</strong> {stats.dailyTotal}
          </p>
          <p>
            <strong>Lifetime Total:</strong> {stats.lifetimeTotal}
          </p>
          <p>
            <strong>Streak:</strong> {stats.streak}
          </p>
        </div>
      )}

      <TrashInput />
    </div>
  );
}

export default Home;
