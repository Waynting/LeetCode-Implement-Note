# 3147. Taking Maximum Energy From the Mystic Dungeon — 筆記（v2）

> **題意速記**：給定 `energy` 與整數 `k`。從任一起點 `i` 出發，必須吸收 `energy[i]`，並瞬移到 `i+k`，重複直到超出陣列；沿途能量可正可負，**不可中途停**。求最大總能量。

---

## 一、核心觀念
- 把陣列依索引的餘數 `r = i % k` 分成 **k 條互不相交的「鏈」**：  
  第 `r` 條鏈為 `r, r+k, r+2k, ...`。
- 從任一起點 `i` 出發的總能量，就是它所在鏈上 **從 `i` 到終點** 的**固定後綴和**（不能跳過）。
- 因此，對每條鏈做一次 **自尾向前** 的累加，就能在 **O(n)** 內算出所有起點的值並取最大。

---

## 二、你的兩個版本（原樣保留）

### 1) TLE 版本（暴力重複累加，時間 O(n · ⌈n/k⌉)）
```cpp
// every k is a loop to the end
// from the end to front and add
int ans = -10000;
int n = energy.size();
for(int i = n - 1; i >= 0 ; --i){
    int tra = i;
    int sum = 0;
    while(tra <= n -1 ){
        sum += energy[tra];
        tra += k;
    }
    if(sum > ans){
        ans = sum;
    }
}
return ans;
```
**為什麼 TLE？**  
對每個起點 `i` 都重新計算 `i, i+k, i+2k, ...` 的和，導致大量重複加法。

---

### 2) 正確版本（O(n)）：自尾向前累加每條鏈
```cpp
int n = energy.size();
int ans = -10000;
for(int i = k; i > 0 ; --i){
    int whe = n - 1 - (k - i);
    int sum = 0;
    while(whe >= 0){
        sum += energy[whe];
        if(sum > ans){
            ans = sum;
        }
        whe -= k;
    }
}
return ans;
```
**為什麼快？**  
把陣列拆成 `k` 條鏈，針對每條鏈**只累加一次**（從尾到頭），等價於同時計算所有起點的「固定後綴和」，整體 **O(n)**。

---

## 三、等價寫法：以餘數類別 `r = 0..k-1` 表示（語義更清楚）
```cpp
// 等價寫法（語義化）：以餘數 r 分鏈，從每條鏈的最後一個索引往回加
#include <bits/stdc++.h>
using namespace std;

long long maximumEnergy_residue(vector<int>& energy, int k) {
    int n = (int)energy.size();
    long long ans = LLONG_MIN;   // 安全初始化
    for (int r = 0; r < k; ++r) {
        long long sum = 0;
        // 找到餘數為 r 的最後一個索引 start
        int start = ((n - 1 - r) >= 0) ? ((n - 1 - r) / k) * k + r : -1;
        for (int j = start; j >= 0; j -= k) {
            sum += energy[j];
            ans = max(ans, sum);
        }
    }
    return ans;
}
```
- `start` 是該餘數類別的**最後**一個位置，然後以步長 `k` 向前走。
- `sum` 為該鏈的固定後綴和；每次更新全域 `ans`。

---

## 四、**安全版可提交實作**（`long long` + 邊界處理）
```cpp
class Solution {
public:
    int maximumEnergy(vector<int>& energy, int k) {
        int n = (int)energy.size();
        long long best = LLONG_MIN; // 避免 -10000 這種不保險的值
        for (int r = 0; r < k; ++r) {
            long long sum = 0;
            // 餘數 r 的最後一個索引
            int start = ((n - 1 - r) >= 0) ? ((n - 1 - r) / k) * k + r : -1;
            for (int j = start; j >= 0; j -= k) {
                sum += (long long)energy[j];
                if (sum > best) best = sum;
            }
        }
        // LeetCode 函式回傳型別是 int，題目資料範圍允許強轉
        return (int)best;
    }
};
```
**說明**
- 以 `long long` 累加，避免可能的整數溢位。
- 用 `LLONG_MIN` 做初始化，正負都安全。
- 直接依餘數類別走訪，語意比「從尾部往回數 k 次」更清楚。

---

## 五、複雜度 & 常見陷阱
- **時間**：`O(n)`（每個索引最多被加一次）。  
- **空間**：`O(1)` 額外空間。

**陷阱**
1. 不可用 `max(0, …)` 等做法「截斷負數」：題目規定**必須吸收**，不能中途停。
2. `ans` 初始化用 `-10000` 不安全；應改 `INT_MIN` 或 `LLONG_MIN`。
3. 當 `k > n`，有效鏈不超過 `n` 條；寫法以餘數類別自動處理好。
4. 交題前記得移除 `cout` 等除錯輸出。

---

## 六、微型測試（手推）
- `energy = [5, -2, 3, -1, 2], k = 2`  
  - 鏈 0：索引 `[0, 2, 4]` → 後綴和：  
    - 從 4：`2`  
    - 從 2：`3 + 2 = 5`  
    - 從 0：`5 + 5 = 10` → **最佳 10**
  - 鏈 1：索引 `[1, 3]`：  
    - 從 3：`-1`  
    - 從 1：`-2 + (-1) = -3`

---

## 七、一句話總結
> **把陣列切成 `k` 條「餘數鏈」，每條鏈做一次自尾向前的固定後綴和，答案取全域最大值。** 這是本題的最優線性解法。
