/**
 * 新闻详情模态框组件
 * 显示选中新闻的完整信息
 */
import React from "react";
import demoImg from "../assets/images/demo.jpg";
import "./NewsModal.css";

/**
 * NewsModal组件
 * @param {boolean} show - 控制模态框显示/隐藏
 * @param {Object} article - 要显示的文章对象
 * @param {Function} onClose - 关闭模态框的回调函数
 */
const NewsModal = ({ show, article, onClose }) => {
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
        {/* 如果有文章数据，显示文章详情 */}
        {article && (
          <>
            {/* 文章图片 */}
            <img
              src={article.image}
              alt={article.title}
              className="modal-image"
            />
            {/* 文章标题 */}
            <h2 className="modal-title">{article.title}</h2>
            {/* 文章来源 */}
            <p className="modal-source">Source: {article.source.name}</p>
            {/* 发布时间 */}
            <p className="modal-date">
              {new Date(article.publishedAt).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* 文章内容 */}
            <p className="modal-content-text">{article.content}</p>

            {/* 阅读更多链接 */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-link"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
