const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Sei un assistente che spiega il piano Resto al Sud in modo semplice e chiaro.' },
        { role: 'user', content: userMessage }
      ]
    });

    res.json({ reply: completion.data.choices[0].message.content });
} catch (err) {
  if (err.response) {
    console.error("Errore da OpenAI:", err.response.status, err.response.data);
  } else {
    console.error("Errore sconosciuto:", err.message);
  }
  res.status(500).send('Errore nella richiesta');
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));
