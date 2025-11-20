const express = require("express");
const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const Blog = require("../models/Blog");

const router = express.Router();

// Public route → get all blogs
router.get("/", getAllBlogs);

//Create Blogs
router.post("/create", protect, createBlog);

//Single Blog 
router.get("/:id", getSingleBlog)

//update Blog
router.put("/:id", protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // --- Authorization check ---
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not allowed to update this blog" });
        }

        // Update the blog
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;

        const updatedBlog = await blog.save();
        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



//delete Blog
router.delete("/:id", protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // --- Authorization check ---
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not allowed to delete this blog" });
        }

        await blog.deleteOne();
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
