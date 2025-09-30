import Link from 'next/link';
import { getTopicStats } from '@/lib/problems';

export default function TopicsPage() {
  const topicStats = getTopicStats();

  const topicCategories = {
    '基礎資料結構': ['Array', 'String', 'LinkedList', 'Stack', 'Queue', 'HashTable'],
    '樹與圖': ['Tree', 'BinarySearchTree', 'Graph'],
    '搜尋與遍歷': ['DFS', 'BFS', 'BinarySearch'],
    '進階演算法': ['DynamicProgramming', 'Greedy', 'Backtracking'],
    '技巧與其他': ['TwoPointers', 'SlidingWindow', 'Sort', 'Math', 'BitManipulation']
  };

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
              <p className="text-gray-600 mt-1">主題分類</p>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                首頁
              </Link>
              <Link href="/problems" className="text-gray-700 hover:text-blue-600 font-medium">
                題目列表
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
        {/* Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">主題總覽</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {topicStats.length}
              </div>
              <div className="text-sm text-gray-600">總主題數</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {topicStats.reduce((sum, stat) => sum + stat.count, 0)}
              </div>
              <div className="text-sm text-gray-600">總題目數</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {topicStats.filter(stat => stat.count > 0).length}
              </div>
              <div className="text-sm text-gray-600">已練習主題</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {Math.round((topicStats.filter(stat => stat.count > 0).length / topicStats.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">完成度</div>
            </div>
          </div>
        </div>

        {/* Topic Categories */}
        <div className="space-y-8">
          {Object.entries(topicCategories).map(([category, topics]) => (
            <div key={category} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map(topic => {
                  const stat = topicStats.find(s => s.topic === topic);
                  const count = stat?.count || 0;
                  
                  return (
                    <Link
                      key={topic}
                      href={`/topics/${topic.toLowerCase()}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{topic}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {count} 題目
                          </p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          count > 0 ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>進度</span>
                          <span>{count > 0 ? '100%' : '0%'}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              count > 0 ? 'bg-green-500' : 'bg-gray-300'
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
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">所有主題統計</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    主題
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    題目數量
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    完成率
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    狀態
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topicStats
                  .sort((a, b) => b.count - a.count)
                  .map((stat) => (
                    <tr key={stat.topic} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/topics/${stat.topic.toLowerCase()}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {stat.topic}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stat.completion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stat.count > 0 ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            已練習
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            未開始
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