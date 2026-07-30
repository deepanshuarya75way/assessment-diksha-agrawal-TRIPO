import axios from "axios";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password
    });
    alert("Registered ✅");
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    alert("Login Success ✅");
  };

  return (
    <div className="container">
      <h2>Login / Register</h2>

      <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
      <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>

      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </div>
  );
}