#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 項目根目錄
const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const WEB_LIB_DIR = path.join(ROOT_DIR, 'src', 'lib');

// 主題映射
const TOPIC_MAPPING = {
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
  'bitmanipulation': 'BitManipulation'
};

// Note category mapping
const NOTE_CATEGORY_MAPPING = {
  'data-structures': 'Data Structures',
  'algorithms': 'Algorithms',
  'techniques': 'Problem-Solving Techniques',
  'concepts': 'Core Concepts'
};

// 讀取 Markdown 文件內容
function readMarkdownFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// 解析 Markdown 前言 (frontmatter)
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const [, frontmatter, body] = match;
    try {
      const metadata = {};
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim();
          metadata[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
      });
      return { metadata, body };
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
    }
  }
  
  return { metadata: {}, body: content };
}

// 獲取文件的 Git 創建日期
function getGitCreationDate(filePath) {
  try {
    const { execSync } = require('child_process');
    const gitDate = execSync(
      `git log --diff-filter=A --format="%ai" -- "${filePath}" | head -1`,
      { encoding: 'utf-8', cwd: ROOT_DIR }
    ).trim();

    if (gitDate) {
      // 將 Git 日期格式轉換為 YYYY-MM-DD
      return gitDate.split(' ')[0];
    }
  } catch (error) {
    // 如果 Git 命令失敗，回退到文件修改時間
  }

  // 回退方案：使用文件修改時間
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString().split('T')[0];
}

