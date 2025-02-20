import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import userImg from '../assets/images/user.jpg'
import tecImg from '../assets/images/tech.jpg'
import sportImg from '../assets/images/sports.jpg'
import scienceImg from '../assets/images/science.jpg'
import worldImg from '../assets/images/world.jpg'
import healthImg from '../assets/images/health.jpg'
import nationImg from '../assets/images/nation.jpg'
import axios from 'axios'

const News = () => {

    const [headline, setheadline] = useState(null)
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const url = 'https://gnews.io/api/v4/top-headlines?category=general&apikey=6a807c44233016a8c723cd4198d97ee0'

            const response = await axios.get(url)
            const fetchedNews = response.data.articles

            setheadline(fetchedNews[0])
            setNews(fetchedNews.slice(1, 7))

        }
        fetchNews()
    }, [])

  return (
  <div className='news'>
    <header className='news-header'>
        <h1>News & Blogs</h1>
        <div className="search-bar">
            <form>
                <input type="text" placeholder="Search News..." />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass">
                        
                    </i>
                </button>
            </form>
        </div>
    </header>
    <div className='news-content'>
        <div className='navbar'>
            <div className='user'>
                <img src={userImg} alt = "User Image" />
                    <p>User blog</p>
            </div>
            <div className='catagories'>
                <h1 className="nav-heading">Catagories</h1>
                <div className="nav-links">
                    <a href="#" className='nav-link'>Genral</a>

                    <a href="#" className='nav-link'>World</a>
                    <a href="#" className='nav-link'>Business</a>
                    <a href="#" className='nav-link'>Technology</a>
                    <a href="#" className='nav-link'>Entertainment</a>
                    <a href="#" className='nav-link'>Sport</a>
                    <a href="#" className='nav-link'>Science</a>
                    <a href="#" className='nav-link'>Health</a>
                    <a href="#" className='nav-link'>Nation</a>

                    <a href="#" className='nav-link'>
                        Bookmarks <i className="fa-regular fa-bookmark"></i>
                    </a>
                </div>
            </div>
        </div>
        <div className="news-section">
            {headline && (<div className="headline">
                <img src= {headline.image} alt= {headline.title} />
                <h2 className="headline-title">
                    {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
                </h2>
            </div>)}
            <div className="new-grid">
                 {/*遍历news数组，每个元素都是一个articles对象 */}
                {news.map((articles, index)=> ( 
                    <div key = {index} className="news-grid-item">
                    <img src={articles.image} alt= {articles.title} />
                    <h3>
                        {articles.title}
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
  )
}

export default News