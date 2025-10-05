# DSA Concept Note — Prefix / Suffix Precomputation & Applications

## 0. Metadata
- **Concept Name**: Prefix / Suffix Precomputation (Sums, Min/Max, Monotonicity, etc.)
- **Category**: Algorithmic Preprocessing
- **Tags**: prefix sum, suffix sum, prefix min/max, inc/dec flags, feasibility checks, difference array, 2D prefix sum, XOR prefix
- **Prerequisites**: Arrays, basic math, time/space trade‑offs
- **Familiarity (1–5)**: 3
- **Last Updated**: 2025-10-05 (UTC+8)

---

## 1) Core Idea (What & Why)
**Precompute cumulative information once → answer many queries or validate constraints in O(1)/O(log n).**
- **Prefix** at index `i` summarizes data from the start up to `i` (e.g., sum/min/max/inc‑valid).
- **Suffix** at index `i` summarizes data from `i` to the end.
- Combine them to evaluate splits/cuts, ranges, and feasibility fast.

**When to use**
- Many **range** queries.
- Need to check **feasibility at every cut** (e.g., prefix strictly increasing **and** suffix strictly decreasing).
- Transform expensive per‑query cost → cheap constant time after O(n) preprocessing.

---

## 2) Canonical Constructions

### 2.1 Prefix Sum (1D)
- `pref[i] = a[0] + ... + a[i]` (64‑bit to avoid overflow)
- Range sum `[l..r] = pref[r] − (l>0 ? pref[l‑1] : 0)`

**C++ snippet**
```cpp
vector<long long> pref(n);
pref[0] = a[0];
for (int i = 1; i < n; ++i) pref[i] = pref[i-1] + a[i];

auto range_sum = [&](int l, int r) -> long long {
    return pref[r] - (l ? pref[l-1] : 0LL);
};
```

### 2.2 Suffix Sum
```cpp
vector<long long> suff(n);
suff[n-1] = a[n-1];
for (int i = n-2; i >= 0; --i) suff[i] = suff[i+1] + a[i];
```

### 2.3 Prefix Min / Max & Suffix Min / Max
- `pmin[i] = min(a[0..i])`, `pmax[i] = max(a[0..i])`
- `smin[i] = min(a[i..n-1])`, `smax[i] = max(a[i..n-1])`

### 2.4 Monotonicity Flags (inc/dec feasibility)
- `inc[i] = inc[i-1] && (a[i-1] < a[i])` (strictly increasing prefix)
- `dec[i] = dec[i+1] && (a[i] > a[i+1])` (strictly decreasing suffix)

### 2.5 Prefix XOR / AND / OR / GCD
- XOR: `px[i] = px[i-1] ^ a[i]` → range XOR in O(1).
- GCD: `pg[i] = gcd(pg[i-1], a[i])`, `sg[i] = gcd(a[i], sg[i+1])` → range gcd via `gcd(pg[l-1], sg[r+1])`.

### 2.6 Difference Array (range add in O(1), finalize by prefix)
- To add `+v` on `[l..r]`: `diff[l] += v; diff[r+1] -= v;`
- Recover: `arr = prefix(diff)`.

### 2.7 2D Prefix Sum (Integral Image)
- `P[i][j] = sum of A[0..i][0..j]`
- Rectangle sum `(r1..r2, c1..c2)` via inclusion‑exclusion.

---

## 3) Typical Applications

1. **Range Sum / XOR Queries**: RMQ alternative when only sums/XOR needed.
2. **Balance / Split Problems**: minimize `|sum(left) − sum(right)|` subject to constraints.
3. **Feasibility at a Cut**: e.g., `inc[i] && dec[i+1]` to ensure left is strictly increasing & right strictly decreasing.
4. **Exclude‑one GCD**: `gcd of all except a[k] = gcd(pg[k-1], sg[k+1])`.
5. **Threshold / Boundary Tests**: prefix min vs current, or suffix max vs current.
6. **Difference Array**: many range updates + one pass to finalize.
7. **2D Range Sums**: submatrix queries in O(1).

