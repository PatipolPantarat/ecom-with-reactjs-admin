import React, { useState } from "react";
import AuthService from "../services/authservice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Components
import { Button } from "../components/button";
import { Input } from "../components/input";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage(false);
    try {
      const res = await AuthService.login(username, password);
      if (res) {
        auth.login(res.role);
        navigate("/");
      } else {
        setErrorMessage(true);
      }
    } catch (error) {
      setErrorMessage(true);
      console.error("Failed to login : ", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-ascent-light">
      <div className="bg-white shadow-lg rounded-lg px-10 py-8 w-full max-w-md">
        <h1 className="text-3xl font-medium text-center p-2">
          Login for admin
        </h1>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <Input
              id="username"
              type="username"
              name="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-5">
            {errorMessage && (
              <p className="text-danger text-center">
                username or password incorrect
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <Button className="w-1/4" type="submit" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
