// 合并版分页生成脚本 - 处理中英文分页，确保两种语言有相同的分页数
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 指定中英文分页文件目录
const ZH_PAGE_DIR = path.join(__dirname, '../content/docs/page');
const EN_PAGE_DIR = path.join(__dirname, '../content/docs/en/page');

// 每页显示的文章数量
const POSTS_PER_PAGE = 9;

// 确保分页目录存在
if (!fs.existsSync(ZH_PAGE_DIR)) {
  fs.mkdirSync(ZH_PAGE_DIR, { recursive: true });
}
if (!fs.existsSync(EN_PAGE_DIR)) {
  fs.mkdirSync(EN_PAGE_DIR, { recursive: true });
}

// 计算博客文章总数
function countBlogPosts(langDir) {
  if (!fs.existsSync(langDir)) {
    console.log(`博客目录不存在: ${langDir}`);
    return 0;
  }
  
  let totalPosts = 0;
  
  // 递归遍历目录
  function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 如果是目录，递归遍历
        traverseDirectory(fullPath);
      } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
        // 如果是 .md 或 .mdx 文件，计数加1
        totalPosts++;
      }
    }
  }
  
  try {
    traverseDirectory(langDir);
    return totalPosts;
  } catch (error) {
    console.error('读取博客目录时出错:', error);
    return 0;
  }
}

// 生成分页文件
function generatePaginationFiles() {
  // 获取中英文文章总数
  const zhBlogDir = path.join(__dirname, '../content/docs/blog');
  const enBlogDir = path.join(__dirname, '../content/docs/en/blog');
  
  const zhTotalPosts = countBlogPosts(zhBlogDir);
  const enTotalPosts = countBlogPosts(enBlogDir);
  
  console.log(`中文版: 找到 ${zhTotalPosts} 篇博客文章`);
  console.log(`英文版: 找到 ${enTotalPosts} 篇博客文章`);
  
  // 使用两者中的最大值来计算总页数
  const maxPosts = Math.max(zhTotalPosts, enTotalPosts);
  const totalPages = Math.ceil(maxPosts / POSTS_PER_PAGE);
  
  console.log(`总计最多 ${maxPosts} 篇文章，需要生成 ${totalPages} 个分页页面`);
  
  // 清理旧的分页文件
  cleanupOldPages(ZH_PAGE_DIR);
  cleanupOldPages(EN_PAGE_DIR);
  
  // 生成中文分页页面
  generateLangPaginationFiles(ZH_PAGE_DIR, totalPages, 'zh');
  
  // 生成英文分页页面
  generateLangPaginationFiles(EN_PAGE_DIR, totalPages, 'en');
  
  console.log('所有分页页面生成完成！');
}

