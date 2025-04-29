import { useEffect, useState } from "react";
import SearchBar from "../FinancialAdvicePage/SearchBar";
import SchemeList from "../components/SchemeList";
// import SearchBar from "./SearchBar"; // your new SearchBar
// import SchemeList from "./SchemeList"; // assume you already have this
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

  // Get all unique categories from schemes
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
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Explore Government Schemes 🌱
      </h1>

      {/* Category Buttons */}
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

      {/* Search Bar */}
      <SearchBar onSearch={setQuery} />
    </div>
  );
}

export default SchemePage;
