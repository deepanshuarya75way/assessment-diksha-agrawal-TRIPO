import React, { useState } from "react";

function Assistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const askAI = () => {
    const text = message.toLowerCase();

    if (text.includes("goa")) {
      setReply(
        "TRIPO Goa package includes beach stay, seafood meals, night parties and local sightseeing under affordable budget."
      );
    } else if (text.includes("rajasthan")) {
      setReply(
        "TRIPO Rajasthan package includes Jaipur, Udaipur and Jaisalmer with hotel stay, food and travel."
      );
    } else if (text.includes("kerala")) {
      setReply(
        "TRIPO Kerala package includes backwaters, houseboat stay and traditional food."
      );
    } else {
      setReply(
        "TRIPO helps tourists with travel planning, stay, food, sightseeing and budget calculation across India."
      );
    }
  };

  return (
    <div className="assistant-box">
      <h1>TRIPO AI Assistant</h1>

      <input
        type="text"
        placeholder="Ask about Goa, Rajasthan, Kerala..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={askAI}>
        Ask AI
      </button>

      <p>{reply}</p>
    </div>
  );
}

export default Assistant;