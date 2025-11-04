/**
 * 新闻组件
 * 负责显示新闻列表、分类筛选、搜索、书签管理等功能
 */
import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModal from "./NewsModal";
import BookMarks from "./BookMarks";
import blogImage1 from "../assets/images/blog1.jpg";
import blogImage2 from "../assets/images/blog2.jpg";
import blogImage3 from "../assets/images/blog3.jpg";
import blogImage4 from "../assets/images/blog4.jpg";
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
        const fetchedNews = response.data.articles;

        // 如果没有获取到新闻，清空显示
        if (!fetchedNews || fetchedNews.length === 0) {
          console.warn(
            "No news articles found for category:",
            selectedCategory
          );
          setHeadline(null);
          setNews([]);
          setLoading(false);
          return;
        }

        // 为没有图片的文章设置默认图片
        fetchedNews.forEach((article) => {
          if (!article.image) {
            article.image = noImg;
          }
        });

        // 设置头条新闻和新闻列表（头条外的6条）
        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));

        // 从本地存储加载书签
        const savedBookMarks =
          JSON.parse(localStorage.getItem("bookMarks")) || [];

        setBookMarks(savedBookMarks);
      } catch (error) {
        console.error("Error fetching news:", error);
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
    console.log("Article clicked:", article);
  };

  /**
   * 处理书签点击，添加或移除书签
   * @param {Object} article - 要添加/移除的文章
   */
  const handleBookMarkClick = (article) => {
    setBookMarks((prevBookMarks) => {
      // 如果文章已在书签中，则移除；否则添加
      const updatedBookMarks = prevBookMarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookMarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookMarks, article];

      // 保存到本地存储
      localStorage.setItem("bookMarks", JSON.stringify(updatedBookMarks));
      return updatedBookMarks;
    });
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
      {/* 头部：包含logo和搜索栏 */}
      <header className="news-header">
        <h1 className="logo">新闻+博客</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
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
        {/* 左侧导航栏：用户信息和分类 */}
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="User Image" />
            <p>User blog</p>
          </div>
          <div className="categories">
            <h1 className="nav-heading">Categories</h1>

            <div className="nav-links">
              {/* 渲染所有分类 */}
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className="nav-link"
                  onClick={(e) => handleCategoryChange(e, category)}
                >
                  {category}
                </a>
              ))}

              {/* 书签链接 */}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookMarksModal(true)}
              >
                Bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </div>
        </div>
        {/* 新闻内容区域 */}
        <div className="news-section">
          {/* 头条新闻 */}
          {headline && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                {/* 书签图标，根据是否已收藏显示不同样式 */}
                <i
                  className={`${
                    bookMarks.some(
                      (bookmark) => bookmark.title === headline.title
                    )
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
          {/* 新闻网格 */}
          <div className="new-grid">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  {/* 书签图标 */}
                  <i
                    className={`${
                      bookMarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
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
        </div>
        {/* 新闻详情模态框 */}
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        {/* 书签模态框 */}
        <BookMarks
          show={showBookMarksModal}
          bookMarks={bookMarks}
          onClose={() => setShowBookMarksModal(false)}
          onSelectedArticle={handleArticleClick}
          onDeleteBookMark={handleBookMarkClick}
        />
        {/* 我的博客区域 */}
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="blog-post"
                onClick={() => handleBlogClick(blog)}
              >
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>

                {/* 编辑和删除按钮 */}
                <div className="post-buttons">
                  <button
                    className="edit-post"
                    onClick={() => onEditBlog(blog)}
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
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* 博客详情模态框 */}
          {selectedPost && setShowBlogsModal && (
            <BlogsModal
              show={showBlogsModal}
              blog={selectedPost}
              onClose={closeBlogModal}
            />
          )}
        </div>
        {/* 天气和日历组件 */}
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      {/* 页脚 */}
      <footer className="news-footer">
        <p>
          <span>News & Blogs App</span>
        </p>
        <p>
          &copy; {new Date().getFullYear()}. All Rights Reserved. By Hunter Lin
        </p>
      </footer>
    </div>
  );
};

export default News;
