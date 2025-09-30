# 2. Add Two Numbers

## 題目資訊
- **題號**: 2
- **題目名稱**: Add Two Numbers
- **難度**: Medium
- **連結**: https://leetcode.com/problems/add-two-numbers/
- **主題**: LinkedList, Math

## 題目描述

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

## 解法

### 解法一：模擬加法
**時間複雜度**: O(max(m,n))
**空間複雜度**: O(max(m,n))

#### 思路
模擬兩數相加的過程，注意進位的處理。

#### 程式碼
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

#### 問題
這個解法會 Overflow，因為題目的範圍 > INT_MAX。
是把兩個 List 都先轉為數字，相加後再轉回 List。

## 相關題目
- 445. Add Two Numbers II
- 369. Plus One Linked List

## 心得筆記
LinkedList 的基本操作題，需要注意：
- 進位的處理
- 兩個鏈表長度不同的情況
- 最後一位可能有進位