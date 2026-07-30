import axios from "axios";
import { useState } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await axios.post("http://localhost:5000/api/chat", {
      message: msg
    });

    setReply(res.data);
  };

  return (
    <div className="container">
      <h2>AI Trip Assistant</h2>

      <input onChange={(e)=>setMsg(e.target.value)} placeholder="Ask anything..." />
      <button onClick={send}>Send</button>

      <p>{reply}</p>
    </div>
  );
}