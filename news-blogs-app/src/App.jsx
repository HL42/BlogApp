import React, { useEffect } from "react";
import News from "./Component/News";
import Blogs from "./Component/Blogs";

const App = () => {
  const [showNews, setShowNews] = React.useState(true);
  const [showBlogs, setShowBlogs] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);

  useEffect(() => {
    const saveBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(saveBlogs);
  }, []);

  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

      return updatedBlogs;
    });
  };

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlogs && (
          <Blogs onBack={handleShowNews} onCreateBlog={handleCreateBlog} />
        )}
      </div>
    </div>
  );
};

export default App;
