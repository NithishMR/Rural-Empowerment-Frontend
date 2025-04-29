import { useState } from "react";

const VoiceInput = ({ setSchemes, setQuery }) => {
  const [listening, setListening] = useState(false);

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN"; // You can customize this
    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("User said:", transcript);
      setListening(false);
      await searchSchemes(transcript);
      setQuery(""); // Reset the search query
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setListening(false);
    };
  };

  const searchSchemes = async (query) => {
    const res = await fetch("/schemes.json");
    const data = await res.json();
    const filtered = data.filter((scheme) =>
      scheme.keywords.some((keyword) => query.includes(keyword))
    );
    setSchemes(filtered);
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleSpeech}
        className={`px-6 py-3 text-white font-bold rounded-full ${
          listening ? "bg-red-500" : "bg-green-500"
        } transition`}
      >
        {listening ? "Listening..." : "Tap to Speak 🎤"}
      </button>
    </div>
  );
};

export default VoiceInput;
