'use client';

import { useState } from 'react';

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completionStatus: 'not-started' | 'in-progress' | 'completed';
}

// Mock data for study content
const mockStudyData = {
  '1': {
    title: 'Process Management',
    content: `Process Management is a fundamental concept in operating systems. Here's what you need to know:

1. Process Concept:
   - A process is a program in execution
   - It includes the program code, current activity, process state, and resources
   - Each process is represented by a Process Control Block (PCB)

2. Process States:
   - New: Process is being created
   - Ready: Process is waiting to be assigned to a processor
   - Running: Process is being executed
   - Waiting: Process is waiting for some event to occur
   - Terminated: Process has finished execution

3. Process Scheduling:
   - Long-term scheduler: Controls degree of multiprogramming
   - Short-term scheduler: Selects process from ready queue
   - Medium-term scheduler: Handles swapping in and out of memory

4. Context Switching:
   - Saving and restoring the state of a process
   - Essential for multitasking
   - Involves switching the CPU registers and process state`,
    resources: [
      { name: 'Process Management Fundamentals', url: '#' },
      { name: 'CPU Scheduling Algorithms', url: '#' },
      { name: 'Inter-Process Communication', url: '#' }
    ]
  },
  '2': {
    title: 'Memory Management',
    content: `Memory Management is crucial for efficient system performance:

1. Memory Hierarchy:
   - Registers: Fastest, smallest
   - Cache: Fast, moderate size
   - Main Memory: Slower, larger
   - Secondary Storage: Slowest, largest

2. Memory Allocation:
   - Contiguous allocation: Single continuous block
   - Non-contiguous allocation: Divided into segments or pages
   - Dynamic loading and linking

3. Paging:
   - Fixed-size blocks called pages
   - Physical memory divided into frames
   - Page table maps logical to physical addresses

4. Segmentation:
   - Variable-size blocks based on program structure
   - Provides protection and sharing
   - Logical address consists of segment number and offset

5. Virtual Memory:
   - Allows processes larger than physical memory
   - Demand paging and page replacement algorithms
   - Thrashing and working set model`,
    resources: [
      { name: 'Virtual Memory Concepts', url: '#' },
      { name: 'Page Replacement Algorithms', url: '#' },
      { name: 'Memory Protection Techniques', url: '#' }
    ]
  },
  '3': {
    title: 'File Systems',
    content: `File Systems organize and manage data on storage devices:

1. File Concept:
   - Named collection of related information
   - Attributes include name, identifier, type, location, size, protection
   - Operations: create, write, read, reposition, delete, truncate

2. Directory Structure:
   - Single-level directory
   - Two-level directory
   - Tree-structured directory
   - Acyclic-graph directory
   - General graph directory

3. File System Implementation:
   - Contiguous allocation
   - Linked allocation
   - Indexed allocation
   - Free space management

4. File System Performance:
   - Disk scheduling algorithms
   - Caching and buffering
   - Log-structured file systems
   - Journaling file systems`,
    resources: [
      { name: 'File System Architecture', url: '#' },
      { name: 'Disk Scheduling Algorithms', url: '#' },
      { name: 'Directory Management', url: '#' }
    ]
  }
};

export default function OperatingSystemPage() {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: '1',
      title: 'Process Management',
      description: 'Learn about processes, threads, scheduling algorithms, and inter-process communication',
      difficulty: 'intermediate',
      completionStatus: 'not-started'
    },
    {
      id: '2',
      title: 'Memory Management',
      description: 'Understand virtual memory, paging, segmentation, and memory allocation strategies',
      difficulty: 'advanced',
      completionStatus: 'not-started'
    },
    {
      id: '3',
      title: 'File Systems',
      description: 'Explore file system concepts, directory structures, and storage management',
      difficulty: 'intermediate',
      completionStatus: 'in-progress'
    },
    {
      id: '4',
      title: 'Deadlock Handling',
      description: 'Study deadlock prevention, avoidance, detection, and recovery techniques',
      difficulty: 'advanced',
      completionStatus: 'not-started'
    },
    {
      id: '5',
      title: 'Synchronization',
      description: 'Learn about critical sections, mutexes, semaphores, and classical synchronization problems',
      difficulty: 'intermediate',
      completionStatus: 'not-started'
    },
    {
      id: '6',
      title: 'I/O Systems',
      description: 'Understand I/O hardware, application I/O interface, and disk scheduling',
      difficulty: 'beginner',
      completionStatus: 'completed'
    }
  ]);

  const [activeModal, setActiveModal] = useState<{type: 'study' | 'resources' | null, topicId: string | null}>({type: null, topicId: null});
  const [modalContent, setModalContent] = useState<{title: string, content: string, resources?: Array<{name: string, url: string}>}>({title: '', content: '', resources: []});

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return difficulty;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not-started': return 'Not Started';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleStudyClick = (topicId: string) => {
    const topicData = mockStudyData[topicId as keyof typeof mockStudyData];
    if (topicData) {
      setModalContent({
        title: `Study: ${topicData.title}`,
        content: topicData.content
      });
      setActiveModal({type: 'study', topicId});
    }
  };

  const handleResourcesClick = (topicId: string) => {
    const topicData = mockStudyData[topicId as keyof typeof mockStudyData];
    if (topicData) {
      setModalContent({
        title: `Resources: ${topicData.title}`,
        content: '',
        resources: topicData.resources
      });
      setActiveModal({type: 'resources', topicId});
    }
  };

  const closeModal = () => {
    setActiveModal({type: null, topicId: null});
    setModalContent({title: '', content: '', resources: []});
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Operating System
        </h1>
        <p className="text-gray-600">
          Master operating system concepts and prepare for technical interviews
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Topics</p>
              <p className="text-2xl font-semibold text-gray-900">{topics.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {topics.filter(t => t.completionStatus === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">
                {topics.filter(t => t.completionStatus === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            OS Topics
          </h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
            Add Topic
          </button>
        </div>

        <div className="grid gap-4">
          {topics.map((topic) => (
            <div key={topic.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {topic.description}
                  </p>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                      {getDifficultyText(topic.difficulty)}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(topic.completionStatus)}`}>
                      {getStatusText(topic.completionStatus)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleStudyClick(topic.id)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Study
                  </button>
                  <button 
                    onClick={() => handleResourcesClick(topic.id)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md transition-colors"
                  >
                    Resources
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Practice Problems
          </h2>
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Coding Exercises</h3>
            <p className="mt-1 text-sm text-gray-600">
              Practice OS-related coding problems
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Case Studies
          </h2>
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Real-world Examples</h3>
            <p className="mt-1 text-sm text-gray-600">
              Analyze actual OS implementations
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Study/Resources */}
      {activeModal.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">{modalContent.title}</h4>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="px-4 pt-3 pb-4 overflow-y-auto max-h-[70vh]">
              {activeModal.type === 'study' ? (
                <div className="whitespace-pre-line text-gray-700">
                  {modalContent.content}
                </div>
              ) : (
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Recommended Resources:</h5>
                  <ul className="space-y-2">
                    {modalContent.resources?.map((resource, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <a href={resource.url} className="text-blue-600 hover:text-blue-800 hover:underline">
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <h6 className="font-medium text-gray-900 mb-2">Additional Notes:</h6>
                    <p className="text-gray-600 text-sm">
                      These resources provide comprehensive coverage of {modalContent.title?.replace('Resources: ', '')} concepts. 
                      We recommend starting with the first resource and progressing through the list for a thorough understanding.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}