import React, { useState, useEffect } from "react";
import instance from "../../../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

function UpdateTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testName, setTestName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function fetchTestDetails() {
      try {
        const response = await instance.get(`/admin/update/${id}`, {
          withCredentials: true,
        });
        const test = response.data.test;
        setTestName(test.name);
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    }
    fetchTestDetails();
  }, [id]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", testName);

      await instance.put(`/admin/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Test updated successfully!");
      navigate("/admin/viewTest");
    } catch (error) {
      console.error("Error updating test:", error.message);
      alert("Failed to update the test. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-8">
      <div className="w-full max-w-lg bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Update Test</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="testName" className="block text-sm font-medium mb-2">
              Test Name:
            </label>
            <input
              type="text"
              id="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="questionsFile"
              className="block text-sm font-medium mb-2"
            >
              Upload Questions File:
            </label>
            <input
              type="file"
              id="questionsFile"
              accept=".json"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold"
          >
            Update Test
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTest;