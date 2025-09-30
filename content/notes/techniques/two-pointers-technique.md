# 雙指標技巧詳解

## 什麼是雙指標技巧？

雙指標（Two Pointers）是一種使用兩個指標遍歷資料結構的演算法技巧。透過巧妙地移動兩個指標，可以將某些 O(n²) 的暴力解法優化到 O(n)。

## 雙指標的類型

### 1. 對撞指標（相向雙指標）

兩個指標從兩端向中間移動。

```javascript
function twoSumSorted(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;  // 需要更大的和
        } else {
            right--; // 需要更小的和
        }
    }
    
    return [-1, -1];
}
```

### 2. 快慢指標（同向雙指標）

兩個指標同向移動，但速度不同。

```javascript
// 移除重複元素
function removeDuplicates(arr) {
    if (arr.length <= 1) return arr.length;
    
    let slow = 0;
    
    for (let fast = 1; fast < arr.length; fast++) {
        if (arr[fast] !== arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    
    return slow + 1; // 新陣列長度
}
```

### 3. 滑動視窗（區間雙指標）

維護一個動態的區間 [left, right]。

```javascript
// 無重複字符的最長子串
function lengthOfLongestSubstring(s) {
    const set = new Set();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

## 經典應用模式

### 模式一：有序陣列的配對問題

```javascript
// 三數之和
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // 跳過重複元素
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // 跳過重複元素
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

### 模式二：鏈表中的快慢指標

```javascript
// 檢測環
function hasCycle(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}

// 找到環的起點
function detectCycle(head) {
    let slow = head, fast = head;
    
    // 階段1：檢測是否有環
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // 階段2：找到環的起點
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    
    return null;
}
```

### 模式三：滑動視窗變體

```javascript
// 最小覆蓋子串
function minWindow(s, t) {
    const need = new Map();
    const window = new Map();
    
    // 統計 t 中的字符
    for (const c of t) {
        need.set(c, (need.get(c) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    let start = 0, len = Infinity;
    
    while (right < s.length) {
        // 擴大視窗
        const c = s[right];
        right++;
        
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }
        
        // 收縮視窗
        while (valid === need.size) {
            // 更新答案
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            
            const d = s[left];
            left++;
            
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }
    
    return len === Infinity ? "" : s.substr(start, len);
}
```

### 模式四：分隔陣列

```javascript
// 荷蘭國旗問題（三向切分）
function sortColors(nums) {
    let left = 0, right = nums.length - 1;
    let i = 0;
    
    while (i <= right) {
        if (nums[i] === 0) {
            [nums[i], nums[left]] = [nums[left], nums[i]];
            left++;
            i++;
        } else if (nums[i] === 2) {
            [nums[i], nums[right]] = [nums[right], nums[i]];
            right--;
            // 注意：i 不增加，因為交換來的元素還沒檢查
        } else {
            i++;
        }
    }
}
```

## C++ 實作範例

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

// 對撞指標：兩數之和
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

// 滑動視窗：最長無重複子串
int lengthOfLongestSubstring(string s) {
    unordered_set<char> window;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (window.count(s[right])) {
            window.erase(s[left++]);
        }
        window.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

## 雙指標技巧總結

### 適用場景

1. **有序陣列**：利用有序性質移動指標
2. **鏈表操作**：快慢指標找中點、檢測環
3. **子串/子陣列**：滑動視窗維護區間性質
4. **原地操作**：空間複雜度 O(1) 的要求

### 移動策略

1. **對撞指標**：根據當前和與目標的關係決定移動
2. **快慢指標**：固定速度差，通常是 2:1
3. **滑動視窗**：右指標擴展，左指標收縮

### 常見陷阱

1. **邊界條件**：確保不越界
2. **重複元素**：需要跳過重複元素時的處理
3. **初始化**：指標的初始位置很重要
4. **更新順序**：先更新狀態還是先移動指標

## 經典題目

### 基礎雙指標
- [167. Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- [15. 3Sum](https://leetcode.com/problems/3sum/)
- [18. 4Sum](https://leetcode.com/problems/4sum/)

### 快慢指標
- [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

### 滑動視窗
- [3. Longest Substring Without Repeating](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- [438. Find All Anagrams](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

### 陣列操作
- [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
- [75. Sort Colors](https://leetcode.com/problems/sort-colors/)
- [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)

掌握雙指標技巧，能夠優雅地解決許多陣列和鏈表問題！