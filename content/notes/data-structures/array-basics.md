# Array Fundamentals

## Core Concept (What & Why)

**Intuitive Explanation**: An array is one of the most fundamental data structures - a linear collection that stores elements of the same type in contiguous memory locations, accessible by index.

**Problem Types Solved**:
- Random access to elements by position
- Sequential data processing
- Implementation base for other data structures
- Cache-friendly iteration patterns

**Applicable Conditions**:
- When you need O(1) random access by index
- When memory locality is important for performance
- When the size is known or bounded
- When implementing stacks, queues, or other structures

**Time / Space Complexity Target**: Access O(1), Search O(n) / Space O(n)

## Array Properties

- **Fixed Size**: In most languages, array size is determined at creation time
- **Contiguous Memory**: Elements are stored sequentially in memory
- **Random Access**: Any element can be accessed in O(1) time via index
- **Homogeneous**: All elements must be of the same data type

## Time Complexity Analysis

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access `arr[i]` | O(1) | Direct index access |
| Search element | O(n) | May need to traverse entire array |
| Insert at end | O(1) | Dynamic arrays (amortized) |
| Insert at middle | O(n) | Need to shift subsequent elements |
| Delete from end | O(1) | Direct removal |
| Delete from middle | O(n) | Need to shift subsequent elements |

## JavaScript Implementation Examples

```javascript
// Array creation
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(10); // Create array with length 10

// Element access
console.log(arr[0]); // 1
console.log(arr[arr.length - 1]); // 5 (last element)

// Element modification
arr[2] = 10;

// Adding elements
arr.push(6);       // Add at end, O(1)
arr.unshift(0);    // Add at beginning, O(n)
arr.splice(2, 0, 100); // Insert 100 at index 2, O(n)

// Removing elements
arr.pop();         // Remove last element, O(1)
arr.shift();       // Remove first element, O(n)
arr.splice(2, 1);  // Remove element at index 2, O(n)

// Array iteration
// Method 1: Traditional for loop
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// Method 2: for...of
for (const element of arr) {
    console.log(element);
}

// Method 3: forEach
arr.forEach((element, index) => {
    console.log(index, element);
});

// Common array methods
const doubled = arr.map(x => x * 2);         // Transform
const evens = arr.filter(x => x % 2 === 0);  // Filter
const sum = arr.reduce((a, b) => a + b, 0);  // Accumulate
const found = arr.find(x => x > 3);          // Find first match
const index = arr.indexOf(5);                // Find index
```

## C++ Implementation Examples

```cpp
#include <vector>
#include <array>
using namespace std;

// Static arrays
int arr[5] = {1, 2, 3, 4, 5};
array<int, 5> stlArr = {1, 2, 3, 4, 5};

// Dynamic array (vector)
vector<int> vec = {1, 2, 3, 4, 5};

// Element access
int first = vec[0];
int last = vec.back();

// Adding elements
vec.push_back(6);              // O(1) amortized
vec.insert(vec.begin() + 2, 100); // O(n)

// Removing elements
vec.pop_back();                // O(1)
vec.erase(vec.begin() + 2);    // O(n)

// Iteration
for (int i = 0; i < vec.size(); i++) {
    cout << vec[i] << " ";
}

for (int x : vec) {
    cout << x << " ";
}
```

## Common Patterns & Techniques

### 1. Two Pointers Traversal
```javascript
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        else if (sum < target) left++;
        else right--;
    }
    return [];
}
```

### 2. Sliding Window
```javascript
function maxSubarraySum(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    
    // Initialize window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

### 3. Prefix Sum
```javascript
function rangeSum(arr) {
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0);
    
    // Build prefix sum
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    
    // Query range [left, right] sum
    function query(left, right) {
        return prefix[right + 1] - prefix[left];
    }
    
    return { query };
}
```

## Arrays vs Other Data Structures

| Feature | Array | Linked List | Dynamic Array (Vector) |
|---------|-------|-------------|----------------------|
| Random Access | O(1) | O(n) | O(1) |
| Insert/Delete (Head) | O(n) | O(1) | O(n) |
| Insert/Delete (Tail) | O(1) | O(n) | O(1) |
| Memory Contiguous | Yes | No | Yes |
| Memory Overhead | Low | High (pointers) | Medium |
| Cache Friendly | Yes | No | Yes |

## Common Use Cases

1. **Storing Ordered Data**: Student grades, product lists, etc.
2. **Implementing Other Data Structures**: Stacks, queues, hash tables
3. **Dynamic Programming**: Storing subproblem solutions
4. **Graph Adjacency Matrix**: Representing graph connections
5. **Cache Implementation**: Base storage for LRU Cache

## Important Considerations

1. **Bounds Checking**: Ensure indices are within valid range
2. **Dynamic Resizing**: Vector expansion copies all elements (expensive)
3. **Memory Locality**: Sequential access is faster than random access (cache optimization)
4. **Initialization**: Be aware of default values in different languages

## Related LeetCode Problems

- [1. Two Sum](https://leetcode.com/problems/two-sum/) - Hash table application
- [15. 3Sum](https://leetcode.com/problems/3sum/) - Two pointers technique
- [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) - Dynamic programming/divide & conquer
- [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) - Single pass
- [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) - Prefix/suffix products

## Personal Notes
- **Common Mistakes**: Off-by-one errors, array bounds violations
- **Debugging Tips**: Always check array indices and null/empty cases
- **Performance**: Prefer sequential access patterns for better cache performance