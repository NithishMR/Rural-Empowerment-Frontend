import SchemeCard from "./SchemeCard";

const SchemeList = ({ schemes }) => {
  if (schemes.length === 0) {
    return (
      <p className="text-gray-700">
        No schemes found. Try speaking about your needs!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      {schemes.map((scheme) => (
        <SchemeCard key={scheme.id} scheme={scheme} />
      ))}
    </div>
  );
};

export default SchemeList;
