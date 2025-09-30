#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { main: buildData } = require('./build-data.js');

const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');

// 生成特定資料夾的 index.json
function generateFolderIndex(folderPath, folderType) {
  const folderName = path.basename(folderPath);
  
  try {
    const files = fs.readdirSync(folderPath)
      .filter(file => file.endsWith('.md') && file !== 'index.md');
    
    const problems = files.map(filename => ({
      filename,
      id: null // 保持與現有格式一致
    }));
    
    const indexData = {
      topic: folderName,
      displayName: folderType === 'problems' ? 
        getTopicDisplayName(folderName) : 
        getCategoryDisplayName(folderName),
      problems,
      lastUpdated: new Date().toISOString()
    };
    
    const indexPath = path.join(folderPath, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
    console.log(`✅ Updated ${indexPath}`);
    
  } catch (error) {
    console.error(`❌ Error updating ${folderPath}/index.json:`, error);
  }
}

// 主題顯示名稱映射
function getTopicDisplayName(topicFolder) {
  const mapping = {
    'array': 'Array',
    'linkedlist': 'LinkedList', 
    'tree': 'Tree',
    'string': 'String',
    'math': 'Math',
    'hashtable': 'HashTable',
    'bfs': 'BFS',
    'dfs': 'DFS',
    'dynamicprogramming': 'DynamicProgramming',
    'greedy': 'Greedy',
    'backtracking': 'Backtracking',
    'binarysearch': 'BinarySearch',
    'twopointers': 'TwoPointers',
    'slidingwindow': 'SlidingWindow',
    'sort': 'Sort',
    'stack': 'Stack',
    'queue': 'Queue',
    'graph': 'Graph',
    'bitmanipulation': 'BitManipulation',
    'BinarySearchTree': 'BinarySearchTree'
  };
  return mapping[topicFolder] || topicFolder;
}

// 分類顯示名稱映射
function getCategoryDisplayName(categoryFolder) {
  const mapping = {
    'data-structures': 'Data Structures',
    'algorithms': 'Algorithms',
    'techniques': 'Problem-Solving Techniques',
    'concepts': 'Core Concepts'
  };
  return mapping[categoryFolder] || categoryFolder;
}

// 處理文件變更
function handleFileChange(filePath, eventType) {
  if (!filePath.endsWith('.md')) return;
  
  console.log(`📝 Detected ${eventType} in: ${filePath}`);
  
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const pathParts = relativePath.split(path.sep);
  
  if (pathParts.length >= 3) {
    const [contentType, folderName] = pathParts;
    const folderPath = path.join(CONTENT_DIR, contentType, folderName);
    
    if (fs.existsSync(folderPath)) {
      generateFolderIndex(folderPath, contentType);
      
      // 也重建全域數據
      console.log('🔄 Rebuilding global data...');
      buildData();
    }
  }
}

// 監聽文件變更
function watchContent() {
  console.log('👀 Watching content directory for changes...');
  console.log('📁 Monitoring:', CONTENT_DIR);
  
  try {
    // 監聽 problems 和 notes 目錄
    const problemsDir = path.join(CONTENT_DIR, 'problems');
    const notesDir = path.join(CONTENT_DIR, 'notes');
    
    if (fs.existsSync(problemsDir)) {
      fs.watch(problemsDir, { recursive: true }, (eventType, filename) => {
        if (filename) {
          const fullPath = path.join(problemsDir, filename);
          handleFileChange(fullPath, eventType);
        }
      });
      console.log('✅ Watching problems directory');
    }
    
    if (fs.existsSync(notesDir)) {
      fs.watch(notesDir, { recursive: true }, (eventType, filename) => {
        if (filename) {
          const fullPath = path.join(notesDir, filename);
          handleFileChange(fullPath, eventType);
        }
      });
      console.log('✅ Watching notes directory');
    }
    
    console.log('\n🚀 File watcher is running. Press Ctrl+C to stop.');
    console.log('💡 Add, modify, or delete .md files to see automatic updates.\n');
    
  } catch (error) {
    console.error('❌ Error setting up file watcher:', error);
    process.exit(1);
  }
}

// 初始化 - 先生成所有 index.json
function initializeIndexes() {
  console.log('🔧 Initializing all index.json files...');
  
  // 處理 problems 目錄
  const problemsDir = path.join(CONTENT_DIR, 'problems');
  if (fs.existsSync(problemsDir)) {
    const folders = fs.readdirSync(problemsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    folders.forEach(folder => {
      const folderPath = path.join(problemsDir, folder);
      generateFolderIndex(folderPath, 'problems');
    });
  }
  
  // 處理 notes 目錄
  const notesDir = path.join(CONTENT_DIR, 'notes');
  if (fs.existsSync(notesDir)) {
    const folders = fs.readdirSync(notesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    folders.forEach(folder => {
      const folderPath = path.join(notesDir, folder);
      generateFolderIndex(folderPath, 'notes');
    });
  }
  
  // 重建全域數據
  buildData();
}

// 主函數
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--init')) {
    initializeIndexes();
    return;
  }
  
  if (args.includes('--watch')) {
    initializeIndexes();
    watchContent();
    return;
  }
  
  console.log('Usage:');
  console.log('  node scripts/watch-content.js --init   # Initialize all index.json files');
  console.log('  node scripts/watch-content.js --watch  # Watch for changes and auto-update');
}

// 處理 Ctrl+C
process.on('SIGINT', () => {
  console.log('\n👋 File watcher stopped.');
  process.exit(0);
});

if (require.main === module) {
  main();
}