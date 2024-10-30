"use client";

import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "admin") {
      window.location.href = "/dashboard/sales-form";
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full bg-background p-10 rounded-none shadow-none">
        <h2 className="text-spaceCadet text-3xl mb-5 font-bold">Login</h2>
        <p className="text-spaceCadet text-sm mb-5">
          Credenciales para acceso rápido:
          <br />
          - Usuario: admin
          <br />- Contraseña: admin
        </p>
        <form onSubmit={handleSubmit}>
          <label
            className="block text-spaceCadet text-lg mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-3 text-sm text-spaceCadet bg-white outline-none border-none focus:border-transparent focus:ring-0 mb-5"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label
            className="block text-spaceCadet text-lg mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 text-sm text-spaceCadet bg-white outline-none border-none focus:border-transparent focus:ring-0 mb-5"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="text-red-600 text-sm mb-5">{error}</p>}
          <button
            className="bg-backgroundBlue text-white p-3 w-full text-lg hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
