'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {

  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            if (inline) {
              return (
                <code 
                  className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const code = String(children).replace(/\n$/, '');
            return <CodeBlock code={code} language={language} />;
          },
          h1() {
            // Skip rendering the first h1 to avoid duplicate title
            return null;
          },
          h2({ children }: any) {
            return (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                {children}
              </h2>
            );
          },
          h3({ children }: any) {
            return (
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
                {children}
              </h3>
            );
          },
          h4({ children }: any) {
            return (
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mt-5 mb-2">
                {children}
              </h4>
            );
          },
          p({ children }: any) {
            return (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {children}
              </p>
            );
          },
          ul({ children }: any) {
            return (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                {children}
              </ul>
            );
          },
          ol({ children }: any) {
            return (
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                {children}
              </ol>
            );
          },
          li({ children }: any) {
            return (
              <li className="text-gray-700 dark:text-gray-300">
                {children}
              </li>
            );
          },
          blockquote({ children }: any) {
            return (
              <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic">
                {children}
              </blockquote>
            );
          },
          table({ children }: any) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }: any) {
            return (
              <thead className="bg-gray-50 dark:bg-gray-800">
                {children}
              </thead>
            );
          },
          tbody({ children }: any) {
            return (
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </tbody>
            );
          },
          th({ children }: any) {
            return (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {children}
              </th>
            );
          },
          td({ children }: any) {
            return (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {children}
              </td>
            );
          },
          a({ href, children }: any) {
            return (
              <a 
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}