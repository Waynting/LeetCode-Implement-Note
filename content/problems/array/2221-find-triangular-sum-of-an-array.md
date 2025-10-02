# 2221. Find Triangular Sum of an Array

## Problem Information
- **Problem ID**: 2221
- **Title**: Find Triangular Sum of an Array
- **Difficulty**: Medium
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/find-triangular-sum-of-an-array/
- **Topics**: Array, Simulation

## Problem Description

Given an integer array nums of length n containing digits 0-9, repeatedly generate a new array by taking the sum of adjacent values modulo 10 until only one element remains. Return that last remaining value.

Example: nums = [1,2,3,4,5] → [3,5,7,9] → [8,2,6] → [0,8] → [8]

## My Solution

```cpp
class Solution {
public:
    int triangularSum(vector<int>& nums) {
        if(nums.size() == 1){
            return nums[0];
        }

        vector<int> cal;
        for(int i=0;i<nums.size();i++){
            cal.push_back(nums[i]);
        }
        while(cal.size() != 1){
            vector<int> temp;
            for(int i=0;i < cal.size() - 1;i++){
                int ac = (cal[i]+cal[i+1] )%10;
                temp.push_back(ac);
            }

            cal.clear();
            for(int i=0;i < temp.size();i++){
                cal.push_back(temp[i]);
            }
        }
        return cal[0]%10 ;
    }
};
```

## Notes

Straightforward simulation: repeatedly reduce the array by taking adjacent sums mod 10 until one element remains.