import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNoteById, NOTE_CATEGORIES } from '@/lib/notes';

// 由於是靜態導出，我們需要生成所有可能的路由
export async function generateStaticParams() {
  const { NOTES } = await import('@/lib/notes');
  return NOTES.map((note) => ({
    noteId: note.id,
  }));
}

export default async function NoteDetailPage({
  params,
}: {
  params: { noteId: string };
}) {
  const note = getNoteById(params.noteId);

  if (!note) {
    notFound();
  }

  // 在實際部署時，這裡會從 public 目錄讀取 markdown 文件
  // 由於是客戶端環境，我們暫時顯示一個提示
  const noteContent = `請查看 ${note.contentPath} 檔案以獲取完整內容`;

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
                <Link href="/notes" className="hover:text-blue-600">學習筆記</Link>
                <span className="mx-2">/</span>
                {note.title}
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
              <Link href="/notes" className="text-blue-600 font-medium">
                學習筆記
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Note Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
              {NOTE_CATEGORIES[note.category]}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{note.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{note.description}</p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-sm rounded-full ${
                note.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                note.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {note.difficulty === 'beginner' ? '初級' :
                 note.difficulty === 'intermediate' ? '中級' : '進階'}
              </span>
              <div className="flex gap-2">
                {note.topics.map(topic => (
                  <Link
                    key={topic}
                    href={`/notes?topic=${topic}`}
                    className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              更新於 {new Date(note.updatedAt).toLocaleDateString('zh-TW')}
            </div>
          </div>
        </div>

        {/* Note Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm mb-2">
                📝 這是筆記模板，實際內容請參考：
              </p>
              <code className="text-sm bg-blue-100 px-2 py-1 rounded">
                {note.contentPath}
              </code>
            </div>
            <p className="text-gray-600">
              你可以在對應的 Markdown 檔案中編寫詳細的學習筆記內容。
              每個筆記都包含了該主題的核心概念、實作範例和相關 LeetCode 題目。
            </p>
          </div>
        </div>

        {/* GitHub Link */}
        <div className="mt-8">
          <a
            href={`https://github.com/Waynting/LeetCode-Implement-Note/blob/main/web/public${note.contentPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            在 GitHub 上查看/編輯
          </a>
        </div>
      </main>
    </div>
  );
}

