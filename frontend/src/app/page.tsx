import Link from 'next/link';
import { storage } from '@/lib/storage';

// Remove the async fetchSheets function and sheets data fetching to improve loading speed
// We'll use static data instead for faster loading

export default function Home() {
  // Use static data instead of fetching to improve loading speed
  const sheets = [
    { key: 'striver', title: "Striver's A2Z DSA Sheet", author: 'Striver', total: 0 },
    { key: 'babbar', title: "Love Babbar's 450 DSA Sheet", author: 'Love Babbar', total: 0 },
  ];
  
  // Get progress data for DSA and CP tracking
  const progress = storage.getProgress();
  
  // Separate DSA and CP problems
  // In a real app, you would identify DSA problems by source='leetcode' and CP problems by source='codeforces'
  // For now, we'll use a simple approach to demonstrate the concept
  const dsaProblems = progress.solved.filter(id => id.startsWith('dsa-') || !id.includes('-')); // Simplified logic
  const cpProblems = progress.solved.filter(id => id.startsWith('cf-') || id.includes('codeforces')); // Simplified logic
  
  const features = [
    {
      title: "Comprehensive DSA Practice",
      description: "Practice Data Structures & Algorithms problems from LeetCode with curated topics and difficulty levels.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "Competitive Programming",
      description: "Solve problems from Codeforces with different rating ranges and topics to improve your CP skills.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "purple"
    },
    {
      title: "Contest Tracking",
      description: "Stay updated with upcoming programming contests and competitions from Codeforces and other platforms.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "green"
    },
    {
      title: "System Design",
      description: "Master system design concepts and prepare for technical interviews with curated topics and resources.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "yellow"
    },
    {
      title: "Operating System",
      description: "Learn OS concepts including process management, memory management, file systems, and more.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: "red"
    },
    {
      title: "Progress Tracking",
      description: "Track your solved problems, bookmarks, and personal notes for each problem across all domains.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "indigo"
    }
  ];

  const stats = [
    { value: "5000+", label: "Problems" },
    { value: "50+", label: "Topics" },
    { value: "10+", label: "Platforms" },
    { value: "1000+", label: "Users" }
  ];

  // Calculate progress percentages for circular progress
  const totalSolved = progress.solved.length;
  const dsaProgress = Math.min(100, Math.round((dsaProblems.length / Math.max(1, totalSolved)) * 100));
  const cpProgress = Math.min(100, Math.round((cpProblems.length / Math.max(1, totalSolved)) * 100));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Master <span className="text-blue-600">DSA</span>,{' '}
          <span className="text-purple-600">CP</span> & More
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The ultimate platform for computer science preparation. Practice coding problems, 
          track contests, learn system design, and master operating systems - all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dsa" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg">
            Start Practicing
          </Link>
          <Link href="/contest" className="px-8 py-3 bg-gray-100 border border-gray-300 text-gray-900 font-medium rounded-lg transition-colors">
            View Contests
          </Link>
        </div>
      </div>

      {/* Progress Circles Section */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold text-center text-gray-900 mb-8">
            Our Progress
          </h2>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cards */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Core Preparation Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DSA Card */}
            <Link href="/dsa" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-blue-300 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Data Structures & Algorithms
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Practice problems from LeetCode with topics like Arrays, Strings, 
                    Dynamic Programming, Trees, and more.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      Arrays
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      DP
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      Trees
                    </span>
                  </div>
                  <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Start Practicing
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* CP Card */}
            <Link href="/cp" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-purple-300 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Competitive Programming
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Solve problems from Codeforces with different rating ranges 
                    and topics to improve your competitive programming skills.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      800-1200
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      1200-1600
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      1600+
                    </span>
                  </div>
                  <div className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                    Start Competing
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Contest Card */}
            <Link href="/contest" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-green-300 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Contest Tracking
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Stay updated with upcoming programming contests and competitions 
                    from Codeforces, LeetCode, and other platforms.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Live
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Upcoming
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Virtual
                    </span>
                  </div>
                  <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700">
                    View Contests
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* System Design Card */}
            <Link href="/system-design" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-yellow-300 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    System Design
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Master system design concepts and prepare for technical interviews 
                    with curated topics and resources.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      Scalability
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      Architecture
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      Patterns
                    </span>
                  </div>
                  <div className="inline-flex items-center text-yellow-600 font-medium group-hover:text-yellow-700">
                    Learn Design
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Operating System Card */}
            <Link href="/operating-system" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-red-300 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Operating System
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Learn OS concepts including process management, memory management, 
                    file systems, and more.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      Processes
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      Memory
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      Scheduling
                    </span>
                  </div>
                  <div className="inline-flex items-center text-red-600 font-medium group-hover:text-red-700">
                    Study OS
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Notes Card */}
            <Link href="/notes" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-indigo-300 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Progress Tracking
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Track your solved problems, bookmarks, and personal notes for 
                    each problem across all domains.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                      Notes
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                      Progress
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                      Stats
                    </span>
                  </div>
                  <div className="inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700">
                    Track Progress
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={`text-${feature.color}-600`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Master Computer Science?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students and professionals preparing for technical interviews and competitions.
          </p>
          <Link href="/dsa" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}