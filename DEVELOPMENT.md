# ShuaShua Note - Development Documentation

## 📁 Project Architecture

### 🎯 Design Principles
- **Multi-Platform Support**: Unified management across different coding platforms
- **Topic Organization**: Algorithm and data structure focused organization  
- **Static Generation**: Support for Next.js static export
- **Unique Identification**: Composite ID system to avoid conflicts
- **Simplified Interface**: Focus on code and personal insights

### 🗂️ Current Project Structure

```
ShuaShua-Note/
├── content/                          # All content unified management
│   ├── problems/                     # Problem solutions by topic
│   │   ├── array/                    # Array related problems
│   │   │   ├── 0001-two-sum.md
│   │   │   ├── 0004-median-of-two-sorted-arrays.md
│   │   │   └── index.json            # Topic problem index
│   │   ├── linkedlist/
│   │   │   ├── 0002-add-two-numbers.md
│   │   │   ├── 0141-linked-list-cycle.md
│   │   │   └── index.json
│   │   ├── tree/
│   │   ├── hashtable/
│   │   └── meta.json                 # All problem metadata
│   │
│   ├── notes/                        # Learning notes
│   │   ├── data-structures/          # Data structure notes
│   │   │   ├── array-basics.md
│   │   │   ├── linked-list-intro.md
│   │   │   └── index.json
│   │   ├── algorithms/               # Algorithm notes
│   │   │   ├── binary-search-explained.md
│   │   │   ├── dfs-bfs-explained.md
│   │   │   └── index.json
│   │   ├── techniques/               # Problem-solving techniques
│   │   │   ├── two-pointers-technique.md
│   │   │   ├── sliding-window-pattern.md
│   │   │   └── index.json
│   │   └── concepts/                 # Core concepts
│   │       ├── time-complexity-analysis.md
│   │       └── index.json
│   │
│   └── assets/                       # Images, diagrams resources
│       ├── images/
│       └── diagrams/
│
├── src/                              # Next.js source code
│   ├── app/                          # App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Homepage
│   │   ├── problems/
│   │   │   ├── page.tsx              # Problem list with filters
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Problem details
│   │   ├── notes/
│   │   │   ├── page.tsx              # Notes list with filters
│   │   │   └── [noteId]/
│   │   │       └── page.tsx          # Note details
│   │   └── topics/
│   │       └── page.tsx              # Topic overview
│   │
│   ├── components/                   # Shared components
│   │   ├── Header.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   └── CodeBlock.tsx
│   │
│   ├── lib/                          # Utilities and data
│   │   ├── problems-static.ts        # Problem data
│   │   ├── notes-static.ts           # Note data
│   │   └── markdown-reader.ts        # Content utilities
│   │
│   └── contexts/                     # React Context
│       └── ThemeContext.tsx
│
├── scripts/                          # Build and maintenance scripts
│   ├── build-data.js                 # Generate static data files
│   ├── create-problem-note.js        # Create new problem notes
│   └── create-concept-note.js        # Create new concept notes
│
├── Note_Template/                    # Note templates
│   ├── PROBLEM_NOTE_TEMPLATE.md      # Problem solution template
│   └── DSA_Concept_Template_EN.md    # Concept note template
│
├── public/                           # Static resources
│   └── icon.jpg                      # Website icon
│
├── README.md
├── DEVELOPMENT.md                    # This file
└── GUIDE.md                          # User guide
```

## 🔧 Technical Architecture

### Frontend Framework
- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Static Generation** for deployment

### Core Features
1. **Multi-Platform Support** - LeetCode, Codeforces, AtCoder, CSES, ZeroJudge
2. **Light/Dark Theme Toggle**
3. **Responsive Design**
4. **Source & Topic Filtering System**
5. **Search Functionality**
6. **Composite ID System**
7. **Static Site Generation (SSG)**

### Supported Platforms
```typescript
const SOURCES = [
  'Leetcode',      // Popular algorithm practice platform
  'Codeforces',    // Competitive programming platform
  'Atcoder',       // Japanese competitive programming platform
  'CSES',          // Problem Set from University of Helsinki
  'Zerojudge',     // Taiwan's online judge system
  'Other'          // Additional platforms
];
```

