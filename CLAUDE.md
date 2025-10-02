# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
npm run dev              # Start development server (http://localhost:3000)
npm run build:data       # Generate static data from markdown files (required after content changes)
npm run build            # Build production bundle
npm run lint             # Run ESLint
npm run watch:content    # Auto-watch content changes and update index.json files
npm run init:indexes     # Initialize all index.json files
```

### Content Creation
```bash
npm run create:problem   # Interactive script to create new problem solution
npm run create:concept   # Interactive script to create new concept note
```

## High-Level Architecture

### Data Flow Architecture
The system follows a static generation pattern:

1. **Content Layer** (`/content/`): Markdown files serve as the single source of truth
2. **Build Scripts** (`/scripts/`): Transform markdown content into TypeScript data files
3. **Static Data** (`/src/lib/*-static.ts`): Generated TypeScript files consumed by React components
4. **UI Layer** (`/src/app/`): Next.js App Router pages render the static data

### Key Architectural Decisions

**Static Data Generation**: The `build-data.js` script processes all markdown files and generates `problems-static.ts` and `notes-static.ts`. This happens at build time, not runtime, enabling static exports and optimal performance.

**Composite ID System**: Problems use `{source}-{originalId}` format (e.g., `leetcode-1`, `codeforces-1000`) to ensure unique identification across multiple platforms. This is critical for routing and data management.

**Content Organization**: Problems are organized by algorithm/data structure topics (not by platform), while notes are organized by learning categories. Each folder contains an `index.json` for fast lookups.

**Auto-updating Indexes**: The `watch-content.js` script monitors the content directory and automatically regenerates `index.json` files when markdown files are added/modified/deleted.

### Core Components Interaction

**Problem Display Flow**:
1. User navigates to `/problems/leetcode-1`
2. `[id]/page.tsx` reads from `problems-static.ts`
3. `MarkdownRenderer` component processes the markdown content
4. `CodeBlock` component handles syntax highlighting

**Filtering System**:
- Problems page maintains filter state (search, topic, source, sort)
- Filters operate on the pre-loaded static array
- Sorting options: Latest First (reverse array), Oldest First (original), Title A-Z, Difficulty

**Build Process**:
1. Markdown files define metadata in structured format
2. `build-data.js` extracts metadata and content
3. Generates TypeScript files with proper typing
4. Next.js consumes these during build

### Important Implementation Details

- **No Database**: All data comes from markdown files processed at build time
- **No API Routes**: Pure static site generation, all data is embedded
- **Theme Context**: Currently exists but theme toggle was removed from UI
- **Platform Support**: LeetCode, Codeforces, AtCoder, CSES, ZeroJudge, Other
- **Topics**: 19 predefined algorithm/DS topics for categorization

## Working with Content

When modifying content:
1. Always run `npm run build:data` after adding/modifying markdown files
2. Use the composite ID format when referencing problems
3. Place problems in the correct topic folder (not platform folder)
4. Follow the exact metadata format in templates for proper extraction

## Critical Files to Understand

- `/scripts/build-data.js` - Core data transformation logic
- `/src/lib/problems-static.ts` - Generated data structure
- `/src/app/problems/page.tsx` - Main filtering/sorting implementation
- `/content/problems/*/index.json` - Auto-generated folder indexes