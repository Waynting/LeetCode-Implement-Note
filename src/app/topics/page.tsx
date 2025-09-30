import Link from 'next/link';
import { getTopicStats } from '@/lib/problems-static';
import Header from '@/components/Header';

export default function TopicsPage() {
  const topicStats = getTopicStats();

  const topicCategories = {
    'Data Structures': ['Array', 'String', 'LinkedList', 'Stack', 'Queue', 'HashTable'],
    'Trees & Graphs': ['Tree', 'BinarySearchTree', 'Graph'],
    'Search & Traversal': ['DFS', 'BFS', 'BinarySearch'],
    'Advanced Algorithms': ['DynamicProgramming', 'Greedy', 'Backtracking'],
    'Techniques & Others': ['TwoPointers', 'SlidingWindow', 'Sort', 'Math', 'BitManipulation']
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        title="LeetCode Practice Notes"
        subtitle="Topic Categories"
        currentPage="topics"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Topics Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {topicStats.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {topicStats.reduce((sum, stat) => sum + stat.count, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {topicStats.filter(stat => stat.count > 0).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Practiced Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {topicStats.reduce((sum, stat) => sum + (stat.count > 0 ? stat.count : 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Completed Problems</div>
            </div>
          </div>
        </div>

        {/* Topic Categories */}
        <div className="space-y-8">
          {Object.entries(topicCategories).map(([category, topics]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map(topic => {
                  const stat = topicStats.find(s => s.topic === topic);
                  const count = stat?.count || 0;
                  
                  return (
                    <Link
                      key={topic}
                      href={`/notes?topic=${topic}`}
                      className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{topic}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {count} problems
                          </p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          count > 0 ? 'bg-green-500 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                        }`} />
                      </div>
                      
                      {/* Topic Summary */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Problems</span>
                          <span>{count} problems</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              count > 0 ? 'bg-green-500 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            style={{ width: count > 0 ? '100%' : '0%' }}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* All Topics List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 mt-8 transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">All Topics Statistics</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Problem Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {topicStats
                  .sort((a, b) => b.count - a.count)
                  .map((stat) => (
                    <tr key={stat.topic} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/notes?topic=${stat.topic}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                        >
                          {stat.topic}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {stat.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stat.count > 0 ? (
                          <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                            Practiced
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                            Not Started
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}