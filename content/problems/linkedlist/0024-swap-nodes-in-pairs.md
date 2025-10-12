# 24. Swap Nodes in Pairs — 完整筆記（含可提交 C++ 迭代與遞迴）

- **題目連結**：https://leetcode.com/problems/swap-nodes-in-pairs/description/
- **主題**：Linked List、Pointer Rewiring、Recursion
- **限制**：不可改值（只能改 `next` 指標）
- **難度**：Medium

---

## 一、題意速記
將單向鏈結串列中**每兩個相鄰節點**交換，回傳新表頭。若長度為奇數，最後一個節點維持不動。**不可**透過交換節點的值達成，必須調整指標。

**例**：`1 → 2 → 3 → 4 → 5 → ∅` ⟶ `2 → 1 → 4 → 3 → 5 → ∅`

---

## 二、圖解（示意）

### 局部交換（迭代每回合的重接）
```
交換前： prev → a → b → nextPair → ...
目標：   prev → b → a → nextPair → ...

三步驟：
1) prev.next = b
2) b.next    = a
3) a.next    = nextPair
然後 prev 前進到 a（因為 a 變成這一對的第二個）
```

### 全局前後對照
```
Before:  1 → 2 → 3 → 4 → 5 → ∅
After:   2 → 1 → 4 → 3 → 5 → ∅
```

---

## 三、可提交解法（C++17）

> LeetCode 既有 `struct ListNode { int val; ListNode* next; ... }`。以下程式可直接提交。

### 方法 A：**迭代**（Dummy + 三指標）

- 用 **dummy** 虛擬表頭處理頭部交換更直觀。
- 每回合抓出一對節點 `a`、`b` 與 `nextPair`，照順序重接指標。
- `prev` 每回合前進到 `a`。

```cpp
// Iterative solution
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* prev = dummy;

        while (prev->next != nullptr && prev->next->next != nullptr) {
            ListNode* a = prev->next;
            ListNode* b = a->next;
            ListNode* nextPair = b->next;

            // swap a and b
            prev->next = b;
            b->next = a;
            a->next = nextPair;

            // move to next pair
            prev = a;
        }

        ListNode* newHead = dummy->next;
        delete dummy; // 可釋放 dummy（不影響 newHead）
        return newHead;
    }
};
```

**時間複雜度**：`O(n)`（每節點恰被訪一次）  
**空間複雜度**：`O(1)`（額外使用常數指標變數）

---

### 方法 B：**遞迴**（先換前兩個，遞迴處理後面）

- Base：空或單節點直接回傳。
- 否則 `first = head`，`second = head->next`：
  - `first->next = swapPairs(second->next)`（遞迴處理後段並接回）
  - `second->next = first`
  - 回傳 `second` 作為這一段的新頭。

```cpp
// Recursive solution
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (head == nullptr || head->next == nullptr) return head;

        ListNode* first = head;
        ListNode* second = head->next;

        first->next = swapPairs(second->next);
        second->next = first;
        return second;
    }
};
```

**時間複雜度**：`O(n)`  
**空間複雜度**：`O(n)`（遞迴呼叫堆疊）

---

## 四、正確性要點

- **迭代**：每回合只在局部 `prev → a → b → nextPair` 子結構內調整三條邊，保持其餘鏈結不變；交換結束後 `prev` 移至 `a`，下一回合處理下一對，直到無法再形成一對（`prev->next == nullptr` 或 `prev->next->next == nullptr`）。
- **遞迴**：對長度 `0/1` 為真；假設長度 ≥ 2 時先正確交換前兩個，再對餘下子串列（從第三個開始）遞迴正確；最後將遞迴回傳的新頭接到 `first->next`，再把 `second->next = first`，即完成局部交換與全局串接。依數學歸納法成立。

---

## 五、常見坑點 Checklist

- ☐ 忘了用 dummy，導致表頭更新複雜或錯誤。  
- ☐ 指標使用 `.` 與 `->` 混淆（指標成員要用 `->`）。  
- ☐ 重接次序錯誤：先把 `prev->next` 指向 `b` 前，務必先保留 `nextPair = b->next`。  
- ☐ 迴圈推進錯誤：`prev` 要設為 `a`（交換後的第二個）。  
- ☐ 遞迴版忘記把 `first->next` 接到遞迴結果，或忘記 `second->next = first`。

---

## 六、測試建議

1. `[]` → `[]`  
2. `[1]` → `[1]`  
3. `[1,2]` → `[2,1]`  
4. `[1,2,3]` → `[2,1,3]`  
5. `[1,2,3,4]` → `[2,1,4,3]`  
6. 大型隨機測資（檢查時間與健壯性）

---

## 七、補充：兩法比較

| 面向 | 迭代 | 遞迴 |
|---|---|---|
| 可讀性 | 清楚、需小心指標順序 | 簡潔、貼近題意 |
| 時間 | `O(n)` | `O(n)` |
| 额外空間 | `O(1)` | `O(n)`（堆疊） |
| 風險 | 指標重接順序錯誤 | 遞迴過深（理論上最差 `n` 層） |

---

**備註**：若環境需要嚴謹釋放 dummy 記憶體，迭代法中我們已在返回前 `delete dummy`；LeetCode 通常容許略過這一步，但保留更安全。

