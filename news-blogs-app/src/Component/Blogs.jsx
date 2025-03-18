import React from "react";
import Userimg from "../assets/images/user.jpg";
import "./Blogs.css";

export const Blogs = ({ onBack }) => {
  const [showForm, setShowForm] = React.useState(false);
  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={Userimg} alt="UserImage" />
      </div>
      <div className="blogs-right">
        {showForm ? (
          <div className="blogs-right-form">
            <h1>New Form</h1>
            <form>
              <div className="img-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i> Upload Image
                </label>
                <input type="file" id="file-upload" />
              </div>
              <input
                type="text"
                placeholder="Add Title(Max 60 characters)"
                className="title-input"
              />
              <textarea
                className="text-input"
                placeholder="Add Text"
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
