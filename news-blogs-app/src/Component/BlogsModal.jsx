/**
 * 博客详情模态框组件
 * 显示选中博客的完整信息
 */
import React from "react";
import "./BlogsModal.css";

/**
 * BlogsModal组件
 * @param {boolean} show - 控制模态框显示/隐藏
 * @param {Object} blog - 要显示的博客对象
 * @param {Function} onClose - 关闭模态框的回调函数
 */
const BlogsModal = ({ show, blog, onClose }) => {
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
        {/* 博客图片（如果有） */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="blogs-modal-image"
          />
        )}

        {/* 博客标题 */}
        <h2 className="blogs-modal-title">{blog.title}</h2>
        {/* 博客内容 */}
        <p className="blogs-post-content">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogsModal;
