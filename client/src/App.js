import React from "react";
import TrashInput from "./components/TrashInput";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import components
import Navbar from "./components/Navbar";

// Import pages
import Landing from "./pages/Landing";
import SignInUp from "./pages/SignInUp";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Daily from "./pages/Daily";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";


// function App() {
//   return (
//     <div className="App container mx-auto p-4">
//       <h1 className="text-center text-3xl font-bold mb-4">EcoPlay!</h1>
//       <TrashInput />
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <div className="container-fluid" style={{ paddingBottom: "70px" }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signinup" element={<SignInUp />} />
          
          {/* Protected routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/friends" 
            element={
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/daily" 
            element={
              <ProtectedRoute>
                <Daily />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Navbar />
    </Router>
  );
}

export default App;





// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
