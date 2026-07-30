import { useState } from "react";

function Chatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = () => {
    const text = msg.toLowerCase();

    if (text.includes("goa")) {
      setReply("Goa trip: Beach stay, food & travel available. Budget: ₹5000-₹15000");
    } 
    else if (text.includes("help")) {
      setReply("We provide travel, stay & food booking in budget.");
    }
    else if (text.includes("budget")) {
      setReply("Use AI Budget Planner on home page 💰");
    }
    else {
      setReply("Ask about any place in India 😊");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Assistant 🤖</h2>

      <input onChange={(e)=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>

      <p>{reply}</p>
    </div>
  );
}

export default Chatbot;