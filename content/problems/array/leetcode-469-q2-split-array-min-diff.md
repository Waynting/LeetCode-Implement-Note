# leetcode-469-q2 — Split Array With Minimum Difference

## Problem Information
- **Platform**: LeetCode (Contest 469, Q2)
- **Title**: Split Array With Minimum Difference
- **Statement (paraphrased)**:  
  Given an integer array `nums`, split it into exactly two non-empty subarrays `left` and `right` such that:
  - `left` is **strictly increasing**,
  - `right` is **strictly decreasing**.  
  Return the **minimum possible absolute difference** between the sums of `left` and `right`. If no valid split exists, return `-1`.

## Examples
- Example (made-up):  
  `nums = [3, 5, 7, 4, 2]`  
  Valid split at `i = 2` (0‑based): `left = [3,5,7]` strictly increasing, `right = [4,2]` strictly decreasing.  
  `|sum(left) - sum(right)| = |15 - 6| = 9`.

## Constraints (typical/assumed)
- `2 ≤ n = nums.length`
- `-10^9 ≤ nums[i] ≤ 10^9`
- Result may exceed 32-bit range → use 64-bit (`long long`) for sums.

---

## Approach (Hint-First → Final Plan)
### Key Idea
We need a cut index `i` where:
- Prefix `nums[0..i]` is strictly increasing, and
- Suffix `nums[i+1..n-1]` is strictly decreasing.

### Observations
- Single-element subarray counts as strictly increasing/decreasing (vacously true).
- We can precompute two boolean arrays:
  - `inc[i]`: whether `nums[0..i]` is strictly increasing.
  - `dec[i]`: whether `nums[i..n-1]` is strictly decreasing.
- With prefix sums `pref[i]`, we can compute sums of `left` and `right` in O(1).  
- Enumerate all cut points `i ∈ [0..n-2]` (right must be non-empty).  
  For each valid `i` with `inc[i] && dec[i+1]`, update the best difference.

### Why not Greedy?
Choosing the locally smaller next element top‑down does **not** guarantee a globally minimal difference, and may even pick an invalid split. We must check the whole prefix/suffix monotonic condition.

---

## Pseudocode
```text
n = len(nums)
if n < 2: return -1

inc[0] = true
for i in 1..n-1:
    inc[i] = inc[i-1] && (nums[i-1] < nums[i])

dec[n-1] = true
for i in n-2..0:
    dec[i] = dec[i+1] && (nums[i] > nums[i+1])

pref[0] = nums[0]
for i in 1..n-1:
    pref[i] = pref[i-1] + nums[i]
total = pref[n-1]

ans = +INF
for i in 0..n-2:           # cut after i
    if inc[i] && dec[i+1]:
        left  = pref[i]
        right = total - left
        ans = min(ans, abs(left - right))

return (ans == +INF ? -1 : ans)
```

---

## Correctness Argument (Sketch)
- `inc[i]` and `dec[i+1]` exactly encode the feasibility constraints for a cut after `i`.
- We check **all** feasible cuts; if none, return `-1`.
- For each feasible cut, we compute the exact difference using prefix sums, so the minimum over all feasible cuts is correct.

---

## Complexity
- Time: `O(n)` to build `inc`, `dec`, `pref` and to scan all cuts.
- Space: `O(n)` for `inc`, `dec`, `pref`. (Can be reduced with some in‑place tricks, but `O(n)` is clean.)

---

## C++17 Reference Implementation
```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    long long splitArray(vector<int>& nums) {
        int n = (int)nums.size();
        if (n < 2) return -1; // two non-empty subarrays required

        // inc[i]: nums[0..i] is strictly increasing
        vector<char> inc(n, 0);
        inc[0] = 1;
        for (int i = 1; i < n; ++i) {
            inc[i] = inc[i-1] && (nums[i-1] < nums[i]);
        }

        // dec[i]: nums[i..n-1] is strictly decreasing
        vector<char> dec(n, 0);
        dec[n-1] = 1;
        for (int i = n-2; i >= 0; --i) {
            dec[i] = dec[i+1] && (nums[i] > nums[i+1]);
        }

        // prefix sums (64-bit)
        vector<long long> pref(n);
        pref[0] = nums[0];
        for (int i = 1; i < n; ++i) pref[i] = pref[i-1] + (long long)nums[i];
        long long total = pref[n-1];

        long long best = LLONG_MAX;
        for (int i = 0; i <= n-2; ++i) { // cut after i
            if (inc[i] && dec[i+1]) {
                long long leftSum  = pref[i];
                long long rightSum = total - leftSum;
                long long diff = leftSum - rightSum;
                if (diff < 0) diff = -diff;
                best = min(best, diff);
            }
        }
        return (best == LLONG_MAX ? -1 : best);
    }
};
```

---

## Edge Cases & Tests
1. `nums = [3,2,1]` → cut at `i=0`, left `[3]` inc, right `[2,1]` dec → `|3 - 3| = 0`  
2. `nums = [1,2]` → cut at `i=0`, left `[1]` inc, right `[2]` dec (single element ok) → `|1-2|=1`  
3. `nums = [1,1,1]` → no strict inc/dec split → `-1`  
4. `nums = [2,4,6,3,1]` → valid at `i=2` → diff `|12 - 4| = 8`  
5. Large positives/negatives → verify 64-bit sums.

---

## Personal Notes
原本想說找到那個分界的Peak的位置和個數（因為不可能會有兩個Peak，除非Peak就是第一個數字）就可以比較大小，但後來發現應該要改用 `inc/dec` 單調性判定 + 前綴和後，僅需 O(n) 就能枚舉所有合法切點並取得最小差值。
