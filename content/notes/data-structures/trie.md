---
title: Trie（前綴樹）完整筆記 — 概念、實作、用途與題型
author: 你（整理：ChatGPT）
date: 2025-10-12
tags: [Data Structures, Trie, Prefix Tree, String, Algorithms, Beginner-Friendly]
---

> **適合對象**：零基礎～入門程度，想理解「Trie（前綴樹）」是什麼、怎麼實作、何時使用。  
> **你會學到**：Trie 的核心概念、時間與空間複雜度、實作（C++ 與 Python 版本）、常見坑、延伸變體、典型題目清單。

---

# 1. 什麼是 Trie？（用生活比喻）
Trie（讀音類似「try」），中文常譯「字典樹／前綴樹」。它把很多**字串**存成一棵樹：  
- 從根節點出發，每條邊代表**一個字元**；  
- 一條從根到某個節點的路徑，對應一個**前綴（prefix）**；  
- 若某個節點被標記為「字尾」，表示**有字串在此結束**。

**比喻**：像電話語音系統「請輸入區碼…」：你每按下一個數字，就走下一層分支。某條完整路徑對應一個完整號碼。

---

# 2. 為什麼用 Trie？（適用場景）
- **大量字串查詢**：要快速判斷「某字是否存在」、「是否有以某前綴開頭的字」。  
- **自動補完（Autocomplete）／拼字檢查（Spell Check）**：根據目前輸入的前綴，快速列出候選字。  
- **統計**：統計某前綴出現次數、統計某字串被插入幾次。  
- **壓縮共用前綴**：相同開頭只存一次，大幅減少重複儲存。

> 與 **Hash（雜湊）** 比較：Hash 查整字很快，但對「前綴」問題做不到自然支援；Trie 對前綴類查詢非常友善。

---

# 3. 基本操作與複雜度
假設字元集是小寫英文字母 a–z（26 個）。

- `insert(word)`：逐字走下去，若沒有節點就新建，最後節點標記「是單字結尾」。  
  - 時間：`O(L)`（L=字長），空間：每個新字母需要新節點（最壞 `O(總字元數)`).  
- `search(word)`：逐字走下去，若中途缺節點→不存在；走完且結尾標記為真→存在。  
  - 時間：`O(L)`。  
- `startsWith(prefix)`：逐字走到 prefix 尾即可，無需結尾標記。  
  - 時間：`O(P)`（P=前綴長度）。  
- `erase(word)`（刪除一個字）：把該字的計數減一，必要時回收不再使用的節點。  
  - 時間：`O(L)`。

> **統計擴充**：在每個節點維護：  
> - `pass`：有多少字通過這個節點（含結尾在更深處的字）；  
> - `end`：有多少字在此結尾。  
> 可支援函式：`countWordsEqualTo(word)`、`countWordsStartingWith(prefix)`。

---

# 4. 視覺化例子（ASCII 圖）
插入 `["to", "tea", "ted", "ten", "A", "inn"]`（假設只考慮英文大小寫作為示例）：

```
(root)
 ├── 'A' (end=1)
 └── 't'
     └── 'e'
     │     ├── 'a' (end=1)  → "tea"
     │     ├── 'd' (end=1)  → "ted"
     │     └── 'n' (end=1)  → "ten"
     └── 'o' (end=1)        → "to"
```
- `"te"` 是前綴，但只有當 `end>0` 才代表完整單字。

---

# 5. C++17 實作（英文字母 a–z）
> 若你的字元集更大（含大小寫、數字、Unicode），請看下方「擴展與進階」。

## 5.1 節點設計（陣列寫法）
- 使用固定大小 `children[26]` 指向子節點（更快、少額外配置）。  
- 用 `pass`、`end` 做計數擴充，支援統計與安全刪除。

