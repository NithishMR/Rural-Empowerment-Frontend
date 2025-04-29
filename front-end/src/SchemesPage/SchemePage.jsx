import { useEffect, useState } from "react";
import SchemeList from "../components/SchemeList";

function SchemePage() {
  const [schemes, setSchemes] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    const res = await fetch("/schemes.json");
    const data = await res.json();
    setSchemes(data);
  };

  const allCategories = Array.from(
    new Set(schemes.flatMap((scheme) => scheme.categories || []))
  );

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isSchemeMatchingFilters = (scheme) => {
    const matchesQuery =
      scheme.name.toLowerCase().includes(query.toLowerCase()) ||
      scheme.description.toLowerCase().includes(query.toLowerCase()) ||
      scheme.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query.toLowerCase())
      );

    const matchesCategory =
      selectedCategories.length === 0 ||
      scheme.categories.some((cat) => selectedCategories.includes(cat));

    return matchesQuery && matchesCategory;
  };

  const filteredSchemes = schemes.filter(isSchemeMatchingFilters);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6 pb-40">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Explore Government Schemes 🌱
      </h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryToggle(category)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategories.includes(category)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-600"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Schemes List */}
      <SchemeList schemes={filteredSchemes} />

      {/* Integrated Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(query); // Ensures query state is used
        }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl z-50"
      >
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-blue-500">
          <button type="button" className="text-gray-500 mr-3">
            🔍
          </button>

          <input
            type="text"
            placeholder="Search government schemes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />

          <button
            type="button"
            onClick={() => alert("Voice input coming soon!")}
            className="p-2 text-gray-500 hover:text-blue-500"
          >
            🎤
          </button>

          <button
            type="submit"
            className="p-2 bg-black text-white rounded-full ml-2 hover:bg-gray-800"
            onClick={() => setQuery("")}
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
}

export default SchemePage;
