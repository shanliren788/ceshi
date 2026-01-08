
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React rendering failed:", err);
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; font-family: sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #1c1917;">初始化失败</h2>
        <p style="color: #666; max-width: 400px;">这可能是由于脚本加载失败或浏览器 MIME 类型检查导致的。请确保您部署的是构建后的 dist 目录。</p>
      </div>
    `;
  }
}
