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
    "title": "Binary Search Explained",
    "category": "algorithm",
    "topics": [
      "BinarySearch",
      "SearchAlgorithms"
    ],
    "difficulty": "intermediate",
    "description": "A comprehensive guide to binary search algorithm patterns and implementations",
    "contentPath": "/content/notes/algorithms/binary-search-explained.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "dfs-bfs-explained",
    "title": "DFS & BFS Explained",
    "category": "algorithm",
    "topics": [
      "DFS",
      "BFS",
      "GraphTraversal",
      "TreeTraversal"
    ],
    "difficulty": "intermediate",
    "description": "Comprehensive guide to Depth-First Search and Breadth-First Search algorithms",
    "contentPath": "/content/notes/algorithms/dfs-bfs-explained.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "dynamic-programming-intro",
    "title": "Dynamic Programming Introduction",
    "category": "algorithm",
    "topics": [
      "DynamicProgramming",
      "Optimization"
    ],
    "difficulty": "intermediate",
    "description": "Comprehensive introduction to dynamic programming concepts and patterns",
    "contentPath": "/content/notes/algorithms/dynamic-programming-intro.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "time-complexity-analysis",
    "title": "Time Complexity Analysis",
    "category": "concept",
    "topics": [
      "TimeComplexity",
      "BigO",
      "AlgorithmAnalysis"
    ],
    "difficulty": "intermediate",
    "description": "Comprehensive guide to analyzing time and space complexity of algorithms",
    "contentPath": "/content/notes/concepts/time-complexity-analysis.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "array-basics",
    "title": "Array Fundamentals",
    "category": "dataStructure",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/data-structures/array-basics.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "hash-table-concepts",
    "title": "Hash Table Core Concepts",
    "category": "dataStructure",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/data-structures/hash-table-concepts.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "linked-list-intro",
    "title": "Linked List Introduction",
    "category": "dataStructure",
    "topics": [
      "LinkedList",
      "DataStructures"
    ],
    "difficulty": "intermediate",
    "description": "Comprehensive introduction to linked list data structure and common operations",
    "contentPath": "/content/notes/data-structures/linked-list-intro.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "sliding-window-pattern",
    "title": "Sliding Window Pattern",
    "category": "technique",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/techniques/sliding-window-pattern.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
  },
  {
    "id": "two-pointers-technique",
    "title": "Two Pointers Technique",
    "category": "technique",
    "topics": [
      "TwoPointers",
      "Arrays",
      "LinkedList",
      "SlidingWindow"
    ],
    "difficulty": "intermediate",
    "description": "Comprehensive guide to two pointers technique patterns and applications",
    "contentPath": "/content/notes/techniques/two-pointers-technique.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-02"
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
