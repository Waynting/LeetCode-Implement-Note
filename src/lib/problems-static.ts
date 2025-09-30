// 自動生成的題目數據文件 - 請勿手動編輯
export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  hasNote: boolean;
  noteUrl?: string;
  description?: string;
  filePath?: string;
  markdownContent?: string;
}

export const PROBLEMS: Problem[] = [
  {
    "id": 2,
    "title": "2. Add Two Numbers",
    "difficulty": "Medium",
    "topics": [
      "LinkedList"
    ],
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0002-add-two-numbers.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/linkedlist/0002-add-two-numbers.md",
    "markdownContent": "# 2. Add Two Numbers\n\n## Problem Information\n- **Problem ID**: 2\n- **Title**: Add Two Numbers\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/add-two-numbers/description/\n- **Topics**: LinkedList, Math\n\n## Problem Description\n\nYou are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n## Solutions\n\n### Solution 1: Simulate Addition\n**Time Complexity**: O(max(m,n))\n**Space Complexity**: O(max(m,n))\n\n#### Approach\nSimulate the process of adding two numbers, paying attention to carry handling.\n\n#### Code\n```cpp\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        //reverse l1 to get thevalue\n        ListNode* temp;\n        int newVal = 0;\n\n        //l1\n        temp = l1;\n        std::vector<int> Numl1;\n        int sizel1 = 0;\n        while(temp != nullptr){\n            Numl1.push_back(temp->val);\n            sizel1++;\n            temp = temp->next;\n        } \n        \n        //Calculate l1 true value\n        for(int i=0;i<Numl1.size();i++){\n            newVal += static_cast<int>(Numl1[i]*pow(10,i));\n        }\n\n        temp = l2;\n        std::vector<int> Numl2;\n        int sizel2 = 0;\n        while(temp != nullptr){\n            Numl2.push_back(temp->val);\n            sizel2++;\n            temp = temp->next;\n        } \n\n        //Calculate l1+l2 true value\n        for(int i=0;i<Numl2.size();i++){\n            newVal += static_cast<int>(Numl2[i]*pow(10,i));\n        }\n\n        //判斷是幾位數\n        int digit = 1;\n        int cal = newVal;\n        while(cal % 10 == cal){\n            cal = static_cast<int>(cal/10);\n            digit++;\n        }\n\n        //拆成不同digit + 存進new ListNode\n        ListNode* head = new ListNode(newVal % 10);\n        ListNode* answer = head;\n        for(int i=1 ;i<digit;i++){\n            ListNode* NewNode = new ListNode(newVal % 10);\n            answer->next = NewNode;\n            answer = answer->next;\n            newVal = (newVal - newVal % 10)/10;\n        }\n        return head;\n        \n    }\n```\n\n#### Issues\nThis solution will overflow because the problem range > INT_MAX.\nIt converts both lists to numbers first, adds them, then converts back to a list.\n\n## Related Problems\n- 445. Add Two Numbers II\n- 369. Plus One Linked List\n\n## Notes\nBasic LinkedList operation problem. Need to pay attention to:\n- Carry handling\n- Different lengths of the two linked lists\n- Possible carry at the final digit"
  },
  {
    "id": 4,
    "title": "4. Median of Two Sorted Arrays",
    "difficulty": "Medium",
    "topics": [
      "Array"
    ],
    "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    "hasNote": true,
    "noteUrl": "/content/problems/array/0004-median-of-two-sorted-arrays.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/array/0004-median-of-two-sorted-arrays.md",
    "markdownContent": "# 4. Median of Two Sorted Arrays\n\n## Problem Information\n- **Problem ID**: 4\n- **Title**: Median of Two Sorted Arrays\n- **Difficulty**: Hard\n- **Link**: https://leetcode.com/problems/median-of-two-sorted-arrays/description/\n- **Topics**: Array, Binary Search\n\n## Problem Description\n\nGiven two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n## Solutions\n\n### Solution 1: Merge Sort Approach\n**Time Complexity**: O(m+n)\n**Space Complexity**: O(m+n)\n\n#### Approach\nUse two pointers to traverse both arrays and merge elements in order into a new array, then find the median.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n            size_t fullsize = nums1.size() + nums2.size();\n            size_t point1 = 0, point2 = 0;\n            vector<int> ans;\n            while(point1 != nums1.size() && point2 != nums2.size()){\n                if(nums1[point1] > nums2[point2]){\n                    ans.push_back(nums2[point2]);\n                    point2++;\n                }\n                else if(nums1[point1] < nums2[point2]){\n                    ans.push_back(nums1[point1]);\n                    point1++;\n                }\n                else{\n                    ans.push_back(nums1[point1]);\n                    ans.push_back(nums2[point2]);\n                    point1++;\n                    point2++;\n                }\n            }\n    \n            while(point1 != nums1.size()){\n                ans.push_back(nums1[point1]);\n                point1++;\n            }\n    \n            while(point2 != nums2.size()){\n                ans.push_back(nums2[point2]);\n                point2++;\n            }\n            \n            double median;\n            if(fullsize %2 == 1){\n                median = ans[(fullsize-1)/2];\n                \n            }\n            else{\n                median = static_cast<double>( (ans[fullsize/2] + ans[(fullsize/2) -1]) ) /2;\n        \n            }\n            return median;\n    \n        }\n    };\n```\n\n#### Key Points\n- This solution doesn't meet the required O(log(m+n)) time complexity\n- The correct approach should use binary search\n\n## Related Problems\n- 295. Find Median from Data Stream\n- 480. Sliding Window Median\n\n## Notes\nThe challenge of this problem is achieving O(log(m+n)) time complexity, which requires binary search approach. While the above solution works, it has O(m+n) time complexity and doesn't meet the problem requirements."
  },
  {
    "id": 5,
    "title": "5. Longest Palindromic Substring",
    "difficulty": "Medium",
    "topics": [
      "String"
    ],
    "description": "Given a string s, return the longest palindromic substring in s.",
    "hasNote": true,
    "noteUrl": "/content/problems/string/0005-longest-palindromic-substring.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/string/0005-longest-palindromic-substring.md",
    "markdownContent": "# 5. Longest Palindromic Substring\n\n## Problem Information\n- **Problem ID**: 5\n- **Title**: Longest Palindromic Substring\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/longest-palindromic-substring/description/\n- **Topics**: String, Dynamic Programming\n\n## Problem Description\n\nGiven a string s, return the longest palindromic substring in s.\n\n## Solutions\n\n### Solution 1: Expand Around Centers\n**Time Complexity**: O(n^2)\n**Space Complexity**: O(1)\n\n#### Approach\nExpand around each possible center point to find the longest palindromic substring.\n\n#### Code\n```cpp\n// Note: The original file had incorrect code, here's the correct expand around centers solution\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        if (s.empty()) return \"\";\n        \n        int start = 0, maxLen = 1;\n        \n        for (int i = 0; i < s.length(); i++) {\n            // Odd length palindrome\n            int len1 = expandAroundCenter(s, i, i);\n            // Even length palindrome\n            int len2 = expandAroundCenter(s, i, i + 1);\n            \n            int len = max(len1, len2);\n            if (len > maxLen) {\n                maxLen = len;\n                start = i - (len - 1) / 2;\n            }\n        }\n        \n        return s.substr(start, maxLen);\n    }\n    \nprivate:\n    int expandAroundCenter(string s, int left, int right) {\n        while (left >= 0 && right < s.length() && s[left] == s[right]) {\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n};\n```\n\n## Related Problems\n- 516. Longest Palindromic Subsequence\n- 647. Palindromic Substrings\n\n## Notes\nClassic string processing problem that can be solved with multiple approaches:\n- Expand around centers\n- Dynamic programming\n- Manacher's algorithm"
  },
  {
    "id": 12,
    "title": "12. Integer to Roman",
    "difficulty": "Medium",
    "topics": [
      "Math"
    ],
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0012-integer-to-roman.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/math/0012-integer-to-roman.md",
    "markdownContent": "# 12. Integer to Roman\n\n## Problem Information\n- **Problem ID**: 12\n- **Title**: Integer to Roman\n- **Difficulty**: Medium\n- **Link**: https://leetcode.com/problems/integer-to-roman/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven an integer, convert it to a roman numeral.\n\n## Solutions\n\n### Solution 1: Greedy Approach\n**Time Complexity**: O(1)\n**Space Complexity**: O(1)\n\n#### Approach\nProcess each Roman numeral symbol from largest to smallest, using greedy strategy to use the largest symbols possible.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        string intToRoman(int num) {\n            int ans[13] = {0};\n            while(num >= 1000){ //M\n                ans[0]++;\n                num -=1000;\n            }\n    \n            if(num < 1000 && num >= 900){ //CM\n                ans[1]++;\n                num -= 900;\n            }\n            else if(num < 500 && num >= 400){ //CD\n                ans[2]++;\n                num -= 400;\n            }\n            while(num >= 500){ //D\n                ans[3]++;\n                num -= 500;\n            }\n            while(num >= 100){//C\n                ans[4]++;\n                num -= 100;\n            }\n    \n            if(num < 100 && num >= 90){ //XC\n                ans[5]++;\n                num -= 90;\n            }\n            else if(num < 50 && num >= 40){ //XL\n                ans[6]++;\n                num -= 40;\n            }\n            while(num >= 50){//L\n                ans[7]++;\n                num -= 50;\n            }\n            while(num >= 10){//X\n                ans[8]++;\n                num -= 10;\n            }\n    \n            if(num == 9){ //IX\n                ans[9]++;\n                num -= 9;\n            }\n            else if(num == 4){ //IV\n                ans[10]++;\n                num -= 4;\n            }\n            while(num >= 5){//V\n                ans[11]++;\n                num -= 5;\n            }\n            while(num >= 1){//I\n                ans[12]++;\n                num -= 1;\n            }\n    \n            string answer = \"\";\n            for(int i=0;i<13;i++){\n                for(int j=0; j < ans[i];j++){\n                    if(i == 0){\n                        answer+=\"M\";\n                    }\n                    else if(i == 1){\n                        answer+=\"CM\";\n                    }\n                    else if(i == 2){\n                        answer+=\"CD\";\n                    }\n                    else if(i == 3){\n                       answer+=\"D\";\n                    }\n                    else if(i == 4){\n                        answer+= \"C\";\n                    }\n                    else if(i == 5){\n                       answer+= \"XC\";\n                    }\n                    else if(i == 6){\n                        answer+= \"XL\";\n                    }\n                    else if(i == 7){\n                        answer+= \"L\";\n                    }\n                    else if(i == 8){\n                        answer+= \"X\";\n                    }\n                    else if(i == 9){\n                        answer+= \"IX\";\n                    }\n                    else if(i == 10){\n                        answer+= \"IV\";\n                    }\n                    else if(i == 11){\n                        answer+= \"V\";\n                    }\n                    else {\n                        answer+= \"I\";\n                    }\n                }\n            }\n            return answer;\n    \n        }\n    };\n```\n\n#### Key Points\n- Handle special cases (4, 9, 40, 90, 400, 900)\n- Process from largest to smallest in order\n\n## Related Problems\n- 13. Roman to Integer\n\n## Notes\nCan use arrays to store symbols and corresponding values to make the code more concise."
  },
  {
    "id": 13,
    "title": "13. Roman to Integer",
    "difficulty": "Medium",
    "topics": [
      "Math"
    ],
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.",
    "hasNote": true,
    "noteUrl": "/content/problems/math/0013-roman-to-integer.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/math/0013-roman-to-integer.md",
    "markdownContent": "# 13. Roman to Integer\n\n## Problem Information\n- **Problem ID**: 13\n- **Title**: Roman to Integer\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/roman-to-integer/description/\n- **Topics**: Math, String\n\n## Problem Description\n\nRoman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven a roman numeral, convert it to an integer.\n\n## Solutions\n\n### Solution 1: Traverse and Process\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nTraverse each character to calculate corresponding values, then handle special cases (IV, IX, XL, XC, CD, CM) at the end.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        int romanToInt(string s) {\n            int ans = 0;\n            \n            for(int i=0;i<s.size();i++){\n                if(s[i] == 'M'){\n                    ans += 1000;\n                }\n                else if(s[i] == 'D'){\n                    ans += 500;\n                }\n                else if(s[i] == 'C'){\n                    ans += 100;\n                }\n                else if(s[i] == 'L'){\n                    ans += 50;\n                }\n                else if(s[i] == 'X'){\n                    ans += 10;\n                }\n                else if(s[i] == 'V'){\n                    ans += 5;\n                }\n                else if(s[i] == 'I'){\n                    ans += 1;\n                }\n    \n                \n            }\n    \n            if(s.find(\"IV\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"IX\") != string::npos ){\n                ans -=2;\n            }\n    \n            if(s.find(\"XL\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"XC\") != string::npos ){\n                ans -=20;\n            }\n    \n            if(s.find(\"CD\") != string::npos ){\n                ans -=200;\n            }\n    \n            if(s.find(\"CM\") != string::npos ){\n                ans -=200;\n            }\n    \n            return ans;\n        }\n    };\n```\n\n#### Key Points\n- First accumulate values of all characters\n- Then subtract the over-counted parts from special combinations\n\n## Related Problems\n- 12. Integer to Roman\n\n## Notes\nWhile this solution works, it's not efficient. A better approach is to handle special cases during traversal by comparing the current character with the next character."
  },
  {
    "id": 141,
    "title": "141. Linked List Cycle",
    "difficulty": "Medium",
    "topics": [
      "LinkedList"
    ],
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    "hasNote": true,
    "noteUrl": "/content/problems/linkedlist/0141-linked-list-cycle.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/linkedlist/0141-linked-list-cycle.md",
    "markdownContent": "# 141. Linked List Cycle\n\n## Problem Information\n- **Problem ID**: 141\n- **Title**: Linked List Cycle\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/linked-list-cycle/\n- **Topics**: LinkedList, Two Pointers\n\n## Problem Description\n\nGiven head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.\n\n## Solutions\n\n### Solution 1: Two Pointers (Floyd's Cycle Detection)\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n#### Approach\nUse two pointers - fast and slow. The fast pointer moves two steps at a time while the slow pointer moves one step. If there's a cycle, they will eventually meet.\n\n#### Code\n```cpp\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\n    public:\n        bool hasCycle(ListNode *head) {\n            ListNode* slow = head;\n            \n            \n            if(head == nullptr || head-> next == nullptr){\n                return false;\n            }\n            ListNode* fast = head->next;\n    \n            while(slow != fast){\n                if(fast == nullptr || fast-> next == nullptr){\n                    return false;\n                }\n                \n                slow = slow->next;\n                fast = fast->next->next;\n            }\n    \n            return true;\n        }\n    };\n```\n\n#### Key Points\n- Two pointers technique is a classic algorithm for cycle detection\n- Pay attention to boundary condition handling\n\n## Related Problems\n- 142. Linked List Cycle II\n- 202. Happy Number\n\n## Notes\nFloyd's Cycle Detection Algorithm is an elegant algorithm, also known as the \"Tortoise and Hare\" algorithm. The key insight is that if there's a cycle, the fast pointer will eventually catch up to the slow pointer within the cycle."
  },
  {
    "id": 383,
    "title": "383. Ransom Note",
    "difficulty": "Medium",
    "topics": [
      "HashTable"
    ],
    "description": "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.",
    "hasNote": true,
    "noteUrl": "/content/problems/hashtable/0383-ransom-note.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/hashtable/0383-ransom-note.md",
    "markdownContent": "# 383. Ransom Note\n\n## Problem Information\n- **Problem ID**: 383\n- **Title**: Ransom Note\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/ransom-note/description/\n- **Topics**: HashTable, String\n\n## Problem Description\n\nGiven two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.\n\nEach letter in magazine can only be used once in ransomNote.\n\n## Solutions\n\n### Solution 1: Brute Force Approach (Less Efficient)\n**Time Complexity**: O(n*m)\n**Space Complexity**: O(1)\n\n#### Approach\nIterate through each character in ransomNote, find and remove the corresponding character from magazine.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           \n            for(int i=0;i<ransomNote.size();i++){\n                bool stop = false;\n                for(int j=0;j<magazine.size();j++){\n                    if(ransomNote[i] == magazine[j]){\n                        magazine.erase(j,1);\n                        stop = true;\n                        break;\n                    }\n                }\n                if(!stop){\n                    return false;\n                }\n            }\n            return true;\n        }\n    };\n```\n\n### Solution 2: Character Counting (Optimized)\n**Time Complexity**: O(n+m)\n**Space Complexity**: O(1)\n\n#### Approach\nUse an array to count the occurrence of each character in magazine, then check if it's sufficient to construct ransomNote.\n\n#### Code\n```cpp\nclass Solution {\n    public:\n        bool canConstruct(string ransomNote, string magazine) {\n           int characterList[26] = {0};\n           for(int i=0;i<magazine.size();i++){\n                for(int j=0;j<26;j++){\n                    if(magazine[i] == 'a'+j ){\n                        characterList[j]++;\n                        break;\n                    }\n                }\n           }\n    \n           for(int i=0;i<ransomNote.size();i++){\n                characterList[ransomNote[i]-'a']--;\n           }\n    \n           for(int i=0;i<26;i++){\n                if(characterList[i] < 0){\n                    return false;\n                }\n           }\n           return true;\n            \n        }\n    };\n```\n\n#### Key Points\n- The second solution uses Hash Table concept for better efficiency\n- Can further optimize the inner loop by directly using `characterList[magazine[i] - 'a']++`\n\n## Related Problems\n- 387. First Unique Character in a String\n- 242. Valid Anagram\n\n## Notes\nThe progression from brute force to optimized solution demonstrates the advantage of Hash Table in character counting problems."
  },
  {
    "id": 543,
    "title": "543. Diameter of Binary Tree",
    "difficulty": "Medium",
    "topics": [
      "Tree"
    ],
    "description": "Given the root of a binary tree, return the length of the diameter of the tree.",
    "hasNote": true,
    "noteUrl": "/content/problems/tree/0543-diameter-of-binary-tree.md",
    "filePath": "/Users/waynliu/Documents/GitHub/LeetCode-Implement-Note/content/problems/tree/0543-diameter-of-binary-tree.md",
    "markdownContent": "# 543. Diameter of Binary Tree\n\n## Problem Information\n- **Problem ID**: 543\n- **Title**: Diameter of Binary Tree\n- **Difficulty**: Easy\n- **Link**: https://leetcode.com/problems/diameter-of-binary-tree/description/\n- **Topics**: Tree, DFS\n\n## Problem Description\n\nGiven the root of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\n## What is DFS\n**Depth First Search**, abbreviated as **DFS**.\n* DFS is an algorithm for traversing trees or graphs.\n* Starting from a node, it continuously goes deep into \"child nodes\" or \"adjacent nodes\".\n* When there's no path to continue, it \"backtracks\" to the previous node and tries other paths.\n* It's usually implemented using recursion or stack.\n\n## Solutions\n\n### Solution 1: DFS Recursion\n**Time Complexity**: O(n)\n**Space Complexity**: O(h), where h is the height of the tree\n\n#### Approach\nFor each node, calculate the longest path passing through that node (left subtree depth + right subtree depth), while updating the global maximum.\n\n#### Code\n```cpp\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int max_diameter = 0;\n\n    int dfs(TreeNode* node) {\n        if (node == nullptr) return 0;\n\n        int left = dfs(node->left);\n        int right = dfs(node->right);\n\n        max_diameter = max(max_diameter, left + right);\n\n        return max(left, right) + 1;\n    }\n\n    int diameterOfBinaryTree(TreeNode* root) {\n        dfs(root);\n        return max_diameter;\n    }\n};\n```\n\n#### Key Points\n- The DFS function returns the depth of the subtree rooted at that node\n- The longest path through a node = left subtree depth + right subtree depth\n- Global variable records the maximum diameter among all nodes\n\n## Related Problems\n- 104. Maximum Depth of Binary Tree\n- 124. Binary Tree Maximum Path Sum\n\n## Notes\nThis is a great introductory problem for understanding DFS and tree traversal. The key insight is that the diameter doesn't necessarily pass through the root, so we need to check every node as a potential \"center\" of the longest path."
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

export const getTopicStats = () => [
  {
    "topic": "LinkedList",
    "count": 2
  },
  {
    "topic": "Array",
    "count": 1
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
  }
];

export const getDifficultyStats = () => ({
  "Easy": 0,
  "Medium": 8,
  "Hard": 0
});

export const getAllProblems = () => PROBLEMS;
export const getAllTopics = () => TOPICS;
export const getProblemById = (id: number) => PROBLEMS.find(p => p.id === id);
export const getProblemsByTopic = (topic: string) => 
  PROBLEMS.filter(p => p.topics.some(t => t.toLowerCase() === topic.toLowerCase()));
