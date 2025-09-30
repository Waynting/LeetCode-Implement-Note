# 二分搜尋詳解

## 什麼是二分搜尋？

二分搜尋是一種高效的搜尋演算法，用於在**已排序**的陣列中查找特定元素。每次比較都可以排除一半的搜尋範圍，時間複雜度為 O(log n)。

## 基本概念

二分搜尋的核心思想：
1. 比較中間元素與目標值
2. 如果相等，返回結果
3. 如果目標值較小，在左半部分繼續搜尋
4. 如果目標值較大，在右半部分繼續搜尋
5. 重複直到找到或範圍為空

## 二分搜尋的兩種類型

### 1. 索引域二分搜尋（在陣列中查找）

在排序陣列中查找特定值的索引。

```javascript
// 基本二分搜尋模板
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
    
    return -1; // 未找到
}
```

### 2. 答案域二分搜尋（在答案範圍中查找）

當問題可以轉化為「找到滿足某個條件的最小/最大值」時使用。

```javascript
// 找到滿足條件的最小值
function binarySearchMin(low, high, isValid) {
    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (isValid(mid)) {
            high = mid;  // mid 可能是答案，保留
        } else {
            low = mid + 1;
        }
    }
    return low;
}

// 找到滿足條件的最大值
function binarySearchMax(low, high, isValid) {
    while (low < high) {
        const mid = Math.floor(low + (high - low + 1) / 2);  // 注意 +1
        if (isValid(mid)) {
            low = mid;   // mid 可能是答案，保留
        } else {
            high = mid - 1;
        }
    }
    return low;
}
```

## 進階模板

### 1. lower_bound（第一個 >= target 的位置）

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

### 2. upper_bound（第一個 > target 的位置）

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

### 3. 查找範圍

```javascript
function searchRange(arr, target) {
    const left = lowerBound(arr, target);
    const right = upperBound(arr, target);
    
    if (left === right) return [-1, -1];  // 未找到
    return [left, right - 1];
}
```

## C++ 實作

```cpp
#include <vector>
#include <algorithm>
using namespace std;

// 基本二分搜尋
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

// 使用 STL
vector<int> arr = {1, 2, 3, 3, 3, 4, 5};

// lower_bound: 第一個 >= 3 的位置
auto it1 = lower_bound(arr.begin(), arr.end(), 3);
int pos1 = it1 - arr.begin();  // pos1 = 2

// upper_bound: 第一個 > 3 的位置  
auto it2 = upper_bound(arr.begin(), arr.end(), 3);
int pos2 = it2 - arr.begin();  // pos2 = 5

// equal_range: 同時獲得 lower_bound 和 upper_bound
auto range = equal_range(arr.begin(), arr.end(), 3);
```

## 答案域二分搜尋應用

### 範例：尋找最小的最大值

```javascript
// LeetCode 875. Koko Eating Bananas
function minEatingSpeed(piles, h) {
    // 判斷以速度 k 是否能在 h 小時內吃完
    function canFinish(k) {
        let hours = 0;
        for (const pile of piles) {
            hours += Math.ceil(pile / k);
        }
        return hours <= h;
    }
    
    // 在答案域 [1, max(piles)] 上二分
    let low = 1;
    let high = Math.max(...piles);
    
    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (canFinish(mid)) {
            high = mid;  // mid 可能是答案
        } else {
            low = mid + 1;
        }
    }
    
    return low;
}
```

## 常見陷阱與注意事項

### 1. 整數溢位
```javascript
// 錯誤：可能溢位
const mid = (left + right) / 2;

// 正確：避免溢位
const mid = left + (right - left) / 2;
```

### 2. 無限迴圈
```javascript
// 尋找最大值時要注意
while (low < high) {
    // 錯誤：當 high = low + 1 時會無限迴圈
    const mid = Math.floor(low + (high - low) / 2);
    
    // 正確：向上取整
    const mid = Math.floor(low + (high - low + 1) / 2);
}
```

### 3. 邊界條件
- `while (left <= right)` vs `while (left < right)`
- `right = arr.length - 1` vs `right = arr.length`
- 返回值是 `left` 還是 `right`

### 4. 浮點數二分
```javascript
function binarySearchFloat(low, high, isValid, eps = 1e-9) {
    while (high - low > eps) {
        const mid = (low + high) / 2;
        if (isValid(mid)) {
            high = mid;
        } else {
            low = mid;
        }
    }
    return low;
}
```

## 經典題目分類

### 基礎二分搜尋
- [704. Binary Search](https://leetcode.com/problems/binary-search/)
- [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- [34. Find First and Last Position](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

### 旋轉陣列
- [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

### 答案域二分
- [875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- [1011. Capacity To Ship Packages](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- [410. Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/)

### 矩陣二分
- [74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- [240. Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/)

## 總結

二分搜尋的關鍵：
1. **確定搜尋空間**：陣列索引還是答案範圍
2. **定義條件函數**：什麼時候向左/向右
3. **處理邊界**：避免無限迴圈和越界
4. **選擇模板**：根據需求選擇合適的模板

記住：當看到「有序」、「最小的最大值」、「最大的最小值」這些關鍵詞時，要考慮二分搜尋！