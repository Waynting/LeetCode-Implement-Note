
# 2353. Design a Food Rating System

## Problem Information
- **Problem ID**: 2353
- **Title**: Design a Food Rating System
- **Difficulty**: Medium
- **Source**: Leetcode
- **Link**: https://leetcode.com/problems/design-a-food-rating-system/
- **Topics**: Hash Map, Ordered Set, Design

## Problem Description

Design a system to support:
1. `changeRating(food, newRating)`: update the rating of a given food.
2. `highestRated(cuisine)`: return the name of the highest-rated food for the given cuisine; if there is a tie, return the lexicographically smaller name.

You are given arrays `foods`, `cuisines`, and `ratings` of length `n`, where `foods[i]` is the food name, `cuisines[i]` is its cuisine, and `ratings[i]` is its initial rating.

## Solutions

### Solution 1: HashMap + Ordered Set per Cuisine
**Time Complexity**: 
- Initialization: O(n log n)
- `changeRating`: O(log n) per update
- `highestRated`: O(1) to read `begin()` (amortized; the ordered set maintains ordering)

**Space Complexity**: O(n) for maps and ordered sets

**Key Idea**: 
- Maintain `food -> (cuisine, rating)` in an `unordered_map` for O(1) lookups during updates.
- For each cuisine, maintain an ordered `set` of pairs `(-rating, name)` so that the **best** item is at `begin()` (highest rating; ties broken by lexicographically smaller name).  
- On rating change: remove the old pair, update the map, insert the new pair.

#### Code
```cpp
#include <string>
#include <vector>
#include <unordered_map>
#include <set>
using namespace std;

class FoodRatings {
public:
    // food -> (cuisine, rating)
    unordered_map<string, pair<string,int>> info;
    // cuisine -> ordered set of (-rating, name)
    unordered_map<string, set<pair<int,string>>> byCuisine;

    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {
        int n = (int)foods.size();
        info.reserve(n * 2);
        for (int i = 0; i < n; ++i) {
            info[foods[i]] = {cuisines[i], ratings[i]};
            byCuisine[cuisines[i]].insert({-ratings[i], foods[i]});
        }
    }

    void changeRating(string food, int newRating) {
        auto &pr = info[food];         // pr.first = cuisine, pr.second = oldRating
        const string &c = pr.first;
        int oldRating = pr.second;

        auto &S = byCuisine[c];
        S.erase({-oldRating, food});   // remove old record
        pr.second = newRating;         // update rating
        S.insert({-newRating, food});  // insert new record
    }

    string highestRated(string cuisine) {
        const auto &S = byCuisine[cuisine];
        // set is ordered by (-rating, name) ascending; begin() gives highest rating & lexicographically smallest name
        return S.begin()->second;
    }
};
```

### Solution 2: HashMap + Priority Queue with Lazy Deletion (Optional)
**Time Complexity**: 
- `changeRating`: O(log n) (push a new entry)
- `highestRated`: amortized O(log n) (pop stale entries until top is valid)

**Space Complexity**: O(n)

**Idea**: Keep a `priority_queue` per cuisine storing `(rating, name, version)` and a hash map for current `(cuisine, rating)`; during query, pop outdated entries (lazy deletion). Slightly more code, similar complexity; ordered set is cleaner for strict ordering.

## Personal Notes
這是我第一次寫系統設計的部分。正確的做法是先確認需要的操作（初始化、更新、查詢），再決定資料結構與維護方式。這題的關鍵是把需求拆成兩個索引：
- 以食物名稱查 `(cuisine, rating)`（用 `unordered_map`）
- 以菜系查「最高分、同分字典序最小」（用 per-cuisine 的 ordered `set` 存 `(-rating, name)`）

更新時遵守「先刪舊、後插新」的不變量，確保集合內容與當前評分同步。這題本質是把 DSA 組件（hash + ordered set + key 設計）組裝成可維護的系統。
