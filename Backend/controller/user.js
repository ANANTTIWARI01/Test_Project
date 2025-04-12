import quizAttempt from "../models/quizAttemptModel.js";
import Test from "../models/adminTestModel.js";

export async function fetchTests(req, res) {
  try {
    const issuedTests = await Test.find({ issueTest: true });

    if (!issuedTests || issuedTests.length === 0) {
      return res.status(404).json({ message: "No issued tests available" });
    }

    res.status(200).json({ tests: issuedTests });
  } catch (error) {
    console.error("Error fetching issued tests:", error);
    res.status(500).json({ message: "Failed to fetch issued tests", error: error.message });
  }
}

export async function fetchQuestions(req, res) {
  try {
    const testId = req.params.id.trim(); 

    if (!testId) {
      return res.status(400).json({ message: "Test ID is required" });
    }

    const test = await Test.findById(testId);

    if (!test || !test.file.questions) {
      return res.status(404).json({ message: "Questions not found for this test" });
    }

    res.status(200).json({ questions: test.file });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions", error: error.message });
  }
}


export async function getUserScores(req, res) {
    try {
        const studentId = req.user.id; // Assuming studentId is available in req.user from authentication middleware

        // Validate studentId
        if (!studentId) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        // Fetch all quiz attempts for the student
        const attempts = await quizAttempt.find({ studentId }).populate("testId", "name"); // Populate test name from Test model

        // If no attempts found
        if (!attempts || attempts.length === 0) {
            return res.status(404).json({ message: "No scores available for this user." });
        }

        // Format the scores for the frontend
        const scores = attempts.map(attempt => ({
            testId: attempt.testId._id, // Use the populated testId's _id
            testName: attempt.testId.name, // Use the populated test name
            score: attempt.score, // User's score
        }));

        res.status(200).json({ scores });
    } catch (error) {
        console.error("Error fetching scores:", error);
        res.status(500).json({ message: "Failed to retrieve scores", error: error.message });
    }
}

// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
export async function submitTest(req, res) {
  const testID = req.params.id.trim(); 
  const userAnswers = req.body; 

  try {
      if (!testID) {
          return res.status(400).json({ message: "Invalid test ID" });
      }

      if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
          return res.status(400).json({ message: "No answers provided" });
      }

      const test = await Test.findById(testID);
      if (!test || !test.file || !Array.isArray(test.file.questions) || test.file.questions.length === 0) {
          return res.status(404).json({ message: "Test not found or no questions available" });
      }

      const questions = test.file.questions; 

      let score = 0;
      const resultData = userAnswers.map((answer) => {
          const question = questions[answer.questionNumber];

          if (question) {
              const isCorrect = question.correct_answer === answer.answer;
              if (isCorrect) score += 1;

              return {
                  questionNumber: answer.questionNumber,
                  userAnswer: answer.answer,
                  correctAnswer: question.correct_answer,
                  isCorrect,
              };
          } else {
              return {
                  questionNumber: answer.questionNumber,
                  userAnswer: answer.answer,
                  correctAnswer: null,
                  isCorrect: false,
              };
          }
      });

      const testResult = new quizAttempt({
          testId: testID, 
          studentId: req.user.id,
          name: test.name,
          answers: resultData,
          score,
      });

      await testResult.save();

      res.status(200).json({
          message: "Test submitted successfully",
          score,
          answers: resultData,
      });
  } catch (error) {
      console.error("Error submitting test:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}