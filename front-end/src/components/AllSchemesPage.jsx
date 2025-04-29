import { useState, useEffect } from "react";
import SchemeCard from "./SchemeCard";
import SearchModule from "./SearchModule";

const AllSchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [query, setQuery] = useState(""); // Search query for filtering schemes

  // Fetch all schemes on component mount
  useEffect(() => {
    const fetchSchemes = async () => {
      const res = await fetch("/schemes.json");
      const data = await res.json();
      setSchemes(data);
    };
    fetchSchemes();
  }, []);

  // Filter schemes based on query
  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(query.toLowerCase()) ||
      scheme.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🌾 All Government Schemes</h1>

      {/* Search Bar */}
      <SearchModule query={query} setQuery={setQuery} setSchemes={setSchemes} />

      {/* Display Filtered Schemes */}
      {filteredSchemes.length === 0 ? (
        <p className="text-gray-700">No schemes found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSchemesPage;
