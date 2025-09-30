# 13. Roman to Integer

## 題目資訊
- **題號**: 13
- **題目名稱**: Roman to Integer
- **難度**: Easy
- **連結**: https://leetcode.com/problems/roman-to-integer/
- **主題**: Math, String

## 題目描述

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Given a roman numeral, convert it to an integer.

## 解法

### 解法一：遍歷處理
**時間複雜度**: O(n)
**空間複雜度**: O(1)

#### 思路
遍歷每個字符計算對應值，最後處理特殊情況（IV, IX, XL, XC, CD, CM）。

#### 程式碼
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

#### 重點
- 先累加所有字符的值
- 再減去特殊組合多算的部分

## 相關題目
- 12. Integer to Roman

## 心得筆記
這個解法雖然能過，但效率不高。更好的做法是在遍歷時就處理特殊情況，
比較當前字符和下一個字符的大小關係。