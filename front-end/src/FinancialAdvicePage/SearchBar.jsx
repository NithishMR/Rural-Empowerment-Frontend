// import { useState } from "react";

// export default function SearchBar({ onSearch, onResponse }) {
//   const [query, setQuery] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     onSearch(query); // optional: for updating UI or filtering

//     try {
//       const response = await fetch("/api/ollama", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "llama3",
//           prompt: query,
//           system:
//             "Explain the advice in a simple way that rural people can easily understand. Include key details such as required documents, eligibility criteria, age limits, deadlines, etc., within 100 words. Use bullet points where necessary for clarity.",
//           stream: false,
//         }),
//       });

//       const data = await response.json();
//       const output = data.response || "No response received.";
//       onResponse(output); // callback to parent
//     } catch (error) {
//       console.error("Error fetching from Ollama:", error);
//       onResponse("Sorry, something went wrong.");
//     }

//     setQuery("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl z-50"
//     >
//       <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-blue-500">
//         <button type="button" className="text-gray-500 mr-3">
//           🔍
//         </button>

//         <input
//           type="text"
//           placeholder="Search financial advice..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="flex-grow outline-none text-gray-700 placeholder-gray-400 bg-transparent"
//         />

//         <button
//           type="button"
//           onClick={() => alert("Voice input coming soon!")}
//           className="p-2 text-gray-500 hover:text-blue-500"
//         >
//           🎤
//         </button>

//         <button
//           type="submit"
//           className="p-2 bg-black text-white rounded-full ml-2 hover:bg-gray-800"
//         >
//           ➤
//         </button>
//       </div>
//     </form>
//   );
// }
// for the natual sleciton
import { useState } from "react";

export default function SearchBar({ onSearch, onResponse }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(query); // still filters advice

    try {
      const response = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          prompt: query,
          system:
            "Give the advice in a simple way that a rural person can understand. Include requirements like documents, eligibility, age limits, and time to apply. Use points and short paragraphs. Limit to 100 words.",
          stream: false,
        }),
      });

      const data = await response.json();
      onResponse(data.response || "No response from AI.");
    } catch (err) {
      onResponse("⚠️ Failed to get AI response.");
      console.error(err);
    }

    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl z-50"
    >
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-blue-500">
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
        >
          ➤
        </button>
      </div>
    </form>
  );
}
