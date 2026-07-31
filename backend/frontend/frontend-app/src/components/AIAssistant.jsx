import React, { useState } from "react";
import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5000";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const askAI = async () => {
    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    const userMessage = question.trim();

    try {
      setLoading(true);
      setAnswer("");

      const response = await axios.post(
        `${API}/api/ai/chat`,
        {
          message: userMessage,
          history,
        }
      );

      const aiAnswer =
        response.data?.answer ||
        "No response received.";

      setAnswer(aiAnswer);

      setHistory((oldHistory) => [
        ...oldHistory,
        {
          role: "user",
          text: userMessage,
        },
        {
          role: "assistant",
          text: aiAnswer,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(
        "TRIPO AI Error:",
        error
      );

      setAnswer(
        error.response?.data?.message ||
          "Unable to connect to TRIPO AI."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setQuestion("");
    setAnswer("");
    setHistory([]);
  };

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "60px auto",
        background: "#ffffff",
        padding: "35px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.15)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "10px",
        }}
      >
        🤖 TRIPO AI Travel Assistant
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Ask anything about travelling in India.
      </p>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Example: Plan a 5 day trip to Rajasthan under ₹25,000"
        style={{
          width: "100%",
          minHeight: "140px",
          padding: "18px",
          fontSize: "16px",
          borderRadius: "12px",
          border:
            "1px solid #d1d5db",
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
          color: "#111827",
          background: "#ffffff",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={askAI}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: "180px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "15px",
            borderRadius: "10px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          {loading
            ? "TRIPO AI is thinking..."
            : "Ask AI"}
        </button>

        <button
          onClick={clearChat}
          style={{
            flex: 1,
            minWidth: "180px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "15px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          Clear Chat
        </button>
      </div>

      <div
        style={{
          marginTop: "35px",
          background: "#f8fafc",
          borderRadius: "15px",
          padding: "25px",
          minHeight: "220px",
          border:
            "1px solid #e5e7eb",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            marginBottom: "15px",
          }}
        >
          AI Response
        </h2>

        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "30px",
            color: "#374151",
            fontSize: "16px",
          }}
        >
          {answer ||
            "Your TRIPO AI response will appear here."}
        </div>
      </div>
    </section>
  );
}

export default AIAssistant;