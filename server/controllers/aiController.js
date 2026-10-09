const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const askAI = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const response = await client.responses.create({
            model: "gpt-6-luna",
            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "AI request failed"
        });
    }
};

module.exports = {
    askAI
};