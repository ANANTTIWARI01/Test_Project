/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "../context/UserAuthProvider";
import instance from "../../../axiosConfig";
import DisplayQuestion from "./DisplayQuestions";
import Dashboard from "./Dashboard";

function AttemptTest() {
  const navigate = useNavigate();
  const { fetchQuestions } = useAuthUser();

  const { testID } = useParams();
  
  if (!testID) navigate("/home", { replace: true });

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [time, setTime] = useState(2);
  const [answerList, setAnswerList] = useState({
    questionNumber: "",
    answer: ""
  })
  const [userAnswers, setUserAnswers] = useState([])
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    if (testID) {
      fetchData(testID);
    }
  }, [testID]);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      if (time === 1) {
        if (questionNumber >= questions.length - 1) {
          postingData()

          clearInterval(interval);
          setShowDashboard(true)
        } else {
          setTime(2);
          setQuestionNumber((prev) => prev + 1);
        }
      } else {
        setTime((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [questions, time]);

  async function fetchData(testID) {
    setLoading(true);
    setQuestions(await fetchQuestions(testID));
    setLoading(false);
  }

  function changeQuestion() {
    setQuestionNumber((prev) => prev + 1)
    setTime(2)
  }

  function storingAnswer(answer) {
    setAnswerList((prev) => ({
        ...prev,
        questionNumber, 
        answer,         
    }));
}


  useEffect(() => {
    if (answerList.questionNumber !== "" && answerList.answer !== "") {
      setUserAnswers((prev) => [...prev, answerList]);
    }
  }, [answerList]);


  async function postingData() {
    try {
       await instance.put("/user/test/submit/" + testID, userAnswers, { withCredentials: true })
    }
    catch (error) {
      console.log(error);
    }
  }

  if (!questions || questions.length === 0) {
    return <div>Loading or no questions available...</div>;
}
  if (loading) return <div id="loading">LOADING...</div>;
  if (showDashboard) return <Dashboard userAnswers={userAnswers} />
  return (
    <div className="quizBlock">
        {questions.length > questionNumber ? (
            <DisplayQuestion
                question={questions[questionNumber]}
                storingAnswer={storingAnswer}
            />
        ) : (
            <div>Loading question...</div>
        )}
        <button onClick={() => changeQuestion()}>Next Question</button>
        <h1>{time}</h1>
    </div>
);
}

export default AttemptTest;