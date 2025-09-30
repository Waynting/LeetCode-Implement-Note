#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 項目根目錄
const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const OLD_TOPICS_DIR = path.join(ROOT_DIR, 'Topics');
const OLD_NOTES_DIR = path.join(ROOT_DIR, 'web', 'public', 'notes');

// 主題映射
const TOPIC_MAPPING = {
  'Array': 'array',
  'LinkedList': 'linkedlist',
  'Tree': 'tree',
  'String': 'string',
  'Math': 'math',
  'HashTable': 'hashtable',
  'BFS': 'bfs',
  'DFS': 'dfs',
  'DynamicProgramming': 'dynamicprogramming',
  'Greedy': 'greedy',
  'Backtracking': 'backtracking',
  'BinarySearch': 'binarysearch',
  'BinarySearchTree': 'tree',
  'TwoPointers': 'twopointers',
  'SlidingWindow': 'slidingwindow',
  'Sort': 'sort',
  'Stack': 'stack',
  'Queue': 'queue',
  'Graph': 'graph',
  'BitManipulation': 'bitmanipulation'
};

// 筆記分類映射
const NOTE_CATEGORY_MAPPING = {
  'data-structures': 'data-structures',
  'algorithms': 'algorithms',
  'techniques': 'techniques',
  'concepts': 'concepts'
};

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

function moveFile(sourcePath, targetPath) {
  try {
    ensureDirectoryExists(path.dirname(targetPath));
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Moved: ${sourcePath} -> ${targetPath}`);
  } catch (error) {
    console.error(`Error moving file ${sourcePath} to ${targetPath}:`, error.message);
  }
}

function migrateProblemFiles() {
  console.log('\\n🔄 Migrating problem files...');
  
  if (!fs.existsSync(OLD_TOPICS_DIR)) {
    console.log('Topics directory does not exist, skipping problem migration');
    return;
  }

  const problemsDir = path.join(CONTENT_DIR, 'problems');
  ensureDirectoryExists(problemsDir);

  // 讀取舊的 Topics 目錄
  const topicFolders = fs.readdirSync(OLD_TOPICS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const oldTopic of topicFolders) {
    const oldTopicPath = path.join(OLD_TOPICS_DIR, oldTopic);
    const newTopic = TOPIC_MAPPING[oldTopic] || oldTopic.toLowerCase();
    const newTopicPath = path.join(problemsDir, newTopic);

    ensureDirectoryExists(newTopicPath);

    // 移動 Markdown 文件
    const files = fs.readdirSync(oldTopicPath)
      .filter(file => file.endsWith('.md'));

    for (const file of files) {
      const sourcePath = path.join(oldTopicPath, file);
      const targetPath = path.join(newTopicPath, file);
      moveFile(sourcePath, targetPath);
    }

    console.log(`Migrated topic: ${oldTopic} -> ${newTopic}`);
  }
}

function migrateNoteFiles() {
  console.log('\\n📝 Migrating note files...');
  
  if (!fs.existsSync(OLD_NOTES_DIR)) {
    console.log('Notes directory does not exist, skipping note migration');
    return;
  }

  const notesDir = path.join(CONTENT_DIR, 'notes');
  ensureDirectoryExists(notesDir);

  // 讀取舊的筆記目錄
  const categoryFolders = fs.readdirSync(OLD_NOTES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const category of categoryFolders) {
    const oldCategoryPath = path.join(OLD_NOTES_DIR, category);
    const newCategoryPath = path.join(notesDir, category);

    ensureDirectoryExists(newCategoryPath);

    // 移動 Markdown 文件
    const files = fs.readdirSync(oldCategoryPath)
      .filter(file => file.endsWith('.md'));

    for (const file of files) {
      const sourcePath = path.join(oldCategoryPath, file);
      const targetPath = path.join(newCategoryPath, file);
      moveFile(sourcePath, targetPath);
    }

    console.log(`Migrated note category: ${category}`);
  }
}

function createIndexFiles() {
  console.log('\\n📋 Creating index files...');

  // 為每個題目主題創建索引文件
  const problemsDir = path.join(CONTENT_DIR, 'problems');
  if (fs.existsSync(problemsDir)) {
    const topicFolders = fs.readdirSync(problemsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const topic of topicFolders) {
      const topicPath = path.join(problemsDir, topic);
      const indexPath = path.join(topicPath, 'index.json');

      const files = fs.readdirSync(topicPath)
        .filter(file => file.endsWith('.md'));

      const index = {
        topic: topic,
        displayName: Object.keys(TOPIC_MAPPING).find(key => TOPIC_MAPPING[key] === topic) || topic,
        problems: files.map(file => ({
          filename: file,
          id: file.match(/^(\\d+)/)?.[1] || null
        })),
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
      console.log(`Created index for topic: ${topic}`);
    }
  }

  // 為每個筆記分類創建索引文件
  const notesDir = path.join(CONTENT_DIR, 'notes');
  if (fs.existsSync(notesDir)) {
    const categoryFolders = fs.readdirSync(notesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const category of categoryFolders) {
      const categoryPath = path.join(notesDir, category);
      const indexPath = path.join(categoryPath, 'index.json');

      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.md'));

      const index = {
        category: category,
        displayName: NOTE_CATEGORY_MAPPING[category] || category,
        notes: files.map(file => ({
          filename: file,
          id: path.basename(file, '.md')
        })),
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
      console.log(`Created index for category: ${category}`);
    }
  }
}

function createMetaFile() {
  console.log('\\n🗂️ Creating meta file...');

  const metaPath = path.join(CONTENT_DIR, 'meta.json');
  const meta = {
    version: '2.0.0',
    description: 'LeetCode 刷題記錄內容管理',
    structure: {
      problems: 'content/problems/{topic}/{problemId}-{title}.md',
      notes: 'content/notes/{category}/{noteId}.md'
    },
    topics: Object.values(TOPIC_MAPPING),
    noteCategories: Object.keys(NOTE_CATEGORY_MAPPING),
    lastMigration: new Date().toISOString()
  };

  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  console.log('Created meta.json');
}

function main() {
  console.log('🚀 Starting content migration...');
  
  // 確保內容目錄存在
  ensureDirectoryExists(CONTENT_DIR);
  ensureDirectoryExists(path.join(CONTENT_DIR, 'problems'));
  ensureDirectoryExists(path.join(CONTENT_DIR, 'notes'));
  ensureDirectoryExists(path.join(CONTENT_DIR, 'assets'));

  // 執行遷移
  migrateProblemFiles();
  migrateNoteFiles();
  createIndexFiles();
  createMetaFile();

  console.log('\\n✅ Content migration completed!');
  console.log('\\n📂 New structure:');
  console.log('content/');
  console.log('├── problems/     # 題目解題記錄');
  console.log('├── notes/        # 學習筆記');
  console.log('├── assets/       # 圖片等資源');
  console.log('└── meta.json     # 元數據');
  console.log('\\n🔧 Next steps:');
  console.log('1. Update import statements in web/src/lib/');
  console.log('2. Test the website functionality');
  console.log('3. Remove old directories if everything works');
}

// 執行腳本
if (require.main === module) {
  main();
}

module.exports = {
  migrateProblemFiles,
  migrateNoteFiles,
  createIndexFiles,
  createMetaFile
};