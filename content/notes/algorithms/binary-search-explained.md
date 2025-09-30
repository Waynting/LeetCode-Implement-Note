---
title: Binary Search Explained
category: algorithm
difficulty: intermediate
topics: BinarySearch, SearchAlgorithms
description: A comprehensive guide to binary search algorithm patterns and implementations
---

# Binary Search Explained

## Core Concept (What & Why)

**Intuitive Explanation**: Binary search is an efficient search algorithm that finds a target element in a **sorted** array by repeatedly dividing the search space in half.

**Problem Types Solved**: 
- Finding exact elements in sorted arrays
- Finding insertion positions
- Finding first/last occurrence of elements
- Answer domain problems (minimize/maximize under constraints)

**Applicable Conditions**: 
- Input array is sorted
- Search space has monotonic property
- Can eliminate half of search space at each step

**Time / Space Complexity Target**: O(log n) / O(1)

**Common Data Structures**: Arrays, answer ranges

## Common Solution Patterns

### Pattern A: Index Domain Binary Search
**When to use**: Finding exact elements or positions in sorted arrays

**Thought Process**: 
1. Compare middle element with target
2. If equal, return result
3. If target is smaller, search left half
4. If target is larger, search right half
5. Repeat until found or range is empty

**Complexity**: O(log n) time, O(1) space

### Pattern B: Answer Domain Binary Search
**When to use**: Problems that can be reduced to "find minimum/maximum value satisfying a condition"

**Thought Process**:
1. Define search range [low, high] for possible answers
2. Check if middle value satisfies the condition
3. Narrow search range based on result
4. Continue until optimal answer is found

**Complexity**: O(log(range) × validation_cost)

## Pseudocode (Basic Binary Search)
```text
initialize left = 0, right = array.length - 1
while left <= right:
    mid = left + (right - left) / 2
    if array[mid] == target:
        return mid
    else if array[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1  // not found
```

## Syntax Cheat-Sheet by Language

### JavaScript
```javascript
// Basic binary search template
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // not found
}
```

### C++
```cpp
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}
```

## Advanced Templates

### Lower Bound (first position >= target)
```javascript
function lowerBound(arr, target) {
    let left = 0, right = arr.length;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

### Upper Bound (first position > target)
```javascript
function upperBound(arr, target) {
    let left = 0, right = arr.length;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

## Minimal Working Example
**Input**: [1, 2, 3, 4, 5, 6, 7], target = 4
**Steps**:
1. left=0, right=6, mid=3, arr[3]=4 == target ✓
**Output**: 3

## Edge Cases & Tests
```
Case1: [] => -1 (empty array)
Case2: [1], target=1 => 0 (single element found)
Case3: [1], target=2 => -1 (single element not found)
Case4: [1,2,3], target=0 => -1 (target smaller than all)
Case5: [1,2,3], target=4 => -1 (target larger than all)
```

## Common Problems
- LeetCode:
  - [704. Binary Search](https://leetcode.com/problems/binary-search/)
  - [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)
  - [34. Find First and Last Position](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## Personal Notes
- Remember to avoid integer overflow: use `left + (right - left) / 2`
- For finding maximum: use `left + (right - left + 1) / 2` to avoid infinite loop
- Pay attention to boundary conditions: `<=` vs `<`, `length-1` vs `length`