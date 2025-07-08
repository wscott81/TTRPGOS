import React from "react";

export default function GMLogin() {
  const handleOAuthLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-8">
        <h1 className="text-3xl font-bold">GM Login</h1>
        <p className="text-sm text-gray-400">Log in with one of the following services:</p>

        <button
          onClick={() => handleOAuthLogin("google")}
          className="w-full bg-red-600 hover:bg-red-500 p-3 rounded-xl transition"
        >
          🔒 Sign in with Google
        </button>

        <button
          onClick={() => handleOAuthLogin("discord")}
          className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl transition"
        >
          💬 Sign in with Discord
        </button>

        <button
          onClick={() => handleOAuthLogin("twitch")}
          className="w-full bg-purple-600 hover:bg-purple-500 p-3 rounded-xl transition"
        >
          🎮 Sign in with Twitch
        </button>

        <p className="text-xs text-gray-500 mt-4">
          By continuing, you agree to the game's Terms and Rules of Play.
        </p>
      </div>
    </div>
  );
}
