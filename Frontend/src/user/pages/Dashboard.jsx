// import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard({userAnswers }) {
// console.log(userAnswers);

  return (
    <div>
      <h2>Your Answers</h2>
      {userAnswers.map((answer, index) => (
        <p key={index}>{index + 1}{answer.answer  } </p>
      ))}
      <Link to="/">Main Menu.</Link>
    </div>
  );
}

export default Dashboard;






