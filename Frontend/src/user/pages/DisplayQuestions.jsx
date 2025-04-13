import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DisplayQuestion({ question, storingAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  function handleOption(option) {
    setSelectedOption(option);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h3 className="question text-lg font-bold text-gray-800 mb-4">
        {question.question}
      </h3>
      <div className="options flex flex-col items-center space-y-3 mb-6">
        {question.options.map((option, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                storingAnswer(option);
                handleOption(option);
              }}
              disabled={!!selectedOption}
              className={`w-full max-w-md py-2 px-4 border rounded-md text-gray-700 ${
                selectedOption
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <Link
        to="/"
        className="text-red-500 hover:underline font-semibold mt-4"
      >
        Quit Quiz
      </Link>
    </div>
  );
}

export default DisplayQuestion;