```cpp
#include <bits/stdc++.h>
using namespace std;

struct TrieNode {
    TrieNode* child[26];
    int pass; // 經過此節點的字串數
    int end;  // 在此結點結尾的字串數

    TrieNode() : pass(0), end(0) {
        memset(child, 0, sizeof(child));
    }
};

class Trie {
private:
    TrieNode* root;

    void freeSubtree(TrieNode* node) {
        if (!node) return;
        for (int i = 0; i < 26; ++i) {
            if (node->child[i]) freeSubtree(node->child[i]);
        }
        delete node;
    }

public:
    Trie() { root = new TrieNode(); }
    ~Trie() { freeSubtree(root); }

    void insert(const string& word) {
        TrieNode* cur = root;
        cur->pass++;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!cur->child[idx]) cur->child[idx] = new TrieNode();
            cur = cur->child[idx];
            cur->pass++;
        }
        cur->end++;
    }

    bool search(const string& word) const {
        const TrieNode* cur = root;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!cur->child[idx]) return false;
            cur = cur->child[idx];
        }
        return cur->end > 0;
    }

    bool startsWith(const string& prefix) const {
        const TrieNode* cur = root;
        for (char ch : prefix) {
            int idx = ch - 'a';
            if (!cur->child[idx]) return false;
            cur = cur->child[idx];
        }
        return true;
    }

    int countWordsEqualTo(const string& word) const {
        const TrieNode* cur = root;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!cur->child[idx]) return 0;
            cur = cur->child[idx];
        }
        return cur->end;
    }

    int countWordsStartingWith(const string& prefix) const {
        const TrieNode* cur = root;
        for (char ch : prefix) {
            int idx = ch - 'a';
            if (!cur->child[idx]) return 0;
            cur = cur->child[idx];
        }
        return cur->pass;
    }

    bool erase(const string& word) {
        // 先確認存在
        TrieNode* cur = root;
        vector<pair<TrieNode*, int>> stk;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!cur->child[idx] || cur->child[idx]->pass == 0) return false;
            stk.push_back({cur, idx});
            cur = cur->child[idx];
        }
        if (cur->end == 0) return false;

        // 實際刪除：end--，沿路 pass--，如 pass=0 釋放子樹
        cur->end--;
        cur = root;
        for (char ch : word) {
            int idx = ch - 'a';
            TrieNode* nxt = cur->child[idx];
            nxt->pass--;
            if (nxt->pass == 0) {
                freeSubtree(nxt);
                cur->child[idx] = nullptr;
                break;
            }
            cur = nxt;
        }
        return true;
    }
};
```

### 使用範例
```cpp
int main() {
    Trie trie;
    trie.insert("apple");
    trie.insert("app");
    trie.insert("apple");

    cout << boolalpha;
    cout << trie.search("apple") << "\n";     // true
    cout << trie.search("appl") << "\n";      // false
    cout << trie.startsWith("ap") << "\n";    // true
    cout << trie.countWordsEqualTo("apple") << "\n";       // 2
    cout << trie.countWordsStartingWith("app") << "\n";    // 3
    cout << trie.erase("apple") << "\n";                   // true
    cout << trie.countWordsEqualTo("apple") << "\n";       // 1
    cout << trie.erase("banana") << "\n";                  // false
}
```

---

## 5.2 map/unordered_map 寫法（支援更大字元集）
```cpp
struct Node {
    unordered_map<char, Node*> next;
    int pass = 0, end = 0;
    ~Node() {
        for (auto &kv : next) delete kv.second;
    }
};

class Trie2 {
    Node* root;
public:
    Trie2(): root(new Node()) {}
    ~Trie2(){ delete root; }

    void insert(const string& s) {
        Node* cur = root;
        cur->pass++;
        for (char c : s) {
            if (!cur->next.count(c)) cur->next[c] = new Node();
            cur = cur->next[c];
            cur->pass++;
        }
        cur->end++;
    }

    bool search(const string& s) const {
        const Node* cur = root;
        for (char c : s) {
            auto it = cur->next.find(c);
            if (it == cur->next.end()) return false;
            cur = it->second;
        }
        return cur->end > 0;
    }

    bool startsWith(const string& pre) const {
        const Node* cur = root;
        for (char c : pre) {
            auto it = cur->next.find(c);
            if (it == cur->next.end()) return false;
            cur = it->second;
        }
        return true;
    }

    int countWordsEqualTo(const string& s) const {
        const Node* cur = root;
        for (char c : s) {
            auto it = cur->next.find(c);
            if (it == cur->next.end()) return 0;
            cur = it->second;
        }
        return cur->end;
    }

    int countWordsStartingWith(const string& pre) const {
        const Node* cur = root;
        for (char c : pre) {
            auto it = cur->next.find(c);
            if (it == cur->next.end()) return 0;
            cur = it->second;
        }
        return cur->pass;
    }
};
```

