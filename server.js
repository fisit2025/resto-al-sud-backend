{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const cors = require('cors');\
const bodyParser = require('body-parser');\
const \{ Configuration, OpenAIApi \} = require('openai');\
\
const app = express();\
app.use(cors());\
app.use(bodyParser.json());\
\
const configuration = new Configuration(\{\
  apiKey: process.env.OPENAI_API_KEY,\
\});\
const openai = new OpenAIApi(configuration);\
\
app.post('/chat', async (req, res) => \{\
  try \{\
    const userMessage = req.body.message;\
\
    const completion = await openai.createChatCompletion(\{\
      model: 'gpt-4',\
      messages: [\
        \{ role: 'system', content: 'Sei un assistente che spiega il piano Resto al Sud in modo semplice e chiaro.' \},\
        \{ role: 'user', content: userMessage \}\
      ]\
    \});\
\
    res.json(\{ reply: completion.data.choices[0].message.content \});\
  \} catch (err) \{\
    res.status(500).send('Errore nella richiesta');\
  \}\
\});\
\
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => console.log(`Server avviato sulla porta $\{PORT\}`));\
}