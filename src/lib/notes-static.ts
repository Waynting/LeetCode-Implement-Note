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
    "id": "backtracking",
    "title": "Backtracking",
    "category": "algorithm",
    "topics": [
      "recursion",
      "decision tree",
      "DFS",
      "subsets",
      "permutations",
      "combinations",
      "pruning"
    ],
    "difficulty": "intermediate",
    "description": "Backtracking explores all possible choices step by step, forming a decision tree. If a choice leads to a dead end, it backs up and tries another path.",
    "contentPath": "/content/notes/algorithms/backtracking.md",
    "createdAt": "2025-10-03",
    "updatedAt": "2025-10-03"
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
