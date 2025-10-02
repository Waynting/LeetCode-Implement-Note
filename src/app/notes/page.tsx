'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NOTES, NOTE_CATEGORIES } from '@/lib/notes-static';
import { PROBLEMS } from '@/lib/problems-static';
import Header from '@/components/Header';

function NotesContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [contentType, setContentType] = useState<'all' | 'notes' | 'problems'>('all');

  // Handle URL parameters for initial filtering
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    const categoryParam = searchParams.get('category');
    const typeParam = searchParams.get('type') as 'all' | 'notes' | 'problems' | null;
    
    if (topicParam) {
      setSelectedTopic(topicParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (typeParam) {
      setContentType(typeParam);
    }
  }, [searchParams]);
  
  const categories = Object.keys(NOTE_CATEGORIES) as Array<keyof typeof NOTE_CATEGORIES>;
  
  // Get all unique topics from both notes and problems
  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    NOTES.forEach(note => {
      note.topics.forEach(topic => topics.add(topic));
    });
    PROBLEMS.forEach(problem => {
      problem.topics.forEach(topic => topics.add(topic));
    });
    return Array.from(topics).sort();
  }, []);
  
  // Filter notes based on selected filters
  const filteredNotes = useMemo(() => {
    if (contentType === 'problems') return [];
    
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
  }, [selectedCategory, selectedTopic, contentType]);

  // Filter problems based on selected topic
  const filteredProblems = useMemo(() => {
    if (contentType === 'notes') return [];
    
    if (selectedTopic === 'all') return [];
    
    return PROBLEMS.filter(problem => 
      problem.topics.some(topic => topic === selectedTopic)
    );
  }, [selectedTopic, contentType]);

  const totalResults = filteredNotes.length + filteredProblems.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        title="ShuaShua Note"
        subtitle="Learning Resources"
        currentPage="notes"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore concept notes and problem solutions by topic
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 mb-8 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Content Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as 'all' | 'notes' | 'problems')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
              >
                <option value="all">All Content</option>
                <option value="notes">Concept Notes Only</option>
                <option value="problems">Problem Solutions Only</option>
              </select>
            </div>

            {/* Category Filter (only for notes) */}
            {contentType !== 'problems' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Note Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                  disabled={contentType === 'problems'}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {NOTE_CATEGORIES[category]}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Topic Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic
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
            {contentType !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                Type: {contentType === 'notes' ? 'Concept Notes' : 'Problem Solutions'}
                <button
                  onClick={() => setContentType('all')}
                  className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-200"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && contentType !== 'problems' && (
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
              {totalResults}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total Results
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {filteredNotes.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Concept Notes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {filteredProblems.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Problem Solutions</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {allTopics.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Topics</div>
          </div>
        </div>

        {/* Clear filters button */}
        {(contentType !== 'all' || selectedCategory !== 'all' || selectedTopic !== 'all') && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setContentType('all');
                setSelectedCategory('all');
                setSelectedTopic('all');
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Concept Notes Section */}
        {filteredNotes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Concept Notes {filteredNotes.length > 0 && `(${filteredNotes.length})`}
            </h2>
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
          </div>
        )}

        {/* Problem Solutions Section */}
        {filteredProblems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Problem Solutions {filteredProblems.length > 0 && `(${filteredProblems.length})`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map(problem => (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 hover:shadow-xl dark:hover:shadow-gray-900/30 transition-all duration-300 p-6"
                >
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                        {problem.title}
                      </h3>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    {problem.hasNote && (
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                        Solution Available
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {problem.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {problem.topics.map(topic => (
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
                      {problem.difficulty} • LeetCode Problem
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {totalResults === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-12 text-center transition-colors duration-300">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matching content found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedTopic === 'all' 
                ? 'Please select a topic to view related content'
                : 'Please adjust filter criteria or clear filters to see more content'}
            </p>
            <button
              onClick={() => {
                setContentType('all');
                setSelectedCategory('all');
                setSelectedTopic('all');
              }}
              className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
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