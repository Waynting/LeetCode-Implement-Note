# 383. Ransom Note

## 題目資訊
- **題號**: 383
- **題目名稱**: Ransom Note
- **難度**: Easy
- **連結**: https://leetcode.com/problems/ransom-note/
- **主題**: HashTable, String

## 題目描述

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

## 解法

### 解法一：暴力解法（效率較差）
**時間複雜度**: O(n*m)
**空間複雜度**: O(1)

#### 思路
遍歷 ransomNote 的每個字符，在 magazine 中尋找並刪除對應字符。

#### 程式碼
```cpp
class Solution {
    public:
        bool canConstruct(string ransomNote, string magazine) {
           
            for(int i=0;i<ransomNote.size();i++){
                bool stop = false;
                for(int j=0;j<magazine.size();j++){
                    if(ransomNote[i] == magazine[j]){
                        magazine.erase(j,1);
                        stop = true;
                        break;
                    }
                }
                if(!stop){
                    return false;
                }
            }
            return true;
        }
    };
```

### 解法二：字符計數法（優化版）
**時間複雜度**: O(n+m)
**空間複雜度**: O(1)

#### 思路
使用陣列記錄 magazine 中每個字符的出現次數，然後檢查是否足夠構成 ransomNote。

#### 程式碼
```cpp
class Solution {
    public:
        bool canConstruct(string ransomNote, string magazine) {
           int characterList[26] = {0};
           for(int i=0;i<magazine.size();i++){
                for(int j=0;j<26;j++){
                    if(magazine[i] == 'a'+j ){
                        characterList[j]++;
                        break;
                    }
                }
           }
    
           for(int i=0;i<ransomNote.size();i++){
                characterList[ransomNote[i]-'a']--;
           }
    
           for(int i=0;i<26;i++){
                if(characterList[i] < 0){
                    return false;
                }
           }
           return true;
            
        }
    };
```

#### 重點
- 第二種解法使用 Hash Table 的概念，效率更高
- 可以進一步優化內層迴圈，直接使用 `characterList[magazine[i] - 'a']++`

## 相關題目
- 387. First Unique Character in a String
- 242. Valid Anagram

## 心得筆記
從暴力解法到優化解法的過程，體現了 Hash Table 在字符統計問題上的優勢。