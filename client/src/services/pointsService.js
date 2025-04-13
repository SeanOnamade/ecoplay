// client/src/services/pointsService.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Ensure firebase.js exports both db and auth

export async function updateUserPoints(uid, score) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  
  // Get today's date in a simple format (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];  
  
  let newDailyTotal = score;
  let newLifetimeTotal = score;
  let newStreak = 1;

  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    
    newLifetimeTotal = (data.lifetimeTotal || 0) + score;
    
    // Check if the last submission date is the same as today
    if (data.lastSubmissionDate === today) {
      newDailyTotal = (data.dailyTotal || 0) + score;
      newStreak = (data.streak || 0) + 1;
    } else {
      // It's a new day: reset daily total and streak
      newDailyTotal = score;
      newStreak = 1;
    }
  }
  
  // Retrieve the current user's displayName from Firebase Auth
  const currentUser = auth.currentUser;
  const displayName = currentUser?.displayName || "Unknown";
  
  // Write (or merge) the updated data to Firestore including displayName
  await setDoc(
    userDocRef,
    {
      displayName,  // Merges the displayName field
      dailyTotal: newDailyTotal,
      lifetimeTotal: newLifetimeTotal,
      streak: newStreak,
      lastSubmissionDate: today,
    },
    { merge: true }
  );
}
