# Sliding Window Pattern

## Core Concept (What & Why)

**Intuitive Explanation**: The sliding window pattern uses two pointers to create a "window" that slides over data structures (typically arrays or strings) to solve problems in linear time that would otherwise require nested loops.

**Problem Types Solved**:
- Finding subarrays/substrings with specific properties
- Maximum/minimum subarray problems with constraints
- String matching and anagram problems
- Fixed-size or variable-size window problems

**Applicable Conditions**:
- When dealing with sequential data (arrays, strings, linked lists)
- When looking for contiguous subarrays/substrings
- When the problem involves "all subarrays of size K" or "longest/shortest subarray with property X"
- When brute force would require O(n²) or O(n³) time

**Time / Space Complexity Target**: O(n) time / O(1) or O(k) space

## Sliding Window Types

### 1. Fixed Size Window

**When to use**: Problems asking for something in all subarrays of size K

```javascript
// Template for fixed window size
function fixedWindowTemplate(arr, k) {
    let windowSum = 0;
    let result = [];
    
    // Initialize first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    result.push(windowSum);
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i]; // Remove left, add right
        result.push(windowSum);
    }
    
    return result;
}
```

### 2. Variable Size Window

**When to use**: Problems asking for longest/shortest subarray with certain properties

```javascript
// Template for variable window size
function variableWindowTemplate(arr, condition) {
    let left = 0;
    let right = 0;
    let windowState = {}; // Track window state
    let result = 0; // or [], or other result type
    
    while (right < arr.length) {
        // Expand window by including arr[right]
        updateWindowState(windowState, arr[right]);
        
        // Contract window if condition is violated
        while (conditionViolated(windowState, condition)) {
            removeFromWindowState(windowState, arr[left]);
            left++;
        }
        
        // Update result with current valid window
        result = Math.max(result, right - left + 1);
        right++;
    }
    
    return result;
}
```

## Classic Templates

### Template 1: Finding Maximum Length

```javascript
// Template: Longest substring/subarray with at most K distinct elements
function longestWithAtMostK(s, k) {
    let left = 0;
    let maxLength = 0;
    let charCount = new Map();
    
    for (let right = 0; right < s.length; right++) {
        // Expand window
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
        
        // Contract window if we exceed k distinct characters
        while (charCount.size > k) {
            charCount.set(s[left], charCount.get(s[left]) - 1);
            if (charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }
            left++;
        }
        
        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

### Template 2: Finding Minimum Length

```javascript
// Template: Minimum window substring containing all characters
function minWindowSubstring(s, t) {
    let need = new Map();
    let window = new Map();
    
    // Count characters in target string
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0; // Number of characters that satisfy the condition
    let start = 0, len = Infinity;
    
    while (right < s.length) {
        // Expand window
        let char = s[right];
        right++;
        
        if (need.has(char)) {
            window.set(char, (window.get(char) || 0) + 1);
            if (window.get(char) === need.get(char)) {
                valid++;
            }
        }
        
        // Contract window when valid
        while (valid === need.size) {
            // Update minimum window
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            
            let leftChar = s[left];
            left++;
            
            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }
    
    return len === Infinity ? "" : s.substring(start, start + len);
}
```

## Common Application Patterns

### 1. Maximum Sum Subarray of Size K
```javascript
function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    
    // First window
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

### 2. Longest Substring Without Repeating Characters
```javascript
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

### 3. Find All Anagrams
```javascript
function findAnagrams(s, p) {
    let result = [];
    let need = new Map();
    let window = new Map();
    
    for (let char of p) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    
    while (right < s.length) {
        let char = s[right];
        right++;
        
        if (need.has(char)) {
            window.set(char, (window.get(char) || 0) + 1);
            if (window.get(char) === need.get(char)) {
                valid++;
            }
        }
        
        while (right - left >= p.length) {
            if (valid === need.size) {
                result.push(left);
            }
            
            let leftChar = s[left];
            left++;
            
            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }
    
    return result;
}
```

## Important Considerations

1. **Window State Management**: Keep track of what's in the current window efficiently
2. **Boundary Conditions**: Handle empty inputs, single elements, window size larger than array
3. **When to Expand vs Contract**: Clear logic for when to move left vs right pointer
4. **Result Updates**: Decide when and how to update your result (during expansion or contraction)

## Problem Recognition Signals

- "Find the longest/shortest subarray/substring..."
- "All subarrays of size K..."
- "Minimum window that contains..."
- "Maximum sum of subarray with..."
- Problems involving contiguous elements with constraints

## Related LeetCode Problems

- [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) - Variable window, character set
- [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) - Variable window, character frequency
- [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) - Variable window, sum constraint
- [424. Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) - Variable window with K operations
- [438. Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-string/) - Fixed window, anagram matching
- [567. Permutation in String](https://leetcode.com/problems/permutation-in-string/) - Fixed window, permutation matching
- [713. Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/) - Variable window, product constraint

## Personal Notes
- **Common Mistakes**: Forgetting to update window state, incorrect boundary checks, not handling duplicates
- **Debugging Tips**: Print window state at each step, verify left/right pointer movements
- **Optimization**: Use appropriate data structures (Set vs Map vs Array) based on the constraint tracking needs