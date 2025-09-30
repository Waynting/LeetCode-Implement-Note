# 383. Ransom Note

## Problem Information
- **Problem ID**: 383
- **Title**: Ransom Note
- **Difficulty**: Easy
- **Link**: https://leetcode.com/problems/ransom-note/description/
- **Topics**: HashTable, String

## Problem Description

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

## Solutions

### Solution 1: Brute Force Approach (Less Efficient)
**Time Complexity**: O(n*m)
**Space Complexity**: O(1)

#### Approach
Iterate through each character in ransomNote, find and remove the corresponding character from magazine.

#### Code
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

### Solution 2: Character Counting (Optimized)
**Time Complexity**: O(n+m)
**Space Complexity**: O(1)

#### Approach
Use an array to count the occurrence of each character in magazine, then check if it's sufficient to construct ransomNote.

#### Code
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

#### Key Points
- The second solution uses Hash Table concept for better efficiency
- Can further optimize the inner loop by directly using `characterList[magazine[i] - 'a']++`

## Related Problems
- 387. First Unique Character in a String
- 242. Valid Anagram

## Notes
The progression from brute force to optimized solution demonstrates the advantage of Hash Table in character counting problems.