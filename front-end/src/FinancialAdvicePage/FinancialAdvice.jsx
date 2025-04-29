import { useState } from "react";
import advice from "../../public/advice";
import AdviceCard from "./AdviceCard";
import SearchBar from "./SearchBar";
export default function FinancialAdvice() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredAdvice = advice.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tips.some((tip) =>
        tip.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  return (
    <div className="px-6 py-10">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📈 Financial Guidance for You
        </h1>
        <p className="text-gray-600 text-lg">
          Get simple plans, tips, and ideas to secure your future
        </p>
      </div>

      {/* Advice Cards - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {advice.map((value, index) => (
          <AdviceCard
            key={index}
            title={value.title}
            description={value.description}
            tips={value.tips}
          />
        ))}
      </div>
      {/* Search bar with functionalitites*/}
      <div className=""></div>
      <SearchBar onSearch={setSearchQuery} />
    </div>
  );
}
