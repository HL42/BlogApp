/**
 * 主应用组件
 * 负责管理新闻和博客的显示切换，以及博客数据的增删改查
 */
import React, { useEffect } from "react";
import axios from "axios"
import News from "./Component/News";
import Blogs from "./Component/Blogs";

const App = () => {
  // 控制是否显示新闻页面
  const [showNews, setShowNews] = React.useState(true);
  // 控制是否显示博客页面
  const [showBlogs, setShowBlogs] = React.useState(false);
  // 存储所有博客文章
  const [blogs, setBlogs] = React.useState([]);
  // 当前选中的博客文章（用于编辑）
  const [selectedPost, setSelectedPost] = React.useState(null);
  // 是否处于编辑模式
  const [isEditing, setIsEditing] = React.useState(false);


  const fetchBlogs = async () => {

    try {
      console.log("Fetching blogs from server...");
      const response = await axios.get("http://localhost:5001/api/blogs");
      setBlogs(response.data);

    }
    catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }
  /**
   * 组件挂载时从本地存储加载博客数据
   */
  useEffect(() => {
    fetchBlogs(); // 调用fetchblog而不是从localstorage中读取
  }, []);

  /**
   * 处理创建或更新博客
   * @param {Object} newBlog - 新的博客对象
   * @param {boolean} isEdit - 是否为编辑模式
   */
  // const handleCreateBlog = (newBlog, isEdit) => {
  //   setBlogs((prevBlogs) => {
  //     // 如果是编辑模式，更新现有博客；否则添加新博客
  //     const updatedBlogs = isEdit
  //       ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog))
  //       : [...prevBlogs, newBlog];
  //     // 将更新后的博客保存到本地存储
  //     localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

  //     return updatedBlogs;
  //   });

  const handleBackToNews = async () => {
    await fetchBlogs();
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  /**
   * 处理编辑博客
   * @param {Object} blog - 要编辑的博客对象
   */
  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  /**
   * 处理删除博客
   * @param {Object} blogToDelete - 要删除的博客对象
   */
  const handleDeleteBlog = (blogToDelete) => {

    setBlogs((prevBlogs) => {
      // 过滤掉要删除的博客
      // Instead of using localstorage we use axios.delete request
      return prevBlogs.filter((blog) => blog._id != blogToDelete._id)
    });
  };

  /**
   * 切换到博客页面
   */
  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  /**
   * 切换到新闻页面
   */
  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {/* 根据状态显示新闻或博客页面 */}
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handleDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            editPost={selectedPost}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
};

export default App;
