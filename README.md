# ShuaShua Note

A multi-platform algorithm practice note system supporting LeetCode, Codeforces, AtCoder, CSES, ZeroJudge and other coding platforms. Organize your solutions and notes efficiently for systematic learning and review.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build static data from content
npm run build:data
```

### Creating New Notes

```bash
# Create problem solution notes
npm run create:problem

# Create DSA concept learning notes  
npm run create:concept

# Or manually create files in content/
```

## ✨ Features

- 🌐 **Multi-Platform Support**: Support for LeetCode, Codeforces, AtCoder, CSES, ZeroJudge and other platforms
- 📁 **Topic Organization**: Problems and notes organized by algorithms and data structures
- 📊 **Progress Overview**: Quick insights into your learning progress
- 🔍 **Smart Filtering**: Filter by topic, source platform, and category
- 📝 **Standardized Templates**: Consistent note format with solution information and personal insights
- 🔗 **Unique ID System**: Composite ID system (source-problemId) ensures no conflicts between platforms
- 📱 **Responsive Design**: Works on all devices

## 📁 Project Structure

```
ShuaShua-Note/
├── content/                    # All content organized by type
│   ├── problems/              # Problem solutions by topic
│   ├── notes/                 # Learning notes by category
│   └── assets/                # Images and resources
├── src/                       # Next.js source code
├── scripts/                   # Build and utility scripts
├── Note_Template/             # Note templates
├── DEVELOPMENT.md             # Development documentation
└── README.md                  # This file
```

## 📝 Creating Notes

### Easy Way (Recommended)

Use the interactive scripts:

**For Problem Solutions:**
```bash
npm run create:problem
```

This will guide you through:
- Problem ID and title
- Source platform (LeetCode, Codeforces, AtCoder, etc.)
- Topic assignment (Array, LinkedList, Tree, etc.)
- Problem description

**For DSA Concept Notes:**
```bash
npm run create:concept
```

This will guide you through:
- Concept title
- Category selection (Data Structures, Algorithms, Techniques, Concepts)
- Tags and topics

### Manual Way

1. **For Problem Solutions**: Create in `content/problems/{topic}/`
   - Use template: `Note_Template/PROBLEM_NOTE_TEMPLATE.md`
   - **File naming format**: `{problemId}-{slug}.md`
   - Examples:
     - `33-search-in-rotated-sorted-array.md` (LeetCode #33)
     - `1000-a-plus-b-problem.md` (Codeforces #1000)
   - ❌ **Wrong**: `leetcode_33_note.md`, `problem-33.md`

2. **For Concept Notes**: Create in `content/notes/{category}/`
   - Use template: `Note_Template/DSA_Concept_Template_EN.md`
   - **File naming format**: `{slug}.md` (lowercase, hyphen-separated)
   - Examples:
     - `binary-tree.md`
     - `dynamic-programming-intro.md`
   - ❌ **Wrong**: `Binary_Tree.md`, `DP_intro.md`

3. Copy the appropriate template and fill in your content

4. Regenerate static data:
   ```bash
   npm run build
   ```

## 🌐 Supported Platforms

- **LeetCode**: Popular algorithm practice platform
- **Codeforces**: Competitive programming platform
- **AtCoder**: Japanese competitive programming platform  
- **CSES**: Problem Set from the University of Helsinki
- **ZeroJudge**: Taiwan's online judge system
- **Other**: Support for additional platforms

## 🔗 Problem ID System

Problems use a composite ID system to avoid conflicts:
- Format: `{source}-{originalId}`
- Examples: `leetcode-1`, `codeforces-1000`, `atcoder-abc001-a`
- This ensures unique identification across all platforms

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
npm run build:data  # Generate static data
npm run build       # Build Next.js app
npm run start       # Start production server
```

### Deploy to Vercel

1. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel will auto-detect Next.js configuration

2. **Build Settings** (auto-configured with vercel.json):
   - Framework Preset: Next.js
   - Build Command: `npm run vercel-build`
   - Root Directory: Auto-detected

### Live Website

📱 **Website**: Will be available on Vercel deployment URL

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Happy coding! 🎯