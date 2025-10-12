---
title: 圖的基本遍歷與二分檢查（學習筆記）
author: 你（整理：ChatGPT）
tags: [Graph, BFS, DFS, Bipartite, Connected Components]
date: 2025-10-11
---

> **用途**：本筆記作為入門與速查，聚焦「無向圖」的遍歷與二分檢查。  
> **風格**：概念優先、流程清晰、只給**偽碼骨架**（不含可提交實作）。

## 一、基本名詞與模型

- **圖 (Graph)**：由「頂點（vertices）」與「邊（edges）」組成。本文默認**無向簡單圖**（不含自環與重邊）。
- **表示法**：
  - **鄰接表**：`adj[v]` 存所有與 `v` 相鄰的頂點。空間 ~ `O(N + M)`，遍歷友好。
  - **鄰接矩陣**：`mat[v][u]` 是否有邊。空間 ~ `O(N^2)`，適合密集圖、小圖。
- **連通分量 (Connected Component)**：圖可分成幾塊彼此可達的子圖；遍歷時常需要**從每個未訪問點**重新起始。

## 二、遍歷總覽：BFS 與 DFS

### 2.1 BFS（廣度優先）
- **核心**：分層擴張，使用**佇列**。適合最短邊數距離、二分染色。
- **不變量**：
  1. 佇列中的點，其距離層級（從起點）不遞減。
  2. 每條已出佇列的點都已處理過鄰居。

**偽碼骨架（單源起點 `s`）**
```
queue Q
mark s as visited
Q.push(s)
while Q not empty:
    v = Q.pop()
    for each neighbor u of v:
        if u not visited:
            mark u as visited
            Q.push(u)
```
> 多分量時：對每個未訪問節點 `x`，各自啟動一次 BFS。

### 2.2 DFS（深度優先）
- **核心**：一路深入再回溯，**遞迴或顯式堆疊**。
- **觀念**：會自然生成 DFS 樹，可辨識「樹邊／回邊」，在無向圖中**回邊**代表存在環。

**偽碼骨架（遞迴版）**
```
function DFS(v, parent):
    mark v as visited
    for each neighbor u of v:
        if u not visited:
            DFS(u, v)
        else if u != parent:
            # 在無向圖中出現回邊 → 有環
```
> 遞迴深度可能達 `N`；在工程中可改成顯式堆疊。

### 2.3 連通分量的取得
```
for v in 1..N:
    if v not visited:
        # 以 v 為新分量起點
        run BFS/DFS from v
```

## 三、二分圖（Bipartite）與奇環

- **定義**：可把頂點分成兩色（黑/白），**每條邊兩端顏色不同**。
- **等價條件（無向圖）**：**沒有奇數長度的環（奇環）** ⇔ 是二分圖。
- **直觀**：BFS/DFS 以「層級奇偶」作為顏色；若遇到一條邊連到**相同顏色**的點 → 發生**顏色衝突** ⇒ 有奇環 ⇒ 非二分。

## 四、二分檢查：遍歷 + 染色

### 4.1 流程概念
1. **多分量**：對每個未訪問節點作為起點。
2. 起點染色（例如色 `0`），並以 BFS 或 DFS 擴張。
3. 每當走到一條邊 `(v,u)`：
   - 若 `u` 未染色：賦予 `u` = `1 - color[v]`。
   - 若 `u` 已染色且 `color[u] == color[v]` → **衝突**（即存在奇環）→ 非二分。

### 4.2 偽碼骨架（BFS 染色，多分量）
```
color[] = UNCOLORED
for each vertex s in 1..N:
    if color[s] == UNCOLORED:
        color[s] = 0
        queue Q; Q.push(s)
        while Q not empty:
            v = Q.pop()
            for u in adj[v]:
                if color[u] == UNCOLORED:
                    color[u] = 1 - color[v]
                    Q.push(u)
                else if color[u] == color[v]:
                    return "NOT BIPARTITE"
return "BIPARTITE"
```
> DFS 版本同理，只是把「推入佇列」換成「遞迴呼叫/壓入堆疊」。

### 4.3 為什麼偵測到同色相鄰就是奇環？
- BFS 的顏色就是**距離層級的奇偶性**；若存在邊連接**同層級奇偶性**的兩點，則形成一條**奇數長度環**（兩點由樹路徑相連，再加上該邊）。

## 五、時間與空間複雜度

- **時間**：`O(N + M)`，每條邊與節點皆至多被處理常數次。
- **空間**：`O(N + M)`（鄰接表） + `O(N)`（佇列或遞迴堆疊）。

## 六、常見陷阱與排錯心法

1. **只從 1 起走、忽略其他分量** → 漏檢。  
2. **把自環、重邊當成一般邊**：
   - 自環（`v` 連 `v`）直接判「非二分」；
   - **重邊**（`u`—`v` 重複）在無向圖不會單獨造成奇環，但要當作兩條平行邊處理輸入。
3. **遞迴爆棧**：節點數大時用顯式堆疊或 BFS。  
4. **顏色初始化**：務必把「未染色」與 `0/1` 區分清楚。  
5. **索引混亂**：題目若 1-index，程式中 0-index 要一致轉換。  
6. **方向誤解**：本文方法適用**無向圖**；有向圖的「二分圖」概念不同。

## 七、延伸與變體（概念）

- **邊權／點權**：二分檢查與權重無關（只看結構）。  
- **找一個奇環證據**：衝突當下可沿父親指標回朔，輸出一條奇環（學術上常用）。  
- **二分圖結構應用**：最大匹配（Hopcroft–Karp）、最小點覆蓋（Kőnig 定理）、網路流建模等。

## 八、練習題建議（純題名，便於自查）
- **785. Is Graph Bipartite?**（無向圖二分檢查基本題）  
- **886. Possible Bipartition**（把人分兩派、衝突邊表示不能同色）  
- **200. Number of Islands**（練 BFS/DFS 遍歷與分量計數）  
- **547. Number of Provinces**（圖的分量）  
- **994. Rotting Oranges**（BFS 層級擴張的節奏感）

## 九、微練習（自我檢查）
1. 為何「沒有奇環」就一定能二分染色？反方向又為何成立？  
2. 若圖是一片森林（所有分量皆樹），需要做什麼就能保證二分？  
3. 在 BFS 染色中，遇到 `(v,u)` 且 `color[u] == color[v]`，試用「樹路徑 + 這條邊」畫出對應奇環的構造。

## 十、附錄：顯式堆疊的 DFS 染色骨架（僅供思路）
```
stack S
color[s] = 0
S.push(s)
while S not empty:
    v = S.pop()
    for u in adj[v]:
        if color[u] == UNCOLORED:
            color[u] = 1 - color[v]
            S.push(u)
        else if color[u] == color[v]:
            return "NOT BIPARTITE"
return "BIPARTITE"
```

> **結語**：做題時，**先分量、後染色** 是穩定套路；BFS 尤其適合二分檢查。當你能自然從「衝突」回想到「奇環」，就算真的掌握了。
