import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path as needed

function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        // Create a query for the "users" collection, ordering by lifetimeTotal descending and limited to 3
        const q = query(
          collection(db, "users"),
          orderBy("lifetimeTotal", "desc"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setTopUsers(users);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="container p-4">
      <h2 className="mb-4">Leaderboard</h2>
      {topUsers.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ol className="list-group list-group-numbered">
          {topUsers.map((user, index) => (
            <li key={user.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{user.displayName || "Anonymous"}</h5>
                  <p className="mb-0">Lifetime Score: {user.lifetimeTotal || 0}</p>
                </div>
                <span className="badge bg-primary rounded-pill">
                  {index + 1}
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
