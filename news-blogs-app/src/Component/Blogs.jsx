/**
 * 博客组件
 * 负责创建和编辑博客文章
 */
import React, { useEffect, useState } from "react";
import Userimg from "../assets/images/Kermit.png";
import Noimg from "../assets/images/no-img.png";
import "./Blogs.css";
import axios from "axios";

export const Blogs = ({ onBack, editPost, isEditing }) => {
  // 直接显示表单，不再需要切换
  const [showForm, setShowForm] = useState(true);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const [submissionError, setSubmissionError] = useState(null);

  // 初始化数据
  useEffect(() => {
    if (isEditing && editPost) {
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
    } else {
      setImage(null);
      setTitle("");
      setContent("");
    }
    // 每次进入都重置状态
    setShowForm(true);
    setSubmitted(false);
    setSubmissionError(null);
  }, [isEditing, editPost]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File is too large. Max file size is 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!title || !content) {
      if (!title) setTitleValid(false);
      if (!content) setContentValid(false);
      return;
    }

    const blogData = {
      image: image || Noimg,
      title: title,
      content: content,
    };

    try {
      if (isEditing) {
        const blogId = editPost._id;
        const response = await axios.put(
          `http://localhost:5001/api/blogs/${blogId}`,
          blogData
        );
        console.log("Blog post updated:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:5001/api/blogs",
          blogData
        );
        console.log("Blog post created:", response.data);
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        onBack();
      }, 2000); // 缩短一点等待时间，体验更好
    } catch (error) {
      setSubmitted(false);
      let errorMessage = "提交失败，服务器可能已关闭。";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setSubmissionError(errorMessage);
    }
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={Userimg} alt="UserImage" />
      </div>
      
      <div className="blogs-right">
        {/* 移除多余的Create按钮，直接显示表单 */}
        
        {/* 成功提示遮罩 */}
        {submitted && (
          <div className="submission-message">
            <p>{isEditing ? "Post Updated!" : "Post Submitted!"}</p>
          </div>
        )}

        <div className="blogs-right-form">
          <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
          
          {/* 错误提示 */}
          {submissionError && (
            <p className="error-message">{submissionError}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i> 
                {image ? "Change Image" : "Upload Image"}
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
              />
            </div>
            
            <input
              type="text"
              placeholder="Add Title (Max 60 characters)"
              className={`title-input ${!titleValid ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
              maxLength={60}
            />
            
            <textarea
              className={`text-input ${!contentValid ? "invalid" : ""}`}
              placeholder="Write your story..."
              value={content}
              onChange={handleContentChange}
            ></textarea>
            
            <button type="submit" className="submit-btn">
              {isEditing ? "Update Post" : "Publish Post"}
            </button>
          </form>
        </div>

        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;