'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NOTES, NOTE_CATEGORIES } from '@/lib/notes-static';
import Header from '@/components/Header';

function NotesContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  // Handle URL parameters for initial filtering
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    const categoryParam = searchParams.get('category');
    
    if (topicParam) {
      setSelectedTopic(topicParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);
  
  const categories = Object.keys(NOTE_CATEGORIES) as Array<keyof typeof NOTE_CATEGORIES>;
  
  // Get all unique topics
  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    NOTES.forEach(note => {
      note.topics.forEach(topic => topics.add(topic));
    });
    return Array.from(topics).sort();
  }, []);
  
  // Filter notes based on selected filters
  const filteredNotes = useMemo(() => {
    let filtered = NOTES;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }
    
    if (selectedTopic !== 'all') {
      filtered = filtered.filter(note => 
        note.topics.some(topic => topic === selectedTopic)
      );
    }
    
    return filtered;
  }, [selectedCategory, selectedTopic]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        title="LeetCode Practice Notes"
        subtitle="Learning Notes"
        currentPage="notes"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Notes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Deep understanding of data structures, algorithms, and problem-solving techniques
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 mb-8 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Note Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {NOTE_CATEGORIES[category]}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Topic Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Related Topics
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
              >
                <option value="all">All Topics</option>
                {allTopics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Active Filters Display */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Category: {NOTE_CATEGORIES[selectedCategory as keyof typeof NOTE_CATEGORIES]}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200"
                >
                  ×
                </button>
              </span>
            )}
            {selectedTopic !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Topic: {selectedTopic}
                <button
                  onClick={() => setSelectedTopic('all')}
                  className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors duration-200"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {filteredNotes.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {selectedCategory !== 'all' || selectedTopic !== 'all' ? 'Filtered Results' : 'Total Notes'}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {NOTES.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">All Notes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {allTopics.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Covered Topics</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {categories.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Note Categories</div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory !== 'all' || selectedTopic !== 'all' 
                ? `Filtered Results (${filteredNotes.length} notes)` 
                : 'All Notes'}
            </h2>
            
            {/* Clear filters button */}
            {(selectedCategory !== 'all' || selectedTopic !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTopic('all');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {filteredNotes.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-12 text-center transition-colors duration-300">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matching notes found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Please adjust filter criteria or clear filters to see more content</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTopic('all');
                }}
                className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map(note => (
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 hover:shadow-xl dark:hover:shadow-gray-900/30 transition-all duration-300 p-6"
                >
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                        {note.title}
                      </h3>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                        note.difficulty === 'beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        note.difficulty === 'intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      }`}>
                        {note.difficulty === 'beginner' ? 'Beginner' :
                         note.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                      </span>
                    </div>
                    
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                      {NOTE_CATEGORIES[note.category]}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {note.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.topics.map(topic => (
                      <span
                        key={topic}
                        className={`px-2 py-1 text-xs rounded ${
                          selectedTopic === topic 
                            ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 font-medium' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated on {new Date(note.updatedAt).toLocaleDateString('en-US')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesContent />
    </Suspense>
  );
}