---

## 4) Pattern — "Enumerate Cut with Feasibility Precompute"
**Goal**: Check quickly if a cut after `i` is valid, then evaluate a metric (e.g., sum difference).

**Steps**
1. Build `inc[0..i]` and `dec[i+1..]` flags.
2. Build `pref` for O(1) left/right sums.
3. Loop all `i` (0..n‑2), if feasible: compute metric and take min/max.

**Pseudocode**
```text
build inc[], dec[], pref[]
best = +INF
for i in 0..n-2:
    if inc[i] && dec[i+1]:
        left  = pref[i]
        right = pref[n-1] - pref[i]
        best = min(best, |left - right|)
return best or -1 if no feasible
```

---

## 5) Edge Cases & Pitfalls
- **Strict vs Non‑strict**: use `<` / `>` vs `<=` / `>=` correctly.
- **Single‑element subarray**: often counts as strictly mono; confirm problem statement.
- **Overflow**: use `long long` for sums; watch 2D sums.
- **Indexing**: `pref[r] − pref[l-1]` pattern; guard `l=0`.
- **Empty side**: when enumerating cuts, ensure both sides are non‑empty (`i ≤ n‑2`).
- **2D boundaries**: inclusion‑exclusion off‑by‑one.
- **Difference array finalize**: don't forget the final prefix pass.

---

## 6) Micro‑Exercises
1. Build `inc[]` / `dec[]` for an array and count how many feasible cuts exist.
2. Given `queries [l,r]`, answer `sum(l,r)` with `pref[]` and with `suff[]` (just to practice both).
3. Implement "range add updates + point queries" with a 1D difference array.
4. Implement 2D prefix sum and query a rectangle sum.
5. Exclude‑one GCD with prefix/suffix GCD arrays.

---

## 7) Minimal C++ Skeletons

**Prefix/Suffix sums & feasibility**
```cpp
vector<long long> pref(n);
pref[0] = a[0];
for (int i = 1; i < n; ++i) pref[i] = pref[i-1] + a[i];

vector<char> inc(n, 0), dec(n, 0);
inc[0] = 1;
for (int i = 1; i < n; ++i) inc[i] = inc[i-1] && (a[i-1] < a[i]);
dec[n-1] = 1;
for (int i = n-2; i >= 0; --i) dec[i] = dec[i+1] && (a[i] > a[i+1]);
```

**Difference array**
```cpp
vector<long long> diff(n+1);
auto add = [&](int l, int r, long long v){
    diff[l] += v;
    if (r+1 < (int)diff.size()) diff[r+1] -= v;
};
vector<long long> arr(n);
long long run = 0;
for (int i = 0; i < n; ++i) { run += diff[i]; arr[i] = run; }
```

**2D prefix (brief)**
```cpp
vector<vector<long long>> P(n+1, vector<long long>(m+1));
for (int i = 1; i <= n; ++i)
  for (int j = 1; j <= m; ++j)
    P[i][j] = A[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1];

auto rect = [&](int r1,int c1,int r2,int c2){
  return P[r2][c2]-P[r1-1][c2]-P[r2][c1-1]+P[r1-1][c1-1];
};
```

---

## 8) Related Concepts
- Sliding window (when ranges are contiguous and move by 1).
- Fenwick Tree / Segment Tree (range queries/updates with log factors).
- Monotonic stack/queue (different "monotonic" but often paired with prefix info).
- Sparse table (idempotent range queries like min/max).

---

## 9) Quick Checklist (Before Coding)
- Decide strict vs non‑strict.
- Choose 64‑bit sum if values can be large or many.
- Confirm cut range (ensure both sides non‑empty).
- Precompute only what you need (sum? min? flags? gcd?).
- Add tests for `n=1/2`, equal elements, negatives, large values.

---

## 10) Personal Notes
- For split‑array‑with‑constraints problems, **inc/dec + prefix sums** is a powerful O(n) pattern.
- Difference arrays are great when there are **many range updates** but only one final read.
- 2D prefix sum is often the fastest path for submatrix queries without updates.
