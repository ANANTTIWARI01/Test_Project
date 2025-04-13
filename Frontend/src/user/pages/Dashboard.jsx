import { Link } from "react-router-dom";

function Dashboard({ userAnswers }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Answers</h2>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-4 space-y-4">
        {userAnswers.map((answer, index) => (
          <p key={index} className="text-gray-700 border-b pb-2">
            {index + 1}. {answer.answer}
          </p>
        ))}
      </div>
      <Link
        to="/"
        className="mt-6 text-blue-500 hover:underline font-semibold"
      >
        Main Menu
      </Link>
    </div>
  );
}

export default Dashboard;