### Topic Management
```typescript
const TOPICS = [
  'Array', 'LinkedList', 'Tree', 'Graph',
  'DFS', 'BFS', 'BinarySearch', 'DynamicProgramming', 
  'Greedy', 'Backtracking', 'TwoPointers', 'SlidingWindow',
  'Sort', 'HashTable', 'Stack', 'Queue',
  'Math', 'String', 'BitManipulation'
];
```

## 🆔 Composite ID System

### Problem Identification
- **Format**: `{source}-{originalId}`
- **Examples**: 
  - `leetcode-1` (LeetCode Problem 1)
  - `codeforces-1000` (Codeforces Problem 1000)
  - `atcoder-abc001-a` (AtCoder ABC001 Problem A)

### Benefits
- **Unique Identification**: No conflicts between platforms
- **Platform Recognition**: Easily identify problem source
- **URL Friendly**: Works well in routing systems
- **Scalable**: Easy to add new platforms

## 📝 Content Organization Strategy

### Problem Solution Format
```markdown
# {Problem Number}. {Problem Title}

## Problem Information
- **Problem ID**: {Problem Number}
- **Title**: {Problem Title}
- **Difficulty**: {Easy/Medium/Hard}
- **Source**: {Platform Name}
- **Link**: {Problem URL}
- **Topics**: {Topic1}, {Topic2}, ...

## Problem Description
{Brief description of the problem statement}

## Solutions

### Solution 1: {Solution Name}
**Time Complexity**: O(...)
**Space Complexity**: O(...)

#### Code
```cpp
// C++ solution code here
```

## Personal Notes
{My thought process, challenges faced, insights gained, mistakes made, lessons learned}
```

### Learning Note Format
```markdown
# Note Title

## Overview
{Core concept explanation}

## Basic Concepts

### Definition
{Definition explanation}

### Properties
{Property list}

## Implementation Points

### Key Operations
{Operation explanation}

### Time Complexity
{Complexity analysis}

## Use Cases
{Application scenarios}

## Related Problems
{Related problem list}

## Further Reading
{Reference materials}
```

## 🚀 Development Workflow

### Adding New Problems
1. Create `.md` file in `content/problems/{topic}/`
2. Use `Note_Template/PROBLEM_NOTE_TEMPLATE.md` format
3. Include source information in problem metadata
4. Run `npm run build:data` to regenerate static data

### Adding New Notes  
1. Create `.md` file in `content/notes/{category}/`
2. Use appropriate template
3. Update content and rebuild

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build static data
npm run build:data

# Build for production
npm run build
```

### Automated Scripts
```bash
# Create new problem note (interactive)
npm run create:problem

# Create new concept note (interactive) 
npm run create:concept

# Generate static data files
npm run build:data
```

## 🔄 Recent Updates

### Major Changes
1. **Multi-Platform Support**: Extended beyond LeetCode
2. **Composite ID System**: Implemented unique identification
3. **Source Filtering**: Added platform-based filtering
4. **Simplified UI**: Removed difficulty filtering for non-LeetCode
5. **Template Updates**: Added source field to templates
6. **Website Rebranding**: Changed from "LeetCode Practice Notes" to "ShuaShua Note"

### Technical Improvements
- Updated build scripts to handle multiple sources
- Implemented composite ID generation
- Added source extraction from markdown files
- Updated routing to handle string IDs
- Enhanced filtering capabilities

## 📋 TODO List

### High Priority
- [x] Update Problem interface to use composite unique ID
- [x] Update build script to generate composite IDs  
- [x] Update routing and URL structure for problems
- [ ] Update note file naming convention
- [ ] Test the new ID system thoroughly

### Medium Priority  
- [ ] Add platform-specific URL generation
- [ ] Implement advanced search functionality
- [ ] Add content validation scripts
- [ ] Optimize SEO for multiple platforms
- [ ] Add analytics integration

### Low Priority
- [ ] Add more platform support
- [ ] Implement content recommendations
- [ ] Add progress tracking
- [ ] Create mobile app version

## 🤝 Contributing Guidelines

### Code Style
- Use TypeScript for type safety
- Follow Next.js best practices
- Use Tailwind CSS for styling
- Maintain consistent file naming

### Content Guidelines
- Use English for all documentation
- Follow template formats strictly
- Include personal insights in notes
- Keep solutions simple and clear

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update documentation if needed
5. Submit a pull request

## 📄 License
MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Related Documentation
- [README.md](README.md) - Main project documentation
- [GUIDE.md](GUIDE.md) - User guide for creating content
- Templates in `Note_Template/` - Content creation templates