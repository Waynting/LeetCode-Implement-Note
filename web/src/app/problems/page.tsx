'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROBLEMS, TOPICS } from '@/lib/problems';

export default function ProblemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const filteredProblems = PROBLEMS.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.id.toString().includes(searchTerm);
    const matchesTopic = !selectedTopic || problem.topics.includes(selectedTopic);
    const matchesDifficulty = !selectedDifficulty || problem.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-blue-600">
                LeetCode 刷題記錄
              </Link>
              <p className="text-gray-600 mt-1">題目列表</p>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                首頁
              </Link>
              <Link href="/topics" className="text-gray-700 hover:text-blue-600 font-medium">
                主題分類
              </Link>
              <a 
                href="https://github.com/waynliu/LeetCode-Implement-Note" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                搜尋題目
              </label>
              <input
                type="text"
                placeholder="輸入題號或題目名稱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                主題篩選
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">所有主題</option>
                {TOPICS.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                難度篩選
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">所有難度</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            顯示 {filteredProblems.length} / {PROBLEMS.length} 題
          </p>
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    題號
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    題目名稱
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    難度
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    主題
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    筆記
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {problem.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/problems/${problem.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {problem.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {problem.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.topics.map(topic => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {problem.hasNote ? (
                        <span className="text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          已完成
                        </span>
                      ) : (
                        <span className="text-gray-400">未完成</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">沒有找到符合條件的題目</p>
          </div>
        )}
      </main>
    </div>
  );
}