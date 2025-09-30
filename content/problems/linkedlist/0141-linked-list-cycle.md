# 141. Linked List Cycle

## Problem Information
- **Problem ID**: 141
- **Title**: Linked List Cycle
- **Difficulty**: Easy
- **Link**: https://leetcode.com/problems/linked-list-cycle/
- **Topics**: LinkedList, Two Pointers

## Problem Description

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.

## Solutions

### Solution 1: Two Pointers (Floyd's Cycle Detection)
**Time Complexity**: O(n)
**Space Complexity**: O(1)

#### Approach
Use two pointers - fast and slow. The fast pointer moves two steps at a time while the slow pointer moves one step. If there's a cycle, they will eventually meet.

#### Code
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

#### Key Points
- Two pointers technique is a classic algorithm for cycle detection
- Pay attention to boundary condition handling

## Related Problems
- 142. Linked List Cycle II
- 202. Happy Number

## Notes
Floyd's Cycle Detection Algorithm is an elegant algorithm, also known as the "Tortoise and Hare" algorithm. The key insight is that if there's a cycle, the fast pointer will eventually catch up to the slow pointer within the cycle.