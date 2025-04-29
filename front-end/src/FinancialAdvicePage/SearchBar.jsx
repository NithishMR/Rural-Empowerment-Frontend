import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl z-50"
    >
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-blue-500">
        {/* Replace with actual search icon */}
        <button type="button" className="text-gray-500 mr-3">
          🔍
        </button>

        <input
          type="text"
          placeholder="Search financial advice..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        />

        {/* Replace with actual mic icon */}
        <button
          type="button"
          onClick={() => alert("Voice input coming soon!")}
          className="p-2 text-gray-500 hover:text-blue-500"
        >
          🎤
        </button>

        {/* Replace with actual send icon */}
        <button
          type="submit"
          className="p-2 bg-black text-white rounded-full ml-2 hover:bg-gray-800"
          onClick={() => {
            console.log(`query is ${query}`);
            setQuery("");
          }}
        >
          ➤
        </button>
      </div>
    </form>
  );
}
