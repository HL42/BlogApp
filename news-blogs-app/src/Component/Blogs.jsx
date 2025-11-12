/**
 * 博客组件
 * 负责创建和编辑博客文章
 */
import React, { useEffect } from "react";
import Userimg from "../assets/images/user.jpg";
import Noimg from "../assets/images/no-img.png";
import "./Blogs.css";
import axios from "axios";

/**
 * Blogs组件
 * @param {Function} onBack - 返回上一页的回调函数
 * @param {Function} onCreateBlog - 创建或更新博客的回调函数
 * @param {Object} editPost - 要编辑的博客文章（编辑模式下）
 * @param {boolean} isEditing - 是否为编辑模式
 */
export const Blogs = ({ onBack, editPost, isEditing }) => {
  // 控制表单显示状态
  const [showForm, setShowForm] = React.useState(false);
  // 博客图片（Base64格式）
  const [image, setImage] = React.useState(null);
  // 博客标题
  const [title, setTitle] = React.useState("");
  // 博客内容
  const [content, setContent] = React.useState("");
  // 提交成功状态
  const [submitted, setSubmitted] = React.useState(false);
  // 标题验证状态
  const [titleValid, setTitleValid] = React.useState(true);
  // 内容验证状态
  const [contentValid, setContentValid] = React.useState(true);

  /**
   * 当编辑模式或编辑文章改变时，更新表单数据
   */
  useEffect(() => {
    if (isEditing && editPost) {
      // 编辑模式：填充现有数据
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true);
    } else {
      // 新建模式：清空表单
      setImage(null);
      setTitle("");
      setContent("");
      setShowForm(false);
    }
  }, [isEditing, editPost]);

  /**
   * 处理图片文件选择
   * @param {Event} e - 文件选择事件
   */
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 文件大小限制：1MB
      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        alert("File is too large. Max file size is 1MB");
        return;
      }

      // 使用FileReader将图片转换为Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  /**
   * 处理标题输入变化
   * @param {Event} e - 输入事件
   */
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(true);
  };

  /**
   * 处理内容输入变化
   * @param {Event} e - 输入事件
   */
  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(true);
  };

  /**
   * 处理表单提交
   * @param {Event} e - 表单提交事件
   */
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // 验证标题和内容是否填写
  //   if (!title || !content) {
  //     if (!title) setTitleValid(false);
  //     if (!content) setContentValid(false);
  //     return;
  //   }

  //   // 创建博客对象
  //   const newBlog = {
  //     image: image || Noimg,
  //     title,
  //     content,
  //   };

  //   // 调用回调函数创建或更新博客
  //   onCreateBlog(newBlog, isEditing);
  //   // 清空表单
  //   setImage(null);
  //   setTitle("");
  //   setContent("");
  //   setShowForm(false);
  //   setSubmitted(true);
  //   // 3秒后返回上一页
  //   setTimeout(() => {
  //     setSubmitted(false);
  //     onBack();
  //   }, 3000);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 验证标题和内容是否填写
    if (!title || !content) {
      if (!title) setTitleValid(false);
      if (!content) setContentValid(false);
      return;
    }

    const newBlog = {
      image: image || Noimg,
      title: title,
      content: content,
    }

    try {
      
      if (isEditing) {
        const blogId = editPost._id;

        const response = await axios.put(`http://localhost:5001/api/blogs/${blogId}`, newBlog);
        console.log("Blog post updated:", response.data);
        
      } else {

        const response = await axios.post("http://localhost:5001/api/blogs", newBlog);
        console.log("Blog post created:", response.data);
      }

      setImage(null);
      setTitle("");
      setContent("");
      setShowForm(false);
      setSubmitted(true);

      setTimeout(() => {
        
        setSubmitted(false);
        onBack();
      }, 3000);
    
  } catch (error) {
    console.error("Error submitting blog post:", error);
  }
}

  return (
    <div className="blogs">
      {/* 左侧：用户头像 */}
      <div className="blogs-left">
        <img src={Userimg} alt="UserImage" />
      </div>
      {/* 右侧：表单区域 */}
      <div className="blogs-right">
        {/* 显示"创建新文章"按钮 */}
        {!showForm && !submitted && (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        {/* 提交成功提示 */}
        {submitted && <p className="submission-message">Post Submitted!</p>}
        {/* 博客创建/编辑表单 */}
        <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
          <form onSubmit={handleSubmit}>
            {/* 图片上传区域 */}
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i> Upload Image
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
              />
            </div>
            {/* 标题输入框 */}
            <input
              type="text"
              placeholder="Add Title(Max 60 characters)"
              className={`title-input ${!titleValid ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
              maxLength={60}
            />
            {/* 内容输入框 */}
            <textarea
              className={`text-input ${!contentValid ? "invalid" : ""}`}
              placeholder="Add Text"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            {/* 提交按钮 */}
            <button type="submit" className="submit-btn">
              {isEditing ? "Update Post" : "Submit Post"}
            </button>
          </form>
        </div>

        {/* 返回按钮 */}
        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
