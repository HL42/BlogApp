/**
 * 书签组件
 * 显示所有收藏的文章列表
 */
import React from "react";
import "./Modal.css";
import demoImg from "../assets/images/demo.jpg";
import "./BookMarks.css";
import noImg from "../assets/images/no-img.png";

/**
 * BookMarks组件
 * @param {boolean} show - 控制模态框显示/隐藏
 * @param {Array} bookMarks - 书签文章列表
 * @param {Function} onClose - 关闭模态框的回调函数
 * @param {Function} onSelectedArticle - 选择文章的回调函数
 * @param {Function} onDeleteBookMark - 删除书签的回调函数
 */
const BookMarks = ({
  show,
  bookMarks,
  onClose,
  onSelectedArticle,
  onDeleteBookMark,
}) => {
  // 如果不显示，返回null
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 关闭按钮 */}
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {/* 书签标题 */}
        <h2 className="bookmarks-heading">Book Mark</h2>
        {/* 书签列表 */}
        <div className="bookmarks-list">
          {bookMarks.map((article, index) => (
            <div
              className="bookmark-item"
              key={index}
              onClick={() => onSelectedArticle(article)}
            >
              {/* 文章图片 */}
              <img src={article.image || noImg} alt={article.title} />
              {/* 文章标题 */}
              <h3>{article.title}</h3>
              {/* 删除按钮 */}
              <span
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBookMark(article);
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
