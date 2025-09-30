# ShuaShua Note - Content Creation Guide

## 📝 File Naming Conventions

### Problem Solution Files

**Current Format**: `{originalId}-{problem-title-slug}.md`
- Examples:
  - `0001-two-sum.md` (LeetCode)
  - `0004-median-of-two-sorted-arrays.md` (LeetCode)
  - `0383-ransom-note.md` (LeetCode)

**Recommended Future Format** (for multi-platform): `{source-prefix}-{originalId}-{problem-title-slug}.md`
- Examples:
  - `lc-0001-two-sum.md` (LeetCode)
  - `cf-1000-a-b-problem.md` (Codeforces)
  - `ac-abc001-a-card-game.md` (AtCoder)
  - `cses-1001-weird-algorithm.md` (CSES)
  - `zj-a001-hello-world.md` (ZeroJudge)

### Source Prefixes
- `lc` - LeetCode
- `cf` - Codeforces  
- `ac` - AtCoder
- `cses` - CSES
- `zj` - ZeroJudge
- `other` - Other platforms

### Concept Note Files

**Format**: `{concept-name-slug}.md`
- Examples:
  - `binary-search-explained.md`
  - `dfs-bfs-explained.md`
  - `sliding-window-pattern.md`

## 📁 Directory Structure

### Problem Solutions
Store problem solutions in topic-based directories:
```
content/problems/{topic}/{filename}.md
```

**Topics:**
- `array/` - Array problems
- `linkedlist/` - Linked List problems
- `tree/` - Tree problems
- `hashtable/` - Hash Table problems
- `math/` - Mathematics problems
- `string/` - String problems
- `dfs/` - Depth-First Search problems
- `bfs/` - Breadth-First Search problems
- `dynamicprogramming/` - Dynamic Programming problems
- `greedy/` - Greedy Algorithm problems
- `backtracking/` - Backtracking problems
- `binarysearch/` - Binary Search problems
- `twopointers/` - Two Pointers problems
- `slidingwindow/` - Sliding Window problems
- `sort/` - Sorting problems
- `stack/` - Stack problems
- `queue/` - Queue problems
- `graph/` - Graph problems
- `bitmanipulation/` - Bit Manipulation problems

### Learning Notes
Store concept notes in category-based directories:
```
content/notes/{category}/{filename}.md
```

**Categories:**
- `data-structures/` - Data structure concepts
- `algorithms/` - Algorithm explanations
- `techniques/` - Problem-solving techniques
- `concepts/` - Core programming concepts

## 📋 Content Templates

### Problem Solution Template

Use the template at `Note_Template/PROBLEM_NOTE_TEMPLATE.md`:

```markdown
# {Problem Number}. {Problem Title}

## Problem Information
- **Problem ID**: {Problem Number}
- **Title**: {Problem Title}
- **Difficulty**: {Easy/Medium/Hard}
- **Source**: {Leetcode/Codeforces/Atcoder/CSES/Zerojudge/Other}
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

### Solution 2: {Alternative Solution Name} (Optional)
**Time Complexity**: O(...)
**Space Complexity**: O(...)

#### Code
```cpp
// Alternative C++ solution code here
```

## Personal Notes
{My thought process, challenges faced, insights gained, mistakes made, lessons learned}
```

### Concept Note Template

Use the template at `Note_Template/DSA_Concept_Template_EN.md`:

```markdown
# {Concept Title}

## Overview
{Brief overview of the concept}

## Basic Concepts

### Definition
{Clear definition of the concept}

### Key Properties
- Property 1
- Property 2
- Property 3

## Implementation Details

### Core Operations
{Description of main operations}

### Time & Space Complexity
- Operation 1: O(...)
- Operation 2: O(...)

## Common Patterns

### Pattern 1: {Pattern Name}
{Description and example}

### Pattern 2: {Pattern Name}
{Description and example}

## Practical Applications
{Real-world use cases}

## Related Topics
- Related concept 1
- Related concept 2

## Practice Problems
- Problem 1 (Easy)
- Problem 2 (Medium)
- Problem 3 (Hard)

## Further Reading
- [Resource 1](link)
- [Resource 2](link)
```

## 🚀 Creating New Content

### Using Interactive Scripts

