import React, { useState } from "react";
import axios from "axios";

const ClaudeChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchClaudeResponse = async (prompt) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/claude", { prompt });
      setResponse(res.data?.completion || "No response from Claude.");
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Error: Could not fetch response.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">Claude AI Chat</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Claude anything..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={() => fetchClaudeResponse(input)}
        className="mt-2 bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Send"}
      </button>
      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">{response}</div>
      )}
    </div>
  );
};

export default ClaudeChat;
