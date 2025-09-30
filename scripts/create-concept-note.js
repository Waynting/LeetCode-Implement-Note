#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Project directories
const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const NOTES_DIR = path.join(CONTENT_DIR, 'notes');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'Note_Template');

// Available categories
const CATEGORIES = {
  'data-structures': 'Data Structures',
  'algorithms': 'Algorithms', 
  'techniques': 'Problem-Solving Techniques',
  'concepts': 'Core Concepts'
};

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

// Generate concept note from template
function generateConceptNote(noteData) {
  const templatePath = path.join(TEMPLATE_DIR, 'DSA_Concept_Template_EN.md');
  let template = fs.readFileSync(templatePath, 'utf-8');
  
  // Replace template placeholders
  template = template
    .replace(/- \*\*Concept Name\*\*:/, `- **Concept Name**: ${noteData.title}`)
    .replace(/- \*\*Category\*\*: Data Structure \/ Algorithm \/ Pattern/, `- **Category**: ${noteData.category}`)
    .replace(/- \*\*Tags\*\*:/, `- **Tags**: ${noteData.tags}`)
    .replace(/- \*\*Last Updated\*\*:/, `- **Last Updated**: ${noteData.createdAt}`);

  // Add title at the top
  template = `# ${noteData.title}\n\n` + template;

  return template;
}

// Generate clean ID from title
function generateId(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-|\-$/g, '');
}

// Update index.json for the category
function updateCategoryIndex(category, noteData) {
  const categoryPath = path.join(NOTES_DIR, category);
  const indexPath = path.join(categoryPath, 'index.json');
  
  let index = {
    category: category,
    displayName: CATEGORIES[category],
    notes: [],
    lastUpdated: new Date().toISOString()
  };
  
  // Read existing index if it exists
  if (fs.existsSync(indexPath)) {
    try {
      index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    } catch (error) {
      console.log(`⚠️  Could not read existing index, creating new one...`);
    }
  }
  
  // Add new note to index
  const newNote = {
    filename: `${noteData.id}.md`,
    id: noteData.id,
    title: noteData.title,
    tags: noteData.tags.split(',').map(t => t.trim()),
    createdAt: noteData.createdAt
  };
  
  // Check if note already exists
  const existingIndex = index.notes.findIndex(note => note.id === noteData.id);
  if (existingIndex !== -1) {
    index.notes[existingIndex] = newNote;
    console.log(`📝 Updated existing note in index`);
  } else {
    index.notes.push(newNote);
    console.log(`📝 Added new note to index`);
  }
  
  // Update timestamp
  index.lastUpdated = new Date().toISOString();
  
  // Write updated index
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
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
  console.log('🚀 ShuaShua Note - Create DSA Concept Note\n');
  
  try {
    // Get note details from user
    console.log('📝 Enter concept note details:\n');
    
    // Concept title
    let title;
    while (true) {
      title = await ask('Concept title: ');
      if (validateNotEmpty(title, 'Title')) break;
    }
    
    // Category
    console.log('\nAvailable categories:');
    Object.entries(CATEGORIES).forEach(([key, value], index) => {
      console.log(`  ${index + 1}. ${key} (${value})`);
    });
    
    let category;
    while (true) {
      const categoryInput = await ask('\nSelect category (1-4): ');
      const categoryIndex = parseInt(categoryInput) - 1;
      const categoryKeys = Object.keys(CATEGORIES);
      
      if (categoryIndex >= 0 && categoryIndex < categoryKeys.length) {
        category = categoryKeys[categoryIndex];
        break;
      } else {
        console.log('❌ Please enter a valid category number (1-4)');
      }
    }
    
    // Tags
    let tags;
    while (true) {
      tags = await ask('Tags (comma-separated): ');
      if (validateNotEmpty(tags, 'Tags')) break;
    }
    
    // Generate ID from title
    const noteId = generateId(title);
    
    // Prepare note data
    const noteData = {
      id: noteId,
      title: title,
      category: CATEGORIES[category],
      tags: tags,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Create category directory if it doesn't exist
    const categoryPath = path.join(NOTES_DIR, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
      console.log(`📁 Created category directory: ${category}`);
    }
    
    // Create note file
    const notePath = path.join(categoryPath, `${noteId}.md`);
    
    if (fs.existsSync(notePath)) {
      const overwrite = await ask(`⚠️  Note file already exists. Overwrite? (y/N): `);
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Note creation cancelled.');
        rl.close();
        return;
      }
    }
    
    // Generate and write note content
    const noteContent = generateConceptNote(noteData);
    fs.writeFileSync(notePath, noteContent);
    
    // Update category index
    updateCategoryIndex(category, noteData);
    
    console.log('\n✅ DSA concept note created successfully!');
    console.log(`📄 File: ${notePath}`);
    console.log(`📝 Category: ${CATEGORIES[category]}`);
    console.log(`🏷️  Tags: ${tags}`);
    
    // Update static data
    updateBuildData();
    
    console.log('\n🔧 Next steps:');
    console.log('1. Edit the note file to fill in the concept details');
    console.log('2. Add examples, code snippets, and practice problems');
    console.log('3. Test your changes with "npm run dev"');
    console.log('4. Add and commit your changes when ready');
    
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