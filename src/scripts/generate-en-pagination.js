// Script to automatically generate pagination files for English version
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify pagination file directory for English
const PAGE_DIR = path.join(__dirname, '../content/docs/en/page');

// Articles per page
const POSTS_PER_PAGE = 9;

// Ensure pagination directory exists
if (!fs.existsSync(PAGE_DIR)) {
  fs.mkdirSync(PAGE_DIR, { recursive: true });
}

// Count blog posts
function countBlogPosts() {
  const blogDir = path.join(__dirname, '../content/docs/en/blog');
  if (!fs.existsSync(blogDir)) {
    console.log('Blog directory does not exist');
    return 0;
  }
  
  let totalPosts = 0;
  
  // Recursively traverse directory
  function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // If it's a directory, traverse recursively
        traverseDirectory(fullPath);
      } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
        // If it's a .md or .mdx file, increment count
        totalPosts++;
      }
    }
  }
  
  try {
    traverseDirectory(blogDir);
    console.log(`Found ${totalPosts} blog posts`);
    return totalPosts;
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return 0;
  }
}

// Generate pagination files
function generatePaginationFiles() {
  // Get total number of articles
  const totalPosts = countBlogPosts();
  
  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  console.log(`Based on ${totalPosts} articles, need to generate ${totalPages} pagination pages`);
  
  // Generate each pagination page
  for (let i = 2; i <= totalPages; i++) {
    const pageContent = `---
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
`;

    const pageFilePath = path.join(PAGE_DIR, `${i}.mdx`);
    
    try {
      fs.writeFileSync(pageFilePath, pageContent);
      console.log(`Generated pagination page: ${pageFilePath}`);
    } catch (error) {
      console.error(`Error generating page ${i}:`, error);
    }
  }
  
  // Generate index page
  generateIndexPage();
  
  console.log('Pagination pages generated!');
}

// Generate index page
function generateIndexPage() {
  const indexContent = `---
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
`;

  const indexFilePath = path.join(PAGE_DIR, 'index.mdx');
  
  try {
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`Generated index page: ${indexFilePath}`);
  } catch (error) {
    console.error('Error generating index page:', error);
  }
}

// Clean up old pagination files
function cleanupOldPages() {
  try {
    const files = fs.readdirSync(PAGE_DIR);
    files.forEach(file => {
      if (file !== 'index.mdx' && file.endsWith('.mdx')) {
        const filePath = path.join(PAGE_DIR, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted old pagination file: ${filePath}`);
      }
    });
  } catch (error) {
    console.error('Error cleaning up old pagination files:', error);
  }
}

// Execute generation
cleanupOldPages(); // First clean up old files
generatePaginationFiles(); // Then generate new files 
