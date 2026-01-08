
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical error during React initialization:", error);
    rootElement.innerHTML = `<div style="padding: 2rem; font-family: sans-serif; text-align: center;">
      <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">无法加载页面</h1>
      <p style="color: #666;">这可能是由于脚本加载失败或浏览器兼容性问题导致的。</p>
    </div>`;
  }
} else {
  console.error("Could not find root element to mount the application.");
}
