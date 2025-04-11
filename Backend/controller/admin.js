import { promises as fsPromises } from 'fs';
import Test from "../models/adminTestModel.js"

export async function createTest(req, res) {
    try {
        const { name, issueTest } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No File Found" })
        }

        if (file.mimetype !== 'application/json') {
            return res.status(400).json({ error: "Only JSON files are allowed" });
        }

        const fileContent = await fsPromises.readFile(file.path, 'utf-8');

        let parsedData;

        try {
            parsedData = JSON.parse(fileContent)

        } catch (error) {
            return res.status(400).json({ error: "Invailid JSON Format" })
        };

        if (!parsedData.questions ||
            !Array.isArray(parsedData.questions) ||
            parsedData.questions.length === 0) {
            return res.status(400).json({ error: "The JSON file must contain at least one question" })
        }

        const validatedQuestions = parsedData.questions.map((item, index) => {
            if (
                !item.question ||
                !item.correct_answer ||
                !Array.isArray(item.options)
            ) {
                throw new Error(`Invalid question format at index ${index}`);
            }

            return {
                question: item.question.trim(),
                correct_answer: item.correct_answer,
                options: item.options.map(opt => opt.trim())
            };
        });

        const test = new Test({
            name,
            file: {
                questions: validatedQuestions
            },
            issueTest
        })

        await test.save();

        await fsPromises.unlink(file.path);
        return res.status(201).json({ message: "Test created successfully", test });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
}

export async function viewTest(req, res) {
    try {
        const query = {};

        const tests = await Test.find(query);

        if (!tests || tests.length === 0) {
            return res.status(404).json({
                message: "No Tests Available"
            });
        }
        res.status(200).json({ tests });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteTest(req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).send({ error: "Test ID is required" })
        }
        const deleteTest = await Test.findByIdAndDelete(req.params.id);

        if (!deleteTest) {
            return res.status(404).send({ error: "Test not Found" })
        }
        return res.status(200).send({
            message: "Test Deleted Successfully",
            Test: deleteTest
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "server error" })
    }

}


export async function updateTest(req, res) {
    try {
        const testId = req.params.id;

        const updatedFields = {};

        if (req.file) {
            const fileContent = await fsPromises.readFile(req.file.path, "utf-8");
            const updatedQuestions = JSON.parse(fileContent);

            if (
                !updatedQuestions.questions ||
                !Array.isArray(updatedQuestions.questions) ||
                updatedQuestions.questions.some(
                    (q) => !q.question || !q.correct_answer || !Array.isArray(q.options)
                )
            ) {
                return res.status(400).json({
                    message: "Invalid questions format. Each question must have 'question', 'correct_answer', and 'options'."
                });
            }
            updatedFields["file.questions"] = updatedQuestions.questions;
        }

        if (req.body.name) {
            updatedFields["name"] = req.body.name;
        }

        const updatedTest = await Test.findOneAndUpdate(
            { _id: testId },
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        if (req.file) {
            await fsPromises.unlink(req.file.path);
        }

        res.status(200).json({ message: "Test updated successfully", updatedTest });
    } catch (error) {
        console.error("Update Test Error:", error.message);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}


export async function issueTest(req, res) {
    try {
        
        const id  = req.params.id;
        
        const { issueTest } = req.body;
        // console.log(issueTest);
        
        if (typeof issueTest !== "boolean") {
            return res.status(400).json({ message: "Invalid issueTest value. It must be a boolean." });
        }
        
        const updatedTest = await Test.findByIdAndUpdate(
            id,
            { $set: { issueTest } },
            { new: true, runValidators: true }
        );
        
        if (!updatedTest) {
            return res.status(404).json({ message: "Test not found" });
        }
        
        res.status(200).json({ message: "Test issued successfully", updatedTest });
    } catch (error) {
        console.error("Error issuing test:", error);
        res.status(500).json({ message: "Failed to issue test", error: error.message });
    }
   };
 