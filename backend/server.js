const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((error) => console.log(error));
