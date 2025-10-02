# 33. Search in Rotated Sorted Array

## Problem Information
- **Problem ID**: 33
- **Title**: Search in Rotated Sorted Array
- **Difficulty**: Medium
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/search-in-rotated-sorted-array/
- **Topics**: Binary Search, Array

## Problem Description

Given an integer array nums sorted in ascending order and then rotated at an unknown pivot, and an integer target, return the index of target if it is in nums; otherwise, return -1.

You must write an algorithm with O(log n) time complexity.

Example: Input: nums = [4,5,6,7,0,1,2], target = 0 → Output: 4

## My Solution

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

## Notes

Key idea: In a rotated sorted array, at least one side of mid is always sorted. Use this to determine which half to search.
