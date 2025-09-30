---
title: Time Complexity Analysis
category: concept
difficulty: intermediate
topics: TimeComplexity, BigO, AlgorithmAnalysis
description: Comprehensive guide to analyzing time and space complexity of algorithms
---

# Time Complexity Analysis

## Core Concept (What & Why)

**Intuitive Explanation**: Time complexity is a computational concept that describes the amount of time an algorithm takes to run as a function of the length of its input.

**Problem Types Solved**:
- Algorithm performance comparison
- Scalability prediction
- Resource planning
- Optimization decisions

**Applicable Conditions**:
- When comparing different algorithmic approaches
- When optimizing for performance
- When dealing with large datasets
- When system resources are limited

**Time / Space Complexity Target**: Understanding O(1) to O(2^n) complexities

## Big O Notation

### Definition
Big O notation describes the upper bound of an algorithm's running time, focusing on the worst-case scenario as input size approaches infinity.

### Calculation Rules
1. **Ignore Constants**: O(2n) → O(n)
2. **Drop Lower-Order Terms**: O(n² + n) → O(n²)
3. **Take Highest Order**: Focus on the term that grows fastest

## Common Time Complexities

### O(1) - Constant Time
**When**: Array access, hash table lookup, arithmetic operations

```javascript
// Example: Array access
function getFirstElement(arr) {
    return arr[0]; // Always takes same time regardless of array size
}

// Example: Hash table lookup
function getValue(map, key) {
    return map.get(key); // O(1) average case
}
```

### O(log n) - Logarithmic Time
**When**: Binary search, balanced tree operations

```javascript
// Example: Binary search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}
```

### O(n) - Linear Time
**When**: Single loop through data, linear search

```javascript
// Example: Linear search
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

// Example: Finding sum
function sum(arr) {
    let total = 0;
    for (let num of arr) {
        total += num; // Visit each element once
    }
    return total;
}
```

### O(n log n) - Linearithmic Time
**When**: Efficient sorting algorithms, divide-and-conquer

```javascript
// Example: Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));    // O(log n) levels
    const right = mergeSort(arr.slice(mid));      // O(log n) levels
    
    return merge(left, right);                    // O(n) work per level
}
```

### O(n²) - Quadratic Time
**When**: Nested loops, bubble sort, selection sort

```javascript
// Example: Nested loops
function findPairs(arr) {
    const pairs = [];
    for (let i = 0; i < arr.length; i++) {       // O(n)
        for (let j = i + 1; j < arr.length; j++) { // O(n)
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs;
}

// Example: Bubble sort
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

### O(2^n) - Exponential Time
**When**: Recursive algorithms with multiple branches, brute force

```javascript
// Example: Naive Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2); // Two recursive calls
}

// Example: Generate all subsets
function generateSubsets(arr) {
    if (arr.length === 0) return [[]];
    
    const first = arr[0];
    const rest = arr.slice(1);
    const subsetsWithoutFirst = generateSubsets(rest);
    const subsetsWithFirst = subsetsWithoutFirst.map(subset => [first, ...subset]);
    
    return [...subsetsWithoutFirst, ...subsetsWithFirst];
}
```

## Complexity Comparison

| Complexity | n=10 | n=100 | n=1,000 | n=10,000 |
|------------|------|-------|---------|----------|
| O(1)       | 1    | 1     | 1       | 1        |
| O(log n)   | 3    | 7     | 10      | 13       |
| O(n)       | 10   | 100   | 1,000   | 10,000   |
| O(n log n) | 30   | 700   | 10,000  | 130,000  |
| O(n²)      | 100  | 10,000| 1,000,000| 100,000,000|
| O(2^n)     | 1,024| 2^100 | 2^1000  | 2^10000  |

## Space Complexity

### Definition
Space complexity measures the total amount of memory space an algorithm uses relative to the input size.

### Common Space Complexities

**O(1) - Constant Space**:
```javascript
// In-place array reversal
function reverseInPlace(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
```

**O(n) - Linear Space**:
```javascript
// Creating a copy
function reverseArray(arr) {
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result; // New array of size n
}
```

## Analysis Techniques

### 1. Loop Analysis
- Single loop: O(n)
- Nested loops: O(n²), O(n³), etc.
- Sequential loops: Add complexities

### 2. Recursive Analysis
- Identify recurrence relation
- Count number of recursive calls
- Analyze work done per call

### 3. Master Theorem
For recurrences of the form: T(n) = aT(n/b) + f(n)
- If f(n) = O(n^c) where c < log_b(a), then T(n) = O(n^log_b(a))
- If f(n) = O(n^c) where c = log_b(a), then T(n) = O(n^c log n)
- If f(n) = O(n^c) where c > log_b(a), then T(n) = O(f(n))

## Practical Tips

### Algorithm Selection
- **Small datasets**: Simple algorithms often work fine
- **Large datasets**: Complexity matters significantly
- **Real-time systems**: Prefer consistent performance (avoid worst-case scenarios)

### Optimization Strategies
1. **Choose better algorithms**: O(n log n) vs O(n²)
2. **Use appropriate data structures**: Hash tables for O(1) lookup
3. **Avoid unnecessary work**: Early termination, memoization
4. **Consider trade-offs**: Time vs space complexity

## Common Problems
- [704. Binary Search](https://leetcode.com/problems/binary-search/) - O(log n)
- [1. Two Sum](https://leetcode.com/problems/two-sum/) - O(n) with hash table
- [15. 3Sum](https://leetcode.com/problems/3sum/) - O(n²) with two pointers

## Personal Notes
- **Always consider worst-case**: Big O focuses on upper bounds
- **Constants matter in practice**: O(n) can be slower than O(n²) for small n
- **Measure real performance**: Theory guides, but measurement confirms
- **Consider amortized complexity**: Some operations average out over time