---

# 6. Python 版本（更易讀）
```python
class TrieNode:
    __slots__ = ("next", "pass_cnt", "end_cnt")
    def __init__(self):
        self.next = {}        # char -> TrieNode
        self.pass_cnt = 0
        self.end_cnt = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        cur = self.root
        cur.pass_cnt += 1
        for ch in word:
            if ch not in cur.next:
                cur.next[ch] = TrieNode()
            cur = cur.next[ch]
            cur.pass_cnt += 1
        cur.end_cnt += 1

    def search(self, word: str) -> bool:
        cur = self.root
        for ch in word:
            if ch not in cur.next:
                return False
            cur = cur.next[ch]
        return cur.end_cnt > 0

    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for ch in prefix:
            if ch not in cur.next:
                return False
            cur = cur.next[ch]
        return True

    def countWordsEqualTo(self, word: str) -> int:
        cur = self.root
        for ch in word:
            if ch not in cur.next: return 0
            cur = cur.next[ch]
        return cur.end_cnt

    def countWordsStartingWith(self, prefix: str) -> int:
        cur = self.root
        for ch in prefix:
            if ch not in cur.next: return 0
            cur = cur.next[ch]
        return cur.pass_cnt

    def erase(self, word: str) -> bool:
        # 確認存在
        cur = self.root
        stack = [cur]
        for ch in word:
            if ch not in cur.next: return False
            cur = cur.next[ch]
            stack.append(cur)
        if cur.end_cnt == 0: return False

        # 刪除計數
        cur.end_cnt -= 1
        for node in stack:
            node.pass_cnt -= 1

        # 清理孤兒
        cur = self.root
        for ch in word:
            nxt = cur.next[ch]
            if nxt.pass_cnt == 0:
                del cur.next[ch]
                break
            cur = nxt
        return True
```

---

# 7. 常見坑（初學者必看）
1. **大小寫／非英文字元**：若限定 a–z，請先轉小寫；否則改用 map 版本。  
2. **結尾標記**：`search` 要檢查 `end>0`；只到節點不代表是完整單字。  
3. **重複插入與刪除**：用 `end`、`pass` 維護計數，支援多次插入／刪除。  
4. **記憶體釋放（C++）**：務必回收無用節點。  
5. **Unicode**：可改以 codepoint 為單位（python 自然支援；C++ 可考慮 `char32_t`）。  
6. **效率權衡**：陣列 vs map/unordered_map 視字元集大小選擇。

---

# 8. 進階與變體
- **壓縮 Trie（Radix/Patricia）**：把單鏈路徑壓成一段字串，節省空間。  
- **Aho–Corasick**：多模式匹配（敏感詞），在 Trie 上加 fail 指針。  
- **Bitwise Trie（數位樹）**：按位儲存整數，用於最大 XOR 等題。  
- **Ternary Search Tree**：以 BST 思想按字元分支，省空間且支持字典序操作。

---

# 9. 典型題目
- LC 208 Implement Trie (Prefix Tree) — 基礎 CRUD  
- LC 211 Add and Search Word — 搜尋支援 '.' 萬用字（Trie+回溯）  
- LC 212 Word Search II — 盤面找字（Trie+DFS）  
- LC 648 Replace Words — 字典替換  
- LC 421 Maximum XOR of Two Numbers — Bitwise Trie  
- LC 1032 Stream of Characters — 逆向 Trie 線上匹配

---

# 10. 小結
- Trie 以「字元路徑」呈現多字串共享前綴，前綴查詢 `O(L)` 高效直覺。  
- 初學者先用 a–z 陣列版，熟悉後再擴展到 map 版、多語系、壓縮 Trie 與 Aho–Corasick。

---

# 11. 速查表
- 插入：走到底、`pass++`、`end++`。  
- 搜尋：走到底、判 `end>0`。  
- 前綴：走到 prefix 即成功。  
- 刪除：`end--`、沿路 `pass--`，必要時刪孤兒。  
- 複雜度：均攤 `O(L)`；空間 ~ 節點數。
