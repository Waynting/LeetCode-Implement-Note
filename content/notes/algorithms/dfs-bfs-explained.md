# 深度優先與廣度優先搜尋

## DFS（深度優先搜尋）

### 什麼是 DFS？

[描述 DFS 的概念和特點]

### DFS 模板

```javascript
// 遞迴版本
function dfs(node) {
    // 處理當前節點
    // 遞迴處理子節點
}

// 迭代版本（使用堆疊）
function dfsIterative(root) {
    const stack = [root];
    // ...
}
```

### DFS 在二元樹中的應用

```javascript
// 前序遍歷
// 中序遍歷  
// 後序遍歷
```

### DFS 在圖中的應用

## BFS（廣度優先搜尋）

### 什麼是 BFS？

[描述 BFS 的概念和特點]

### BFS 模板

```javascript
// 單源 BFS
function bfs(start) {
    const queue = [start];
    const visited = new Set();
    // ...
}

// 多源 BFS
function multiBFS(sources) {
    const queue = [...sources];
    // ...
}
```

### BFS 在二元樹中的應用

### BFS 在圖中的應用

## DFS vs BFS

| 特性 | DFS | BFS |
|------|-----|-----|
| 資料結構 | Stack | Queue |
| 空間複雜度 | O(h) | O(w) |
| 適用場景 | | |

## 常見應用

### 1. 連通性問題

### 2. 最短路徑

### 3. 拓撲排序

## 相關題目

### DFS 題目
- [200. Number of Islands]
- [695. Max Area of Island]
- [79. Word Search]

### BFS 題目
- [102. Binary Tree Level Order Traversal]
- [127. Word Ladder]
- [752. Open the Lock]