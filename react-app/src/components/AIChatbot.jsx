import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_URL from "../constants";
import "./AIChatbot.css";

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Namaste! I am Atmanirbhar AI. How can I assist you with local hill products today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "✨ Recommend Local Crafts",
    "🍵 Himalayan Organic Teas",
    "🎁 Gifts Under ₹1000",
    "🇮🇳 About Vocal for Local"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/ai-assistant`, { prompt: query });
      const botMessage = {
        sender: "bot",
        text: res.data?.reply || "I am here to help you explore local crafts!"
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I am having trouble connecting right now." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chatbot-container">
      {/* Floating Trigger Button */}
      <button
        className="ai-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        <span className="ai-sparkle">✨</span>
        <span className="ai-btn-text">Atmanirbhar AI</span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-avatar-title">
              <div className="ai-avatar">🤖</div>
              <div>
                <h4>Atmanirbhar AI Assistant</h4>
                <p className="ai-status"><span className="online-dot"></span> Powered by AI</p>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`ai-message-bubble ${
                  msg.sender === "user" ? "user-bubble" : "bot-bubble"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="ai-message-bubble bot-bubble typing-dots">
                <span>.</span><span>.</span><span>.</span> AI is thinking
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="ai-quick-chips">
            {quickPrompts.map((promptText, i) => (
              <button
                key={i}
                className="ai-chip"
                onClick={() => handleSend(promptText.replace(/^.+?\s/, ""))}
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            className="ai-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask AI about hill products, gifts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AIChatbot;
