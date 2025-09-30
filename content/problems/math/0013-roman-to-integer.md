# 13. Roman to Integer

## Problem Information
- **Problem ID**: 13
- **Title**: Roman to Integer
- **Difficulty**: Easy
- **Link**: https://leetcode.com/problems/roman-to-integer/description/
- **Topics**: Math, String

## Problem Description

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Given a roman numeral, convert it to an integer.

## Solutions

### Solution 1: Traverse and Process
**Time Complexity**: O(n)
**Space Complexity**: O(1)

#### Approach
Traverse each character to calculate corresponding values, then handle special cases (IV, IX, XL, XC, CD, CM) at the end.

#### Code
```cpp
class Solution {
    public:
        int romanToInt(string s) {
            int ans = 0;
            
            for(int i=0;i<s.size();i++){
                if(s[i] == 'M'){
                    ans += 1000;
                }
                else if(s[i] == 'D'){
                    ans += 500;
                }
                else if(s[i] == 'C'){
                    ans += 100;
                }
                else if(s[i] == 'L'){
                    ans += 50;
                }
                else if(s[i] == 'X'){
                    ans += 10;
                }
                else if(s[i] == 'V'){
                    ans += 5;
                }
                else if(s[i] == 'I'){
                    ans += 1;
                }
    
                
            }
    
            if(s.find("IV") != string::npos ){
                ans -=2;
            }
    
            if(s.find("IX") != string::npos ){
                ans -=2;
            }
    
            if(s.find("XL") != string::npos ){
                ans -=20;
            }
    
            if(s.find("XC") != string::npos ){
                ans -=20;
            }
    
            if(s.find("CD") != string::npos ){
                ans -=200;
            }
    
            if(s.find("CM") != string::npos ){
                ans -=200;
            }
    
            return ans;
        }
    };
```

#### Key Points
- First accumulate values of all characters
- Then subtract the over-counted parts from special combinations

## Related Problems
- 12. Integer to Roman

## Notes
While this solution works, it's not efficient. A better approach is to handle special cases during traversal by comparing the current character with the next character.