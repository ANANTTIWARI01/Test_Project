import mongoose from "mongoose";

const quizAttemptSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    response: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
            selectedAnswer: String,
        },
    ],
})

const quizAttempt = mongoose.model("quizAttempt", quizAttemptSchema)

export default quizAttempt;