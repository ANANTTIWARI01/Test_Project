import React, { useEffect, useState } from "react";
import instance from "../../../axiosConfig";

function Score() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScores();
  }, []);

  async function fetchScores() {
    setLoading(true);
    setError(null);
    try {
      const response = await instance.get("/user/scores", { withCredentials: true });
      setScores(response.data.scores);
    } catch (error) {
      console.error("Error fetching scores:", error);
      setError("Failed to load scores. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div id="loading" className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div id="error" className="flex justify-center items-center min-h-screen text-lg font-semibold text-red-500">{error}</div>;
  }

  if (scores.length === 0) {
    return <div id="no-scores" className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500">No scores available.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Scores</h1>
      <table className="w-3/4 max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">S.no</th>
            <th className="py-2 px-4 text-left">Test Name</th>
            <th className="py-2 px-4 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr
              key={score.testId}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{score.testName}</td>
              <td className="py-2 px-4">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Score;