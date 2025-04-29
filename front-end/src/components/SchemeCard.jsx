const SchemeCard = ({ scheme }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">{scheme.name}</h2>
      <p className="text-gray-600 mb-2">{scheme.description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {/* Display categories */}
        {scheme.categories && scheme.categories.length > 0 && (
          <div className="text-sm text-blue-500">
            Categories:
            <ul className="list-disc pl-5">
              {scheme.categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="text-sm text-gray-500">
        {/* Display eligibility */}
        {scheme.eligibility && (
          <div>
            <strong>Eligibility: </strong>
            {scheme.eligibility}
          </div>
        )}
      </div>
      <div className="mt-4">
        <a
          href={scheme.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default SchemeCard;
