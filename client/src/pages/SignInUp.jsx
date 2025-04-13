import React, { useState } from "react";
import { auth } from "../firebase"; // adjust the import path as needed
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignInUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // New state for username
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Successfully signed in!");
      } else {
        // Create user with email and password, then update profile with username.
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Update Firebase Auth profile with the username (displayName)
        await updateProfile(user, { displayName: username });
        setMessage("User created and signed in!");
      }
      navigate("/home");
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="container my-4">
      <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Only show username input on sign up */}
        {!isLogin && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div className="mt-3">
        <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default SignInUp;
