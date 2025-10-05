'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // 自定義的行渲染器，用於添加縮排視覺化
  const lineProps = (lineNumber: number) => {
    const lines = code.split('\n');
    const line = lines[lineNumber - 1] || '';
    const leadingSpaces = line.match(/^(\s*)/)?.[1] || '';
    const indentLevel = Math.floor(leadingSpaces.length / 2);

    // 根據縮排層級設定背景漸層
    const getIndentGradient = () => {
      if (indentLevel === 0) return '';

      const colors = theme === 'dark'
        ? [
            'rgba(59, 130, 246, 0.12)',   // blue
            'rgba(168, 85, 247, 0.12)',   // purple
            'rgba(236, 72, 153, 0.12)',   // pink
            'rgba(245, 158, 11, 0.12)',   // amber
          ]
        : [
            'rgba(59, 130, 246, 0.08)',
            'rgba(168, 85, 247, 0.08)',
            'rgba(236, 72, 153, 0.08)',
            'rgba(245, 158, 11, 0.08)',
          ];

      // 為每個縮排層級建立漸層條紋
      const gradients: string[] = [];
      for (let i = 0; i < indentLevel; i++) {
        const colorIndex = i % colors.length;
        const start = i * 2; // 每層 2 個字符寬度
        const end = start + 2;
        gradients.push(`${colors[colorIndex]} ${start}ch ${end}ch`);
      }

      return `linear-gradient(90deg, ${gradients.join(', ')}, transparent ${indentLevel * 2}ch)`;
    };

    const gradient = getIndentGradient();

    return {
      style: {
        display: 'block',
        background: gradient || 'transparent',
      },
    };
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-6">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">
          {language || 'code'}
        </span>
        <button
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
            copied
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>已複製！</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>複製</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with indent visualization */}
      <SyntaxHighlighter
        style={theme === 'dark' ? oneDark : oneLight}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#1a1b26' : '#f7f7f7',
        }}
        showLineNumbers={false}
        wrapLines={true}
        lineProps={lineProps}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}