/**
 * 应用入口文件
 * 负责渲染React应用的根组件
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 获取根DOM元素并渲染应用
// StrictMode用于在开发模式下检查潜在问题
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
