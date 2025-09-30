// 自動生成的筆記數據文件 - 請勿手動編輯
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
}

export const NOTE_CATEGORIES = {
  dataStructure: 'Data Structures',
  algorithm: 'Algorithms',
  technique: 'Problem-Solving Techniques',
  concept: 'Core Concepts'
} as const;

export const NOTES: Note[] = [
  {
    "id": "binary-search-explained",
    "title": "二分搜尋詳解",
    "category": "algorithm",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/algorithms/binary-search-explained.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "dfs-bfs-explained",
    "title": "深度優先與廣度優先搜尋",
    "category": "algorithm",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/algorithms/dfs-bfs-explained.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "dynamic-programming-intro",
    "title": "動態規劃入門指南",
    "category": "algorithm",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/algorithms/dynamic-programming-intro.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "time-complexity-analysis",
    "title": "時間複雜度分析",
    "category": "concept",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/concepts/time-complexity-analysis.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "array-basics",
    "title": "陣列基礎概念",
    "category": "dataStructure",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/data-structures/array-basics.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "hash-table-concepts",
    "title": "雜湊表核心概念",
    "category": "dataStructure",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/data-structures/hash-table-concepts.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "linked-list-intro",
    "title": "鏈結串列入門",
    "category": "dataStructure",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/data-structures/linked-list-intro.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "sliding-window-pattern",
    "title": "滑動視窗模式",
    "category": "technique",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/techniques/sliding-window-pattern.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  },
  {
    "id": "two-pointers-technique",
    "title": "雙指標技巧詳解",
    "category": "technique",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/techniques/two-pointers-technique.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-09-30"
  }
];

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
