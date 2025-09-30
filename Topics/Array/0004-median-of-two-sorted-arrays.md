# 4. Median of Two Sorted Arrays

## 題目資訊
- **題號**: 4
- **題目名稱**: Median of Two Sorted Arrays
- **難度**: Hard
- **連結**: https://leetcode.com/problems/median-of-two-sorted-arrays/
- **主題**: Array, Binary Search

## 題目描述

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

## 解法

### 解法一：合併排序法
**時間複雜度**: O(m+n)
**空間複雜度**: O(m+n)

#### 思路
使用兩個指標分別遍歷兩個陣列，將元素按順序合併到新陣列中，最後取中位數。

#### 程式碼
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

#### 重點
- 這個解法沒有達到題目要求的 O(log(m+n)) 時間複雜度
- 正確的解法應該使用二分搜尋

## 相關題目
- 295. Find Median from Data Stream
- 480. Sliding Window Median

## 心得筆記
這題的困難點在於要達到 O(log(m+n)) 的時間複雜度，需要使用二分搜尋法。
上述解法雖然能通過，但時間複雜度為 O(m+n)，不符合題目要求。