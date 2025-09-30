'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROBLEMS, TOPICS } from '@/lib/problems';

export default function TopicDetailPage() {
  const params = useParams();
  const topicParam = params.topic as string;

  // 將 URL 參數轉換回正確的主題名稱 (例如: math -> Math, dynamicprogramming -> DynamicProgramming)
  const topic = TOPICS.find(t => t.toLowerCase() === topicParam.toLowerCase());

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">主題不存在</h1>
          <Link href="/topics" className="text-blue-600 hover:text-blue-800">
            返回主題列表
          </Link>
        </div>
      </div>
    );
  }

  const problemsInTopic = PROBLEMS.filter(p =>
    p.topics.some(t => t.toLowerCase() === topic.toLowerCase())
  );

  const difficultyStats = {
    Easy: problemsInTopic.filter(p => p.difficulty === 'Easy').length,
    Medium: problemsInTopic.filter(p => p.difficulty === 'Medium').length,
    Hard: problemsInTopic.filter(p => p.difficulty === 'Hard').length
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
              <p className="text-gray-600 mt-1">
                <Link href="/topics" className="hover:text-blue-600">主題分類</Link>
                <span className="mx-2">/</span>
                {topic}
              </p>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                首頁
              </Link>
              <Link href="/topics" className="text-gray-700 hover:text-blue-600 font-medium">
                主題分類
              </Link>
              <Link href="/problems" className="text-gray-700 hover:text-blue-600 font-medium">
                題目列表
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Topic Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{topic}</h1>
          <p className="text-gray-600 mb-6">
            共 {problemsInTopic.length} 道題目
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {difficultyStats.Easy}
              </div>
              <div className="text-sm text-gray-600">Easy</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {difficultyStats.Medium}
              </div>
              <div className="text-sm text-gray-600">Medium</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">
                {difficultyStats.Hard}
              </div>
              <div className="text-sm text-gray-600">Hard</div>
            </div>
          </div>
        </div>

        {/* Problems List */}
        {problemsInTopic.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">題目列表</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {problemsInTopic.map((problem) => (
                <div key={problem.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          #{problem.id}
                        </span>
                        <Link
                          href={`/problems/${problem.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {problem.title}
                        </Link>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3">
                        {problem.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {problem.topics.map(t => (
                          <Link
                            key={t}
                            href={`/topics/${t.toLowerCase()}`}
                            className={`px-2 py-1 text-xs rounded ${
                              t === topic
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {t}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4">
                      {problem.hasNote ? (
                        <div className="flex items-center text-green-600">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">已完成</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">未完成</span>
                      )}
                    </div>
                  </div>

                  {problem.hasNote && problem.noteUrl && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <a
                        href={`https://github.com/Waynting/LeetCode-Implement-Note/blob/main${problem.noteUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                        查看完整筆記
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              尚無題目
            </h3>
            <p className="text-gray-500 mb-4">
              這個主題還沒有任何題目記錄
            </p>
            <Link
              href="/problems"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              瀏覽所有題目
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}