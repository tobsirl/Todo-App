import express from 'express';
import 'dotenv/config';

import connectDatabase from './database';

const app = express();

const { PORT } = process.env;

// Make database connection
connectDatabase();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
