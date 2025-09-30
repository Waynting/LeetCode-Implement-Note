# 5. Longest Palindromic Substring

## Problem Information
- **Problem ID**: 5
- **Title**: Longest Palindromic Substring
- **Difficulty**: Medium
- **Link**: https://leetcode.com/problems/longest-palindromic-substring/description/
- **Topics**: String, Dynamic Programming

## Problem Description

Given a string s, return the longest palindromic substring in s.

## Solutions

### Solution 1: Expand Around Centers
**Time Complexity**: O(n^2)
**Space Complexity**: O(1)

#### Approach
Expand around each possible center point to find the longest palindromic substring.

#### Code
```cpp
// Note: The original file had incorrect code, here's the correct expand around centers solution
class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        
        int start = 0, maxLen = 1;
        
        for (int i = 0; i < s.length(); i++) {
            // Odd length palindrome
            int len1 = expandAroundCenter(s, i, i);
            // Even length palindrome
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

## Related Problems
- 516. Longest Palindromic Subsequence
- 647. Palindromic Substrings

## Notes
Classic string processing problem that can be solved with multiple approaches:
- Expand around centers
- Dynamic programming
- Manacher's algorithm