const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const postsRoute = require('./routes/posts');
app.use('/api/posts', postsRoute);

// Basic Route
// Basic Route
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fsd_project')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
