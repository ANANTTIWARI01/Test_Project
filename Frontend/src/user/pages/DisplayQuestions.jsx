import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";

function DisplayQuestion({ question, storingAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null)
// console.log(question);

  useEffect(() => {
    setSelectedOption(null)
  }, [question])

  function handleOption(option) {
    setSelectedOption(option)
  }
  return (
    <>
      <h3 className="question">{question.question}</h3>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            
              <button key={index} onClick={() => { storingAnswer(option); handleOption(option) }} disabled={!!selectedOption}  >
                {option}
              </ button>

            
          );

        })}
      </div>
      <Link to="/">Quit Quiz.</Link>
    </>
  );
}

export default DisplayQuestion; 