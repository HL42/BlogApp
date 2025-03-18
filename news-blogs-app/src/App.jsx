import React from "react";
import News from "./Component/News";
import Blogs from "./Component/Blogs";

const App = () => {
  const [showNews, setShowNews] = React.useState(true);
  const [showBlogs, setShowBlogs] = React.useState(false);

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
        {showNews && <News onShowBlogs={handleShowBlogs} />}
        {showBlogs && <Blogs onBack={handleShowNews} />}
      </div>
    </div>
  );
};

export default App;
