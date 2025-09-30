#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Project directories
const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const PROBLEMS_DIR = path.join(CONTENT_DIR, 'problems');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'Note_Template');

// Available topic directories
const TOPICS = [
  'array', 'linkedlist', 'tree', 'string', 'math', 'hashtable',
  'bfs', 'dfs', 'dynamicprogramming', 'greedy', 'backtracking',
  'binarysearch', 'twopointers', 'slidingwindow', 'sort',
  'stack', 'queue', 'graph', 'bitmanipulation'
];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility function to ask questions
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Utility function to validate input
function validateNotEmpty(input, fieldName) {
  if (!input.trim()) {
    console.log(`❌ ${fieldName} cannot be empty!`);
    return false;
  }
  return true;
}

// Generate problem note from template
function generateProblemNote(noteData) {
  const templatePath = path.join(TEMPLATE_DIR, 'Leetcode_NOTE_TEMPLATE.md');
  let template = fs.readFileSync(templatePath, 'utf-8');
  
  // Replace template placeholders
  template = template
    .replace(/{Problem Number}/g, noteData.problemId)
    .replace(/{Problem Title}/g, noteData.title)
    .replace(/{Easy\/Medium\/Hard}/g, noteData.difficulty)
    .replace(/{problem-slug}/g, noteData.slug)
    .replace(/{Topic1}, {Topic2}, \.\.\./g, noteData.topics.join(', '))
    .replace(/{Brief description of the problem statement}/g, noteData.description)
    .replace(/{Solution Name}/g, 'Approach Name')
    .replace(/{Alternative Solution Name}/g, 'Alternative Approach Name')
    .replace(/{Detailed explanation of the approach and algorithm}/g, 'Explain your approach here')
    .replace(/{Explanation of alternative approach}/g, 'Explain alternative approach here')
    .replace(/{Important point 1}/g, 'Key insight 1')
    .replace(/{Important point 2}/g, 'Key insight 2')
    .replace(/{Problem Number}\. {Problem Title}/g, 'Related Problem Title')
    .replace(/{Personal insights, lessons learned, or additional observations about the problem}/g, 'Add your personal notes, insights, and lessons learned here');

  return template;
}

// Generate problem slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/^\d+\.\s*/, '') // Remove problem number prefix
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-|\-$/g, '');
}

// Update build data after creating note
function updateBuildData() {
  try {
    const buildScript = path.join(ROOT_DIR, 'scripts', 'build-data.js');
    if (fs.existsSync(buildScript)) {
      console.log('🔄 Updating static data...');
      const { execSync } = require('child_process');
      execSync('node scripts/build-data.js', { cwd: ROOT_DIR, stdio: 'inherit' });
      console.log('✅ Static data updated successfully!');
    }
  } catch (error) {
    console.log('⚠️  Could not update static data automatically. Please run "npm run build:data" manually.');
  }
}

// Main function
async function main() {
  console.log('🚀 LeetCode Practice Notes - Create Problem Note\n');
  
  try {
    // Get problem details from user
    console.log('📝 Enter problem details:\n');
    
    // Problem ID
    let problemId;
    while (true) {
      problemId = await ask('Problem ID (number): ');
      if (validateNotEmpty(problemId, 'Problem ID') && !isNaN(problemId)) {
        problemId = parseInt(problemId);
        break;
      } else {
        console.log('❌ Please enter a valid problem number');
      }
    }
    
    // Problem title
    let title;
    while (true) {
      title = await ask('Problem title (without number): ');
      if (validateNotEmpty(title, 'Title')) break;
    }
    
    // Full title with number
    const fullTitle = `${problemId}. ${title}`;
    
    // Difficulty
    console.log('\nAvailable difficulties:');
    const difficulties = ['Easy', 'Medium', 'Hard'];
    difficulties.forEach((diff, index) => {
      console.log(`  ${index + 1}. ${diff}`);
    });
    
    let difficulty;
    while (true) {
      const difficultyInput = await ask('\nSelect difficulty (1-3): ');
      const difficultyIndex = parseInt(difficultyInput) - 1;
      
      if (difficultyIndex >= 0 && difficultyIndex < difficulties.length) {
        difficulty = difficulties[difficultyIndex];
        break;
      } else {
        console.log('❌ Please enter a valid difficulty number (1-3)');
      }
    }
    
    // Topics
    console.log('\nAvailable topics:');
    TOPICS.forEach((topic, index) => {
      console.log(`  ${Math.floor(index / 2) * 2 + 1 + (index % 2)}. ${topic}`);
      if (index % 2 === 1 || index === TOPICS.length - 1) console.log('');
    });
    
    let selectedTopics = [];
    while (selectedTopics.length === 0) {
      const topicsInput = await ask('Select topics (comma-separated numbers): ');
      const topicIndices = topicsInput.split(',').map(s => parseInt(s.trim()) - 1);
      
      selectedTopics = topicIndices
        .filter(index => index >= 0 && index < TOPICS.length)
        .map(index => TOPICS[index]);
      
      if (selectedTopics.length === 0) {
        console.log('❌ Please select at least one valid topic');
      }
    }
    
    // Choose primary topic for folder structure
    let primaryTopic;
    if (selectedTopics.length === 1) {
      primaryTopic = selectedTopics[0];
    } else {
      console.log('\nSelected topics:', selectedTopics.join(', '));
      console.log('Choose primary topic for folder organization:');
      selectedTopics.forEach((topic, index) => {
        console.log(`  ${index + 1}. ${topic}`);
      });
      
      while (true) {
        const primaryInput = await ask('\nSelect primary topic: ');
        const primaryIndex = parseInt(primaryInput) - 1;
        
        if (primaryIndex >= 0 && primaryIndex < selectedTopics.length) {
          primaryTopic = selectedTopics[primaryIndex];
          break;
        } else {
          console.log('❌ Please enter a valid topic number');
        }
      }
    }
    
    // Description
    let description;
    while (true) {
      description = await ask('Brief description: ');
      if (validateNotEmpty(description, 'Description')) break;
    }
    
    // Generate filename and slug
    const filename = `${problemId.toString().padStart(4, '0')}-${generateSlug(title)}.md`;
    const slug = generateSlug(title);
    
    // Prepare note data
    const noteData = {
      problemId: problemId,
      title: fullTitle,
      difficulty: difficulty,
      topics: selectedTopics.map(topic => 
        topic.charAt(0).toUpperCase() + topic.slice(1).replace(/([A-Z])/g, ' $1').trim()
      ),
      description: description,
      slug: slug
    };
    
    // Create topic directory if it doesn't exist
    const topicPath = path.join(PROBLEMS_DIR, primaryTopic.toLowerCase());
    if (!fs.existsSync(topicPath)) {
      fs.mkdirSync(topicPath, { recursive: true });
      console.log(`📁 Created topic directory: ${primaryTopic}`);
    }
    
    // Create note file
    const notePath = path.join(topicPath, filename);
    
    if (fs.existsSync(notePath)) {
      const overwrite = await ask(`⚠️  Note file already exists. Overwrite? (y/N): `);
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Note creation cancelled.');
        rl.close();
        return;
      }
    }
    
    // Generate and write note content
    const noteContent = generateProblemNote(noteData);
    fs.writeFileSync(notePath, noteContent);
    
    console.log('\n✅ Problem note created successfully!');
    console.log(`📄 File: ${notePath}`);
    console.log(`🎯 Difficulty: ${difficulty}`);
    console.log(`🏷️  Topics: ${selectedTopics.join(', ')}`);
    console.log(`🔗 LeetCode: https://leetcode.com/problems/${slug}/description/`);
    
    // Update static data
    updateBuildData();
    
    console.log('\n🔧 Next steps:');
    console.log('1. Edit the note file to add your solution and explanations');
    console.log('2. Test your changes with "npm run dev"');
    console.log('3. Add and commit your changes when ready');
    
  } catch (error) {
    console.error('❌ Error creating note:', error.message);
  } finally {
    rl.close();
  }
}

// Run the script
if (require.main === module) {
  main();
}