import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo-d20.png"; // Adjust the path if needed

export default function StartupHub() {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    switch (role) {
      case "gm":
        navigate("/gm/login");
        break;
      case "player":
        navigate("/player/join");
        break;
      case "schedule":
        navigate("/schedule");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-8">
        
        {/* 🎲 LOGO SECTION */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={logo}
            alt="d20 Logo"
            className="w-32 h-auto drop-shadow-lg"
          />
          <div className="text-xl font-bold uppercase tracking-widest text-purple-400">
            Olduce TTRPG OS
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-4">Welcome to the Hub</h1>
        <p className="text-sm text-gray-400">Choose how you want to start:</p>

        <button
          className="w-full bg-purple-700 hover:bg-purple-600 p-3 rounded-xl transition"
          onClick={() => handleSelection("gm")}
        >
          🧙 I’m the GM
        </button>

        <button
          className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-xl transition"
          onClick={() => handleSelection("player")}
        >
          🧑‍🎲 I’m a Player
        </button>

        <button
          className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-xl transition"
          onClick={() => handleSelection("schedule")}
        >
          🕒 Scheduled Session
        </button>
      </div>
    </div>
  );
}
