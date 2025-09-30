# 陣列基礎概念

## 什麼是陣列？

陣列是最基本的資料結構之一，它是一種線性資料結構，用於儲存相同類型的元素集合。陣列中的每個元素都可以通過索引（index）來訪問。

## 陣列的特點

- **固定大小**：在大多數程式語言中，陣列的大小在創建時就固定了
- **連續記憶體**：陣列元素在記憶體中是連續儲存的
- **隨機存取**：可以在 O(1) 時間內訪問任何元素
- **相同類型**：陣列中的所有元素必須是相同的資料類型

## 時間複雜度

| 操作 | 時間複雜度 | 說明 |
|------|-----------|------|
| 訪問元素 `arr[i]` | O(1) | 透過索引直接訪問 |
| 搜尋元素 | O(n) | 需要遍歷整個陣列 |
| 插入元素（末尾）| O(1) | 動態陣列平均情況 |
| 插入元素（中間）| O(n) | 需要移動後續元素 |
| 刪除元素（末尾）| O(1) | 直接刪除 |
| 刪除元素（中間）| O(n) | 需要移動後續元素 |

## JavaScript 實作範例

```javascript
// 創建陣列
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(10); // 創建長度為 10 的陣列

// 訪問元素
console.log(arr[0]); // 1
console.log(arr[arr.length - 1]); // 5 (最後一個元素)

// 修改元素
arr[2] = 10;

// 新增元素
arr.push(6);       // 在末尾新增，O(1)
arr.unshift(0);    // 在開頭新增，O(n)
arr.splice(2, 0, 100); // 在索引 2 插入 100，O(n)

// 刪除元素
arr.pop();         // 刪除最後一個元素，O(1)
arr.shift();       // 刪除第一個元素，O(n)
arr.splice(2, 1);  // 刪除索引 2 的元素，O(n)

// 遍歷陣列
// 方法 1：傳統 for 迴圈
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// 方法 2：for...of
for (const element of arr) {
    console.log(element);
}

// 方法 3：forEach
arr.forEach((element, index) => {
    console.log(index, element);
});

// 常用方法
const doubled = arr.map(x => x * 2);         // 映射
const evens = arr.filter(x => x % 2 === 0);  // 過濾
const sum = arr.reduce((a, b) => a + b, 0);  // 累積
const found = arr.find(x => x > 3);          // 尋找
const index = arr.indexOf(5);                // 查找索引
```

## C++ 實作範例

```cpp
#include <vector>
#include <array>
using namespace std;

// 靜態陣列
int arr[5] = {1, 2, 3, 4, 5};
array<int, 5> stlArr = {1, 2, 3, 4, 5};

// 動態陣列 (vector)
vector<int> vec = {1, 2, 3, 4, 5};

// 訪問元素
int first = vec[0];
int last = vec.back();

// 新增元素
vec.push_back(6);              // O(1) 平均
vec.insert(vec.begin() + 2, 100); // O(n)

// 刪除元素
vec.pop_back();                // O(1)
vec.erase(vec.begin() + 2);    // O(n)

// 遍歷
for (int i = 0; i < vec.size(); i++) {
    cout << vec[i] << " ";
}

for (int x : vec) {
    cout << x << " ";
}
```

## 常見技巧與模板

### 1. 雙指標遍歷
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

### 2. 滑動視窗
```javascript
function maxSubarraySum(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    
    // 初始視窗
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // 滑動視窗
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

### 3. 前綴和
```javascript
function rangeSum(arr) {
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0);
    
    // 建立前綴和
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    
    // 查詢 [left, right] 區間和
    function query(left, right) {
        return prefix[right + 1] - prefix[left];
    }
    
    return { query };
}
```

## 陣列 vs 其他資料結構

| 特性 | 陣列 | 鏈結串列 | 動態陣列(Vector) |
|------|------|---------|-----------------|
| 隨機存取 | O(1) | O(n) | O(1) |
| 插入/刪除（頭部）| O(n) | O(1) | O(n) |
| 插入/刪除（尾部）| O(1) | O(n) | O(1) |
| 記憶體連續 | 是 | 否 | 是 |
| 記憶體開銷 | 低 | 高（指標）| 中 |
| 快取友好 | 是 | 否 | 是 |

## 常見應用場景

1. **儲存有序資料**：如學生成績列表、商品清單等
2. **實現其他資料結構**：堆疊、佇列、雜湊表等都可以用陣列實現
3. **動態規劃**：儲存子問題的解
4. **圖的鄰接矩陣表示**
5. **快取實現**：如 LRU Cache 的底層儲存

## 注意事項

1. **邊界檢查**：訪問陣列時要確保索引在有效範圍內
2. **動態擴容**：動態陣列擴容時會複製所有元素，成本較高
3. **記憶體局部性**：連續訪問陣列元素比隨機訪問更快（快取優化）
4. **初始化**：注意區分語言中陣列的默認初始值

## 相關 LeetCode 題目

- [1. Two Sum](https://leetcode.com/problems/two-sum/) - 雜湊表應用
- [15. 3Sum](https://leetcode.com/problems/3sum/) - 雙指標
- [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) - 動態規劃/分治
- [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) - 單次遍歷
- [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) - 前後綴積