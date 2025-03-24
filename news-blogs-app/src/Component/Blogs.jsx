import React from "react";
import Userimg from "../assets/images/user.jpg";
import Noimg from "../assets/images/no-img.png";
import "./Blogs.css";

export const Blogs = ({ onBack, onCreateBlog }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  // Function to handle the image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      image: image || Noimg,
      title,
      content,
    };

    onCreateBlog(newBlog);
    setImage(null);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={Userimg} alt="UserImage" />
      </div>
      <div className="blogs-right">
        {showForm ? (
          <div className="blogs-right-form">
            <h1>New Form</h1>
            <form onSubmit={handleSubmit}>
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
              <input
                type="text"
                placeholder="Add Title(Max 60 characters)"
                className="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="text-input"
                placeholder="Add Text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button type="submit" className="submit-btn">
                Submit Button
              </button>
            </form>
          </div>
        ) : (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
