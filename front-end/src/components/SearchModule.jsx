const SearchModule = ({ query, setQuery, setSchemes }) => {
  // Handle the search button click
  const handleSearch = async () => {
    const res = await fetch("/schemes.json");
    const data = await res.json();
    const filtered = data.filter((scheme) =>
      scheme.name.toLowerCase().includes(query.toLowerCase())
    );
    setSchemes(filtered);
  };

  return (
    <div className="mb-6 w-full max-w-xs flex items-center">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
        placeholder="Search for schemes..."
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch} // Trigger search on button click
        className="ml-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchModule;
