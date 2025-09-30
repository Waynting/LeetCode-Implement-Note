---
title: Linked List Introduction
category: dataStructure
difficulty: intermediate
topics: LinkedList, DataStructures
description: Comprehensive introduction to linked list data structure and common operations
---

# Linked List Introduction

## Core Concept (What & Why)

**Intuitive Explanation**: A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference (or link) to the next node in the sequence.

**Problem Types Solved**:
- Dynamic memory allocation
- Insertion/deletion at arbitrary positions
- Implementing other data structures (stacks, queues)
- Problems requiring pointer manipulation

**Applicable Conditions**:
- Frequent insertions/deletions
- Unknown or changing size
- Memory is not contiguous
- Don't need random access

**Time / Space Complexity**:
- Access: O(n) / Insert: O(1) / Delete: O(1) / Search: O(n)
- Space: O(n)

## Common Node Definitions

### Singly Linked List
```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}
```

### Doubly Linked List
```javascript
class DoublyListNode {
    constructor(val = 0, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}
```

### C++ Definitions
```cpp
// Singly Linked List
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

// Doubly Linked List
struct DoublyListNode {
    int val;
    DoublyListNode *next;
    DoublyListNode *prev;
    DoublyListNode(int x) : val(x), next(nullptr), prev(nullptr) {}
};
```

## Common Operations

### 1. Insertion
```javascript
// Insert at beginning
function insertAtHead(head, val) {
    const newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}

// Insert at position
function insertAtPosition(head, val, pos) {
    if (pos === 0) return insertAtHead(head, val);
    
    let current = head;
    for (let i = 0; i < pos - 1 && current; i++) {
        current = current.next;
    }
    
    if (current) {
        const newNode = new ListNode(val);
        newNode.next = current.next;
        current.next = newNode;
    }
    
    return head;
}
```

### 2. Deletion
```javascript
// Delete by value
function deleteByValue(head, val) {
    if (!head) return null;
    if (head.val === val) return head.next;
    
    let current = head;
    while (current.next && current.next.val !== val) {
        current = current.next;
    }
    
    if (current.next) {
        current.next = current.next.next;
    }
    
    return head;
}
```

### 3. Reversal
```javascript
// Iterative reversal
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

// Recursive reversal
function reverseListRecursive(head) {
    if (!head || !head.next) return head;
    
    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}
```

## Common Techniques

### 1. Dummy Head Node
**Purpose**: Simplifies edge cases when head might change

```javascript
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next; // Skip dummy head
}
```

### 2. Two Pointers (Fast & Slow)
**Purpose**: Detect cycles, find middle, etc.

```javascript
// Floyd's Cycle Detection
function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}

// Find middle node
function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}
```

### 3. Stack for Problems
**Purpose**: When you need to process nodes in reverse order

```javascript
// Check if linked list is palindrome
function isPalindrome(head) {
    const stack = [];
    let current = head;
    
    // Push all values to stack
    while (current) {
        stack.push(current.val);
        current = current.next;
    }
    
    // Compare with original order
    current = head;
    while (current) {
        if (current.val !== stack.pop()) return false;
        current = current.next;
    }
    
    return true;
}
```

## Linked List vs Array Comparison

| Operation | Linked List | Array |
|-----------|-------------|-------|
| Access | O(n) | O(1) |
| Insert at beginning | O(1) | O(n) |
| Insert at end | O(n) | O(1) amortized |
| Insert at position | O(n) | O(n) |
| Delete | O(1) if node known | O(n) |
| Search | O(n) | O(n) |
| Memory | Non-contiguous | Contiguous |
| Cache locality | Poor | Good |

## Edge Cases & Tests
```
Case1: Empty list => handle null
Case2: Single node => no next pointer
Case3: Two nodes => test basic operations
Case4: Cycle detection => infinite loop prevention
Case5: Very long list => performance considerations
```

## Common Problems by Difficulty

### Easy
- [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [83. Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

### Medium
- [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
- [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [143. Reorder List](https://leetcode.com/problems/reorder-list/)

### Hard
- [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)
- [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

## Personal Notes
- **Dummy nodes** are your friends for head manipulation problems
- **Draw diagrams** for complex pointer manipulations
- **Two pointers** solve many linked list problems efficiently
- **Practice pointer arithmetic** - it's the core skill for linked lists