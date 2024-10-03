require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Register routers
const apiRouter = express.Router();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
app.use('/api', apiRouter);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to DB.')
  })
  .catch((error) => {
    console.log(error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});