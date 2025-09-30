import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNoteById, NOTE_CATEGORIES, NOTES } from '@/lib/notes-static';
import Header from '@/components/Header';

// Generate all possible routes for static export
export async function generateStaticParams() {
  return NOTES.map((note) => ({
    noteId: note.id,
  }));
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = await params;
  const note = getNoteById(noteId);

  if (!note) {
    notFound();
  }

  // For now, show a message about viewing the markdown file
  const noteContent = `Please view ${note.contentPath} file for complete content`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        title="LeetCode Practice Notes"
        subtitle={note.title}
        currentPage="notes"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Note Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-8 mb-8 transition-colors duration-300">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full mb-4">
              {NOTE_CATEGORIES[note.category]}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{note.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{note.description}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-sm rounded-full ${
                note.difficulty === 'beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                note.difficulty === 'intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}>
                {note.difficulty.charAt(0).toUpperCase() + note.difficulty.slice(1)}
              </span>
              <div className="flex gap-2">
                {note.topics.map(topic => (
                  <Link
                    key={topic}
                    href={`/notes?topic=${topic}`}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Updated on {new Date(note.updatedAt).toLocaleDateString('en-US')}
            </div>
          </div>
        </div>

        {/* Note Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/20 p-8 transition-colors duration-300">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">
                📝 This is a note template, actual content is available at:
              </p>
              <code className="text-sm bg-blue-100 dark:bg-blue-800/30 px-2 py-1 rounded">
                {note.contentPath}
              </code>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              You can write detailed learning notes in the corresponding Markdown file.
              Each note contains core concepts, implementation examples, and related LeetCode problems for the topic.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/notes"
            className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Notes
          </Link>

          {/* GitHub Link */}
          <a
            href={`https://github.com/Waynting/LeetCode-Implement-Note/blob/main${note.contentPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            View/Edit on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}