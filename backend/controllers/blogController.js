const Blog = require("../models/Blog");

// CREATE BLOG POST
const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newBlog = await Blog.create({
            title,
            content,
            author: req.user.id   // from protect middleware
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email") // show author info
            .sort({ createdAt: -1 }); // newest first

        res.status(200).json(blogs);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).json({ message: "Blog not found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            if (blog.author.toString() !== req.user.id) {
                return res.status(401).json({ message: "Not authorized" });
            }
            blog.title = req.body.title || blog.title;
            blog.content = req.body.content || blog.content;
            const updatedBlog = await blog.save()
            res.json(updatedBlog)
        } else {
            return res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const deleteBlog = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id)
        if(blog){
            if (blog.author.toString() !== req.user.id) {
                return res.status(401).json({ message: "Not authorized" });
            }
            await blog.deleteOne();
            res.json({ message: "Blog deleted successfully" });
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog };
