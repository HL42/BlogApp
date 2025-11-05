const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173', // 允许来自此源的请求
    credientials: true, // 允许发送cookie等凭据
    optionSuccessStatus: 200
}

const app = express();
const PORT = 5001;
const mongoURI = 'mongodb+srv://hunterlin:HL86254899%40l@demo.vfjby1c.mongodb.net/blogDB?appName=demo'

// middleware
app.use(cors(corsOptions)); // allows requests from other origins
app.use(express.json()); // 让express服务器理解并返回JSON

// identified the basic schema for the blog posts
const blogSchema = new mongoose.Schema(
    {
        title: String,
        content: String, 
        image: String,
        createdAt: {
            type: Date,
            default: Date.now // current time for the creation
        }
    }
);

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", async(req, res) => {
    res.send("Hello from Express server!");
})

app.post("/api/blogs", async (req, res) => {

    try {

        const { title, content, image} = req.body;
        const newBlog = new Blog({
            title: title,
            content: content,
            image: image
        })

        // Tell mongoose save this blog into mongodb
        const savedBlog = await newBlog.save();

        // Respond with the saved blog
        res.status(201).json(savedBlog);
    }
    catch (error) {

        console.error('Error creating blog post:', error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
})


app.get("/api/blogs", async (req, res) => {

    try {

        // Monggose going to find the collection of blogs
        const allBlogs = await Blog.find().sort({ createdAt: -1});

        res.status(200).json(allBlogs);
    }
    catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
})

app.delete("/api/blogs/:id", async (req, res) => { 

    try {

        const blogId = req.params.id;
        const deleteBlog = await Blog.findByIdAndDelete(blogId);

        if (!deleteBlog) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        res.status(200).json({ message: "Blog post deleted successfully" });
    }
    catch (error) {

        console.error('Error deleting blog post:', error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
})

app.put("/api/blogs/:id", async (req, res) => {

    try {
        const blogId = req.params.id;
        const { title, content, image } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content, image },
            { new: true } // 返回更新后的文档
        )

        if(!updatedBlog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: "Internal server error", error: error });
    }

})

// 连接到MongoDB数据库 / 实用async/await的格式
const startServer = async () => {

    try {
        
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");


        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);   
    }
}

startServer();
