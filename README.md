# LeetCode Practice Notes

A systematic LeetCode practice note system organized by topics for efficient learning and review.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
cd web && npm install

# Start development server
npm run dev

# Build static data from content
npm run build:data
```

### Creating New Notes

```bash
# Create LeetCode problem solution notes
cd web && npm run create:problem

# Create DSA concept learning notes  
cd web && npm run create:concept

# Or manually create files in content/
```

## ✨ Features

- 📁 **Topic Organization**: Problems and notes organized by algorithms and data structures
- 📊 **Progress Overview**: Quick insights into your learning progress
- 🔍 **Smart Filtering**: Filter by topic, difficulty, and category
- 📝 **Standardized Templates**: Consistent note format with complete solution information
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works on all devices

## 📁 Project Structure

```
LeetCode-Implement-Note/
├── content/                    # All content organized by type
│   ├── problems/              # Problem solutions by topic
│   ├── notes/                 # Learning notes by category
│   └── assets/                # Images and resources
├── web/                       # Next.js frontend
├── scripts/                   # Build and utility scripts
├── DEVELOPMENT.md             # Development documentation
└── README.md                  # This file
```

## 📝 Creating Notes

### Easy Way (Recommended)

Use the interactive scripts:

**For LeetCode Problem Solutions:**
```bash
cd web
npm run create:problem
```

This will guide you through:
- Problem ID and title
- Difficulty level (Easy/Medium/Hard)
- Topic assignment (Array, LinkedList, Tree, etc.)
- Problem description

**For DSA Concept Notes:**
```bash
cd web
npm run create:concept
```

This will guide you through:
- Concept title
- Category selection (Data Structures, Algorithms, Techniques, Concepts)
- Tags and topics

### Manual Way

1. **For Problem Solutions**: Create in `content/problems/{topic}/`
   - Use template: `Note_Template/Leetcode_NOTE_TEMPLATE.md`
   - Example: `content/problems/array/0001-two-sum.md`

2. **For Concept Notes**: Create in `content/notes/{category}/`
   - Use template: `Note_Template/DSA_Concept_Template_EN.md`
   - Example: `content/notes/data-structures/binary-tree.md`

3. Copy the appropriate template and fill in your content

4. Regenerate static data:
   ```bash
   npm run build:data
   ```

## 🎯 Topics Covered

### Data Structures
- Array, String, LinkedList, Stack, Queue, HashTable

### Trees & Graphs  
- Tree, BinarySearchTree, Graph

### Search & Traversal
- DFS, BFS, BinarySearch

### Advanced Algorithms
- DynamicProgramming, Greedy, Backtracking

### Techniques & Others
- TwoPointers, SlidingWindow, Sort, Math, BitManipulation

## 🚀 Deployment

### Build for Production

```bash
cd web
npm run build:data  # Generate static data
npm run build       # Build Next.js app
npm run export      # Export static files
```

### Live Website

📱 **Website**: https://waynting.github.io/LeetCode-Implement-Note/

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Happy coding! 🎯
