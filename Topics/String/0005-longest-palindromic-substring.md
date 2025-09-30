# 5. Longest Palindromic Substring

## 題目資訊
- **題號**: 5
- **題目名稱**: Longest Palindromic Substring
- **難度**: Medium
- **連結**: https://leetcode.com/problems/longest-palindromic-substring/
- **主題**: String, Dynamic Programming

## 題目描述

Given a string s, return the longest palindromic substring in s.

## 解法

### 解法一：中心擴展法
**時間複雜度**: O(n^2)
**空間複雜度**: O(1)

#### 思路
從每個可能的中心點向外擴展，找出最長的回文子串。

#### 程式碼
```cpp
// 注意：原檔案中程式碼有誤，這裡提供正確的中心擴展解法
class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        
        int start = 0, maxLen = 1;
        
        for (int i = 0; i < s.length(); i++) {
            // 奇數長度回文
            int len1 = expandAroundCenter(s, i, i);
            // 偶數長度回文
            int len2 = expandAroundCenter(s, i, i + 1);
            
            int len = max(len1, len2);
            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }
        
        return s.substr(start, maxLen);
    }
    
private:
    int expandAroundCenter(string s, int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
};
```

## 相關題目
- 516. Longest Palindromic Subsequence
- 647. Palindromic Substrings

## 心得筆記
經典的字串處理題目，可以用多種方法解決：
- 中心擴展法
- 動態規劃
- Manacher 演算法