# 141. Linked List Cycle

## 題目資訊
- **題號**: 141
- **題目名稱**: Linked List Cycle
- **難度**: Easy
- **連結**: https://leetcode.com/problems/linked-list-cycle/
- **主題**: LinkedList, Two Pointers

## 題目描述

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.

## 解法

### 解法一：快慢指標（Floyd's Cycle Detection）
**時間複雜度**: O(n)
**空間複雜度**: O(1)

#### 思路
使用快慢指標，快指標每次走兩步，慢指標每次走一步。如果有環，快慢指標必定會相遇。

#### 程式碼
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
    public:
        bool hasCycle(ListNode *head) {
            ListNode* slow = head;
            
            
            if(head == nullptr || head-> next == nullptr){
                return false;
            }
            ListNode* fast = head->next;
    
            while(slow != fast){
                if(fast == nullptr || fast-> next == nullptr){
                    return false;
                }
                
                slow = slow->next;
                fast = fast->next->next;
            }
    
            return true;
        }
    };
```

#### 重點
- 快慢指標法是檢測環的經典算法
- 注意邊界條件的處理

## 相關題目
- 142. Linked List Cycle II
- 202. Happy Number

## 心得筆記
Floyd's Cycle Detection Algorithm 是一個很巧妙的算法，也被稱為「龜兔賽跑算法」。