// 为特定语言生成分页文件
function generateLangPaginationFiles(pageDir, totalPages, lang) {
  const isEn = lang === 'en';
  
  // 生成每个分页页面（从第2页开始，第1页是index）
  for (let i = 2; i <= totalPages; i++) {
    const pageContent = isEn ? 
      // 英文版内容
      `---
title: Blog Posts - Page ${i}
description: All blog posts - Page ${i}
template: splash
head:
  - tag: script
    attrs:
      type: text/javascript
    content: |
      document.addEventListener('DOMContentLoaded', function() {
        // Find all title elements on the page
        const titleElements = document.querySelectorAll('.content-title, .page-title, h1');
        // Apply center styles to each element
        titleElements.forEach(function(el) {
          el.style.textAlign = 'center';
          el.style.width = '100%';
          el.style.display = 'block';
          // If the title is in a container, also adjust the container style
          if (el.parentElement) {
            el.parentElement.style.textAlign = 'center';
            el.parentElement.style.width = '100%';
          }
        });
      });
---

import HomePage from '../../../../components/HomePage.astro';

<HomePage pageNum={${i}} />
` :
      // 中文版内容
      `---
title: 博客文章列表 - 第${i}页
description: 所有博客文章的第${i}页
template: splash
head:
  - tag: script
    attrs:
      type: text/javascript
    content: |
      document.addEventListener('DOMContentLoaded', function() {
        // 查找页面上的所有标题元素
        const titleElements = document.querySelectorAll('.content-title, .page-title, h1');
        // 遍历并应用居中样式
        titleElements.forEach(function(el) {
          el.style.textAlign = 'center';
          el.style.width = '100%';
          el.style.display = 'block';
          // 如果标题在容器中，也调整容器样式
          if (el.parentElement) {
            el.parentElement.style.textAlign = 'center';
            el.parentElement.style.width = '100%';
          }
        });
      });
---

import HomePage from '../../../components/HomePage.astro';

<HomePage pageNum={${i}} />
`;

    const pageFilePath = path.join(pageDir, `${i}.mdx`);
    
    try {
      fs.writeFileSync(pageFilePath, pageContent);
      console.log(`生成${isEn ? '英文' : '中文'}分页页面: ${pageFilePath}`);
    } catch (error) {
      console.error(`生成页面 ${i} 时出错:`, error);
    }
  }
  
  // 生成索引页面
  generateIndexPage(pageDir, lang);
}

// 生成索引页面
function generateIndexPage(pageDir, lang) {
  const isEn = lang === 'en';
  
  const indexContent = isEn ?
    // 英文索引页
    `---
title: Blog Posts
description: All blog posts
template: splash
head:
  - tag: script
    attrs:
      type: text/javascript
    content: |
      document.addEventListener('DOMContentLoaded', function() {
        // Find all title elements on the page
        const titleElements = document.querySelectorAll('.content-title, .page-title, h1');
        // Apply center styles to each element
        titleElements.forEach(function(el) {
          el.style.textAlign = 'center';
          el.style.width = '100%';
          el.style.display = 'block';
          // If the title is in a container, also adjust the container style
          if (el.parentElement) {
            el.parentElement.style.textAlign = 'center';
            el.parentElement.style.width = '100%';
          }
        });
      });
---

import HomePage from '../../../../components/HomePage.astro';

<HomePage pageNum={1} />
` :
    // 中文索引页
    `---
title: 博客文章列表
description: 所有博客文章
template: splash
head:
  - tag: script
    attrs:
      type: text/javascript
    content: |
      document.addEventListener('DOMContentLoaded', function() {
        // 查找页面上的所有标题元素
        const titleElements = document.querySelectorAll('.content-title, .page-title, h1');
        // 遍历并应用居中样式
        titleElements.forEach(function(el) {
          el.style.textAlign = 'center';
          el.style.width = '100%';
          el.style.display = 'block';
          // 如果标题在容器中，也调整容器样式
          if (el.parentElement) {
            el.parentElement.style.textAlign = 'center';
            el.parentElement.style.width = '100%';
          }
        });
      });
---

import HomePage from '../../../components/HomePage.astro';

<HomePage pageNum={1} />
`;

  const indexFilePath = path.join(pageDir, 'index.mdx');
  
  try {
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`生成${isEn ? '英文' : '中文'}索引页面: ${indexFilePath}`);
  } catch (error) {
    console.error('生成索引页面时出错:', error);
  }
}

// 清理旧的分页文件
function cleanupOldPages(pageDir) {
  try {
    if (!fs.existsSync(pageDir)) {
      return;
    }
    const files = fs.readdirSync(pageDir);
    files.forEach(file => {
      if (file !== 'index.mdx' && file.endsWith('.mdx')) {
        const filePath = path.join(pageDir, file);
        fs.unlinkSync(filePath);
        console.log(`删除旧的分页文件: ${filePath}`);
      }
    });
  } catch (error) {
    console.error('清理旧的分页文件时出错:', error);
  }
}

// 执行生成
generatePaginationFiles(); 
