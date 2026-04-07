import { useState } from "react";
import { sendMessage } from "./services/api";
import "./styles/app.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await sendMessage(input);

    const botMsg = { role: "bot", text: res.response };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  };

  return (
  <div className="container">
    <h1 className="heading">Feedback Analyzer</h1>

    <div className="chatBox">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`message ${m.role === "user" ? "user" : "bot"}`}
        >
          <b>{m.role}:</b> {m.text}
        </div>
      ))}
    </div>

    <div className="inputContainer">
      <input
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your feedback..."
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <button className="button" onClick={handleSend}>
        Send
      </button>
    </div>
  </div>
);
}