import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../axiosConfig";

function ViewTests() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  async function fetchTests (){
    try {
      const response = await instance.get("/admin/view-test", { withCredentials: true });
      setTests(response.data.tests);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  async function deleteTest (id){
    try {
      await instance.delete(`/admin/delete/${id}`);
      setTests(tests.filter((test) => test._id !== id));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

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
  };

  return (
    <div>
      <h1>View Tests</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr key={test._id}>
              <td>{++index}</td>
              <td>{test.name}</td>
              <td>{test.status}</td>
              <td>
                <button onClick={() => deleteTest(test._id)}>Delete</button>
                <button onClick={() => issueTest(test._id)}>Issue</button>
                <button onClick={() => navigate(`/admin/update-test/${test._id}`)}>
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