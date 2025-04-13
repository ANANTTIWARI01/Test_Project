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
              console.log(error);
                setError("Failed to fetch tests. Please try again later.");
            } finally {
                setLoading(false); 
            }
        }
        fetchAndSetTests();
    }, []);

    if (loading) {
        return <div id="loading">Loading...</div>;
    }

    if (error) {
        return <div id="error">{error}</div>;
    }

    if (tests.length === 0) {
        return <div id="no-tests">No tests available at the moment.</div>; 
    }

    return (
        <>
            <Link to="/score">View Scores</Link> 
            <h3>Available Tests</h3>

            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Test</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test, index) => (
                        <tr key={test._id}>
                            <td>{index + 1}</td>
                            <td>{test.name}</td>
                            <td>
                                <Link to={`/attempt-test/${test._id}`}>Attempt Test</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Home;