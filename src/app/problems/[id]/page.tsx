import Link from 'next/link';
import { PROBLEMS } from '@/lib/problems-static';
import { generateLeetCodeUrl } from '@/lib/markdown-reader';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Generate static parameters
export async function generateStaticParams() {
  return PROBLEMS.map((problem) => ({
    id: problem.id,
  }));
}

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = PROBLEMS.find(p => p.id === id);

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header
          title="ShuaShua Note"
          subtitle="題目詳情"
          currentPage="problems"
        />
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">找不到題目</h1>
            <Link href="/problems" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
              返回題目列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Use embedded markdown content
  const markdownContent = problem.markdownContent;
  const leetcodeUrl = generateLeetCodeUrl(problem.title);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        title="ShuaShua Note"
        subtitle={problem.title}
        currentPage="problems"
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Problem Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-6 mb-8 transition-colors duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="mb-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{problem.title}</h1>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  problem.source === 'Leetcode' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                  problem.source === 'Codeforces' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                  problem.source === 'Atcoder' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300' :
                  problem.source === 'CSES' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300' :
                  problem.source === 'Zerojudge' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300' :
                  'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                }`}>
                  {problem.source}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  #{problem.originalId}
                </span>
                {problem.hasNote && (
                  <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    已完成
                  </span>
                )}
              </div>
              
              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {problem.topics.map(topic => (
                  <Link
                    key={topic}
                    href={`/notes?topic=${topic}`}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors duration-200 text-sm"
                  >
                    {topic}
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-4">
                {problem.source === 'Leetcode' && (
                  <a
                    href={leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    前往 LeetCode
                  </a>
                )}
                <Link
                  href="/problems"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  返回題目列表
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Content */}
        {markdownContent ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 transition-colors duration-300">
            <div className="p-8">
              <MarkdownRenderer content={markdownContent} />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-8 transition-colors duration-300">
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                筆記尚未提供
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                此題目的詳細筆記尚未提供。
              </p>
              <Link
                href="/problems"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                瀏覽其他題目
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <div className="flex space-x-4">
            {PROBLEMS.findIndex(p => p.id === id) > 0 && (
              <Link
                href={`/problems/${PROBLEMS[PROBLEMS.findIndex(p => p.id === id) - 1].id}`}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一題
              </Link>
            )}
          </div>

          <div className="flex space-x-4">
            {PROBLEMS.findIndex(p => p.id === id) < PROBLEMS.length - 1 && (
              <Link
                href={`/problems/${PROBLEMS[PROBLEMS.findIndex(p => p.id === id) + 1].id}`}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                下一題
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}