const express = require("express");
require("dotenv").config();
//const { Configuration, OpenAIApi } = require("openai");
const OpenAIApi = require("openai");
const Configuration = require("openai");

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const OPEN_AI_KEY="sk-proj-ihzwuksiQFpcAB2OjMEcT3BlbkFJEcZ1ypAgtotaPA6wSn2Z";

const openai = new OpenAIApi(
    new Configuration({
      apiKey: OPEN_AI_KEY, // 
    })
);

// const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY });
// const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello friends! The API server is up and running. This API was built for StayToned.',
    })
});

app.post("/chat", async (req, res) => {
    try {
      const userMessage = req.body.message; // The user's message sent to the endpoint
  
      // Create a chat-based completion request
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Using a chat-based model
        messages: [
          { role: "user", content: userMessage }, // Using the user's message in the chat
        ],
        max_tokens: 100, // You can adjust this to control response length
      });
  
      // Extract the response from OpenAI
      const gpt_response = response.choices[0].message.content;
  
      // Return the response to the client
      console.log(gpt_response);
      res.status(200).json({
        success: true,
        data: gpt_response,
      });   
    } catch (error) {
      console.error("OpenAI error:", error);
  
      const errorMessage = error.response?.data || "An error occurred while processing your request";
  
      res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  });
  


const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Server listening on port ${port}`));
