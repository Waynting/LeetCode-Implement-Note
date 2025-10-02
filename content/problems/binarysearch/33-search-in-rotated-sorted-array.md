# 33. Search in Rotated Sorted Array

## Problem Information
- **Problem ID**: 33
- **Title**: Search in Rotated Sorted Array
- **Difficulty**: Medium
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/search-in-rotated-sorted-array/
- **Topics**: Binary Search, Array

## Problem Description
Given an integer array `nums` sorted in ascending order and then rotated at an unknown pivot, and an integer `target`, return the index of `target` if it is in `nums`; otherwise, return `-1`.  
You must write an algorithm with **O(log n)** time complexity.

Example:  
Input: `nums = [4,5,6,7,0,1,2]`, `target = 0` → Output: `4`

## Core Idea (Hint-First Summary)
- The array is a rotated version of a sorted array. In any binary-search iteration, **at least one side (left or right of `mid`) is sorted**.
- Determine which side is sorted by comparing `nums[l]` and `nums[mid]`.
- If the **left half is sorted** (`nums[l] <= nums[mid]`), check if `target` lies in `[nums[l], nums[mid])`. If yes, shrink right; otherwise, go right.
- If the **right half is sorted**, check if `target` lies in `(nums[mid], nums[r]]`. If yes, go right; otherwise, shrink right boundary to the left half.
- Maintain correct **boundaries and inclusivity**. Use **inclusive bounds** (`l=0, r=n-1`) with the loop `while (l <= r)` and move pointers with `l = mid + 1` or `r = mid - 1` when excluding `mid`.

## Solution 1: Binary Search on Rotated Array (Determining Sorted Half)
**Time Complexity**: O(log n)  
**Space Complexity**: O(1)

### Pseudocode (Language-Agnostic)
```text
l = 0; r = n - 1
while l <= r:
    mid = (l + r) // 2
    if nums[mid] == target: return mid

    if nums[l] <= nums[mid]:            # left half is sorted
        if nums[l] <= target < nums[mid]:
            r = mid - 1                 # keep left half
        else:
            l = mid + 1                 # go right half
    else:                               # right half is sorted
        if nums[mid] < target <= nums[r]:
            l = mid + 1                 # keep right half
        else:
            r = mid - 1                 # go left half
return -1
```

### Why This Works (Invariants)
- **Invariant 1**: On every loop, search space is within a valid index interval `[l, r]`.
- **Invariant 2**: At least one side of `mid` is sorted. We exploit that side to decide where `target` can (or cannot) reside.
- **Invariant 3**: Each step strictly reduces the interval size (`r - l` decreases), avoiding infinite loops.

### Common Pitfalls
- Mixing **half-open** (`[l, r)`) and **inclusive** (`[l, r]`) styles. Be consistent.
- Accessing `nums[r]` while using a half-open interval with `r = n` → out-of-bounds.
- Using strict `<` on both ends and accidentally excluding equality cases (`target == nums[l]` or `target == nums[r]`).
- Not moving past `mid` (`l = mid` / `r = mid`) → potential infinite loop.
- Edge cases: arrays of length 0 or 1, rotation at index `0` (unrotated), or target at boundaries.

## My Attempt (for Reference)
> The following is the user's working attempt (C++). It correctly adopts **inclusive bounds** and applies the sorted-half checks and boundary moves.

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size()-1;
        while(l <= r){
            int mid = (l+r)/2;
            if(nums[mid] == target){
                return mid;
            }
            else{
                if(nums[l] <= nums[mid]){ 
                    // left is sorted
                    if(nums[l] <= target && target < nums[mid]){
                        r = mid - 1;
                    }
                    else{
                        l = mid + 1;
                    }
                }
                else{
                    // right is sorted
                    if(nums[mid] < target && target <= nums[r]){
                        l = mid + 1;
                    }
                    else{
                        r = mid - 1;
                    }
                }
            }
        }
        return -1;
    }
};
```

## Targeted Test Cases
```
1) nums = [1], target = 1   → 0
2) nums = [1], target = 0   → -1
3) nums = [1,3], target = 3 → 1
4) nums = [3,1], target = 1 → 1        # small rotated
5) nums = [4,5,6,7,0,1,2], target = 0 → 4
6) nums = [4,5,6,7,0,1,2], target = 4 → 0
7) nums = [5,1,3], target = 5         → 0  # mid on left-sorted edge
8) nums = [5,1,3], target = 2         → -1
```

## Personal Notes
- **Heuristic**: “One side is always sorted.” First decide the sorted side with `nums[l] <= nums[mid]`.
- **Inclusivity**: In left-sorted case, use `nums[l] <= target < nums[mid]`. In right-sorted, use `nums[mid] < target <= nums[r]`.
- **Pointers**: Excluding `mid` must move past it: `l = mid + 1` or `r = mid - 1`.
- **Mental model**: Think of “cutting away the impossible half” using sorted-side boundaries.

## Related Problems
- 81. Search in Rotated Sorted Array II (with duplicates)
- 153/154. Find Minimum in Rotated Sorted Array (I/II)
- 34. Find First and Last Position of Element in Sorted Array (classic boundary binary search)
