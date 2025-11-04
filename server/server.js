const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// middleware
app.use(cors()); // allows requests from other origins
app.use(express.json()); // 让express服务器理解并返回JSON

const mongoURI = 'mongodb+srv://hunterlin:HL86254899%40l@demo.vfjby1c.mongodb.net/?appName=demo'

// 连接到MongoDB数据库
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB: Success');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    })

    app.get("/", (req, res) => {
        res.send("Hello from Express server!");
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});