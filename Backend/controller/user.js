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

export async function submitTest(req, res) {
  const testId = req.params.id; 
  const { name, studentId, response } = req.body;

  try {
      if (!response || !Array.isArray(response)) {
          return res.status(400).json({ message: "Responses must be provided as an array" });
      }
      if (!response.every((r) => r.questionNumber !== undefined && r.answer)) {
          return res.status(400).json({
              message: "Each response must contain a questionNumber and answer",
          });
      }

      const test = await Test.findById(testId);
      if (!test) {
          return res.status(404).json({ message: "Test not found" });
      }
      if (!test.file.questions || test.file.questions.length === 0) {
          return res.status(400).json({ message: "Test does not contain any questions" });
      }

      let score = 0;
      response.forEach((userResponse) => {
          const question = test.file.questions[userResponse.questionNumber];
          if (question && question.correct_answer === userResponse.answer) {
              score += 1;
          }
      });

      const attempt = new quizAttempt({
          name,
          studentId,
          testId,
          score,
          response,
      });

      await attempt.save();

      res.status(201).json({ message: "Quiz submitted successfully", attempt });
  } catch (error) {
      console.error("Error submitting test:", error);
      res.status(500).json({
          message: "Failed to submit test",
          error: error.message || "An unexpected error occurred",
      });
  }
}

export async function saveUserScore(req, res) {
  const { studentId, testId, score } = req.body;

  try {
    if (!studentId || !testId || score === undefined) {
      return res.status(400).json({ message: "Invalid data. Please provide studentId, testId, and score." });
    }

    const existingAttempt = await quizAttempt.findOne({ studentId, testId });

    let savedAttempt;
    if (existingAttempt) {
      existingAttempt.score = score;
      savedAttempt = await existingAttempt.save();
    } else {
      const newAttempt = new quizAttempt({
        name: req.user.name,
        studentId,
        testId,
        score,
        response: [],
      });
      savedAttempt = await newAttempt.save();
    }

    res.status(200).json({ message: "Score saved successfully", attempt: savedAttempt });
  } catch (error) {
    console.error("Error saving user score:", error);
    res.status(500).json({ message: "Failed to save user score", error: error.message });
  }
}