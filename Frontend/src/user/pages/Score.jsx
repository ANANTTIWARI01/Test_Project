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
    return <div id="loading">Loading...</div>;
  }

  if (error) {
    return <div id="error">{error}</div>; 
  }

  if (scores.length === 0) {
    return <div id="no-scores">No scores available.</div>; 
  }

  return (
    <div>
      <h1>Your Scores</h1>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Test Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.testId}>
              <td>{index + 1}</td>
              <td>{score.testName}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Score;