export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  hasNote: boolean;
  noteUrl?: string;
  description?: string;
}

export const TOPICS = [
  'Array',
  'String', 
  'HashTable',
  'TwoPointers',
  'SlidingWindow',
  'Tree',
  'BinarySearchTree',
  'Graph',
  'DFS',
  'BFS',
  'DynamicProgramming',
  'Greedy',
  'Backtracking',
  'Stack',
  'Queue',
  'LinkedList',
  'Math',
  'BitManipulation',
  'Sort',
  'BinarySearch'
] as const;

export const PROBLEMS: Problem[] = [
  {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    topics: ['LinkedList', 'Math'],
    hasNote: true,
    noteUrl: '/Topics/LinkedList/0002-add-two-numbers.md',
    description: 'Add two numbers represented as linked lists.'
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topics: ['Array', 'BinarySearch'],
    hasNote: true,
    noteUrl: '/Topics/Array/0004-median-of-two-sorted-arrays.md',
    description: 'Find the median of two sorted arrays.'
  },
  {
    id: 5,
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    topics: ['String', 'DynamicProgramming'],
    hasNote: true,
    noteUrl: '/Topics/String/0005-longest-palindromic-substring.md',
    description: 'Find the longest palindromic substring.'
  },
  {
    id: 12,
    title: 'Integer to Roman',
    difficulty: 'Medium',
    topics: ['Math', 'String'],
    hasNote: true,
    noteUrl: '/Topics/Math/0012-integer-to-roman.md',
    description: 'Convert an integer to a roman numeral.'
  },
  {
    id: 13,
    title: 'Roman to Integer',
    difficulty: 'Easy',
    topics: ['Math', 'String'],
    hasNote: true,
    noteUrl: '/Topics/Math/0013-roman-to-integer.md',
    description: 'Convert a roman numeral to an integer.'
  },
  {
    id: 141,
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    topics: ['LinkedList', 'TwoPointers'],
    hasNote: true,
    noteUrl: '/Topics/LinkedList/0141-linked-list-cycle.md',
    description: 'Detect if a linked list has a cycle.'
  },
  {
    id: 383,
    title: 'Ransom Note',
    difficulty: 'Easy',
    topics: ['HashTable', 'String'],
    hasNote: true,
    noteUrl: '/Topics/HashTable/0383-ransom-note.md',
    description: 'Determine if a ransom note can be constructed from a magazine.'
  },
  {
    id: 543,
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    topics: ['Tree', 'DFS'],
    hasNote: true,
    noteUrl: '/Topics/Tree/0543-diameter-of-binary-tree.md',
    description: 'Find the diameter of a binary tree.'
  }
];

export const getTopicStats = () => {
  const stats = new Map<string, number>();
  
  PROBLEMS.forEach(problem => {
    problem.topics.forEach(topic => {
      stats.set(topic, (stats.get(topic) || 0) + 1);
    });
  });
  
  return Array.from(stats.entries()).map(([topic, count]) => ({
    topic,
    count,
    completion: '100%'
  }));
};

export const getDifficultyStats = () => {
  const stats = { Easy: 0, Medium: 0, Hard: 0 };
  
  PROBLEMS.forEach(problem => {
    stats[problem.difficulty]++;
  });
  
  return stats;
};