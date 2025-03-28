import React, { useEffect } from "react";
import News from "./Component/News";
import Blogs from "./Component/Blogs";

const App = () => {
  const [showNews, setShowNews] = React.useState(true);
  const [showBlogs, setShowBlogs] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [isediting, setIsEditing] = React.useState(false);

  useEffect(() => {
    const saveBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(saveBlogs);
  }, []);

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit
        ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  const handlDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete);
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
    setIsEditing(false);
    setSelectedPost(null);
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handlDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs
            onBack={handleShowNews}
            onCreateBlog={handleCreateBlog}
            editPost={selectedPost}
            isEditing={isediting}
          />
        )}
      </div>
    </div>
  );
};

export default App;
