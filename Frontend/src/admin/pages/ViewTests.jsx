import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../axiosConfig";

function ViewTests() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  async function fetchTests() {
    try {
      const response = await instance.get("/admin/view-test", {
        withCredentials: true,
      });
      setTests(response.data.tests);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  }

  async function deleteTest(id) {
    try {
      await instance.delete(`/admin/delete/${id}`);
      setTests(tests.filter((test) => test._id !== id));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  }

  async function issueTest(id) {
    try {
      await instance.patch(`/admin/issue/` + id, { issueTest: true }, { withCredentials: true });
      setTests(
        tests.map((test) =>
          test._id === id ? { ...test, issueTest: true } : test
        )
      );
    } catch (error) {
      console.error("Error updating test status:", error);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">View Tests</h1>
      <table className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
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
              <td className="py-2 px-4">{test.status}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => deleteTest(test._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => issueTest(test._id)}
                  className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                >
                  Issue
                </button>
                <button
                  onClick={() => navigate(`/admin/update-test/${test._id}`)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTests;