import React from "react";
import TrashInput from "../components/TrashInput"; // adjust the path if needed

function Home() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-4">Home Page</h2>
      <TrashInput />
    </div>
  );
}

export default Home;
