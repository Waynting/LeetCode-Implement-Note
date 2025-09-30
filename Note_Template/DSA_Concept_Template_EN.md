# Data Structure / Algorithm Concept Note Template (One‑Pager)

> Purpose: Quickly capture **Concept → Rules / Invariants → Common Syntax → Example → Practice**, for review and implementation.

---

## 0. Metadata
- **Concept Name**:
- **Category**: Data Structure / Algorithm / Pattern (e.g., Two Pointers, Monotonic Stack, BFS, DP)
- **Tags**:
- **Prerequisites**:
- **Familiarity (1–5)**:
- **Last Updated**:

---

## 1. Core Concept (What & Why)
- **Intuitive Explanation**:
- **Problem Types Solved**:
- **Applicable Conditions / Signals** (e.g., monotonicity, overlapping subproblems, shortest path with non-negative weights...):
- **Time / Space Complexity Target**: O( ) / O( )
- **Common Data Structures**:

---

## 2. Invariants & Properties
- **Core Invariants**:
- **How to Maintain**:
- **Common Pitfalls**: off-by-one, overflow, boundary cases (empty array, length=1, duplicates)...

---

## 3. Common Solution Patterns
- **Pattern A Name** (when to use):
  - Thought Process / Steps:
  - Complexity:
- **Pattern B Name** (when to use):
  - Thought Process / Steps:
  - Complexity:

> Note: If the concept has multiple common approaches (e.g., BFS vs Dijkstra, DP top-down vs bottom-up), list comparisons here (correctness conditions, complexity, implementation difficulty).

---

## 4. Pseudocode (Language-Agnostic Skeleton)
```text
# Use semantic variable names; mark key steps and invariant maintenance points
initialize ...
while condition:
    update state
    maintain invariant(s)
    answer/update structure
return result
```

---

## 5. Syntax Cheat‑Sheet by Language
> Capture APIs / syntax you often forget, close to real coding.

### C++
- Containers/Algorithms: `vector`, `deque`, `priority_queue`, `unordered_map`, `sort`, `lower_bound`
- Snippets:
```cpp
// Fast I/O
ios::sync_with_stdio(false); cin.tie(nullptr);

// Min-heap priority queue
priority_queue<int, vector<int>, greater<int>> pq;

// Binary search boundary
auto it = lower_bound(v.begin(), v.end(), x);
```

### Python
- Containers/Modules: `collections.deque`, `heapq`, `bisect`, `itertools`
- Snippets:
```python
import heapq
pq = []
heapq.heappush(pq, (dist, node))
_, u = heapq.heappop(pq)
```

### Java
- Containers/Utilities: `ArrayDeque`, `PriorityQueue`, `HashMap`, `Arrays.binarySearch`
- Snippets:
```java
PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0] - b[0]);
```

> If the concept ties closely to specific STL / standard library tools (e.g., `std::bitset`, `std::disjoint_set` / `union_find`), add minimal examples here.

---

## 6. Minimal Working Example (MWE)
> Demonstrate with **minimal data** (pseudocode or near-implementation without full solution).

- **Input**:
- **Manual Steps**:
- **Intermediate State (table/sequence)**:
- **Output**:
- **Correctness Reasoning (Invariant / exchange argument / induction)**:

---

## 7. Edge Cases & Tests
- Enumerate: empty, single element, max/min values, duplicates, negatives, overflow, cycles, disconnected...
- Basic Tests:
```
Case1: ... => ...
Case2: ... => ...
Case3: ... => ...
```

---

## 8. Relation to Neighboring Concepts
- Confusingly Similar Concepts:
- Conversion Conditions: when can you switch from A to B?
- Common Optimizations: e.g., “Sort first → Two Pointers”, “Prefix sum + offline queries”, “Monotonic queue optimized DP”.

---

## 9. Implementation Skeleton (Leave Blank for Practice)
> **Rule: do not paste fully working submission-ready code.**

### C++ Skeleton
```cpp
/* Name: Concept Skeleton
 * Idea: ...
 * Invariants: ...
 */
int solve(...) {
    // init
    // loop / recursion
    // maintain invariants
    // return
}
```

### Python Skeleton
```python
def solve(...):
    # init
    # loop / recursion
    # maintain invariants
    return ...
```

---

## 10. Common Problems (Fill in IDs)
- LeetCode:
  - [ ] #
  - [ ] #
- Other Platforms:

---

## 11. Practice Plan (Spaced Repetition)
- Initial: Day 0 → solve 1–2 basic problems
- Reinforcement: Day 2, Day 7, Day 21 review + new problems
- Application: different data sizes/variants (weighted, dynamic updates, offline/online)
- Self-check: Can I state invariants and complexity within X minutes?

---

## 12. Personal Notes (Traps / Intuition / Mnemonics)
- Mistakes I often make:
- Debugging Heuristics:
- Reflections:

---

## 13. References
- Wikipedia / Textbooks:
- Blogs / Lecture Notes:
- Videos:
- Source Code References:
