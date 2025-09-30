import fs from 'fs';
import path from 'path';

// Read markdown file content for a specific problem
export async function getProblemMarkdownContent(problemId: number): Promise<string | null> {
  try {
    // Look for the markdown file in all topic directories
    const contentDir = path.join(process.cwd(), 'content', 'problems');
    
    if (!fs.existsSync(contentDir)) {
      console.warn('Content directory does not exist:', contentDir);
      return null;
    }

    const topicFolders = fs.readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const topicFolder of topicFolders) {
      const topicPath = path.join(contentDir, topicFolder);
      const files = fs.readdirSync(topicPath)
        .filter(file => file.endsWith('.md'));

      for (const file of files) {
        // Extract problem ID from filename
        const idMatch = file.match(/^(\d+)/);
        if (idMatch && parseInt(idMatch[1]) === problemId) {
          const filePath = path.join(topicPath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          return content;
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

// Generate LeetCode URL from problem title
export function generateLeetCodeUrl(title: string): string {
  // Remove problem number prefix (e.g., "141. " from "141. Linked List Cycle")
  const cleanTitle = title.replace(/^\d+\.\s*/, '');
  
  const slug = cleanTitle
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-|\-$/g, '');
  
  return `https://leetcode.com/problems/${slug}/description/`;
}

// Parse frontmatter from markdown content
export function parseFrontmatter(content: string): { metadata: any; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const [, frontmatter, body] = match;
    try {
      const metadata: any = {};
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim();
          metadata[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
      });
      return { metadata, body };
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
    }
  }
  
  return { metadata: {}, body: content };
}