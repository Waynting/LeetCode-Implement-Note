// 自動生成的題目數據文件 - 請勿手動編輯
export interface Problem {
  id: string;  // 複合唯一ID (source-originalId)
  originalId: number;  // 原始題目ID
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  source: 'Leetcode' | 'Codeforces' | 'Atcoder' | 'CSES' | 'Zerojudge' | 'Other';
  topics: string[];
  hasNote: boolean;
  noteUrl?: string;
  description?: string;
  filePath?: string;
  markdownContent?: string;
}

export const PROBLEMS: Problem[] = [
  {
    "id": "atcoder-5678",
    "originalId": 5678,
    "title": "5678. Shortest Path",
    "difficulty": "Medium",
    "source": "Atcoder",
    "topics": [
      "Graph"
    ],
    "description": "Find the shortest path between two nodes in a weighted graph.",
    "hasNote": true,
    "noteUrl": "/content/problems/graph/5678-shortest-path.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/graph/5678-shortest-path.md",
    "markdownContent": "# 5678. Shortest Path\n\n## Problem Information\n- **Problem ID**: 5678\n- **Title**: Shortest Path\n- **Difficulty**: Hard\n- **Source**: Atcoder\n- **Link**: https://atcoder.jp/contests/abc123/tasks/abc123_d\n- **Topics**: Graph, Dijkstra\n\n## Problem Description\n\nFind the shortest path between two nodes in a weighted graph.\n\n## Solutions\n\n### Solution 1: Dijkstra's Algorithm\n**Time Complexity**: O((V + E) log V)\n**Space Complexity**: O(V)\n\n#### Code\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Test solution for AtCoder routing\n    return 0;\n}\n```\n\n## Personal Notes\nThis is a test file for AtCoder source routing verification."
  },
  {
    "id": "codeforces-1234",
    "originalId": 1234,
    "title": "1234. Coin Change Problem",
    "difficulty": "Medium",
    "source": "Codeforces",
    "topics": [
      "DynamicProgramming"
    ],
    "description": "Given a set of coin denominations and a target amount, find the minimum number of coins needed to make the target amount.",
    "hasNote": true,
    "noteUrl": "/content/problems/dynamicprogramming/1234-coin-change-problem.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/dynamicprogramming/1234-coin-change-problem.md",
    "markdownContent": "# 1234. Coin Change Problem\n\n## Problem Information\n- **Problem ID**: 1234\n- **Title**: Coin Change Problem\n- **Difficulty**: Medium\n- **Source**: Codeforces\n- **Link**: https://codeforces.com/contest/1234/problem/A\n- **Topics**: Dynamic Programming, Math\n\n## Problem Description\n\nGiven a set of coin denominations and a target amount, find the minimum number of coins needed to make the target amount.\n\n## Solutions\n\n### Solution 1: Dynamic Programming\n**Time Complexity**: O(n*amount)\n**Space Complexity**: O(amount)\n\n#### Code\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Test solution for Codeforces routing\n    return 0;\n}\n```\n\n## Personal Notes\nThis is a test file for Codeforces source routing verification."
  },
  {
    "id": "cses-9999",
    "originalId": 9999,
    "title": "9999. Activity Selection",
    "difficulty": "Medium",
    "source": "CSES",
    "topics": [
      "Greedy"
    ],
    "description": "Given n activities with their start and finish times, select the maximum number of activities that can be performed by a single person.",
    "hasNote": true,
    "noteUrl": "/content/problems/greedy/9999-activity-selection.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/greedy/9999-activity-selection.md",
    "markdownContent": "# 9999. Activity Selection\n\n## Problem Information\n- **Problem ID**: 9999\n- **Title**: Activity Selection\n- **Difficulty**: Easy\n- **Source**: CSES\n- **Link**: https://cses.fi/problemset/task/1629\n- **Topics**: Greedy, Sorting\n\n## Problem Description\n\nGiven n activities with their start and finish times, select the maximum number of activities that can be performed by a single person.\n\n## Solutions\n\n### Solution 1: Greedy Approach\n**Time Complexity**: O(n log n)\n**Space Complexity**: O(1)\n\n#### Code\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Test solution for CSES routing\n    return 0;\n}\n```\n\n## Personal Notes\nThis is a test file for CSES source routing verification."
  },
  {
    "id": "leetcode-2",
    "originalId": 2,
    "title": "2. Add Two Numbers",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "LinkedList"
    ],
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0002-add-two-numbers.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/linkedlist/0002-add-two-numbers.md",
    "markdownContent": "# 2. Add Two Numbers\n\n## Problem Information\n- **Problem ID**: 2\n- **Title**: Add Two Numbers\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/add-two-numbers/description/\n- **Topics**: LinkedList, Math\n\n## Problem Description\n\nYou are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n## Solutions\n\n### Solution 1: Simulate Addition\n**Time Complexity**: O(max(m,n))\n**Space Complexity**: O(max(m,n))\n\n#### Approach\nSimulate the process of adding two numbers, paying attention to carry handling.\n\n#### Code\n```cpp\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        //reverse l1 to get thevalue\n        ListNode* temp;\n        int newVal = 0;\n\n        //l1\n        temp = l1;\n        std::vector<int> Numl1;\n        int sizel1 = 0;\n        while(temp != nullptr){\n            Numl1.push_back(temp->val);\n            sizel1++;\n            temp = temp->next;\n        } \n        \n        //Calculate l1 true value\n        for(int i=0;i<Numl1.size();i++){\n            newVal += static_cast<int>(Numl1[i]*pow(10,i));\n        }\n\n        temp = l2;\n        std::vector<int> Numl2;\n        int sizel2 = 0;\n        while(temp != nullptr){\n            Numl2.push_back(temp->val);\n            sizel2++;\n            temp = temp->next;\n        } \n\n        //Calculate l1+l2 true value\n        for(int i=0;i<Numl2.size();i++){\n            newVal += static_cast<int>(Numl2[i]*pow(10,i));\n        }\n\n        //判斷是幾位數\n        int digit = 1;\n        int cal = newVal;\n        while(cal % 10 == cal){\n            cal = static_cast<int>(cal/10);\n            digit++;\n        }\n\n        //拆成不同digit + 存進new ListNode\n        ListNode* head = new ListNode(newVal % 10);\n        ListNode* answer = head;\n        for(int i=1 ;i<digit;i++){\n            ListNode* NewNode = new ListNode(newVal % 10);\n            answer->next = NewNode;\n            answer = answer->next;\n            newVal = (newVal - newVal % 10)/10;\n        }\n        return head;\n        \n    }\n```\n\n#### Issues\nThis solution will overflow because the problem range > INT_MAX.\nIt converts both lists to numbers first, adds them, then converts back to a list.\n\n## Related Problems\n- 445. Add Two Numbers II\n- 369. Plus One Linked List\n\n## Notes\nBasic LinkedList operation problem. Need to pay attention to:\n- Carry handling\n- Different lengths of the two linked lists\n- Possible carry at the final digit"
  },
  {
    "id": "leetcode-4",
    "originalId": 4,
    "title": "4. Median of Two Sorted Arrays",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "Array"
    ],
    "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    "hasNote": true,
    "noteUrl": "/content/problems/array/0004-median-of-two-sorted-arrays.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/0004-median-of-two-sorted-arrays.md",
    "markdownContent": "# 4. Median of Two Sorted Arrays\n\n## Problem Information\n- **Problem ID**: 4\n- **Title**: Median of Two Sorted Arrays\n- **Difficulty**: Hard\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/median-of-two-sorted-arrays/description/\n- **Topics**: Array, Binary Search\n\n## Problem Description\n\nGiven two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n## Solutions\n\n### Solution 1: Merge Sort Approach\n**Time Complexity**: O(m+n)\n**Space Complexity**: O(m+n)\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n            size_t fullsize = nums1.size() + nums2.size();\n            size_t point1 = 0, point2 = 0;\n            vector<int> ans;\n            while(point1 != nums1.size() && point2 != nums2.size()){\n                if(nums1[point1] > nums2[point2]){\n                    ans.push_back(nums2[point2]);\n                    point2++;\n                }\n                else if(nums1[point1] < nums2[point2]){\n                    ans.push_back(nums1[point1]);\n                    point1++;\n                }\n                else{\n                    ans.push_back(nums1[point1]);\n                    ans.push_back(nums2[point2]);\n                    point1++;\n                    point2++;\n                }\n            }\n    \n            while(point1 != nums1.size()){\n                ans.push_back(nums1[point1]);\n                point1++;\n            }\n    \n            while(point2 != nums2.size()){\n                ans.push_back(nums2[point2]);\n                point2++;\n            }\n            \n            double median;\n            if(fullsize %2 == 1){\n                median = ans[(fullsize-1)/2];\n                \n            }\n            else{\n                median = static_cast<double>( (ans[fullsize/2] + ans[(fullsize/2) -1]) ) /2;\n        \n            }\n            return median;\n    \n        }\n    };\n```\n\n## Personal Notes\nThis was my first attempt using merge sort approach. The solution works but I know it doesn't meet the O(log(m+n)) requirement. Need to learn binary search approach for optimal solution."
  },
  {
    "id": "leetcode-5",
    "originalId": 5,
    "title": "5. Longest Palindromic Substring",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "String"
    ],
    "description": "Given a string s, return the longest palindromic substring in s.",
    "hasNote": true,
    "noteUrl": "/content/problems/string/0005-longest-palindromic-substring.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/string/0005-longest-palindromic-substring.md",
    "markdownContent": "# 5. Longest Palindromic Substring\n\n## Problem Information\n- **Problem ID**: 5\n- **Title**: Longest Palindromic Substring\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/longest-palindromic-substring/description/\n- **Topics**: String, Dynamic Programming\n\n## Problem Description\n\nGiven a string s, return the longest palindromic substring in s.\n\n## Solutions\n\n### Solution 1: Expand Around Centers\n**Time Complexity**: O(n^2)\n**Space Complexity**: O(1)\n\n#### Approach\nExpand around each possible center point to find the longest palindromic substring.\n\n#### Code\n```cpp\n// Note: The original file had incorrect code, here's the correct expand around centers solution\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        if (s.empty()) return \"\";\n        \n        int start = 0, maxLen = 1;\n        \n        for (int i = 0; i < s.length(); i++) {\n            // Odd length palindrome\n            int len1 = expandAroundCenter(s, i, i);\n            // Even length palindrome\n            int len2 = expandAroundCenter(s, i, i + 1);\n            \n            int len = max(len1, len2);\n            if (len > maxLen) {\n                maxLen = len;\n                start = i - (len - 1) / 2;\n            }\n        }\n        \n        return s.substr(start, maxLen);\n    }\n    \nprivate:\n    int expandAroundCenter(string s, int left, int right) {\n        while (left >= 0 && right < s.length() && s[left] == s[right]) {\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n};\n```\n\n## Related Problems\n- 516. Longest Palindromic Subsequence\n- 647. Palindromic Substrings\n\n## Notes\nClassic string processing problem that can be solved with multiple approaches:\n- Expand around centers\n- Dynamic programming\n- Manacher's algorithm"
  },
  {
    "id": "leetcode-12",
    "originalId": 12,
    "title": "12. Integer to Roman",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "Math"
    ],
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0012-integer-to-roman.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/math/0012-integer-to-roman.md",
    "markdownContent": "# 12. Integer to Roman\n\n## Problem Information\n- **Problem ID**: 12\n- **Title**: Integer to Roman\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/integer-to-roman/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven an integer, convert it to a roman numeral.\n\n## Solutions\n\n### Solution 1: Greedy Approach\n**Time Complexity**: O(1)\n**Space Complexity**: O(1)\n\n#### Approach\nProcess each Roman numeral symbol from largest to smallest, using greedy strategy to use the largest symbols possible.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        string intToRoman(int num) {\n            int ans[13] = {0};\n            while(num >= 1000){ //M\n                ans[0]++;\n                num -=1000;\n            }\n    \n            if(num < 1000 && num >= 900){ //CM\n                ans[1]++;\n                num -= 900;\n            }\n            else if(num < 500 && num >= 400){ //CD\n                ans[2]++;\n                num -= 400;\n            }\n            while(num >= 500){ //D\n                ans[3]++;\n                num -= 500;\n            }\n            while(num >= 100){//C\n                ans[4]++;\n                num -= 100;\n            }\n    \n            if(num < 100 && num >= 90){ //XC\n                ans[5]++;\n                num -= 90;\n            }\n            else if(num < 50 && num >= 40){ //XL\n                ans[6]++;\n                num -= 40;\n            }\n            while(num >= 50){//L\n                ans[7]++;\n                num -= 50;\n            }\n            while(num >= 10){//X\n                ans[8]++;\n                num -= 10;\n            }\n    \n            if(num == 9){ //IX\n                ans[9]++;\n                num -= 9;\n            }\n            else if(num == 4){ //IV\n                ans[10]++;\n                num -= 4;\n            }\n            while(num >= 5){//V\n                ans[11]++;\n                num -= 5;\n            }\n            while(num >= 1){//I\n                ans[12]++;\n                num -= 1;\n            }\n    \n            string answer = \"\";\n            for(int i=0;i<13;i++){\n                for(int j=0; j < ans[i];j++){\n                    if(i == 0){\n                        answer+=\"M\";\n                    }\n                    else if(i == 1){\n                        answer+=\"CM\";\n                    }\n                    else if(i == 2){\n                        answer+=\"CD\";\n                    }\n                    else if(i == 3){\n                       answer+=\"D\";\n                    }\n                    else if(i == 4){\n                        answer+= \"C\";\n                    }\n                    else if(i == 5){\n                       answer+= \"XC\";\n                    }\n                    else if(i == 6){\n                        answer+= \"XL\";\n                    }\n                    else if(i == 7){\n                        answer+= \"L\";\n                    }\n                    else if(i == 8){\n                        answer+= \"X\";\n                    }\n                    else if(i == 9){\n                        answer+= \"IX\";\n                    }\n                    else if(i == 10){\n                        answer+= \"IV\";\n                    }\n                    else if(i == 11){\n                        answer+= \"V\";\n                    }\n                    else {\n                        answer+= \"I\";\n                    }\n                }\n            }\n            return answer;\n    \n        }\n    };\n```\n\n#### Key Points\n- Handle special cases (4, 9, 40, 90, 400, 900)\n- Process from largest to smallest in order\n\n## Related Problems\n- 13. Roman to Integer\n\n## Notes\nCan use arrays to store symbols and corresponding values to make the code more concise."
  },
  {
    "id": "leetcode-13",
    "originalId": 13,
    "title": "13. Roman to Integer",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "Math"
    ],
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0013-roman-to-integer.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/math/0013-roman-to-integer.md",
    "markdownContent": "# 13. Roman to Integer\n\n## Problem Information\n- **Problem ID**: 13\n- **Title**: Roman to Integer\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/roman-to-integer/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven a roman numeral, convert it to an integer.\n\n## Solutions\n\n### Solution 1: Traverse and Process\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nTraverse each character to calculate corresponding values, then handle special cases (IV, IX, XL, XC, CD, CM) at the end.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        int romanToInt(string s) {\n            int ans = 0;\n            \n            for(int i=0;i<s.size();i++){\n                if(s[i] == 'M'){\n                    ans += 1000;\n                }\n                else if(s[i] == 'D'){\n                    ans += 500;\n                }\n                else if(s[i] == 'C'){\n                    ans += 100;\n                }\n                else if(s[i] == 'L'){\n                    ans += 50;\n                }\n                else if(s[i] == 'X'){\n                    ans += 10;\n                }\n                else if(s[i] == 'V'){\n                    ans += 5;\n                }\n                else if(s[i] == 'I'){\n                    ans += 1;\n                }\n    \n                \n            }\n    \n            if(s.find(\"IV\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"IX\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"XL\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"XC\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"CD\") != string::npos ){\n                ans -=200;\n            }\n    \n            if(s.find(\"CM\") != string::npos ){\n                ans -=200;\n            }\n    \n            return ans;\n        }\n    };\n```\n\n#### Key Points\n- First accumulate values of all characters\n- Then subtract the over-counted parts from special combinations\n\n## Related Problems\n- 12. Integer to Roman\n\n## Notes\nWhile this solution works, it's not efficient. A better approach is to handle special cases during traversal by comparing the current character with the next character."
  },
  {
    "id": "leetcode-141",
    "originalId": 141,
    "title": "141. Linked List Cycle",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "LinkedList"
    ],
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0141-linked-list-cycle.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/linkedlist/0141-linked-list-cycle.md",
    "markdownContent": "# 141. Linked List Cycle\n\n## Problem Information\n- **Problem ID**: 141\n- **Title**: Linked List Cycle\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/linked-list-cycle/\n- **Topics**: LinkedList, Two Pointers\n\n## Problem Description\n\nGiven head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.\n\n## Solutions\n\n### Solution 1: Two Pointers (Floyd's Cycle Detection)\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nUse two pointers - fast and slow. The fast pointer moves two steps at a time while the slow pointer moves one step. If there's a cycle, they will eventually meet.\n\n#### Code\n```cpp\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\n    public:\n        bool hasCycle(ListNode *head) {\n            ListNode* slow = head;\n            \n            \n            if(head == nullptr || head-> next == nullptr){\n                return false;\n            }\n            ListNode* fast = head->next;\n    \n            while(slow != fast){\n                if(fast == nullptr || fast-> next == nullptr){\n                    return false;\n                }\n                \n                slow = slow->next;\n                fast = fast->next->next;\n            }\n    \n            return true;\n        }\n    };\n```\n\n#### Key Points\n- Two pointers technique is a classic algorithm for cycle detection\n- Pay attention to boundary condition handling\n\n## Related Problems\n- 142. Linked List Cycle II\n- 202. Happy Number\n\n## Notes\nFloyd's Cycle Detection Algorithm is an elegant algorithm, also known as the \"Tortoise and Hare\" algorithm. The key insight is that if there's a cycle, the fast pointer will eventually catch up to the slow pointer within the cycle."
  },
  {
    "id": "leetcode-383",
    "originalId": 383,
    "title": "383. Ransom Note",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "HashTable"
    ],
    "description": "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.",
    "hasNote": true,
    "noteUrl": "/content/problems/hashtable/0383-ransom-note.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/hashtable/0383-ransom-note.md",
    "markdownContent": "# 383. Ransom Note\n\n## Problem Information\n- **Problem ID**: 383\n- **Title**: Ransom Note\n- **Difficulty**: Easy\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/ransom-note/description/\n- **Topics**: HashTable, String\n\n## Problem Description\n\nGiven two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.\n\nEach letter in magazine can only be used once in ransomNote.\n\n## Solutions\n\n### Solution 1: Brute Force Approach (Less Efficient)\n**Time Complexity**: O(n*m)\n**Space Complexity**: O(1)\n\n#### Approach\nIterate through each character in ransomNote, find and remove the corresponding character from magazine.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           \n            for(int i=0;i<ransomNote.size();i++){\n                bool stop = false;\n                for(int j=0;j<magazine.size();j++){\n                    if(ransomNote[i] == magazine[j]){\n                        magazine.erase(j,1);\n                        stop = true;\n                        break;\n                    }\n                }\n                if(!stop){\n                    return false;\n                }\n            }\n            return true;\n        }\n    };\n```\n\n### Solution 2: Character Counting (Optimized)\n**Time Complexity**: O(n+m)\n**Space Complexity**: O(1)\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           int characterList[26] = {0};\n           for(int i=0;i<magazine.size();i++){\n                for(int j=0;j<26;j++){\n                    if(magazine[i] == 'a'+j ){\n                        characterList[j]++;\n                        break;\n                    }\n                }\n           }\n    \n           for(int i=0;i<ransomNote.size();i++){\n                characterList[ransomNote[i]-'a']--;\n           }\n    \n           for(int i=0;i<26;i++){\n                if(characterList[i] < 0){\n                    return false;\n                }\n           }\n           return true;\n            \n        }\n    };\n```\n\n## Personal Notes\nStarted with brute force (removing characters one by one) then learned the character counting approach. The array indexing trick `magazine[i] - 'a'` was new to me but makes the solution much cleaner."
  },
  {
    "id": "leetcode-543",
    "originalId": 543,
    "title": "543. Diameter of Binary Tree",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "Tree"
    ],
    "description": "Given the root of a binary tree, return the length of the diameter of the tree.",
    "hasNote": true,
    "noteUrl": "/content/problems/tree/0543-diameter-of-binary-tree.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/tree/0543-diameter-of-binary-tree.md",
    "markdownContent": "# 543. Diameter of Binary Tree\n\n## Problem Information\n- **Problem ID**: 543\n- **Title**: Diameter of Binary Tree\n- **Difficulty**: Easy\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/diameter-of-binary-tree/description/\n- **Topics**: Tree, DFS\n\n## Problem Description\n\nGiven the root of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\n## Solutions\n\n### Solution 1: DFS Recursion\n**Time Complexity**: O(n)\n**Space Complexity**: O(h), where h is the height of the tree\n\n#### Code\n```cpp\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int max_diameter = 0;\n\n    int dfs(TreeNode* node) {\n        if (node == nullptr) return 0;\n\n        int left = dfs(node->left);\n        int right = dfs(node->right);\n\n        max_diameter = max(max_diameter, left + right);\n\n        return max(left, right) + 1;\n    }\n\n    int diameterOfBinaryTree(TreeNode* root) {\n        dfs(root);\n        return max_diameter;\n    }\n};\n```\n\n## Personal Notes\nFirst tree DFS problem I solved. The tricky part was realizing that I need to track the maximum diameter separately while calculating depths. The global variable approach worked well here."
  },
  {
    "id": "leetcode-33",
    "originalId": 33,
    "title": "33. Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "BinarySearch"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/binarysearch/33-search-in-rotated-sorted-array.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/binarysearch/33-search-in-rotated-sorted-array.md",
    "markdownContent": "# 33. Search in Rotated Sorted Array\n\n## Problem Information\n- **Problem ID**: 33\n- **Title**: Search in Rotated Sorted Array\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/search-in-rotated-sorted-array/\n- **Topics**: Binary Search, Array\n\n## Problem Description\nGiven an integer array `nums` sorted in ascending order and then rotated at an unknown pivot, and an integer `target`, return the index of `target` if it is in `nums`; otherwise, return `-1`.  \nYou must write an algorithm with **O(log n)** time complexity.\n\nExample:  \nInput: `nums = [4,5,6,7,0,1,2]`, `target = 0` → Output: `4`\n\n## Core Idea (Hint-First Summary)\n- The array is a rotated version of a sorted array. In any binary-search iteration, **at least one side (left or right of `mid`) is sorted**.\n- Determine which side is sorted by comparing `nums[l]` and `nums[mid]`.\n- If the **left half is sorted** (`nums[l] <= nums[mid]`), check if `target` lies in `[nums[l], nums[mid])`. If yes, shrink right; otherwise, go right.\n- If the **right half is sorted**, check if `target` lies in `(nums[mid], nums[r]]`. If yes, go right; otherwise, shrink right boundary to the left half.\n- Maintain correct **boundaries and inclusivity**. Use **inclusive bounds** (`l=0, r=n-1`) with the loop `while (l <= r)` and move pointers with `l = mid + 1` or `r = mid - 1` when excluding `mid`.\n\n## Solution 1: Binary Search on Rotated Array (Determining Sorted Half)\n**Time Complexity**: O(log n)  \n**Space Complexity**: O(1)\n\n### Pseudocode (Language-Agnostic)\n```text\nl = 0; r = n - 1\nwhile l <= r:\n    mid = (l + r) // 2\n    if nums[mid] == target: return mid\n\n    if nums[l] <= nums[mid]:            # left half is sorted\n        if nums[l] <= target < nums[mid]:\n            r = mid - 1                 # keep left half\n        else:\n            l = mid + 1                 # go right half\n    else:                               # right half is sorted\n        if nums[mid] < target <= nums[r]:\n            l = mid + 1                 # keep right half\n        else:\n            r = mid - 1                 # go left half\nreturn -1\n```\n\n### Why This Works (Invariants)\n- **Invariant 1**: On every loop, search space is within a valid index interval `[l, r]`.\n- **Invariant 2**: At least one side of `mid` is sorted. We exploit that side to decide where `target` can (or cannot) reside.\n- **Invariant 3**: Each step strictly reduces the interval size (`r - l` decreases), avoiding infinite loops.\n\n### Common Pitfalls\n- Mixing **half-open** (`[l, r)`) and **inclusive** (`[l, r]`) styles. Be consistent.\n- Accessing `nums[r]` while using a half-open interval with `r = n` → out-of-bounds.\n- Using strict `<` on both ends and accidentally excluding equality cases (`target == nums[l]` or `target == nums[r]`).\n- Not moving past `mid` (`l = mid` / `r = mid`) → potential infinite loop.\n- Edge cases: arrays of length 0 or 1, rotation at index `0` (unrotated), or target at boundaries.\n\n## My Attempt (for Reference)\n> The following is the user's working attempt (C++). It correctly adopts **inclusive bounds** and applies the sorted-half checks and boundary moves.\n\n```cpp\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size()-1;\n        while(l <= r){\n            int mid = (l+r)/2;\n            if(nums[mid] == target){\n                return mid;\n            }\n            else{\n                if(nums[l] <= nums[mid]){ \n                    // left is sorted\n                    if(nums[l] <= target && target < nums[mid]){\n                        r = mid - 1;\n                    }\n                    else{\n                        l = mid + 1;\n                    }\n                }\n                else{\n                    // right is sorted\n                    if(nums[mid] < target && target <= nums[r]){\n                        l = mid + 1;\n                    }\n                    else{\n                        r = mid - 1;\n                    }\n                }\n            }\n        }\n        return -1;\n    }\n};\n```\n\n## Targeted Test Cases\n```\n1) nums = [1], target = 1   → 0\n2) nums = [1], target = 0   → -1\n3) nums = [1,3], target = 3 → 1\n4) nums = [3,1], target = 1 → 1        # small rotated\n5) nums = [4,5,6,7,0,1,2], target = 0 → 4\n6) nums = [4,5,6,7,0,1,2], target = 4 → 0\n7) nums = [5,1,3], target = 5         → 0  # mid on left-sorted edge\n8) nums = [5,1,3], target = 2         → -1\n```\n\n## Personal Notes\n- **Heuristic**: “One side is always sorted.” First decide the sorted side with `nums[l] <= nums[mid]`.\n- **Inclusivity**: In left-sorted case, use `nums[l] <= target < nums[mid]`. In right-sorted, use `nums[mid] < target <= nums[r]`.\n- **Pointers**: Excluding `mid` must move past it: `l = mid + 1` or `r = mid - 1`.\n- **Mental model**: Think of “cutting away the impossible half” using sorted-side boundaries.\n\n## Related Problems\n- 81. Search in Rotated Sorted Array II (with duplicates)\n- 153/154. Find Minimum in Rotated Sorted Array (I/II)\n- 34. Find First and Last Position of Element in Sorted Array (classic boundary binary search)\n"
  },
  {
    "id": "leetcode-2221",
    "originalId": 2221,
    "title": "2221. Find Triangular Sum of an Array",
    "difficulty": "Medium",
    "source": "LeetCode",
    "topics": [
      "Array"
    ],
    "description": "Given an integer array `nums` of length `n` containing digits `0..9`, repeatedly generate a new array by taking the sum of adjacent values modulo `10` until only one element remains. Return that last remaining value.",
    "hasNote": true,
    "noteUrl": "/content/problems/array/2221-find-triangular-sum-of-an-array.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/2221-find-triangular-sum-of-an-array.md",
    "markdownContent": "# 2221. Find Triangular Sum of an Array\n\n## Problem Information\n- **Problem ID**: 2221\n- **Title**: Find Triangular Sum of an Array\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/find-triangular-sum-of-an-array/\n- **Topics**: Array, Simulation, Math, Combinatorics\n\n## Problem Description\n\nGiven an integer array `nums` of length `n` containing digits `0..9`, repeatedly generate a new array by taking the sum of adjacent values modulo `10` until only one element remains. Return that last remaining value.\n\nFormally, while the array has more than one element, replace it with an array of length `m-1` where `new[i] = (old[i] + old[i+1]) % 10`. The answer is the single value left after these reductions.\n\n## Solutions\n\n### Solution 1: Iterative Adjacent-Sum Simulation (User Implementation)\n**Idea**: Simulate the triangular reduction level by level, always taking adjacent sums mod 10 until one element remains.\n\n**Time Complexity**: O(n^2) in the worst case (n + (n-1) + ... + 1)\n**Space Complexity**: O(n)\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    int triangularSum(vector<int>& nums) {\n        if(nums.size() == 1){\n            return nums[0];\n        }\n\n        vector<int> cal;\n        for(int i=0;i<nums.size();i++){\n            cal.push_back(nums[i]);\n        }\n        while(cal.size() != 1){\n            vector<int> temp;\n            for(int i=0;i < cal.size() - 1;i++){\n                int ac = (cal[i]+cal[i+1] )%10;\n                temp.push_back(ac);\n            }\n\n            cal.clear();\n            for(int i=0;i < temp.size();i++){\n                cal.push_back(temp[i]);\n            }\n        }\n        return cal[0]%10 ;\n    }\n};\n```\n\n### Solution 2 (Optional): Combinatorial Shortcut (No full code)\n**Key Fact**: The final answer equals\n\\[ \\sum_{i=0}^{n-1} \\binom{n-1}{i} \\cdot nums[i] \\pmod{10}. \\]\nThis follows from Pascal’s rule expanding each level (like repeated convolution). One can compute this efficiently by precomputing binomial coefficients modulo 2 and 5 (Lucas theorem) and combining via the Chinese Remainder Theorem, or by building a single Pascal row mod 10 in O(n^2) time (still fine for typical constraints).\n\n**Time Complexity**: O(n)–O(n^2) depending on method chosen\n**Space Complexity**: O(n)\n\n#### (Pseudocode Sketch)\n```text\nn = len(nums)\nC = array of size n initialized as [1, 0, 0, ...]  # represents row of Pascal mod 10\nfor k in 1..n-1:                 # build row n-1 using in-place update (right-to-left)\n    for i in k..1 step -1:\n        C[i] = (C[i] + C[i-1]) mod 10\nans = sum( C[i] * nums[i] ) mod 10\nreturn ans\n```\n\n## Personal Notes\n- From implementation: “Nothing special; straightforward simulation works.”\n- Minor micro-optimizations possible:\n  - Use in-place updates on a single vector to avoid extra copies.\n  - Early return when length becomes 1.\n- The combinatorial identity is a neat alternative if you want a one-pass dot product with Pascal row mod 10.\n\n"
  },
  {
    "id": "other-3333",
    "originalId": 3333,
    "title": "3333. Count Set Bits",
    "difficulty": "Medium",
    "source": "Other",
    "topics": [
      "BitManipulation"
    ],
    "description": "Count the number of set bits (1s) in the binary representation of a given number.",
    "hasNote": true,
    "noteUrl": "/content/problems/bitmanipulation/3333-count-set-bits.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/bitmanipulation/3333-count-set-bits.md",
    "markdownContent": "# 3333. Count Set Bits\n\n## Problem Information\n- **Problem ID**: 3333\n- **Title**: Count Set Bits\n- **Difficulty**: Easy\n- **Source**: Other\n- **Link**: https://example.com/problem/3333\n- **Topics**: Bit Manipulation, Math\n\n## Problem Description\n\nCount the number of set bits (1s) in the binary representation of a given number.\n\n## Solutions\n\n### Solution 1: Built-in Function\n**Time Complexity**: O(1)\n**Space Complexity**: O(1)\n\n#### Code\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Test solution for Other source routing\n    return 0;\n}\n```\n\n## Personal Notes\nThis is a test file for Other source routing verification."
  },
  {
    "id": "zerojudge-7777",
    "originalId": 7777,
    "title": "7777. Search in Rotated Array",
    "difficulty": "Medium",
    "source": "Zerojudge",
    "topics": [
      "BinarySearch"
    ],
    "description": "Search for a target value in a rotated sorted array.",
    "hasNote": true,
    "noteUrl": "/content/problems/binarysearch/7777-search-in-rotated-array.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/binarysearch/7777-search-in-rotated-array.md",
    "markdownContent": "# 7777. Search in Rotated Array\n\n## Problem Information\n- **Problem ID**: 7777\n- **Title**: Search in Rotated Array\n- **Difficulty**: Medium\n- **Source**: Zerojudge\n- **Link**: https://zerojudge.tw/ShowProblem?problemid=d999\n- **Topics**: Binary Search, Array\n\n## Problem Description\n\nSearch for a target value in a rotated sorted array.\n\n## Solutions\n\n### Solution 1: Modified Binary Search\n**Time Complexity**: O(log n)\n**Space Complexity**: O(1)\n\n#### Code\n```cpp\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Test solution for Zerojudge routing\n    return 0;\n}\n```\n\n## Personal Notes\nThis is a test file for Zerojudge source routing verification."
  }
];

