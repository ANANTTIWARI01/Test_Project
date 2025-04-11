import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question:
    {
        type: String,
        required: true
    },
    options:
    {
        type: [String],
        required: true
    },
    correct_answer:
    {
        type: String,
        required: true
    }
});

const fileSchema = new mongoose.Schema({
    questions: {
        type: [questionSchema], 
        required: true,
        validate: {
            validator: function (questions) {
                return questions.length > 0;
            },
            message: "The JSON file must contain at least one question."
        }
    }
});

const testSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    }, // Test name
    file: {
        type: fileSchema,
        required: true
    },
    issueTest: {
        type: Boolean,
        enum : ["true","false"]
        // required:true
    }
}, { timestamps: true });

const Test = mongoose.model('Test', testSchema);
export default Test;

