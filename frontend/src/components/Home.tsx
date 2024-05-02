import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen bg-slate-500  text-center">
      <h1 className="p-10">Home</h1>
      <button className="p-3 bg-slate-700 mt-4 text-white">
        {" "}
        <a href="/board"> Go To Board </a>{" "}
      </button>
    </div>
  );
};

export default Home;