export const TOPICS = [
  "Array",
  "LinkedList",
  "Tree",
  "String",
  "Math",
  "HashTable",
  "BFS",
  "DFS",
  "DynamicProgramming",
  "Greedy",
  "Backtracking",
  "BinarySearch",
  "TwoPointers",
  "SlidingWindow",
  "Sort",
  "Stack",
  "Queue",
  "Graph",
  "BitManipulation"
];

export const SOURCES = [
  "Leetcode",
  "Codeforces",
  "Atcoder",
  "CSES",
  "Zerojudge",
  "Other"
];

export const getTopicStats = () => [
  {
    "topic": "Graph",
    "count": 1
  },
  {
    "topic": "DynamicProgramming",
    "count": 1
  },
  {
    "topic": "Greedy",
    "count": 1
  },
  {
    "topic": "LinkedList",
    "count": 2
  },
  {
    "topic": "Array",
    "count": 2
  },
  {
    "topic": "String",
    "count": 1
  },
  {
    "topic": "Math",
    "count": 2
  },
  {
    "topic": "HashTable",
    "count": 1
  },
  {
    "topic": "Tree",
    "count": 1
  },
  {
    "topic": "BinarySearch",
    "count": 2
  },
  {
    "topic": "BitManipulation",
    "count": 1
  }
];

export const getDifficultyStats = () => ({
  "Easy": 0,
  "Medium": 15,
  "Hard": 0
});

export const getAllProblems = () => PROBLEMS;
export const getAllTopics = () => TOPICS;
export const getAllSources = () => SOURCES;
export const getProblemById = (id: string) => PROBLEMS.find(p => p.id === id);
export const getProblemByOriginalId = (originalId: number, source: string) => PROBLEMS.find(p => p.originalId === originalId && p.source.toLowerCase() === source.toLowerCase());
export const getProblemsByTopic = (topic: string) => 
  PROBLEMS.filter(p => p.topics.some(t => t.toLowerCase() === topic.toLowerCase()));
export const getProblemsBySource = (source: string) =>
  PROBLEMS.filter(p => p.source.toLowerCase() === source.toLowerCase());
