# Hash Table Core Concepts

## Core Concept (What & Why)

**Intuitive Explanation**: A hash table (hash map) is a data structure that implements an associative array, mapping keys to values using a hash function to compute bucket indices.

**Problem Types Solved**:
- Fast key-value lookups and storage
- Counting occurrences of elements
- Detecting duplicates or cycles
- Grouping related data
- Implementing caches and memoization

**Applicable Conditions**:
- When you need O(1) average lookup time
- When order doesn't matter (for basic hash tables)
- When you have a good hash function for your keys
- When dealing with unique identifiers or mappings

**Time / Space Complexity Target**: Average O(1) access / O(n) space

## Hash Function Properties

### Good Hash Function Characteristics
- **Deterministic**: Same input always produces same output
- **Uniform Distribution**: Spreads keys evenly across buckets
- **Efficient**: Fast to compute
- **Avalanche Effect**: Small input changes cause large output changes

### Common Hash Functions
- **Division Method**: `h(k) = k mod m`
- **Multiplication Method**: `h(k) = floor(m * (k * A mod 1))`
- **Universal Hashing**: Randomized hash function family

## Collision Resolution

### 1. Chaining (Separate Chaining)
- Store colliding elements in linked lists/arrays at each bucket
- Simple to implement, handles high load factors well
- Extra memory overhead for pointers

### 2. Open Addressing
- **Linear Probing**: `h(k, i) = (h'(k) + i) mod m`
- **Quadratic Probing**: `h(k, i) = (h'(k) + c1*i + c2*i^2) mod m`
- **Double Hashing**: `h(k, i) = (h1(k) + i*h2(k)) mod m`

## JavaScript Hash Table Implementation

### Map vs Object

```javascript
// Map usage - maintains insertion order, any key type
const map = new Map();
map.set('key1', 'value1');
map.set(42, 'numeric key');
map.set({}, 'object key');
console.log(map.get('key1')); // 'value1'
map.delete('key1');
console.log(map.size); // 2

// Object usage - string/symbol keys only
const obj = {};
obj['key1'] = 'value1';
obj[42] = 'numeric key'; // converted to string
console.log(obj.key1); // 'value1'
delete obj.key1;
console.log(Object.keys(obj).length); // 1
```

### Set Applications

```javascript
// Set for uniqueness checking
const uniqueItems = new Set([1, 2, 2, 3, 3, 3]);
console.log([...uniqueItems]); // [1, 2, 3]

// Fast membership testing
const allowedIds = new Set([1, 5, 10, 15]);
console.log(allowedIds.has(5)); // true, O(1)
```

## Custom Hash Implementation

```javascript
class HashTable {
    constructor(size = 10) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }
    
    hash(key) {
        let hash = 0;
        for (let char of key.toString()) {
            hash = (hash + char.charCodeAt(0) * 23) % this.size;
        }
        return hash;
    }
    
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const existing = bucket.find(item => item[0] === key);
        
        if (existing) {
            existing[1] = value;
        } else {
            bucket.push([key, value]);
        }
    }
    
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const item = bucket.find(item => item[0] === key);
        return item ? item[1] : undefined;
    }
}
```

## Time Complexity Analysis

| Operation | Average Case | Worst Case | Notes |
|-----------|-------------|------------|-------|
| Insert | O(1) | O(n) | Worst case when all keys hash to same bucket |
| Delete | O(1) | O(n) | Same as insert |
| Search | O(1) | O(n) | Same as insert |
| Space | O(n) | O(n) | Linear in number of key-value pairs |

## Common Application Patterns

### 1. Counting Problems
```javascript
function countFrequency(arr) {
    const freq = new Map();
    for (const item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    return freq;
}
```

### 2. Finding Duplicates
```javascript
function hasDuplicate(arr) {
    const seen = new Set();
    for (const item of arr) {
        if (seen.has(item)) return true;
        seen.add(item);
    }
    return false;
}
```

### 3. Grouping Problems
```javascript
function groupAnagrams(strs) {
    const groups = new Map();
    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(str);
    }
    return Array.from(groups.values());
}
```

## Important Considerations

1. **Load Factor**: Keep load factor (n/m) reasonable for performance
2. **Hash Quality**: Poor hash functions lead to many collisions
3. **Key Equality**: Ensure proper equality comparison for custom objects
4. **Memory Usage**: Hash tables can have significant memory overhead

## Related LeetCode Problems

- [1. Two Sum](https://leetcode.com/problems/two-sum/) - Hash table for complement lookup
- [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/) - Grouping with hash keys
- [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) - Set for O(1) membership
- [560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) - Prefix sum with hash table
- [383. Ransom Note](https://leetcode.com/problems/ransom-note/) - Character counting

## Personal Notes
- **Common Mistakes**: Forgetting to handle null/undefined keys, assuming order preservation
- **Debugging Tips**: Check hash function distribution, monitor load factor
- **Performance**: Consider Set vs Map vs Object based on use case