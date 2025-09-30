'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROBLEMS } from '@/lib/problems';

export default function ProblemDetailPage() {
  const params = useParams();
  const problemId = parseInt(params.id as string);

  const problem = PROBLEMS.find(p => p.id === problemId);

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">題目不存在</h1>
          <Link href="/problems" className="text-blue-600 hover:text-blue-800">
            返回題目列表
          </Link>
        </div>
      </div>
    );
  }

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
                <Link href="/problems" className="hover:text-blue-600">題目列表</Link>
                <span className="mx-2">/</span>
                #{problem.id}
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
        {/* Problem Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-gray-500 font-medium">#{problem.id}</span>
                <h1 className="text-3xl font-bold text-gray-900">{problem.title}</h1>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm rounded-full ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {problem.difficulty}
                </span>
                {problem.hasNote && (
                  <span className="flex items-center text-green-600 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    已完成
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{problem.description}</p>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">相關主題</h3>
            <div className="flex flex-wrap gap-2">
              {problem.topics.map(topic => (
                <Link
                  key={topic}
                  href={`/topics/${topic.toLowerCase()}`}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <a
            href={`https://leetcode.com/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  LeetCode 原題
                </h3>
                <p className="text-gray-600 text-sm">
                  前往 LeetCode 查看題目描述和測試
                </p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>

          {problem.hasNote && problem.noteUrl && (
            <a
              href={`https://github.com/Waynting/LeetCode-Implement-Note/blob/main${problem.noteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    完整筆記
                  </h3>
                  <p className="text-gray-600 text-sm">
                    查看詳細解題思路和程式碼
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          )}
        </div>

        {/* Note Preview or Status */}
        <div className="bg-white rounded-lg shadow p-8">
          {problem.hasNote ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">筆記摘要</h2>
                {problem.noteUrl && (
                  <a
                    href={`https://github.com/Waynting/LeetCode-Implement-Note/blob/main${problem.noteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    查看完整筆記
                  </a>
                )}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  本題筆記包含完整的解題思路、程式碼實作和學習心得。
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">筆記內容包含：</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      詳細的解題思路說明
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      完整的程式碼實作
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      時間與空間複雜度分析
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      個人學習心得與重點整理
                    </li>
                  </ul>
                </div>

                <p className="text-sm text-gray-500">
                  點擊上方「查看完整筆記」按鈕前往 GitHub 查看詳細內容。
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                尚未撰寫筆記
              </h3>
              <p className="text-gray-500">
                這道題目的筆記還在整理中
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/problems"
            className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← 返回題目列表
          </Link>

          <div className="flex space-x-4">
            {PROBLEMS.findIndex(p => p.id === problemId) > 0 && (
              <Link
                href={`/problems/${PROBLEMS[PROBLEMS.findIndex(p => p.id === problemId) - 1].id}`}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
              >
                上一題
              </Link>
            )}
            {PROBLEMS.findIndex(p => p.id === problemId) < PROBLEMS.length - 1 && (
              <Link
                href={`/problems/${PROBLEMS[PROBLEMS.findIndex(p => p.id === problemId) + 1].id}`}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
              >
                下一題
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}