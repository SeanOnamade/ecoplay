import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const allUsers = [];
        querySnapshot.forEach((doc) => {
          allUsers.push({ id: doc.id, ...doc.data() });
        });

        // Shuffle the array randomly using Fisher-Yates
        for (let i = allUsers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allUsers[i], allUsers[j]] = [allUsers[j], allUsers[i]];
        }

        // Take first 5 random users (or fewer if not enough)
        const randomFriends = allUsers.slice(0, 5);
        setFriends(randomFriends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    }

    fetchFriends();
  }, []);

  return (
    <div className="container p-4">
      <h2 className="mb-4">Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul className="list-group">
          {friends.map((friend) => (
            <li key={friend.id} className="list-group-item">
              <h5>{friend.displayName || "Unknown"}</h5>
              <p>Daily Total: {friend.dailyTotal || 0}</p>
              <p>Lifetime Total: {friend.lifetimeTotal || 0}</p>
              <p>Streak: {friend.streak || 0}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Friends;
