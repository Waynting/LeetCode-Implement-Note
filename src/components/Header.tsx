'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  currentPage?: string;
}

export default function Header({ title = "ShuaShua Note", subtitle, currentPage }: HeaderProps) {

  const navItems = [
    { href: "/", label: "首頁", key: "home" },
    { href: "/topics", label: "主題", key: "topics" },
    { href: "/problems", label: "題目", key: "problems" },
    { href: "/notes", label: "筆記", key: "notes" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            {/* Logo/Avatar */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src="/icon.jpg"
                  alt="ShuaShua Note"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    currentPage === item.key
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* GitHub Link */}
            <a
              href="https://github.com/waynting/LeetCode-Implement-Note"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              GitHub
            </a>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}