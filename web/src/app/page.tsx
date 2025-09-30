import Link from 'next/link';
import { PROBLEMS, getTopicStats, getDifficultyStats } from '@/lib/problems-static';
import Header from '@/components/Header';

export default function HomePage() {
  const topicStats = getTopicStats();
  const difficultyStats = getDifficultyStats();
  const completedProblems = PROBLEMS.filter(problem => problem.hasNote).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        title="LeetCode Practice Notes"
        subtitle="Systematic Algorithm Learning Journey"
        currentPage="home"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Problems</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{PROBLEMS.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedProblems}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Topics</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{topicStats.length}</p>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 mb-12 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Difficulty Distribution</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {difficultyStats.Easy}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Easy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {difficultyStats.Medium}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {difficultyStats.Hard}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hard</div>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 mb-12 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Topics</h2>
            <Link 
              href="/notes" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              View All Notes →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topicStats.map(({ topic, count }) => (
              <Link
                key={topic}
                href={`/notes?topic=${topic}`}
                className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-600 border border-gray-200 dark:border-gray-600 transition-colors duration-200"
              >
                <div className="font-medium text-gray-900 dark:text-white">{topic}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{count} problems</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to view related notes</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Problems */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Problems</h2>
          <div className="space-y-4">
            {PROBLEMS.slice(-5).reverse().map((problem) => (
              <Link
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {problem.id}. {problem.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {problem.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {problem.topics.join(', ')}
                      </div>
                    </div>
                  </div>
                  {problem.hasNote && (
                    <div className="text-green-600 dark:text-green-400">
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
