import { Link } from "react-router-dom";
import { useState } from "react";
import VoiceInput from "./VoiceInput";
import SchemeList from "./SchemeList";
import SearchModule from "./SearchModule";

function HomePage() {
  const [schemes, setSchemes] = useState([]);
  const [query, setQuery] = useState(""); // Add state for search query

  // Filter schemes based on query
  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    // <div className="min-h-screen bg-green-100 flex flex-col items-center p-6">
    //   <h1 className="text-3xl font-bold mb-6">🌾 Rural Assistant</h1>

    //   {/* Add Search Bar */}
    //   <SearchModule query={query} setQuery={setQuery} setSchemes={setSchemes} />

    //   {/* Voice Input */}
    //   <VoiceInput setSchemes={setSchemes} setQuery={setQuery} />

    //   {/* Scheme List */}
    //   <SchemeList schemes={filteredSchemes} />

    //   {/* Link to navigate to the All Schemes page */}
    //   <Link
    //     to="/all-schemes"
    //     className="mt-6 text-blue-500 hover:text-blue-700"
    //   >
    //     View All Schemes
    //   </Link>
    // </div>
    <div className="">Home Page</div>
  );
}

export default HomePage;
