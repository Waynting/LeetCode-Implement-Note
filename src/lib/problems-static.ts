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
  createdAt: string;  // 創建日期 (YYYY-MM-DD)
}

export const PROBLEMS: Problem[] = [
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
    "markdownContent": "# 2. Add Two Numbers\n\n## Problem Information\n- **Problem ID**: 2\n- **Title**: Add Two Numbers\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/add-two-numbers/description/\n- **Topics**: LinkedList, Math\n\n## Problem Description\n\nYou are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n## Solutions\n\n### Solution 1: Simulate Addition\n**Time Complexity**: O(max(m,n))\n**Space Complexity**: O(max(m,n))\n\n#### Approach\nSimulate the process of adding two numbers, paying attention to carry handling.\n\n#### Code\n```cpp\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        //reverse l1 to get thevalue\n        ListNode* temp;\n        int newVal = 0;\n\n        //l1\n        temp = l1;\n        std::vector<int> Numl1;\n        int sizel1 = 0;\n        while(temp != nullptr){\n            Numl1.push_back(temp->val);\n            sizel1++;\n            temp = temp->next;\n        } \n        \n        //Calculate l1 true value\n        for(int i=0;i<Numl1.size();i++){\n            newVal += static_cast<int>(Numl1[i]*pow(10,i));\n        }\n\n        temp = l2;\n        std::vector<int> Numl2;\n        int sizel2 = 0;\n        while(temp != nullptr){\n            Numl2.push_back(temp->val);\n            sizel2++;\n            temp = temp->next;\n        } \n\n        //Calculate l1+l2 true value\n        for(int i=0;i<Numl2.size();i++){\n            newVal += static_cast<int>(Numl2[i]*pow(10,i));\n        }\n\n        //判斷是幾位數\n        int digit = 1;\n        int cal = newVal;\n        while(cal % 10 == cal){\n            cal = static_cast<int>(cal/10);\n            digit++;\n        }\n\n        //拆成不同digit + 存進new ListNode\n        ListNode* head = new ListNode(newVal % 10);\n        ListNode* answer = head;\n        for(int i=1 ;i<digit;i++){\n            ListNode* NewNode = new ListNode(newVal % 10);\n            answer->next = NewNode;\n            answer = answer->next;\n            newVal = (newVal - newVal % 10)/10;\n        }\n        return head;\n        \n    }\n```\n\n#### Issues\nThis solution will overflow because the problem range > INT_MAX.\nIt converts both lists to numbers first, adds them, then converts back to a list.\n\n## Related Problems\n- 445. Add Two Numbers II\n- 369. Plus One Linked List\n\n## Notes\nBasic LinkedList operation problem. Need to pay attention to:\n- Carry handling\n- Different lengths of the two linked lists\n- Possible carry at the final digit",
    "createdAt": "2025-09-30"
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
    "markdownContent": "# 4. Median of Two Sorted Arrays\n\n## Problem Information\n- **Problem ID**: 4\n- **Title**: Median of Two Sorted Arrays\n- **Difficulty**: Hard\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/median-of-two-sorted-arrays/description/\n- **Topics**: Array, Binary Search\n\n## Problem Description\n\nGiven two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n## Solutions\n\n### Solution 1: Merge Sort Approach\n**Time Complexity**: O(m+n)\n**Space Complexity**: O(m+n)\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n            size_t fullsize = nums1.size() + nums2.size();\n            size_t point1 = 0, point2 = 0;\n            vector<int> ans;\n            while(point1 != nums1.size() && point2 != nums2.size()){\n                if(nums1[point1] > nums2[point2]){\n                    ans.push_back(nums2[point2]);\n                    point2++;\n                }\n                else if(nums1[point1] < nums2[point2]){\n                    ans.push_back(nums1[point1]);\n                    point1++;\n                }\n                else{\n                    ans.push_back(nums1[point1]);\n                    ans.push_back(nums2[point2]);\n                    point1++;\n                    point2++;\n                }\n            }\n    \n            while(point1 != nums1.size()){\n                ans.push_back(nums1[point1]);\n                point1++;\n            }\n    \n            while(point2 != nums2.size()){\n                ans.push_back(nums2[point2]);\n                point2++;\n            }\n            \n            double median;\n            if(fullsize %2 == 1){\n                median = ans[(fullsize-1)/2];\n                \n            }\n            else{\n                median = static_cast<double>( (ans[fullsize/2] + ans[(fullsize/2) -1]) ) /2;\n        \n            }\n            return median;\n    \n        }\n    };\n```\n\n## Personal Notes\nThis was my first attempt using merge sort approach. The solution works but I know it doesn't meet the O(log(m+n)) requirement. Need to learn binary search approach for optimal solution.",
    "createdAt": "2025-09-30"
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
    "markdownContent": "# 5. Longest Palindromic Substring\n\n## Problem Information\n- **Problem ID**: 5\n- **Title**: Longest Palindromic Substring\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/longest-palindromic-substring/description/\n- **Topics**: String, Dynamic Programming\n\n## Problem Description\n\nGiven a string s, return the longest palindromic substring in s.\n\n## Solutions\n\n### Solution 1: Expand Around Centers\n**Time Complexity**: O(n^2)\n**Space Complexity**: O(1)\n\n#### Approach\nExpand around each possible center point to find the longest palindromic substring.\n\n#### Code\n```cpp\n// Note: The original file had incorrect code, here's the correct expand around centers solution\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        if (s.empty()) return \"\";\n        \n        int start = 0, maxLen = 1;\n        \n        for (int i = 0; i < s.length(); i++) {\n            // Odd length palindrome\n            int len1 = expandAroundCenter(s, i, i);\n            // Even length palindrome\n            int len2 = expandAroundCenter(s, i, i + 1);\n            \n            int len = max(len1, len2);\n            if (len > maxLen) {\n                maxLen = len;\n                start = i - (len - 1) / 2;\n            }\n        }\n        \n        return s.substr(start, maxLen);\n    }\n    \nprivate:\n    int expandAroundCenter(string s, int left, int right) {\n        while (left >= 0 && right < s.length() && s[left] == s[right]) {\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n};\n```\n\n## Related Problems\n- 516. Longest Palindromic Subsequence\n- 647. Palindromic Substrings\n\n## Notes\nClassic string processing problem that can be solved with multiple approaches:\n- Expand around centers\n- Dynamic programming\n- Manacher's algorithm",
    "createdAt": "2025-09-30"
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
    "markdownContent": "# 12. Integer to Roman\n\n## Problem Information\n- **Problem ID**: 12\n- **Title**: Integer to Roman\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/integer-to-roman/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven an integer, convert it to a roman numeral.\n\n## Solutions\n\n### Solution 1: Greedy Approach\n**Time Complexity**: O(1)\n**Space Complexity**: O(1)\n\n#### Approach\nProcess each Roman numeral symbol from largest to smallest, using greedy strategy to use the largest symbols possible.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        string intToRoman(int num) {\n            int ans[13] = {0};\n            while(num >= 1000){ //M\n                ans[0]++;\n                num -=1000;\n            }\n    \n            if(num < 1000 && num >= 900){ //CM\n                ans[1]++;\n                num -= 900;\n            }\n            else if(num < 500 && num >= 400){ //CD\n                ans[2]++;\n                num -= 400;\n            }\n            while(num >= 500){ //D\n                ans[3]++;\n                num -= 500;\n            }\n            while(num >= 100){//C\n                ans[4]++;\n                num -= 100;\n            }\n    \n            if(num < 100 && num >= 90){ //XC\n                ans[5]++;\n                num -= 90;\n            }\n            else if(num < 50 && num >= 40){ //XL\n                ans[6]++;\n                num -= 40;\n            }\n            while(num >= 50){//L\n                ans[7]++;\n                num -= 50;\n            }\n            while(num >= 10){//X\n                ans[8]++;\n                num -= 10;\n            }\n    \n            if(num == 9){ //IX\n                ans[9]++;\n                num -= 9;\n            }\n            else if(num == 4){ //IV\n                ans[10]++;\n                num -= 4;\n            }\n            while(num >= 5){//V\n                ans[11]++;\n                num -= 5;\n            }\n            while(num >= 1){//I\n                ans[12]++;\n                num -= 1;\n            }\n    \n            string answer = \"\";\n            for(int i=0;i<13;i++){\n                for(int j=0; j < ans[i];j++){\n                    if(i == 0){\n                        answer+=\"M\";\n                    }\n                    else if(i == 1){\n                        answer+=\"CM\";\n                    }\n                    else if(i == 2){\n                        answer+=\"CD\";\n                    }\n                    else if(i == 3){\n                       answer+=\"D\";\n                    }\n                    else if(i == 4){\n                        answer+= \"C\";\n                    }\n                    else if(i == 5){\n                       answer+= \"XC\";\n                    }\n                    else if(i == 6){\n                        answer+= \"XL\";\n                    }\n                    else if(i == 7){\n                        answer+= \"L\";\n                    }\n                    else if(i == 8){\n                        answer+= \"X\";\n                    }\n                    else if(i == 9){\n                        answer+= \"IX\";\n                    }\n                    else if(i == 10){\n                        answer+= \"IV\";\n                    }\n                    else if(i == 11){\n                        answer+= \"V\";\n                    }\n                    else {\n                        answer+= \"I\";\n                    }\n                }\n            }\n            return answer;\n    \n        }\n    };\n```\n\n#### Key Points\n- Handle special cases (4, 9, 40, 90, 400, 900)\n- Process from largest to smallest in order\n\n## Related Problems\n- 13. Roman to Integer\n\n## Notes\nCan use arrays to store symbols and corresponding values to make the code more concise.",
    "createdAt": "2025-09-30"
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
    "markdownContent": "# 13. Roman to Integer\n\n## Problem Information\n- **Problem ID**: 13\n- **Title**: Roman to Integer\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/roman-to-integer/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven a roman numeral, convert it to an integer.\n\n## Solutions\n\n### Solution 1: Traverse and Process\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nTraverse each character to calculate corresponding values, then handle special cases (IV, IX, XL, XC, CD, CM) at the end.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        int romanToInt(string s) {\n            int ans = 0;\n            \n            for(int i=0;i<s.size();i++){\n                if(s[i] == 'M'){\n                    ans += 1000;\n                }\n                else if(s[i] == 'D'){\n                    ans += 500;\n                }\n                else if(s[i] == 'C'){\n                    ans += 100;\n                }\n                else if(s[i] == 'L'){\n                    ans += 50;\n                }\n                else if(s[i] == 'X'){\n                    ans += 10;\n                }\n                else if(s[i] == 'V'){\n                    ans += 5;\n                }\n                else if(s[i] == 'I'){\n                    ans += 1;\n                }\n    \n                \n            }\n    \n            if(s.find(\"IV\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"IX\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"XL\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"XC\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"CD\") != string::npos ){\n                ans -=200;\n            }\n    \n            if(s.find(\"CM\") != string::npos ){\n                ans -=200;\n            }\n    \n            return ans;\n        }\n    };\n```\n\n#### Key Points\n- First accumulate values of all characters\n- Then subtract the over-counted parts from special combinations\n\n## Related Problems\n- 12. Integer to Roman\n\n## Notes\nWhile this solution works, it's not efficient. A better approach is to handle special cases during traversal by comparing the current character with the next character.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-90",
    "originalId": 90,
    "title": "90. Subsets II",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "Backtracking"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/backtracking/90-subsets-ii.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/backtracking/90-subsets-ii.md",
    "markdownContent": "# 90. Subsets II\n\n## Problem Information\n- **Problem ID**: 90\n- **Title**: Subsets II\n- **Difficulty**: Medium\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/subsets-ii/\n- **Topics**: Backtracking, Array, Sorting\n\n## Problem Description\nGiven an integer array `nums` that may contain duplicates, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.\n\n**Example:**\n```\nInput: nums = [1,2,2]\nOutput: [[],[1],[1,2],[1,2,2],[2],[2,2]]\n```\n\n## Solutions\n\n### Solution 1: Backtracking with Duplicate Skipping\n**Time Complexity**: O(n * 2^n) — generate all subsets with pruning for duplicates  \n**Space Complexity**: O(n) recursion depth + output\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        sort(nums.begin(), nums.end());        // 1) Sort to group duplicates\n        vector<vector<int>> ans;\n        vector<int> path;\n        dfs(0, nums, path, ans);\n        return ans;\n    }\n\nprivate:\n    void dfs(int start, const vector<int>& nums,\n             vector<int>& path, vector<vector<int>>& ans) {\n\n        // record current path as a subset\n        ans.push_back(path);\n\n        for (int i = start; i < (int)nums.size(); ++i) {\n            // skip duplicates on the same depth\n            if (i > start && nums[i] == nums[i-1]) continue;\n\n            path.push_back(nums[i]);\n            dfs(i + 1, nums, path, ans);\n            path.pop_back(); // backtrack\n        }\n    }\n};\n```\n\n---\n\n## Personal Notes\n- 我的思路：先排序，確保重複元素相鄰。\n- 遞迴 (DFS) 每一層代表「決定要不要選某個元素」。\n- **關鍵技巧**：`if (i > start && nums[i] == nums[i-1]) continue;` 這行保證同一層不會重複選一樣的數字。\n- 這題幫助我理解了 backtracking 的「決策樹」概念：每條路徑都是一個子集，回退 (pop_back) 是為了恢復狀態。\n\nMistakes I almost made:\n- 忘記在每層一開始就 `ans.push_back(path)` → 會漏掉空集和中間子集。\n- 忘記 pop_back → 路徑污染，結果錯誤。\n",
    "createdAt": "2025-10-03"
  },
  {
    "id": "leetcode-120",
    "originalId": 120,
    "title": "120. Triangle",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "DynamicProgramming"
    ],
    "description": "暫無描述",
    "hasNote": true,
    "noteUrl": "/content/problems/dynamicprogramming/120-triangle.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/dynamicprogramming/120-triangle.md",
    "markdownContent": "# 120. Triangle\n\n## Problem Information\n- **Problem ID**: 120\n- **Title**: Triangle\n- **Difficulty**: Medium\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/triangle/\n- **Topics**: Dynamic Programming, Array\n\n## Problem Description\nGiven a triangle array, return the minimum path sum from top to bottom.\n\nAt each step, you may move to an adjacent number of the row below.  \nMore formally, if you are on index `j` on the current row, you may move to index `j` or `j+1` on the next row.\n\n**Example:**\n```\nInput: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]\nOutput: 11\nExplanation: The minimum path is 2 -> 3 -> 5 -> 1 = 11.\n```\n\n## Solutions\n\n### Solution 1: Bottom-Up Dynamic Programming\n**Time Complexity**: O(n^2) — where n is the number of rows.  \n**Space Complexity**: O(1) extra space (reusing the triangle).\n\n#### Code\n```cpp\nclass Solution {\npublic:\n    int minimumTotal(vector<vector<int>>& triangle) {\n        for (int i = triangle.size()-2; i >= 0; --i) {\n            for (int j = 0; j <= i; ++j) {\n                triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1]);\n            }\n        }\n        return triangle[0][0];\n    }\n};\n```\n\n---\n\n## Personal Notes\n- 一開始單純的想說用 greedy 從上往下找最小值就好，  \n  但其實這樣會錯，因為局部最小 ≠ 全局最小。  \n- 正確解法應該要 **從底部開始加總**，每一層更新為「自己 + 下一層相鄰兩個的最小值」，最後頂端就會是答案。  \n- 這題讓我理解了「自底向上的 DP」比「局部貪心」更可靠。  \n",
    "createdAt": "2025-10-03"
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
    "markdownContent": "# 141. Linked List Cycle\n\n## Problem Information\n- **Problem ID**: 141\n- **Title**: Linked List Cycle\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/linked-list-cycle/\n- **Topics**: LinkedList, Two Pointers\n\n## Problem Description\n\nGiven head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.\n\n## Solutions\n\n### Solution 1: Two Pointers (Floyd's Cycle Detection)\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nUse two pointers - fast and slow. The fast pointer moves two steps at a time while the slow pointer moves one step. If there's a cycle, they will eventually meet.\n\n#### Code\n```cpp\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\n    public:\n        bool hasCycle(ListNode *head) {\n            ListNode* slow = head;\n            \n            \n            if(head == nullptr || head-> next == nullptr){\n                return false;\n            }\n            ListNode* fast = head->next;\n    \n            while(slow != fast){\n                if(fast == nullptr || fast-> next == nullptr){\n                    return false;\n                }\n                \n                slow = slow->next;\n                fast = fast->next->next;\n            }\n    \n            return true;\n        }\n    };\n```\n\n#### Key Points\n- Two pointers technique is a classic algorithm for cycle detection\n- Pay attention to boundary condition handling\n\n## Related Problems\n- 142. Linked List Cycle II\n- 202. Happy Number\n\n## Notes\nFloyd's Cycle Detection Algorithm is an elegant algorithm, also known as the \"Tortoise and Hare\" algorithm. The key insight is that if there's a cycle, the fast pointer will eventually catch up to the slow pointer within the cycle.",
    "createdAt": "2025-09-30"
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
    "markdownContent": "# 383. Ransom Note\n\n## Problem Information\n- **Problem ID**: 383\n- **Title**: Ransom Note\n- **Difficulty**: Easy\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/ransom-note/description/\n- **Topics**: HashTable, String\n\n## Problem Description\n\nGiven two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.\n\nEach letter in magazine can only be used once in ransomNote.\n\n## Solutions\n\n### Solution 1: Brute Force Approach (Less Efficient)\n**Time Complexity**: O(n*m)\n**Space Complexity**: O(1)\n\n#### Approach\nIterate through each character in ransomNote, find and remove the corresponding character from magazine.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           \n            for(int i=0;i<ransomNote.size();i++){\n                bool stop = false;\n                for(int j=0;j<magazine.size();j++){\n                    if(ransomNote[i] == magazine[j]){\n                        magazine.erase(j,1);\n                        stop = true;\n                        break;\n                    }\n                }\n                if(!stop){\n                    return false;\n                }\n            }\n            return true;\n        }\n    };\n```\n\n### Solution 2: Character Counting (Optimized)\n**Time Complexity**: O(n+m)\n**Space Complexity**: O(1)\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           int characterList[26] = {0};\n           for(int i=0;i<magazine.size();i++){\n                for(int j=0;j<26;j++){\n                    if(magazine[i] == 'a'+j ){\n                        characterList[j]++;\n                        break;\n                    }\n                }\n           }\n    \n           for(int i=0;i<ransomNote.size();i++){\n                characterList[ransomNote[i]-'a']--;\n           }\n    \n           for(int i=0;i<26;i++){\n                if(characterList[i] < 0){\n                    return false;\n                }\n           }\n           return true;\n            \n        }\n    };\n```\n\n## Personal Notes\nStarted with brute force (removing characters one by one) then learned the character counting approach. The array indexing trick `magazine[i] - 'a'` was new to me but makes the solution much cleaner.",
    "createdAt": "2025-09-30"
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
    "markdownContent": "# 543. Diameter of Binary Tree\n\n## Problem Information\n- **Problem ID**: 543\n- **Title**: Diameter of Binary Tree\n- **Difficulty**: Easy\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/diameter-of-binary-tree/description/\n- **Topics**: Tree, DFS\n\n## Problem Description\n\nGiven the root of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\n## Solutions\n\n### Solution 1: DFS Recursion\n**Time Complexity**: O(n)\n**Space Complexity**: O(h), where h is the height of the tree\n\n#### Code\n```cpp\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int max_diameter = 0;\n\n    int dfs(TreeNode* node) {\n        if (node == nullptr) return 0;\n\n        int left = dfs(node->left);\n        int right = dfs(node->right);\n\n        max_diameter = max(max_diameter, left + right);\n\n        return max(left, right) + 1;\n    }\n\n    int diameterOfBinaryTree(TreeNode* root) {\n        dfs(root);\n        return max_diameter;\n    }\n};\n```\n\n## Personal Notes\nFirst tree DFS problem I solved. The tricky part was realizing that I need to track the maximum diameter separately while calculating depths. The global variable approach worked well here.",
    "createdAt": "2025-09-30"
  },
  {
    "id": "leetcode-2353",
    "originalId": 2353,
    "title": "2353. Design a Food Rating System",
    "difficulty": "Medium",
    "source": "Leetcode",
    "topics": [
      "HashTable"
    ],
    "description": "Design a system to support:",
    "hasNote": true,
    "noteUrl": "/content/problems/hashtable/2353-design-a-food-rating-system.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/hashtable/2353-design-a-food-rating-system.md",
    "markdownContent": "\n# 2353. Design a Food Rating System\n\n## Problem Information\n- **Problem ID**: 2353\n- **Title**: Design a Food Rating System\n- **Difficulty**: Medium\n- **Source**: Leetcode\n- **Link**: https://leetcode.com/problems/design-a-food-rating-system/\n- **Topics**: Hash Map, Ordered Set, Design\n\n## Problem Description\n\nDesign a system to support:\n1. `changeRating(food, newRating)`: update the rating of a given food.\n2. `highestRated(cuisine)`: return the name of the highest-rated food for the given cuisine; if there is a tie, return the lexicographically smaller name.\n\nYou are given arrays `foods`, `cuisines`, and `ratings` of length `n`, where `foods[i]` is the food name, `cuisines[i]` is its cuisine, and `ratings[i]` is its initial rating.\n\n## Solutions\n\n### Solution 1: HashMap + Ordered Set per Cuisine\n**Time Complexity**: \n- Initialization: O(n log n)\n- `changeRating`: O(log n) per update\n- `highestRated`: O(1) to read `begin()` (amortized; the ordered set maintains ordering)\n\n**Space Complexity**: O(n) for maps and ordered sets\n\n**Key Idea**: \n- Maintain `food -> (cuisine, rating)` in an `unordered_map` for O(1) lookups during updates.\n- For each cuisine, maintain an ordered `set` of pairs `(-rating, name)` so that the **best** item is at `begin()` (highest rating; ties broken by lexicographically smaller name).  \n- On rating change: remove the old pair, update the map, insert the new pair.\n\n#### Code\n```cpp\n#include <string>\n#include <vector>\n#include <unordered_map>\n#include <set>\nusing namespace std;\n\nclass FoodRatings {\npublic:\n    // food -> (cuisine, rating)\n    unordered_map<string, pair<string,int>> info;\n    // cuisine -> ordered set of (-rating, name)\n    unordered_map<string, set<pair<int,string>>> byCuisine;\n\n    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {\n        int n = (int)foods.size();\n        info.reserve(n * 2);\n        for (int i = 0; i < n; ++i) {\n            info[foods[i]] = {cuisines[i], ratings[i]};\n            byCuisine[cuisines[i]].insert({-ratings[i], foods[i]});\n        }\n    }\n\n    void changeRating(string food, int newRating) {\n        auto &pr = info[food];         // pr.first = cuisine, pr.second = oldRating\n        const string &c = pr.first;\n        int oldRating = pr.second;\n\n        auto &S = byCuisine[c];\n        S.erase({-oldRating, food});   // remove old record\n        pr.second = newRating;         // update rating\n        S.insert({-newRating, food});  // insert new record\n    }\n\n    string highestRated(string cuisine) {\n        const auto &S = byCuisine[cuisine];\n        // set is ordered by (-rating, name) ascending; begin() gives highest rating & lexicographically smallest name\n        return S.begin()->second;\n    }\n};\n```\n\n### Solution 2: HashMap + Priority Queue with Lazy Deletion (Optional)\n**Time Complexity**: \n- `changeRating`: O(log n) (push a new entry)\n- `highestRated`: amortized O(log n) (pop stale entries until top is valid)\n\n**Space Complexity**: O(n)\n\n**Idea**: Keep a `priority_queue` per cuisine storing `(rating, name, version)` and a hash map for current `(cuisine, rating)`; during query, pop outdated entries (lazy deletion). Slightly more code, similar complexity; ordered set is cleaner for strict ordering.\n\n## Personal Notes\n這是我第一次寫系統設計的部分。正確的做法是先確認需要的操作（初始化、更新、查詢），再決定資料結構與維護方式。這題的關鍵是把需求拆成兩個索引：\n- 以食物名稱查 `(cuisine, rating)`（用 `unordered_map`）\n- 以菜系查「最高分、同分字典序最小」（用 per-cuisine 的 ordered `set` 存 `(-rating, name)`）\n\n更新時遵守「先刪舊、後插新」的不變量，確保集合內容與當前評分同步。這題本質是把 DSA 組件（hash + ordered set + key 設計）組裝成可維護的系統。\n",
    "createdAt": "2025-10-04"
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
    "description": "Given an integer array nums sorted in ascending order and then rotated at an unknown pivot, and an integer target, return the index of target if it is in nums; otherwise, return -1.",
    "hasNote": true,
    "noteUrl": "/content/problems/binarysearch/33-search-in-rotated-sorted-array.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/binarysearch/33-search-in-rotated-sorted-array.md",
    "markdownContent": "# 33. Search in Rotated Sorted Array\n\n## Problem Information\n- **Problem ID**: 33\n- **Title**: Search in Rotated Sorted Array\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/search-in-rotated-sorted-array/\n- **Topics**: Binary Search, Array\n\n## Problem Description\n\nGiven an integer array nums sorted in ascending order and then rotated at an unknown pivot, and an integer target, return the index of target if it is in nums; otherwise, return -1.\n\nYou must write an algorithm with O(log n) time complexity.\n\nExample: Input: nums = [4,5,6,7,0,1,2], target = 0 → Output: 4\n\n## My Solution\n\n```cpp\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size()-1;\n        while(l <= r){\n            int mid = (l+r)/2;\n            if(nums[mid] == target){\n                return mid;\n            }\n            else{\n                if(nums[l] <= nums[mid]){\n                    // left is sorted\n                    if(nums[l] <= target && target < nums[mid]){\n                        r = mid - 1;\n                    }\n                    else{\n                        l = mid + 1;\n                    }\n                }\n                else{\n                    // right is sorted\n                    if(nums[mid] < target && target <= nums[r]){\n                        l = mid + 1;\n                    }\n                    else{\n                        r = mid - 1;\n                    }\n                }\n            }\n        }\n        return -1;\n    }\n};\n```\n\n## Notes\n\nKey idea: In a rotated sorted array, at least one side of mid is always sorted. Use this to determine which half to search.\n",
    "createdAt": "2025-10-02"
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
    "description": "Given an integer array nums of length n containing digits 0-9, repeatedly generate a new array by taking the sum of adjacent values modulo 10 until only one element remains. Return that last remaining value.",
    "hasNote": true,
    "noteUrl": "/content/problems/array/2221-find-triangular-sum-of-an-array.md",
    "filePath": "/Users/waynliu/Documents/GitHub/ShuaShua-Note/content/problems/array/2221-find-triangular-sum-of-an-array.md",
    "markdownContent": "# 2221. Find Triangular Sum of an Array\n\n## Problem Information\n- **Problem ID**: 2221\n- **Title**: Find Triangular Sum of an Array\n- **Difficulty**: Medium\n- **Source**: LeetCode\n- **Link**: https://leetcode.com/problems/find-triangular-sum-of-an-array/\n- **Topics**: Array, Simulation\n\n## Problem Description\n\nGiven an integer array nums of length n containing digits 0-9, repeatedly generate a new array by taking the sum of adjacent values modulo 10 until only one element remains. Return that last remaining value.\n\nExample: nums = [1,2,3,4,5] → [3,5,7,9] → [8,2,6] → [0,8] → [8]\n\n## My Solution\n\n```cpp\nclass Solution {\npublic:\n    int triangularSum(vector<int>& nums) {\n        if(nums.size() == 1){\n            return nums[0];\n        }\n\n        vector<int> cal;\n        for(int i=0;i<nums.size();i++){\n            cal.push_back(nums[i]);\n        }\n        while(cal.size() != 1){\n            vector<int> temp;\n            for(int i=0;i < cal.size() - 1;i++){\n                int ac = (cal[i]+cal[i+1] )%10;\n                temp.push_back(ac);\n            }\n\n            cal.clear();\n            for(int i=0;i < temp.size();i++){\n                cal.push_back(temp[i]);\n            }\n        }\n        return cal[0]%10 ;\n    }\n};\n```\n\n## Notes\n\nStraightforward simulation: repeatedly reduce the array by taking adjacent sums mod 10 until one element remains.",
    "createdAt": "2025-10-02"
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
    "topic": "Backtracking",
    "count": 1
  },
  {
    "topic": "DynamicProgramming",
    "count": 1
  },
  {
    "topic": "HashTable",
    "count": 2
  },
  {
    "topic": "Tree",
    "count": 1
  },
  {
    "topic": "BinarySearch",
    "count": 1
  }
];

export const getDifficultyStats = () => ({
  "Easy": 0,
  "Medium": 13,
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
