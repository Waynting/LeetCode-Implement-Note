# 2. Add Two Numbers

## Problem Information
- **Problem ID**: 2
- **Title**: Add Two Numbers
- **Difficulty**: Medium
- **Link**: https://leetcode.com/problems/add-two-numbers/description/
- **Topics**: LinkedList, Math

## Problem Description

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

## Solutions

### Solution 1: Simulate Addition
**Time Complexity**: O(max(m,n))
**Space Complexity**: O(max(m,n))

#### Approach
Simulate the process of adding two numbers, paying attention to carry handling.

#### Code
```cpp
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        //reverse l1 to get thevalue
        ListNode* temp;
        int newVal = 0;

        //l1
        temp = l1;
        std::vector<int> Numl1;
        int sizel1 = 0;
        while(temp != nullptr){
            Numl1.push_back(temp->val);
            sizel1++;
            temp = temp->next;
        } 
        
        //Calculate l1 true value
        for(int i=0;i<Numl1.size();i++){
            newVal += static_cast<int>(Numl1[i]*pow(10,i));
        }

        temp = l2;
        std::vector<int> Numl2;
        int sizel2 = 0;
        while(temp != nullptr){
            Numl2.push_back(temp->val);
            sizel2++;
            temp = temp->next;
        } 

        //Calculate l1+l2 true value
        for(int i=0;i<Numl2.size();i++){
            newVal += static_cast<int>(Numl2[i]*pow(10,i));
        }

        //判斷是幾位數
        int digit = 1;
        int cal = newVal;
        while(cal % 10 == cal){
            cal = static_cast<int>(cal/10);
            digit++;
        }

        //拆成不同digit + 存進new ListNode
        ListNode* head = new ListNode(newVal % 10);
        ListNode* answer = head;
        for(int i=1 ;i<digit;i++){
            ListNode* NewNode = new ListNode(newVal % 10);
            answer->next = NewNode;
            answer = answer->next;
            newVal = (newVal - newVal % 10)/10;
        }
        return head;
        
    }
```

#### Issues
This solution will overflow because the problem range > INT_MAX.
It converts both lists to numbers first, adds them, then converts back to a list.

## Related Problems
- 445. Add Two Numbers II
- 369. Plus One Linked List

## Notes
Basic LinkedList operation problem. Need to pay attention to:
- Carry handling
- Different lengths of the two linked lists
- Possible carry at the final digit