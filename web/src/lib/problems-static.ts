// 自動生成的題目數據文件 - 請勿手動編輯
export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  hasNote: boolean;
  noteUrl?: string;
  description?: string;
  filePath?: string;
}

export const PROBLEMS: Problem[] = [
  {
    "id": 2,
    "title": "2. Add Two Numbers",
    "difficulty": "Medium",
    "topics": [
      "LinkedList"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0002-add-two-numbers.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/linkedlist/0002-add-two-numbers.md"
  },
  {
    "id": 4,
    "title": "4. Median of Two Sorted Arrays",
    "difficulty": "Medium",
    "topics": [
      "Array"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/array/0004-median-of-two-sorted-arrays.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/array/0004-median-of-two-sorted-arrays.md"
  },
  {
    "id": 5,
    "title": "5. Longest Palindromic Substring",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/string/0005-longest-palindromic-substring.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/string/0005-longest-palindromic-substring.md"
  },
  {
    "id": 12,
    "title": "12. Integer to Roman",
    "difficulty": "Medium",
    "topics": [
      "Math"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0012-integer-to-roman.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/math/0012-integer-to-roman.md"
  },
  {
    "id": 13,
    "title": "13. Roman to Integer",
    "difficulty": "Medium",
    "topics": [
      "Math"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0013-roman-to-integer.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/math/0013-roman-to-integer.md"
  },
  {
    "id": 141,
    "title": "141. Linked List Cycle",
    "difficulty": "Medium",
    "topics": [
      "LinkedList"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0141-linked-list-cycle.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/linkedlist/0141-linked-list-cycle.md"
  },
  {
    "id": 383,
    "title": "383. Ransom Note",
    "difficulty": "Medium",
    "topics": [
      "HashTable"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/hashtable/0383-ransom-note.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/hashtable/0383-ransom-note.md"
  },
  {
    "id": 543,
    "title": "543. Diameter of Binary Tree",
    "difficulty": "Medium",
    "topics": [
      "Tree"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/tree/0543-diameter-of-binary-tree.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/tree/0543-diameter-of-binary-tree.md"
  }
];

export const TOPICS = [
  "Array",
  "LinkedList",
  "Tree",
  "String",
  "Math",
  "HashTable",
  "BFS",
  "DFS",
  "DynamicProgramming",
  "Greedy",
  "Backtracking",
  "BinarySearch",
  "TwoPointers",
  "SlidingWindow",
  "Sort",
  "Stack",
  "Queue",
  "Graph",
  "BitManipulation"
];

export const getTopicStats = () => [
  {
    "topic": "LinkedList",
    "count": 2
  },
  {
    "topic": "Array",
    "count": 1
  },
  {
    "topic": "String",
    "count": 1
  },
  {
    "topic": "Math",
    "count": 2
  },
  {
    "topic": "HashTable",
    "count": 1
  },
  {
    "topic": "Tree",
    "count": 1
  }
];

export const getDifficultyStats = () => ({
  "Easy": 0,
  "Medium": 8,
  "Hard": 0
});

export const getAllProblems = () => PROBLEMS;
export const getAllTopics = () => TOPICS;
export const getProblemById = (id: number) => PROBLEMS.find(p => p.id === id);
export const getProblemsByTopic = (topic: string) => 
  PROBLEMS.filter(p => p.topics.some(t => t.toLowerCase() === topic.toLowerCase()));
