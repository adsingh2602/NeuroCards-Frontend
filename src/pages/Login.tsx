import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/lib/auth";
import { setToken } from "@/lib/token";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);

      console.log("LOGIN RESPONSE:", res);

      if (!res.token) {
        alert("No token received");
        return;
      }

      setToken(res.token);
//       navigate("/dashboard");
      window.location.href = "/";
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg">

        {/*LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h1>

        <input
          className="w-full mb-3 p-3 border rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have account?{" "}
          <Link to="/signup" className="text-primary font-medium">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;