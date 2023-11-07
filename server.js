const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { OpenAI } = require('openai');
dotenv.config();

console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Setting up express
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/", async (req, res) => {
  try {
    //console.log("Question prompt: ", req.body.prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a system for film recommendations." },
        { "role": "user", "content": req.body.prompt }
      ],
      temperature: 1.5,
      max_tokens: 150,
    });

    res.status(200).send({
      bot: response.choices[0].message.content,
    });
    //console.log("Bot response: ", choices[0].message.content);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});