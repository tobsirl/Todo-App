import express from 'express';
import 'dotenv/config';

import connectDatabase from './database';
import users from './routes/api/users';
import tasks from './routes/api/tasks';
import auth from './routes/api/auth';

export const app = express();

const { PORT } = process.env;

// Make database connection
connectDatabase();

// Middleware
app.use(express.json({ extended: false })); // no need for body-parser anymore

// Use Routes
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