**For Problem Solutions:**
```bash
npm run create:problem
```
This script will:
1. Ask for problem details (ID, title, source, difficulty)
2. Select appropriate topic
3. Create the file with proper naming
4. Generate the template with metadata

**For Concept Notes:**
```bash
npm run create:concept
```
This script will:
1. Ask for concept title
2. Select category
3. Create the file with proper naming
4. Generate the template

### Manual Creation

1. **Choose the appropriate directory** based on content type
2. **Follow naming conventions** for file names
3. **Copy the relevant template** and fill in content
4. **Run data rebuild** after creating new files:
   ```bash
   npm run build:data
   ```

## 📊 Content Guidelines

### Problem Solutions
- **Focus on clarity**: Write clean, readable code
- **Include complexity analysis**: Always specify time/space complexity
- **Add personal insights**: Share your learning experience
- **Keep it simple**: Avoid unnecessary complexity in explanations
- **Use consistent formatting**: Follow the template structure

### Concept Notes
- **Start with basics**: Begin with fundamental concepts
- **Use examples**: Include practical examples
- **Link related content**: Reference related problems and concepts
- **Progressive difficulty**: Structure from simple to advanced
- **Visual aids**: Use diagrams when helpful (store in `content/assets/`)

### Code Style
- **Language consistency**: Primarily use C++ for solutions
- **Proper formatting**: Use consistent indentation and spacing
- **Clear variable names**: Use descriptive variable names
- **Comments when needed**: Add comments for complex logic

## 🔧 Build Process

After creating or modifying content:

1. **Regenerate static data:**
   ```bash
   npm run build:data
   ```

2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 Metadata Format

### Problem Files
The build system extracts metadata from markdown files:
- **Source**: From `- **Source**: Platform` line
- **Difficulty**: From `- **Difficulty**: Level` line  
- **Topics**: From `- **Topics**: Topic1, Topic2` line
- **Title**: From main heading `# Title`
- **Description**: From Problem Description section

### Note Files
Metadata can be included in frontmatter or extracted from content:
```yaml
---
title: "Note Title"
category: "data-structures"
difficulty: "intermediate"
topics: ["Array", "Sorting"]
---
```

## 🌐 Multi-Platform Support

### Supported Platforms
- **LeetCode**: Popular algorithm practice platform
- **Codeforces**: Competitive programming platform
- **AtCoder**: Japanese competitive programming platform
- **CSES**: Problem Set from University of Helsinki
- **ZeroJudge**: Taiwan's online judge system
- **Other**: Additional platforms as needed

### Platform-Specific Guidelines

**LeetCode Problems:**
- Include difficulty level (Easy/Medium/Hard)
- Link to official problem page
- Use standard LeetCode problem numbering

**Codeforces Problems:**
- Include contest and problem letter (e.g., "1000A")
- Link to problem page
- Note the contest type if relevant

**AtCoder Problems:**
- Include contest name and problem letter
- Follow AtCoder's naming conventions
- Link to official problem page

**CSES Problems:**
- Include CSES problem number
- Link to CSES problem set
- Note the category within CSES

## 🆔 Composite ID System

Problems use a composite ID format: `{source}-{originalId}`

**Examples:**
- `leetcode-1` - LeetCode problem #1
- `codeforces-1000` - Codeforces problem #1000
- `atcoder-abc001-a` - AtCoder ABC001 problem A
- `cses-1001` - CSES problem #1001

This ensures unique identification across all platforms.

## 🤝 Best Practices

### File Organization
- **Consistent naming**: Follow the established conventions
- **Logical grouping**: Place files in appropriate topic/category folders
- **Clean structure**: Keep directory structure organized

### Content Quality
- **Accurate information**: Verify solution correctness
- **Clear explanations**: Write for your future self
- **Complete solutions**: Include all necessary components
- **Regular updates**: Keep content current and relevant

### Version Control
- **Meaningful commits**: Use descriptive commit messages
- **Incremental changes**: Make small, focused changes
- **Test before committing**: Ensure builds work correctly

## 🔗 Related Documentation
- [README.md](README.md) - Project overview and setup
- [DEVELOPMENT.md](DEVELOPMENT.md) - Technical development details
- Templates in `Note_Template/` - Content creation templates