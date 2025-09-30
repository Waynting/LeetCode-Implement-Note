---
title: Two Pointers Technique
category: technique
difficulty: intermediate
topics: TwoPointers, Arrays, LinkedList, SlidingWindow
description: Comprehensive guide to two pointers technique patterns and applications
---

# Two Pointers Technique

## Core Concept (What & Why)

**Intuitive Explanation**: Two pointers is an algorithmic technique that uses two pointers to traverse data structures. By cleverly moving these pointers, we can optimize certain O(n²) brute force solutions to O(n).

**Problem Types Solved**:
- Pair/triplet finding in sorted arrays
- Cycle detection in linked lists
- Sliding window problems
- In-place array modifications
- Palindrome checks

**Applicable Conditions**:
- Sorted arrays (for collision pointers)
- Need to maintain/find optimal window
- In-place operations required
- Linear time complexity desired

**Time / Space Complexity Target**: O(n) / O(1)

## Common Solution Patterns

### Pattern A: Collision Pointers (Opposite Direction)
**When to use**: Sorted arrays, finding pairs with target sum

**Thought Process**:
1. Start from both ends of array
2. Move pointers toward each other
3. Adjust movement based on current sum vs target
4. Continue until pointers meet

### Pattern B: Fast & Slow Pointers (Same Direction)
**When to use**: Cycle detection, finding middle elements, removing duplicates

**Thought Process**:
1. Both pointers start at same position
2. Move at different speeds (usually 1x and 2x)
3. Use the speed difference to detect patterns
4. Continue until specific condition met

### Pattern C: Sliding Window (Variable Distance)
**When to use**: Substring/subarray problems with constraints

**Thought Process**:
1. Expand right pointer to grow window
2. Contract left pointer when constraint violated
3. Track optimal window during process
4. Continue until right pointer reaches end

## Syntax Cheat-Sheet by Language

### JavaScript
```javascript
// Collision Pointers - Two Sum in Sorted Array
function twoSumSorted(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;  // need larger sum
        } else {
            right--; // need smaller sum
        }
    }
    
    return [-1, -1];
}

// Fast & Slow Pointers - Cycle Detection
function hasCycle(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}

// Sliding Window - Longest Substring Without Repeating
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

### C++
```cpp
#include <vector>
#include <unordered_set>

// Collision Pointers
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return {};
}

// Fast & Slow Pointers
bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) return true;
    }
    
    return false;
}
```

## Common Applications

### 1. Sorted Array Problems
```javascript
// Three Sum
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates
        
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}
```

### 2. In-Place Array Modification
```javascript
// Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
    if (nums.length <= 1) return nums.length;
    
    let slow = 0;
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}

// Move Zeros to End
function moveZeroes(nums) {
    let slow = 0;
    
    // Move non-zero elements to front
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    
    // Fill remaining with zeros
    while (slow < nums.length) {
        nums[slow] = 0;
        slow++;
    }
}
```

### 3. Linked List Problems
```javascript
// Find Middle of Linked List
function findMiddle(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Remove Nth Node from End
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy, fast = dummy;
    
    // Move fast n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast reaches end
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // Remove the node
    slow.next = slow.next.next;
    return dummy.next;
}
```

## Edge Cases & Tests
```
Case1: Empty array/list => handle null cases
Case2: Single element => ensure pointers don't conflict
Case3: All same elements => handle duplicate logic
Case4: No valid solution => return appropriate default
Case5: Large input => verify O(n) complexity
```

## Common Problems by Pattern

### Collision Pointers
- [167. Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- [15. 3Sum](https://leetcode.com/problems/3sum/)
- [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

### Fast & Slow Pointers
- [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

### Sliding Window
- [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)

### In-Place Modification
- [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
- [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)
- [75. Sort Colors](https://leetcode.com/problems/sort-colors/)

## Personal Notes
- **Choose the right pattern**: Collision for sorted arrays, fast/slow for cycles, sliding window for subarrays
- **Handle duplicates carefully**: Skip them appropriately in sorted array problems
- **Boundary checks**: Ensure pointers don't go out of bounds
- **Initialization matters**: Starting positions affect the algorithm correctness