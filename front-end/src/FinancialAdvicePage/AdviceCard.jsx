export default function AdviceCard({ title, description, tips }) {
  return (
    <div className="min-w-[300px] bg-white rounded-2xl shadow-md p-6 flex-shrink-0 hover:shadow-lg transition duration-300 ease-in-out border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
