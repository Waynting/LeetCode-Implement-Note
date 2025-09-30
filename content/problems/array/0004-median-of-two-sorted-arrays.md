# 4. Median of Two Sorted Arrays

## Problem Information
- **Problem ID**: 4
- **Title**: Median of Two Sorted Arrays
- **Difficulty**: Hard
- **Link**: https://leetcode.com/problems/median-of-two-sorted-arrays/description/
- **Topics**: Array, Binary Search

## Problem Description

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

## Solutions

### Solution 1: Merge Sort Approach
**Time Complexity**: O(m+n)
**Space Complexity**: O(m+n)

#### Approach
Use two pointers to traverse both arrays and merge elements in order into a new array, then find the median.

#### Code
```cpp
class Solution {
    public:
        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
            size_t fullsize = nums1.size() + nums2.size();
            size_t point1 = 0, point2 = 0;
            vector<int> ans;
            while(point1 != nums1.size() && point2 != nums2.size()){
                if(nums1[point1] > nums2[point2]){
                    ans.push_back(nums2[point2]);
                    point2++;
                }
                else if(nums1[point1] < nums2[point2]){
                    ans.push_back(nums1[point1]);
                    point1++;
                }
                else{
                    ans.push_back(nums1[point1]);
                    ans.push_back(nums2[point2]);
                    point1++;
                    point2++;
                }
            }
    
            while(point1 != nums1.size()){
                ans.push_back(nums1[point1]);
                point1++;
            }
    
            while(point2 != nums2.size()){
                ans.push_back(nums2[point2]);
                point2++;
            }
            
            double median;
            if(fullsize %2 == 1){
                median = ans[(fullsize-1)/2];
                
            }
            else{
                median = static_cast<double>( (ans[fullsize/2] + ans[(fullsize/2) -1]) ) /2;
        
            }
            return median;
    
        }
    };
```

#### Key Points
- This solution doesn't meet the required O(log(m+n)) time complexity
- The correct approach should use binary search

## Related Problems
- 295. Find Median from Data Stream
- 480. Sliding Window Median

## Notes
The challenge of this problem is achieving O(log(m+n)) time complexity, which requires binary search approach. While the above solution works, it has O(m+n) time complexity and doesn't meet the problem requirements.