// 從文件內容提取題目資訊
function extractProblemInfo(content, filePath, topicFolder) {
  const { metadata, body } = parseFrontmatter(content);

  // 從文件名提取題號
  const fileName = path.basename(filePath, '.md');
  const idMatch = fileName.match(/^(\d+)/);
  if (!idMatch) return null;

  const originalId = parseInt(idMatch[1]);

  // 提取標題
  const titleMatch = body.match(/^# (.+)$/m);
  const title = metadata.title || titleMatch?.[1] || fileName;

  // 提取來源
  const sourceMatch = body.match(/- \*\*Source\*\*: (.+)$/m);
  const source = metadata.source || sourceMatch?.[1] || 'LeetCode';

  // 生成複合唯一ID (source-originalId)
  const uniqueId = `${source.toLowerCase()}-${originalId}`;

  // 提取描述（第一段內容）
  const descriptionMatch = body.match(/## Problem Description\s*\n\n([^\n]+)/) || body.match(/## 題目描述\s*\n\n([^\n]+)/);
  const description = metadata.description || descriptionMatch?.[1] || '暫無描述';

  // 獲取文件創建日期（優先使用 Git，其次使用 metadata）
  const createdAt = metadata.createdAt || getGitCreationDate(filePath);

  return {
    id: uniqueId,
    originalId,
    title,
    difficulty: metadata.difficulty || 'Medium',
    source,
    topics: metadata.topics ? metadata.topics.split(',').map(t => t.trim()) : [TOPIC_MAPPING[topicFolder]],
    description,
    hasNote: true,
    noteUrl: `/content/problems/${topicFolder}/${fileName}.md`,
    filePath,
    markdownContent: body,  // 使用已去除 frontmatter 的 body
    createdAt  // 添加創建日期
  };
}

// 從文件內容提取筆記資訊
function extractNoteInfo(content, filePath, categoryFolder) {
  const { metadata, body } = parseFrontmatter(content);
  
  const fileName = path.basename(filePath, '.md');
  
  // 提取標題
  const titleMatch = body.match(/^# (.+)$/m);
  const title = metadata.title || titleMatch?.[1] || fileName;
  
  // 提取描述
  const descriptionMatch = body.match(/## 概述\s*\n\n([^\n]+)/);
  const description = metadata.description || descriptionMatch?.[1] || '暫無描述';
  
  return {
    id: fileName,
    title,
    category: categoryFolder,
    topics: metadata.topics ? metadata.topics.split(',').map(t => t.trim()) : [],
    difficulty: metadata.difficulty || 'intermediate',
    description,
    contentPath: `/content/notes/${categoryFolder}/${fileName}.md`,
    createdAt: metadata.createdAt || '2024-01-01',
    updatedAt: metadata.updatedAt || new Date().toISOString().split('T')[0],
    filePath,
    markdownContent: body  // 使用已去除 frontmatter 的 body
  };
}

// 生成題目數據
function buildProblemsData() {
  console.log('🔄 Building problems data...');
  const problems = [];
  const problemsDir = path.join(CONTENT_DIR, 'problems');
  
  if (!fs.existsSync(problemsDir)) {
    console.warn('Problems directory does not exist:', problemsDir);
    return [];
  }
  
  try {
    const topicFolders = fs.readdirSync(problemsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const topicFolder of topicFolders) {
      const topicPath = path.join(problemsDir, topicFolder);
      const files = fs.readdirSync(topicPath)
        .filter(file => file.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(topicPath, file);
        const content = readMarkdownFile(filePath);
        
        if (content) {
          const problem = extractProblemInfo(content, filePath, topicFolder);
          if (problem) {
            problems.push(problem);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading problems:', error);
  }
  
  return problems.sort((a, b) => {
    // Sort by source first, then by original ID
    if (a.source !== b.source) {
      return a.source.localeCompare(b.source);
    }
    return a.originalId - b.originalId;
  });
}

// 生成筆記數據
function buildNotesData() {
  console.log('📝 Building notes data...');
  const notes = [];
  const notesDir = path.join(CONTENT_DIR, 'notes');
  
  if (!fs.existsSync(notesDir)) {
    console.warn('Notes directory does not exist:', notesDir);
    return [];
  }
  
  try {
    const categoryFolders = fs.readdirSync(notesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const categoryFolder of categoryFolders) {
      const categoryPath = path.join(notesDir, categoryFolder);
      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(categoryPath, file);
        const content = readMarkdownFile(filePath);
        
        if (content) {
          const note = extractNoteInfo(content, filePath, categoryFolder);
          if (note) {
            notes.push(note);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading notes:', error);
  }
  
  return notes;
}

// 生成統計函數
function generateStats(problems) {
  // 主題統計
  const topicCount = {};
  problems.forEach(problem => {
    problem.topics.forEach(topic => {
      topicCount[topic] = (topicCount[topic] || 0) + 1;
    });
  });
  
  const topicStats = Object.entries(topicCount).map(([topic, count]) => ({
    topic,
    count
  }));
  
  // 難度統計
  const difficultyStats = {
    Easy: 0,
    Medium: 0,
    Hard: 0
  };
  
  problems.forEach(problem => {
    difficultyStats[problem.difficulty]++;
  });
  
  return { topicStats, difficultyStats };
}

// 主函數
function main() {
  console.log('🚀 Building static data files...');
  
  // 確保目標目錄存在
  if (!fs.existsSync(WEB_LIB_DIR)) {
    fs.mkdirSync(WEB_LIB_DIR, { recursive: true });
  }
  
  // 生成題目數據
  const problems = buildProblemsData();
  const { topicStats, difficultyStats } = generateStats(problems);
  
  // 生成筆記數據
  const notes = buildNotesData();
  
  // 生成所有主題列表
  const allTopics = Object.values(TOPIC_MAPPING);
  
  // 生成來源列表
  const allSources = ['LeetCode', 'Codeforces', 'Atcoder', 'CSES', 'Zerojudge', 'Other'];
  
  // 寫入 problems-static.ts
  const problemsCode = `// 自動生成的題目數據文件 - 請勿手動編輯
export interface Problem {
  id: string;  // 複合唯一ID (source-originalId)
  originalId: number;  // 原始題目ID
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  source: 'LeetCode' | 'Codeforces' | 'Atcoder' | 'CSES' | 'Zerojudge' | 'Other';
  topics: string[];
  hasNote: boolean;
  noteUrl?: string;
  description?: string;
  filePath?: string;
  markdownContent?: string;
  createdAt: string;  // 創建日期 (YYYY-MM-DD)
}

export const PROBLEMS: Problem[] = ${JSON.stringify(problems, null, 2)};

export const TOPICS = ${JSON.stringify(allTopics, null, 2)};

export const SOURCES = ${JSON.stringify(allSources, null, 2)};

export const getTopicStats = () => ${JSON.stringify(topicStats, null, 2)};

export const getDifficultyStats = () => (${JSON.stringify(difficultyStats, null, 2)});

export const getAllProblems = () => PROBLEMS;
export const getAllTopics = () => TOPICS;
export const getAllSources = () => SOURCES;
export const getProblemById = (id: string) => PROBLEMS.find(p => p.id === id);
export const getProblemByOriginalId = (originalId: number, source: string) => PROBLEMS.find(p => p.originalId === originalId && p.source.toLowerCase() === source.toLowerCase());
export const getProblemsByTopic = (topic: string) => 
  PROBLEMS.filter(p => p.topics.some(t => t.toLowerCase() === topic.toLowerCase()));
export const getProblemsBySource = (source: string) =>
  PROBLEMS.filter(p => p.source.toLowerCase() === source.toLowerCase());
`;

  fs.writeFileSync(path.join(WEB_LIB_DIR, 'problems-static.ts'), problemsCode);
  console.log('✅ Generated problems-static.ts');
  
  // Generate category mapping
  const categoryMapping = {
    'data-structures': 'dataStructure',
    'algorithms': 'algorithm', 
    'techniques': 'technique',
    'concepts': 'concept'
  };
  
  const reverseCategoryMapping = {
    'dataStructure': 'data-structures',
    'algorithm': 'algorithms',
    'technique': 'techniques', 
    'concept': 'concepts'
  };
  
  // 轉換筆記格式
  const convertedNotes = notes.map(note => ({
    id: note.id,
    title: note.title,
    category: categoryMapping[note.category] || 'concept',
    topics: note.topics,
    difficulty: note.difficulty,
    description: note.description,
    contentPath: note.contentPath,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    markdownContent: note.markdownContent
  }));
  
  // 寫入 notes-static.ts
  const notesCode = `// 自動生成的筆記數據文件 - 請勿手動編輯
export interface Note {
  id: string;
  title: string;
  category: 'dataStructure' | 'algorithm' | 'technique' | 'concept';
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  contentPath: string;
  createdAt: string;
  updatedAt: string;
  markdownContent?: string;
}

export const NOTE_CATEGORIES = {
  dataStructure: 'Data Structures',
  algorithm: 'Algorithms',
  technique: 'Problem-Solving Techniques',
  concept: 'Core Concepts'
} as const;

export const NOTES: Note[] = ${JSON.stringify(convertedNotes, null, 2)};

export function getNotesByCategory(category: keyof typeof NOTE_CATEGORIES): Note[] {
  return NOTES.filter(note => note.category === category);
}

export function getNotesByTopic(topic: string): Note[] {
  return NOTES.filter(note => 
    note.topics.some(t => t.toLowerCase() === topic.toLowerCase())
  );
}

export function getNoteById(id: string): Note | undefined {
  return NOTES.find(note => note.id === id);
}
`;

  fs.writeFileSync(path.join(WEB_LIB_DIR, 'notes-static.ts'), notesCode);
  console.log('✅ Generated notes-static.ts');
  
  console.log('\n📊 Statistics:');
  console.log(`- ${problems.length} problems processed`);
  console.log(`- ${notes.length} notes processed`);
  console.log(`- ${topicStats.length} topics found`);
  console.log(`- Difficulty distribution: Easy=${difficultyStats.Easy}, Medium=${difficultyStats.Medium}, Hard=${difficultyStats.Hard}`);
  
  console.log('\n✅ Static data files generated successfully!');
  console.log('\n🔧 Next steps:');
  console.log('1. Update import statements to use problems-static.ts and notes-static.ts');
  console.log('2. Remove old content.ts, problems-new.ts, notes-new.ts files');
  console.log('3. Test the website functionality');
}

// 執行腳本
if (require.main === module) {
  main();
}

module.exports = { main };