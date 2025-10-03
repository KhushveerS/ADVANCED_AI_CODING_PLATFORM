'use client';

import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCategory {
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}

const QuizApp: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  const quizData: {[key: string]: QuizCategory} = {
    dsa: {
      name: 'Data Structures & Algorithms',
      description: 'Test your knowledge of algorithms, time complexity, and data structures',
      icon: '📊',
      questions: [
        {
          id: 1,
          question: 'What is the time complexity of binary search in a sorted array?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correctAnswer: 1,
          explanation: 'Binary search divides the search space in half each time, resulting in O(log n) time complexity.'
        },
        {
          id: 2,
          question: 'Which data structure uses LIFO (Last In First Out) principle?',
          options: ['Queue', 'Stack', 'Array', 'Linked List'],
          correctAnswer: 1,
          explanation: 'Stack follows LIFO principle where the last element added is the first one to be removed.'
        },
        {
          id: 3,
          question: 'What is the worst-case time complexity of QuickSort?',
          options: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)'],
          correctAnswer: 1,
          explanation: 'In the worst case (when pivot is always the smallest or largest element), QuickSort takes O(n²) time.'
        },
        {
          id: 4,
          question: 'Which algorithm is used for finding the shortest path in a weighted graph?',
          options: ['BFS', 'DFS', "Dijkstra's", 'Binary Search'],
          correctAnswer: 2,
          explanation: "Dijkstra's algorithm is used for finding the shortest path in weighted graphs with non-negative edges."
        },
        {
          id: 5,
          question: 'What is the space complexity of merge sort?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correctAnswer: 2,
          explanation: 'Merge sort requires O(n) additional space for the temporary arrays during merging.'
        },
        {
          id: 6,
          question: 'Which data structure is most efficient for implementing a priority queue?',
          options: ['Array', 'Linked List', 'Heap', 'Stack'],
          correctAnswer: 2,
          explanation: 'Heap (especially binary heap) provides O(log n) time for insert and extract-min/max operations.'
        },
        {
          id: 7,
          question: 'What is the time complexity of inserting an element at the beginning of a linked list?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correctAnswer: 0,
          explanation: 'Inserting at the beginning of a linked list is O(1) as it only requires updating the head pointer.'
        },
        {
          id: 8,
          question: 'Which traversal visits root, left subtree, then right subtree?',
          options: ['In-order', 'Pre-order', 'Post-order', 'Level-order'],
          correctAnswer: 1,
          explanation: 'Pre-order traversal visits the root node first, then the left subtree, then the right subtree.'
        },
        {
          id: 9,
          question: 'What is the time complexity of searching in a hash table with good hash function?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correctAnswer: 0,
          explanation: 'With a good hash function and proper collision handling, hash table search is O(1) on average.'
        },
        {
          id: 10,
          question: 'Which algorithm uses divide and conquer strategy?',
          options: ['Bubble Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort'],
          correctAnswer: 1,
          explanation: 'Merge Sort uses divide and conquer by recursively dividing the array and merging sorted halves.'
        }
      ]
    },
    systemDesign: {
      name: 'System Design',
      description: 'Design scalable systems and understand distributed architecture',
      icon: '🏗️',
      questions: [
        {
          id: 1,
          question: 'What is the primary purpose of a CDN (Content Delivery Network)?',
          options: [
            'Database replication',
            'Load balancing',
            'Geographically distributed content caching',
            'API rate limiting'
          ],
          correctAnswer: 2,
          explanation: 'CDN caches content in multiple geographical locations to reduce latency and improve performance.'
        },
        {
          id: 2,
          question: 'Which database is typically used for write-heavy applications?',
          options: ['MySQL', 'PostgreSQL', 'Cassandra', 'MongoDB'],
          correctAnswer: 2,
          explanation: 'Cassandra is optimized for write-heavy workloads with its distributed architecture.'
        },
        {
          id: 3,
          question: 'What is the main advantage of microservices architecture?',
          options: [
            'Simpler deployment',
            'Independent scalability of services',
            'Reduced development time',
            'Smaller codebase'
          ],
          correctAnswer: 1,
          explanation: 'Microservices allow independent scaling, development, and deployment of different services.'
        },
        {
          id: 4,
          question: 'Which load balancing algorithm distributes requests evenly in rotation?',
          options: ['Round Robin', 'Least Connections', 'IP Hash', 'Weighted Round Robin'],
          correctAnswer: 0,
          explanation: 'Round Robin distributes requests to servers in a circular order, one after another.'
        },
        {
          id: 5,
          question: 'What is the purpose of API rate limiting?',
          options: [
            'Improve security',
            'Prevent abuse and ensure fair usage',
            'Increase performance',
            'Reduce latency'
          ],
          correctAnswer: 1,
          explanation: 'Rate limiting prevents API abuse, protects resources, and ensures fair usage among consumers.'
        },
        {
          id: 6,
          question: 'Which caching strategy updates cache when database is updated?',
          options: ['Write-through', 'Write-behind', 'Cache-aside', 'Read-through'],
          correctAnswer: 0,
          explanation: 'Write-through cache updates both cache and database simultaneously for consistency.'
        },
        {
          id: 7,
          question: 'What is the CAP theorem in distributed systems?',
          options: [
            'Consistency, Availability, Partition Tolerance',
            'Caching, Availability, Performance',
            'Consistency, Authentication, Partitioning',
            'Caching, Authentication, Performance'
          ],
          correctAnswer: 0,
          explanation: 'CAP theorem states that a distributed system can only guarantee two of: Consistency, Availability, and Partition Tolerance.'
        },
        {
          id: 8,
          question: 'Which protocol is commonly used for service discovery in microservices?',
          options: ['HTTP', 'gRPC', 'Consul', 'REST'],
          correctAnswer: 2,
          explanation: 'Consul, along with similar tools like etcd and Zookeeper, is used for service discovery.'
        },
        {
          id: 9,
          question: 'What is the purpose of a message queue in system design?',
          options: [
            'Database backup',
            'Asynchronous communication between services',
            'Load balancing',
            'Data encryption'
          ],
          correctAnswer: 1,
          explanation: 'Message queues enable asynchronous communication, decoupling services and handling peak loads.'
        },
        {
          id: 10,
          question: 'Which type of database is best for complex transactions and ACID properties?',
          options: ['NoSQL', 'Graph Database', 'Relational Database', 'Document Database'],
          correctAnswer: 2,
          explanation: 'Relational databases are designed for complex transactions and strong ACID compliance.'
        }
      ]
    },
    operatingSystems: {
      name: 'Operating Systems',
      description: 'Master processes, memory management, and system fundamentals',
      icon: '💻',
      questions: [
        {
          id: 1,
          question: 'What is the main purpose of virtual memory?',
          options: [
            'Increase CPU speed',
            'Allow programs to use more memory than physically available',
            'Improve disk performance',
            'Enhance network connectivity'
          ],
          correctAnswer: 1,
          explanation: 'Virtual memory allows processes to use more memory than physically available by using disk space as an extension.'
        },
        {
          id: 2,
          question: 'Which scheduling algorithm can lead to starvation?',
          options: ['FCFS', 'Round Robin', 'Shortest Job First', 'Priority Scheduling'],
          correctAnswer: 3,
          explanation: 'Priority Scheduling can lead to starvation if low-priority processes never get CPU time.'
        },
        {
          id: 3,
          question: 'What is a race condition?',
          options: [
            'CPU overheating',
            'Multiple processes accessing shared data concurrently',
            'Memory leak',
            'Disk fragmentation'
          ],
          correctAnswer: 1,
          explanation: 'Race condition occurs when multiple processes access and manipulate shared data concurrently, leading to unpredictable results.'
        },
        {
          id: 4,
          question: 'Which page replacement algorithm replaces the page that will not be used for the longest time?',
          options: ['FIFO', 'LRU', 'Optimal', 'MRU'],
          correctAnswer: 2,
          explanation: 'Optimal page replacement algorithm replaces the page that will not be used for the longest period in the future.'
        },
        {
          id: 5,
          question: 'What is the role of the kernel in an operating system?',
          options: [
            'User interface',
            'Core component that manages system resources',
            'File manager',
            'Network controller'
          ],
          correctAnswer: 1,
          explanation: 'The kernel is the core component that manages system resources, hardware, and process scheduling.'
        },
        {
          id: 6,
          question: 'Which synchronization mechanism uses wait and signal operations?',
          options: ['Mutex', 'Semaphore', 'Monitor', 'Spinlock'],
          correctAnswer: 1,
          explanation: 'Semaphores use wait (P) and signal (V) operations for process synchronization.'
        },
        {
          id: 7,
          question: 'What is thrashing in operating systems?',
          options: [
            'High CPU usage',
            'Excessive paging causing performance degradation',
            'Memory leak',
            'Disk failure'
          ],
          correctAnswer: 1,
          explanation: 'Thrashing occurs when the system spends more time swapping pages than executing processes due to excessive paging.'
        },
        {
          id: 8,
          question: 'Which file system is commonly used in Linux distributions?',
          options: ['NTFS', 'FAT32', 'ext4', 'HFS+'],
          correctAnswer: 2,
          explanation: 'ext4 is the most commonly used file system in modern Linux distributions.'
        },
        {
          id: 9,
          question: 'What is the purpose of system calls?',
          options: [
            'Improve performance',
            'Provide interface between processes and OS',
            'Manage hardware directly',
            'Create user interfaces'
          ],
          correctAnswer: 1,
          explanation: 'System calls provide a interface for user processes to request services from the operating system.'
        },
        {
          id: 10,
          question: 'Which memory allocation method suffers from external fragmentation?',
          options: ['Paging', 'Segmentation', 'Virtual Memory', 'Cache'],
          correctAnswer: 1,
          explanation: 'Segmentation suffers from external fragmentation as memory becomes divided into small blocks over time.'
        }
      ]
    }
  };

  const startQuiz = (category: string) => {
    setCurrentCategory(category);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData[currentCategory].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    const questions = quizData[currentCategory].questions;
    
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    setScore(correct);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const backToCategories = () => {
    setQuizStarted(false);
    setCurrentCategory('');
    resetQuiz();
  };

  // Category Selection Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Tech Quiz Master</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Test your knowledge in key computer science topics. Choose a category to begin your quiz journey!
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(quizData).map(([key, category]) => (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => startQuiz(key)}
              >
                <div className="p-8">
                  <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {category.description}
                  </p>
                  <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold group-hover:bg-blue-700 transition-colors duration-300">
                      Start Quiz
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-8 py-4 rounded-b-2xl border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{category.questions.length} Questions</span>
                    <span>10 min estimate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Take These Quizzes?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold text-lg mb-2 text-black">Interview Preparation</h3>
                <p className="text-gray-600">Prepare for technical interviews with real-world questions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl mb-2">📈</div>
                <h3 className="font-semibold text-lg mb-2 text-black">Skill Assessment</h3>
                <p className="text-gray-600">Evaluate your understanding of core CS concepts</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl mb-2">🔄</div>
                <h3 className="font-semibold text-lg mb-2 text-black">Continuous Learning</h3>
                <p className="text-gray-600">Learn from detailed explanations and improve over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Quiz Results - {quizData[currentCategory].name}
            </h1>
            <button
              onClick={backToCategories}
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Categories
            </button>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-green-600 mb-4">
              {score}/{quizData[currentCategory].questions.length}
            </div>
            <div className="text-xl text-gray-600 mb-2">
              {score === quizData[currentCategory].questions.length ? 'Perfect Score! 🎉' : 
               score >= quizData[currentCategory].questions.length * 0.7 ? 'Great Job! 👍' : 
               'Keep Practicing! 💪'}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 max-w-md mx-auto">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                style={{
                  width: `${(score / quizData[currentCategory].questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {quizData[currentCategory].questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    Q{index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
                </div>
                
                <div className="ml-8 space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-lg border ${
                        optIndex === question.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : selectedAnswers[index] === optIndex && optIndex !== question.correctAnswer
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-50 border-gray-300 text-gray-700'
                      }`}
                    >
                      {option}
                      {optIndex === question.correctAnswer && (
                        <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                      )}
                      {selectedAnswers[index] === optIndex && optIndex !== question.correctAnswer && (
                        <span className="ml-2 text-red-600 font-medium">✗ Your Answer</span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-black">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Retry Quiz
            </button>
            <button
              onClick={backToCategories}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Try Another Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const currentQuiz = quizData[currentCategory];
  const currentQ = currentQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={backToCategories}
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-2"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Categories
            </button>
            <h1 className="text-3xl font-bold text-gray-800">{currentQuiz.name}</h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{currentQuiz.icon}</div>
          </div>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {currentQuiz.questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(((currentQuestion + 1) / currentQuiz.questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {currentQ.question}
            </h2>
            
            {/* Options */}
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition duration-300 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-md'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`border-2 rounded-full w-6 h-6 flex items-center justify-center mr-4 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                currentQuestion === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              Previous
            </button>

            <div className="text-sm text-gray-500">
              {Object.keys(selectedAnswers).length} of {currentQuiz.questions.length} answered
            </div>

            {currentQuestion === currentQuiz.questions.length - 1 ? (
              <button
                onClick={calculateScore}
                disabled={Object.keys(selectedAnswers).length !== currentQuiz.questions.length}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                  Object.keys(selectedAnswers).length !== currentQuiz.questions.length
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                }`}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
              >
                Next Question
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-600">
          <p>Select your answer and use the navigation buttons to move between questions.</p>
          <p>All questions must be answered before submitting the quiz.</p>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;