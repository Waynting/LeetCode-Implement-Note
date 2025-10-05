# Prefix / Suffix 預處理技巧

## 核心概念

**用 O(n) 時間預處理一次，之後可以用 O(1) 時間回答很多查詢。**

簡單來說：
- **Prefix（前綴）**: 儲存從開頭到某個位置的累積資訊（如總和、最小值、最大值）
- **Suffix（後綴）**: 儲存從某個位置到結尾的累積資訊

透過組合前綴和後綴，可以快速檢查區間、分割點、可行性等條件。

## 什麼時候用？

- 需要多次查詢區間和、區間最小/最大值
- 需要檢查每個分割點的可行性（例如：左邊嚴格遞增 且 右邊嚴格遞減）
- 想把原本每次 O(n) 的查詢，變成預處理後 O(1) 的查詢

---

## 常見用法

### 1. Prefix Sum（前綴和）

最常見的應用，用來快速算區間和。

```cpp
// 建立前綴和陣列
vector<long long> pref(n);
pref[0] = a[0];
for (int i = 1; i < n; ++i) {
    pref[i] = pref[i-1] + a[i];
}

// 計算區間 [l, r] 的總和
long long rangeSum(int l, int r) {
    if (l == 0) return pref[r];
    return pref[r] - pref[l-1];
}
```

**範例**：
```
陣列: [3, 1, 4, 2, 5]
前綴和: [3, 4, 8, 10, 15]

區間 [1, 3] 的總和 = pref[3] - pref[0] = 10 - 3 = 7
（就是 1 + 4 + 2）
```

### 2. Suffix Sum（後綴和）

從後面往前累加。

```cpp
vector<long long> suff(n);
suff[n-1] = a[n-1];
for (int i = n-2; i >= 0; --i) {
    suff[i] = suff[i+1] + a[i];
}
```

### 3. Prefix Min/Max（前綴最小/最大值）

記錄從開頭到某個位置的最小或最大值。

```cpp
// 前綴最小值
vector<int> pmin(n);
pmin[0] = a[0];
for (int i = 1; i < n; ++i) {
    pmin[i] = min(pmin[i-1], a[i]);
}

// 前綴最大值
vector<int> pmax(n);
pmax[0] = a[0];
for (int i = 1; i < n; ++i) {
    pmax[i] = max(pmax[i-1], a[i]);
}
```

### 4. 單調性檢查（Monotonicity Flags）

檢查前綴是否嚴格遞增/遞減。

```cpp
// inc[i] = 前 i+1 個元素是否嚴格遞增
vector<bool> inc(n);
inc[0] = true;  // 單一元素算是遞增
for (int i = 1; i < n; ++i) {
    inc[i] = inc[i-1] && (a[i-1] < a[i]);
}

// dec[i] = 從 i 到結尾是否嚴格遞減
vector<bool> dec(n);
dec[n-1] = true;
for (int i = n-2; i >= 0; --i) {
    dec[i] = dec[i+1] && (a[i] > a[i+1]);
}
```

**應用**：找出所有合法的分割點
```cpp
// 檢查在位置 i 切開，左邊遞增、右邊遞減
for (int i = 0; i < n-1; ++i) {
    if (inc[i] && dec[i+1]) {
        // 這是一個合法的分割點
    }
}
```

### 5. Difference Array（差分陣列）

用於多次區間更新，最後一次性計算結果。

```cpp
vector<long long> diff(n+1, 0);

// 對區間 [l, r] 全部加上 v
auto rangeAdd = [&](int l, int r, long long v) {
    diff[l] += v;
    if (r+1 <= n) diff[r+1] -= v;
};

// 執行多次更新
rangeAdd(1, 3, 5);
rangeAdd(2, 4, 3);

// 最後還原成實際陣列
vector<long long> result(n);
long long sum = 0;
for (int i = 0; i < n; ++i) {
    sum += diff[i];
    result[i] = sum;
}
```

---

## 經典題型：找最佳分割點

**問題**：給定陣列，找一個分割點 i，使得：
- 左半部分嚴格遞增
- 右半部分嚴格遞減
- 兩部分總和差值最小

**解法模板**：
```cpp
int n = nums.size();

// 1. 建立單調性檢查
vector<bool> inc(n), dec(n);
inc[0] = true;
for (int i = 1; i < n; ++i) {
    inc[i] = inc[i-1] && (nums[i-1] < nums[i]);
}
dec[n-1] = true;
for (int i = n-2; i >= 0; --i) {
    dec[i] = dec[i+1] && (nums[i] > nums[i+1]);
}

// 2. 建立前綴和
vector<long long> pref(n);
pref[0] = nums[0];
for (int i = 1; i < n; ++i) {
    pref[i] = pref[i-1] + nums[i];
}

// 3. 枚舉所有分割點
long long minDiff = LLONG_MAX;
for (int i = 0; i < n-1; ++i) {
    if (inc[i] && dec[i+1]) {
        long long leftSum = pref[i];
        long long rightSum = pref[n-1] - pref[i];
        minDiff = min(minDiff, abs(leftSum - rightSum));
    }
}
```

---

## 常見陷阱

1. **索引問題**：計算區間 `[l, r]` 時，記得處理 `l = 0` 的情況
2. **溢位問題**：總和可能很大，記得用 `long long`
3. **空陣列**：確保分割後兩邊都不是空的（通常 `i` 範圍是 `0` 到 `n-2`）
4. **嚴格 vs 非嚴格**：確認題目要求的是 `<` 還是 `<=`

---

## 相關技巧

- **Sliding Window**（滑動視窗）：當區間連續移動時使用
- **Segment Tree / Fenwick Tree**：需要動態更新時使用
- **Monotonic Stack/Queue**（單調堆疊/佇列）：維護區間最值

---

## 個人筆記

- 遇到「分割陣列並滿足條件」的題目，優先想到 prefix/suffix + 單調性檢查
- Difference Array 適合「多次區間更新，一次查詢」的情況
- 記得先確認是否需要嚴格遞增/遞減，這會影響比較符號的選擇
