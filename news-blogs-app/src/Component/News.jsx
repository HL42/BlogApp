/**
 * 新闻组件
 * 负责显示新闻列表、分类筛选、搜索、书签管理等功能
 */
import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/Kermit.png";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModal from "./NewsModal";
import BookMarks from "./BookMarks";
import BlogsModal from "./BlogsModal";

// 新闻分类列表
const categories = [
  "General",
  "World",
  "Business",
  "Technology",
  "Entertainment",
  "Sport",
  "Science",
  "Health",
  "Nation",
];

/**
 * News组件
 * @param {Function} onShowBlogs - 切换到博客页面的回调函数
 * @param {Array} blogs - 博客文章列表
 * @param {Function} onEditBlog - 编辑博客的回调函数
 * @param {Function} onDeleteBlog - 删除博客的回调函数
 */
const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  // 头条新闻
  const [headline, setHeadline] = useState(null);
  // 新闻列表
  const [news, setNews] = useState([]);
  // 当前选中的分类
  const [selectedCategory, setSelectedCategory] = useState("General");
  // 加载状态
  const [loading, setLoading] = useState(false);

  // 搜索输入框的值
  const [searchInput, setSearchInput] = useState("");
  // 搜索查询关键词
  const [searchQuery, setSearchQuery] = useState("");

  // 控制新闻详情模态框的显示
  const [showModal, setShowModal] = useState(false);
  // 当前选中的文章
  const [selectedArticle, setSelectedArticle] = useState(null);

  // 存储书签的状态
  const [bookMarks, setBookMarks] = useState([]);
  // 控制书签模态框的显示
  const [showBookMarksModal, setShowBookMarksModal] = useState(false);

  // 当前选中的博客文章
  const [selectedPost, setSelectedPost] = useState(null);
  // 控制博客详情模态框的显示
  const [showBlogsModal, setShowBlogsModal] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

  // --- 新增函数：获取书签 (READ) ---
  const fetchBookmarks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/bookmarks`);
        setBookMarks(response.data);
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
    }
  };


  /**
   * 获取新闻数据
   * 当分类或搜索关键词改变时重新获取新闻
   */
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // 根据是否有搜索关键词决定API地址
        let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory.toLowerCase()}&lang=en&apikey=6a807c44233016a8c723cd4198d97ee0`;

        // 如果有搜索关键词，使用搜索API
        if (searchQuery) {
          url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
            searchQuery
          )}&lang=en&apikey=6a807c44233016a8c723cd4198d97ee0`;
        }
        const response = await axios.get(url);
        let fetchedNews = response.data.articles;

        // 如果没有获取到新闻，清空显示
        if (!fetchedNews || fetchedNews.length === 0) {
          setHeadline(null);
          setNews([]);
          setLoading(false);
          return;
        }

        // 为没有图片的文章设置默认图片
        fetchedNews = fetchedNews.map((article) => ({
            ...article,
            image: article.image || noImg,
        }));


        // 设置头条新闻和新闻列表（头条外的6条）
        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));

        // 2. 从后端加载书签 (新增/修复：替换 Local Storage)
        await fetchBookmarks();

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  /**
   * 处理分类切换
   * @param {Event} e - 事件对象
   * @param {string} category - 选中的分类
   */
  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  /**
   * 处理搜索提交
   * @param {Event} e - 事件对象
   */
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  /**
   * 处理文章点击，显示详情模态框
   * @param {Object} article - 选中的文章
   */
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  /**
   * 处理书签点击，添加或移除书签 (修复了语法和逻辑)
   * @param {Object} article - 要添加/移除的文章
   */
  const handleBookMarkClick = async (article) => { // <--- 修复了语法错误
    
    // 检查是否已在书签中
    const isBookmarked = bookMarks.some(
      (bookmark) => bookmark.title === article.title
    );

    try {
        if (isBookmarked) {
            // --- DELETE 逻辑：如果已收藏，则删除 ---
            const encodedTitle = encodeURIComponent(article.title);
            await axios.delete(`${API_BASE_URL}/api/bookmarks/${encodedTitle}`);
            console.log("书签删除成功:", article.title);

        } else {
            // --- POST 逻辑：如果未收藏，则添加 ---
            const bookmarkData = {
                title: article.title,
                url: article.url,
                image: article.image,
                // 后端 server.js 期望 source 是一个对象 { name: '...' }，或者这里发送 sourceName 
                // 我们直接发送 article 结构，但移除不必要的字段，使之兼容
                source: article.source, 
                publishedAt: article.publishedAt,
            };
            await axios.post(`${API_BASE_URL}/api/bookmarks`, bookmarkData);
            console.log("书签添加成功:", article.title);
        }

        // 无论添加还是删除成功，都重新从后端获取列表来更新 UI
        await fetchBookmarks();

    } catch (error) {
        // 如果后端返回 409 (已存在)，说明是重复点击，我们可以忽略
        if (error.response && error.response.status === 409) {
            console.warn("书签已存在 (忽略)");
        } else {
            console.error("书签操作失败:", error);
        }
    }
  };

  /**
   * 处理书签模态框里的删除
   * @param {Object} bookmarkToDelete - 要删除的书签对象
   */
  const onDeleteBookMark = async (bookmarkToDelete) => {
    // 复用 handleBookMarkClick 的删除逻辑
    await handleBookMarkClick(bookmarkToDelete); 
  };


  /**
   * 处理博客点击，显示博客详情模态框
   * @param {Object} blog - 选中的博客
   */
  const handleBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogsModal(true);
  };

  /**
   * 关闭博客详情模态框
   */
  const closeBlogModal = () => {
    setShowBlogsModal(false);
    setSelectedPost(null);
  };

return (
  <div className="news">
    {/* Header */}
    <header className="news-header">
      <h1 className="logo">News & Blogs</h1>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search news..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </header>

    <div className="news-content">
      {/* Left Sidebar: Navbar */}
      <div className="navbar">
        <div className="user" onClick={onShowBlogs}>
          <img src={userImg} alt="User" />
          <p>My Blogs</p>
        </div>
        <div className="categories">
          <h1 className="nav-heading">Categories</h1>
          <div className="nav-links">
            {categories.map((category) => (
              <a
                href="#"
                key={category}
                className="nav-link"
                onClick={(e) => handleCategoryChange(e, category)}
              >
                {category}
                <i className="bx bx-chevron-right" style={{fontSize: '16px', color: '#ccc'}}></i>
              </a>
            ))}
            <a
              href="#"
              className="nav-link"
              onClick={() => setShowBookMarksModal(true)}
            >
              Bookmarks <i className="fa-solid fa-bookmark" style={{color: '#ffcc00'}}></i>
            </a>
          </div>
        </div>
      </div>

      {/* Center: News & Blogs List */}
      <div className="news-section">
        {/* Headline */}
        {headline && (
          <div className="headline" onClick={() => handleArticleClick(headline)}>
            <img src={headline.image || noImg} alt={headline.title} />
            <h2 className="headline-title">
              {headline.title}
              <i
                className={`${
                  bookMarks.some((b) => b.title === headline.title)
                    ? "fa-solid"
                    : "fa-regular"
                } fa-bookmark bookmark`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookMarkClick(headline);
                }}
              ></i>
            </h2>
          </div>
        )}

        {/* News Grid */}
        <div className="new-grid">
          {news.map((article, index) => (
            <div
              key={index}
              className="news-grid-item"
              onClick={() => handleArticleClick(article)}
            >
              <img src={article.image || noImg} alt={article.title} />
              <h3>
                {article.title.slice(0, 60)}...
                <i
                  className={`${
                    bookMarks.some((b) => b.title === article.title)
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookMarkClick(article);
                  }}
                ></i>
              </h3>
            </div>
          ))}
        </div>

        {/* My Blogs Section */}
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Latest Posts</h1>
          <div className="blog-posts">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="blog-post"
                onClick={() => handleBlogClick(blog)}
              >
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>
                <div className="post-buttons">
                  <button
                    className="edit-post"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditBlog(blog);
                    }}
                  >
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button
                    className="delete-post"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlog(blog);
                    }}
                  >
                    <i className="bx bxs-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Weather & Calendar & Footer */}
      <div className="weather-calendar">
        <Weather />
        <Calendar />
        
        {/* Footer Moved Here */}
        <footer className="news-footer">
          <p>&copy; {new Date().getFullYear()} News & Blogs App</p>
          <p>Designed by Hunter Lin</p>
        </footer>
      </div>
    </div>

    {/* Modals */}
    <NewsModal
      show={showModal}
      article={selectedArticle}
      onClose={() => setShowModal(false)}
    />
    <BookMarks
      show={showBookMarksModal}
      bookMarks={bookMarks}
      onClose={() => setShowBookMarksModal(false)}
      onSelectedArticle={handleArticleClick}
      onDeleteBookMark={onDeleteBookMark}
    />
    {selectedPost && showBlogsModal && (
      <BlogsModal
        show={showBlogsModal}
        blog={selectedPost}
        onClose={closeBlogModal}
      />
    )}
  </div>
);
};

export default News;