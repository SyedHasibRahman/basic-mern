const { default: axios } = require("axios");


async function generateText(input) {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: input,
            max_tokens: 100,
        }, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Text generation error:', error);
        return 'Error generating text';
    }
}

module.exports = { generateText };
