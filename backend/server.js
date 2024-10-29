const express = require('express');
const mongoose = require('mongoose');
const { generateText } = require('./controllers/textGenerator');
const { generateAudio } = require('./controllers/ttsService');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI,
    // { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/api/text', async (req, res) => {
    // const { inputText } = req.body;
    const inputText = "lorem lorem lorem lorem "
    const generatedText = await generateText(inputText);
    res.json({ generatedText });
});

app.get('/api/tts', async (req, res) => {
    // const { text } = req.body;
    const text = "lorem lorem lorem lorem "
    const audioContent = await generateAudio(text);
    res.send({ audioContent });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
