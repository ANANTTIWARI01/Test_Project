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
        const response = await instance.get(`/admin/update/${id}`, { withCredentials: true });
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
// console.log("FormData being sent:", formData.get("file"), formData.get("name"));

      await instance.put(`/admin/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Test updated successfully!");
      navigate("/admin/viewTest"); 
    } catch (error) {
      console.error("Error updating test:",  error.message);
      alert("Failed to update the test. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Test</h1>
      <div>
        <label>Test Name:</label>
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
      </div>
      <div>
        <label>Upload Questions File:</label>
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
      <button type="submit">Update Test</button>
    </form>
  );
}

export default UpdateTest;