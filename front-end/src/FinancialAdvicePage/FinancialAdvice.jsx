import { useState } from "react";
import advice from "../../public/advice";
import AdviceCard from "./AdviceCard";
import SearchBar from "./SearchBar";

export default function FinancialAdvice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const filteredAdvice = advice.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tips.some((tip) =>
        tip.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleCardClick = async (content) => {
    try {
      const response = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          prompt: content,
          system:
            "Explain this to a rural woman in under 100 words. Include documents, age limits, deadlines if any.",
          stream: false,
        }),
      });

      const data = await response.json();
      setAiResponse(data.response || "No response from AI.");
    } catch (err) {
      setAiResponse("⚠️ Failed to get AI response.");
      console.error(err);
    }
  };

  return (
    <div className="px-6 py-10 pb-28">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📈 Financial Guidance for You
        </h1>
        <p className="text-gray-600 text-lg">
          Get simple plans, tips, and ideas to secure your future
        </p>
      </div>

      {/* Advice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredAdvice.map((value, index) => (
          <AdviceCard
            key={index}
            title={value.title}
            description={value.description}
            tips={value.tips}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* AI Response Section */}
      {aiResponse && (
        <div className="mt-10 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded max-w-3xl mx-auto">
          <h2 className="font-semibold mb-2">🧠 AI Mentor Says:</h2>
          <p>{aiResponse}</p>
        </div>
      )}

      {/* Search Bar */}
      <SearchBar onSearch={setSearchQuery} onResponse={setAiResponse} />
    </div>
  );
}
