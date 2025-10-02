'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Contest } from '@/types';

export default function ContestPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await api.getCodeforcesContests();
      
      if (response.success) {
        setContests(response.data);
      } else {
        setError('Failed to fetch contests');
        // Fallback to static data
        setContests([
          {
            id: '1',
            name: 'Codeforces Round #789',
            platform: 'Codeforces',
            date: '2025-10-15 18:35 UTC',
            duration: '2 hours',
            status: 'upcoming'
          },
          {
            id: '2',
            name: 'LeetCode Weekly Contest 312',
            platform: 'LeetCode',
            date: '2025-10-08 16:30 UTC',
            duration: '1.5 hours',
            status: 'ongoing'
          },
          {
            id: '3',
            name: 'Google Kick Start 2025 H',
            platform: 'Google',
            date: '2025-09-25 12:00 UTC',
            duration: '3 hours',
            status: 'ended'
          },
          {
            id: '4',
            name: 'AtCoder Beginner Contest 278',
            platform: 'AtCoder',
            date: '2025-10-22 10:00 UTC',
            duration: '1.5 hours',
            status: 'upcoming'
          }
        ]);
      }
    } catch (err) {
      setError('Failed to fetch contests');
      // Fallback to static data
      setContests([
        {
          id: '1',
          name: 'Codeforces Round #789',
          platform: 'Codeforces',
          date: '2025-10-15 18:35 UTC',
          duration: '2 hours',
          status: 'upcoming'
        },
        {
          id: '2',
          name: 'LeetCode Weekly Contest 312',
          platform: 'LeetCode',
          date: '2025-10-08 16:30 UTC',
          duration: '1.5 hours',
          status: 'ongoing'
        },
        {
          id: '3',
            name: 'Google Kick Start 2025 H',
            platform: 'Google',
            date: '2025-09-25 12:00 UTC',
            duration: '3 hours',
            status: 'ended'
          },
          {
            id: '4',
            name: 'AtCoder Beginner Contest 278',
            platform: 'AtCoder',
            date: '2025-10-22 10:00 UTC',
            duration: '1.5 hours',
            status: 'upcoming'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'upcoming': return 'bg-blue-100 text-blue-800';
        case 'ongoing': return 'bg-green-100 text-green-800';
        case 'ended': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'upcoming': return 'Upcoming';
        case 'ongoing': return 'Ongoing';
        case 'ended': return 'Ended';
        default: return status;
      }
    };

    return (
      <div className="min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contests
          </h1>
          <p className="text-gray-600">
            Stay updated with upcoming programming contests and competitions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming & Recent Contests
            </h2>
            <button 
              onClick={fetchContests}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-md transition-colors"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}. Showing cached data.
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Contest
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Platform
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contests.map((contest) => (
                    <tr key={contest.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {contest.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {contest.platform}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {contest.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {contest.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contest.status)}`}>
                          {getStatusText(contest.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {contest.url ? (
                          <a 
                            href={contest.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </a>
                        ) : (
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            View
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          Register
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contest Calendar
            </h2>
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Interactive Calendar</h3>
              <p className="mt-1 text-sm text-gray-600">
                Visualize contests on a calendar view
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Practice Contests
            </h2>
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Virtual Participation</h3>
              <p className="mt-1 text-sm text-gray-600">
                Participate in past contests virtually
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }