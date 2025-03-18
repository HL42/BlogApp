import React, { use, useEffect, useState } from "react";
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

const News = ({ onShowBlogs }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  {
    /*check if the article is visible or not, and store the selected article in the state*/
  }
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  {
    /*store the bookmarks in the state*/
  }
  const [bookMarks, setBookMarks] = useState([]);
  const [showBookMarksModal, setShowBookMarksModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory.toLowerCase()}&lang=en&apikey=6a807c44233016a8c723cd4198d97ee0`;

        if (searchQuery) {
          url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
            searchQuery
          )}&lang=en&apikey=6a807c44233016a8c723cd4198d97ee0`;
        }
        const response = await axios.get(url);
        const fetchedNews = response.data.articles;

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

        fetchedNews.forEach((article) => {
          if (!article.image) {
            article.image = noImg;
          }
        });

        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));

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

  // 在 JSX 中添加加载指示器
  {
    loading && <div className="loading">Loading...</div>;
  }

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
    console.log("Article clicked:", article);
  };

  const handleBookMarkClick = (article) => {
    setBookMarks((prevBookMarks) => {
      const updatedBookMarks = prevBookMarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookMarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookMarks, article];

      localStorage.setItem("bookMarks", JSON.stringify(updatedBookMarks));
      return updatedBookMarks;
    });
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1>新闻+博客</h1>
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
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="User Image" />
            <p>User blog</p>
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
                </a>
              ))}

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
        <div className="news-section">
          {headline && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
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
                    handleBookMarkClick(article);
                  }}
                ></i>
              </h2>
            </div>
          )}
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
          onDeleteBookMark={handleBookMarkClick}
        />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            <div className="blog-post">
              <img src={blogImage1} alt="post-image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImage2} alt="post-image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImage3} alt="post-image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImage4} alt="post-image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
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
