import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function Assistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Hello! I am TRIPO AI Assistant.\n\nAsk me about:\n\n• Any Indian State\n• Tourist Places\n• Hotels\n• Restaurants\n• Budget Planning\n• Weather\n• Travel Tips",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/api/ai/chat`,
        {
          message: userMessage,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            res.data.reply ||
            "Sorry, I couldn't understand.",
        },
      ]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "❌ Unable to connect to AI Server.\nPlease try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        🤖 TRIPO AI Assistant
      </h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === "user"
                ? styles.userBubble
                : styles.aiBubble
            }
          >
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
              }}
            >
              {msg.text}
            </pre>
          </div>
        ))}

        {loading && (
          <div style={styles.aiBubble}>
            🤖 Thinking...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Ask anything about travelling..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          style={styles.button}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "25px",
    color: "#000",
    boxShadow:
      "0 10px 25px rgba(0,0,0,.25)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2563eb",
  },

  chatBox: {
    height: "450px",
    overflowY: "auto",
    background: "#f8fafc",
    borderRadius: "15px",
    padding: "15px",
    marginBottom: "20px",
  },

  aiBubble: {
    maxWidth: "80%",
    background: "#e0f2fe",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "12px",
  },

  userBubble: {
    maxWidth: "80%",
    marginLeft: "auto",
    background: "#2563eb",
    color: "#fff",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "12px",
  },

  inputRow: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  button: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Assistant;