# 202. Happy Number

## Problem Information
- **Problem ID**: 202
- **Title**: Happy Number
- **Difficulty**: Easy
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/happy-number/
- **Topics**: Hash Table, Two Pointers, Math

## Problem Description

Write an algorithm to determine if a number `n` is happy.

A **happy number** is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return `true` if `n` is a happy number, and `false` if not.

## Solutions

### Solution 1: Hash Set Cycle Detection
**Time Complexity**: O(log n)
**Space Complexity**: O(log n)

#### Approach
Use a hash set to detect cycles. Store all seen numbers, and if we encounter a number we've seen before (and it's not 1), we're in a cycle.

#### Key Idea
- Define `f(x) = sum of squares of digits of x`
- Generate the sequence `n, f(n), f(f(n)), ...`
- If the sequence hits `1` → return `true`
- If it cycles without reaching `1` → return `false`

#### Code
```cpp
class Solution {
public:
    int sumSquares(int x) {
        int sum = 0;
        while (x > 0) {
            int digit = x % 10;
            sum += digit * digit;
            x /= 10;
        }
        return sum;
    }

    bool isHappy(int n) {
        unordered_set<int> seen;
        int x = n;

        while (x != 1 && seen.find(x) == seen.end()) {
            seen.insert(x);
            x = sumSquares(x);
        }

        return x == 1;
    }
};
```

### Solution 2: Floyd Cycle Detection (Two Pointers)
**Time Complexity**: O(log n)
**Space Complexity**: O(1)

#### Approach
Use Floyd's cycle detection algorithm (tortoise and hare) to detect cycles with O(1) space.

#### Key Idea
- `slow` pointer moves one step: `slow = f(slow)`
- `fast` pointer moves two steps: `fast = f(f(fast))`
- If they meet at 1, the number is happy
- If they meet at any other number, there's a cycle (unhappy)

#### Code
```cpp
class Solution {
public:
    int sumSquares(int x) {
        int sum = 0;
        while (x > 0) {
            int digit = x % 10;
            sum += digit * digit;
            x /= 10;
        }
        return sum;
    }

    bool isHappy(int n) {
        int slow = sumSquares(n);
        int fast = sumSquares(sumSquares(n));

        while (slow != fast) {
            slow = sumSquares(slow);
            fast = sumSquares(sumSquares(fast));
        }

        return slow == 1;
    }
};
```

## Edge Cases
- `n = 1` → already happy, return `true`
- Single digit numbers (2-9)
- The sequence either reaches 1 or enters a cycle
- Common cycle contains 4: `4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4`

## Related Problems
- 141. Linked List Cycle
- 142. Linked List Cycle II
- 287. Find the Duplicate Number

## Notes
**Hash Set approach**:
- Intuitive and easy to debug
- Uses O(log n) space to store seen numbers

**Floyd Cycle Detection**:
- Space-optimal O(1) solution
- Demonstrates the "Two Pointers" pattern
- Same technique used in linked list cycle detection

**Key insight**: The process of repeatedly applying a function and detecting whether it reaches a fixed point or enters a cycle is a common pattern in algorithm problems.

## Test Cases
```cpp
assert(isHappy(19) == true);   // 19 → 82 → 68 → 100 → 1
assert(isHappy(2) == false);   // enters cycle with 4
assert(isHappy(1) == true);    // already 1
assert(isHappy(7) == true);    // 7 → 49 → 97 → 130 → 10 → 1
```
