const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create post
router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        // Also delete comments
        await Comment.deleteMany({ postId: req.params.id });
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add comment to a post
router.post('/:id/comments', async (req, res) => {
    try {
        const newComment = new Comment({
            postId: req.params.id,
            ...req.body
        });
        const savedComment = await newComment.save();

        // Update comment count
        await Post.findByIdAndUpdate(req.params.id, { $inc: { commentsCount: 1 } });

        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
