import { useEffect, useState } from "react";
import { useAuthUser } from "../context/UserAuthProvider";
import { Link } from "react-router-dom";

function Home() {
  const { fetchTests } = useAuthUser();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAndSetTests() {
      try {
        const testsData = await fetchTests();
        setTests(testsData || []);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch tests. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAndSetTests();
  }, []);

  if (loading) {
    return (
      <div
        id="loading"
        className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500"
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="error"
        className="flex justify-center items-center min-h-screen text-lg font-semibold text-red-500"
      >
        {error}
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div
        id="no-tests"
        className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500"
      >
        No tests available at the moment.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <Link
        to="/score"
        className="text-blue-500 hover:underline text-lg font-semibold mb-4"
      >
        View Scores
      </Link>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Tests</h3>

      <table className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">S.no</th>
            <th className="py-2 px-4 text-left">Test</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr
              key={test._id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{test.name}</td>
              <td className="py-2 px-4">
                <Link
                  to={`/attempt-test/${test._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Attempt Test
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;