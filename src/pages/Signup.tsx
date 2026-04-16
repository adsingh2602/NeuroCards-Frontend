import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "@/lib/auth";
import { setToken } from "@/lib/token";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await signup(email, password);

      console.log("SIGNUP RESPONSE:", res);

      if (res.token) {
        setToken(res.token);
        navigate("/login");
        toast.success("Signup successful. Now login.");

      } else {
        alert("Signup successful. Now login.");
        navigate("/login");

      }
    } catch (err) {
      console.error(err);
      alert("User already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
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
          onClick={handleSignup}
          className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90 transition"
        >
          Signup
        </button>

        <p className="mt-4 text-sm text-center">
          Already have account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;