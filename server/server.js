require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001
require('dotenv').config();

const corsOptions = {
    origin: allowedOrigin,
    Credential: true,
    optionSuccessStatus: 200
}


const mongoURI = process.env.MONGO_URI;

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
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    }
    catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
})


app.get("/api/blogs", async (req, res) => {
    try {
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
        
        res.status(200).json(updatedBlog);

    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
})


// Change bookmark into full stack
const bookmarkSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    image: String,
    sourceName: String,
    publishedAt: Date, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

app.post("/api/bookmarks", async (req, res) => {

    try {
        const { title, url, image, source } = req.body;

        // double check if the bookmark already exist
        const existingBookmark = await Bookmark.findOne({ title});
        
        if (existingBookmark) {
            return res.status(409).json({ message: "Bookmark already exists" });
        }

        const newBookmark = new Bookmark({
            title,
            url,
            image,
            sourceName: source.name,
            publishedAt: req.body.publishedAt
        })

        const savedBookmark = await newBookmark.save();
        res.status(201).json(savedBookmark);

    } catch (error) {

        console.error("Error creating bookmark:", error);
        res.status(500).json({ message: "Failed Creating new bookmark", error: error });
    }
})

app.get("/api/bookmarks", async (req, res) => {
    
    try {
        // store all bookmarks
        const allBookmarks = await Bookmark.find().sort({ createdAt: -1});
        res.status(200).json(allBookmarks);

    } catch (error) {
        
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ message: "Failed fetching bookmarks", error: error });
    }
})

app.delete("/api/bookmarks/:title", async (req, res) => {

    try {
        // get the title from the params
        const title = req.params.title;

        const deletedBookmark = await Bookmark.findOneAndDelete({ title: title});

        if (!deletedBookmark) {
            return res.status(404).json({ message: "Bookmark not found" });
        }

        res.status(200).json({ message: "Bookmark deleted successfully" });

    } catch (error) {

        console.error("Error deleting bookmark:", error);
        res.status(500).json({ message: "Failed deleting bookmark", error: error });
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