# 鏈結串列入門

## 什麼是鏈結串列？

[描述鏈結串列的基本概念]

## 鏈結串列的類型

### 1. 單向鏈結串列

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}
```

### 2. 雙向鏈結串列

```javascript
class DoublyListNode {
    constructor(val = 0, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}
```

## 基本操作

### 1. 插入節點

### 2. 刪除節點

### 3. 反轉鏈表

### 4. 合併鏈表

## 常見技巧

### 1. 虛擬頭節點（Dummy Node）

### 2. 快慢指標

### 3. 遞迴處理

## 時間複雜度分析

## 鏈表 vs 陣列

## 相關題目

- [206. Reverse Linked List]
- [21. Merge Two Sorted Lists]
- [141. Linked List Cycle]
- [19. Remove Nth Node From End of List]