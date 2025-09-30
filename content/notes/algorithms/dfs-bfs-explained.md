---
title: DFS & BFS Explained
category: algorithm
difficulty: intermediate
topics: DFS, BFS, GraphTraversal, TreeTraversal
description: Comprehensive guide to Depth-First Search and Breadth-First Search algorithms
---

# DFS & BFS Explained

## Core Concept (What & Why)

**Intuitive Explanation**: 
- **DFS (Depth-First Search)**: Explores as far as possible along each branch before backtracking
- **BFS (Breadth-First Search)**: Explores all neighbors at the present depth before moving to nodes at the next depth

**Problem Types Solved**:
- Tree/graph traversal
- Path finding
- Connected components
- Shortest path (BFS in unweighted graphs)
- Topological sorting
- Cycle detection

**Applicable Conditions**:
- DFS: When you need to explore all paths, backtracking problems, or when memory is limited
- BFS: When you need shortest path in unweighted graphs, level-order processing

**Time / Space Complexity Target**: O(V + E) / O(V)

## Common Solution Patterns

### Pattern A: DFS (Recursive)
**When to use**: Tree traversal, backtracking, exploring all possible paths

**Thought Process**:
1. Visit current node
2. Mark as visited (if needed)
3. Recursively visit all unvisited neighbors
4. Backtrack if needed

**Complexity**: O(V + E) time, O(V) space (recursion stack)

### Pattern B: BFS (Iterative with Queue)
**When to use**: Shortest path in unweighted graphs, level-order traversal

**Thought Process**:
1. Start from source, add to queue
2. While queue is not empty:
   - Dequeue current node
   - Process current node
   - Add all unvisited neighbors to queue
3. Continue until queue is empty

**Complexity**: O(V + E) time, O(V) space (queue)

## Pseudocode

### DFS Template
```text
function dfs(node, visited):
    if node is null or visited[node]:
        return
    
    visited[node] = true
    process(node)
    
    for neighbor in node.neighbors:
        dfs(neighbor, visited)
```

### BFS Template
```text
function bfs(start):
    queue = [start]
    visited = {start}
    
    while queue is not empty:
        node = queue.dequeue()
        process(node)
        
        for neighbor in node.neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
```

## Syntax Cheat-Sheet by Language

### JavaScript
```javascript
// DFS Recursive
function dfs(node, visited = new Set()) {
    if (!node || visited.has(node)) return;
    
    visited.add(node);
    console.log(node.val); // process node
    
    for (let neighbor of node.neighbors || []) {
        dfs(neighbor, visited);
    }
}

// BFS Iterative
function bfs(start) {
    if (!start) return;
    
    const queue = [start];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node.val); // process node
        
        for (let neighbor of node.neighbors || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

### C++
```cpp
#include <vector>
#include <queue>
#include <unordered_set>

// DFS Recursive
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    // process node
    
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}

// BFS Iterative
void bfs(int start, vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        // process node
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

## Minimal Working Example

**Tree Structure**: 
```
    1
   / \
  2   3
 / \
4   5
```

**DFS Traversal**: 1 → 2 → 4 → 5 → 3
**BFS Traversal**: 1 → 2 → 3 → 4 → 5

## Edge Cases & Tests
```
Case1: Empty graph => no output
Case2: Single node => visit that node
Case3: Disconnected graph => may need multiple starts
Case4: Graph with cycles => need visited set
Case5: Tree (no cycles) => visited set optional
```

## Common Problems
- **DFS**:
  - [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)
  - [695. Max Area of Island](https://leetcode.com/problems/max-area-of-island/)
  - [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

- **BFS**:
  - [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
  - [994. Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
  - [127. Word Ladder](https://leetcode.com/problems/word-ladder/)

## Personal Notes
- **DFS**: Great for exploring all possibilities, uses less memory than BFS
- **BFS**: Guarantees shortest path in unweighted graphs, good for level-by-level processing
- Choose based on problem requirements: shortest path (BFS) vs explore all paths (DFS)