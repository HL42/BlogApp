import React, { useEffect, useState } from 'react';
import Weather from './Weather';
import Calendar from './Calendar';
import './News.css';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import axios from 'axios';

const categories = ["General", "World", "Business", "Technology", "Entertainment", "Sport", "Science", "Health", "Nation"];

const News = () => {
    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory.toLowerCase()}&lang=en&apikey=6a807c44233016a8c723cd4198d97ee0`;
    
                const response = await axios.get(url);
                const fetchedNews = response.data.articles;
    
                if (!fetchedNews || fetchedNews.length === 0) {
                    console.warn('No news articles found for category:', selectedCategory);
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
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchNews();
    }, [selectedCategory]);
    
    // 在 JSX 中添加加载指示器
    {loading && <div className="loading">Loading...</div>}

    const handleCategoryChange = (e, category) => {
        e.preventDefault();
        setSelectedCategory(category);
    };

    return (
        <div className='news'>
            <header className='news-header'>
                <h1>新闻+博客</h1>
                <div className="search-bar">
                    <form>
                        <input type="text" placeholder="Search News..." />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className='news-content'>
                <div className='navbar'>
                    <div className='user'>
                        <img src={userImg} alt="User Image" />
                        <p>User blog</p>
                    </div>
                    <div className='categories'>
                        <h1 className="nav-heading">Categories</h1>

                        <div className="nav-links">
                            {categories.map((category) => (
                                <a href="#" key={category} className='nav-link' onClick={(e) => handleCategoryChange(e, category)}>
                                    {category}
                                </a>
                            ))}

                            <a href="#" className='nav-link'>
                                Bookmarks <i className="fa-regular fa-bookmark"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="news-section">
                    {headline && (
                        <div className="headline">
                            <img src={headline.image || noImg} alt={headline.title} />
                            <h2 className="headline-title">
                                {headline.title}
                                <i className="fa-regular fa-bookmark bookmark"></i>
                            </h2>
                        </div>
                    )}
                    <div className="new-grid">
                        {news.map((article, index) => (
                            <div key={index} className="news-grid-item">
                                <img src={article.image || noImg} alt={article.title} />
                                <h3>
                                    {article.title}
                                    <i className="fa-regular fa-bookmark bookmark"></i>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="my-blogs">My Blogs</div>
                <div className="weather-calendar">
                    <Weather />
                    <Calendar />
                </div>
            </div>
            <footer className="news-footer">Footer</footer>
        </div>
    );
};

export default News;