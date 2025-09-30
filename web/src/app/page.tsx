import Link from 'next/link';
import { PROBLEMS, getTopicStats, getDifficultyStats } from '@/lib/problems';

export default function HomePage() {
  const topicStats = getTopicStats();
  const difficultyStats = getDifficultyStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                LeetCode 刷題記錄
              </h1>
              <p className="text-gray-600 mt-1">
                系統化的演算法學習筆記
              </p>
            </div>
            <nav className="flex space-x-8">
              <Link 
                href="/topics" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                主題分類
              </Link>
              <Link 
                href="/problems" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                題目列表
              </Link>
              <a 
                href="https://github.com/waynting/LeetCode-Implement-Note" 
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">總題數</h3>
            <p className="text-3xl font-bold text-blue-600">{PROBLEMS.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">已完成</h3>
            <p className="text-3xl font-bold text-green-600">{PROBLEMS.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">主題數</h3>
            <p className="text-3xl font-bold text-purple-600">{topicStats.length}</p>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white rounded-lg shadow p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">難度分佈</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {difficultyStats.Easy}
              </div>
              <div className="text-sm text-gray-600">Easy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {difficultyStats.Medium}
              </div>
              <div className="text-sm text-gray-600">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {difficultyStats.Hard}
              </div>
              <div className="text-sm text-gray-600">Hard</div>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="bg-white rounded-lg shadow p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">主題分類</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topicStats.map(({ topic, count }) => (
              <Link
                key={topic}
                href={`/topics/${topic.toLowerCase()}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors"
              >
                <div className="font-medium text-gray-900">{topic}</div>
                <div className="text-sm text-gray-600">{count} 題</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Problems */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">最新題目</h2>
          <div className="space-y-4">
            {PROBLEMS.slice(-5).reverse().map((problem) => (
              <Link
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {problem.id}. {problem.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {problem.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <div className="text-xs text-gray-500">
                        {problem.topics.join(', ')}
                      </div>
                    </div>
                  </div>
                  {problem.hasNote && (
                    <div className="text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
