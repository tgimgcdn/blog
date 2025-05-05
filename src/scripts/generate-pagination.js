// 自动生成分页文件的脚本
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 指定文章目录和分页文件目录
const BLOG_DIR = path.join(__dirname, '../content/docs/blog');
const PAGE_DIR = path.join(__dirname, '../content/docs/page');

// 每页显示的文章数量
const POSTS_PER_PAGE = 9;

// 确保分页目录存在
if (!fs.existsSync(PAGE_DIR)) {
  fs.mkdirSync(PAGE_DIR, { recursive: true });
}

// 读取博客文章目录，获取文章数量
function countBlogPosts() {
  try {
    // 读取博客目录中的所有文件
    const files = fs.readdirSync(BLOG_DIR);
    
    // 计算实际的博客文章数（排除非 .md 和 .mdx 文件）
    const blogPostCount = files.filter(file => 
      file.endsWith('.md') || file.endsWith('.mdx')
    ).length;
    
    console.log(`找到 ${blogPostCount} 篇博客文章`);
    return blogPostCount;
  } catch (error) {
    console.error('读取博客目录出错:', error);
    // 如果出错，至少生成两页
    return 18; // 确保至少有2页（9篇文章/页）
  }
}

// 生成分页文件
function generatePaginationFiles() {
  // 获取文章总数
  const totalPosts = countBlogPosts();
  
  // 计算总页数
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  console.log(`根据 ${totalPosts} 篇文章，需要生成 ${totalPages} 个分页页面`);
  
  // 生成每个分页页面
  for (let i = 2; i <= totalPages; i++) {
    const pageContent = `---
title: 博客文章列表 - 第${i}页
description: 所有博客文章的第${i}页
template: splash
---

import HomePage from '../../../components/HomePage.astro';

<HomePage pageNum={${i}} />
`;

    const pageFilePath = path.join(PAGE_DIR, `${i}.mdx`);
    
    try {
      fs.writeFileSync(pageFilePath, pageContent);
      console.log(`生成分页页面: ${pageFilePath}`);
    } catch (error) {
      console.error(`生成页面 ${i} 时出错:`, error);
    }
  }
  
  // 生成索引页面 (page/index.mdx) - 用于处理 /page/ 路径
  const indexContent = `---
title: 博客文章列表
description: 所有博客文章
template: splash
---

import HomePage from '../../../components/HomePage.astro';

<HomePage pageNum={1} />
`;

  const indexFilePath = path.join(PAGE_DIR, 'index.mdx');
  
  try {
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`生成索引页面: ${indexFilePath}`);
  } catch (error) {
    console.error('生成索引页面时出错:', error);
  }
  
  console.log('分页页面生成完成！');
}

// 执行生成
generatePaginationFiles(); 
