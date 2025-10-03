'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CertificateVerificationPage({ params }: { params: { id: string } }) {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [certificateData, setCertificateData] = useState<any>(null);

  useEffect(() => {
    // Call the backend API to verify the certificate
    const verifyCertificate = async () => {
      try {
        const response = await fetch(`/api/certificate/verify/${params.id}`);
        const data = await response.json();
        
        if (data.verified) {
          setVerificationStatus('valid');
          setCertificateData(data.certificate);
        } else {
          setVerificationStatus('invalid');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('invalid');
      }
    };

    if (params.id) {
      verifyCertificate();
    }
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verification</h1>
          <p className="text-gray-600">Verify the authenticity of a DSA & CP certificate</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {verificationStatus === 'loading' && (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Verifying Certificate</h2>
              <p className="text-gray-600">Checking certificate authenticity...</p>
            </div>
          )}

          {verificationStatus === 'valid' && certificateData && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate Verified</h2>
              <p className="text-gray-600 mb-8">This certificate is authentic and was issued by DSA & CP Learning Platform</p>
              
              <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Certificate ID:</span>
                    <span className="font-medium">{certificateData.id}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Student Name:</span>
                    <span className="font-medium">{certificateData.studentName}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{certificateData.courseName}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Completion Date:</span>
                    <span className="font-medium">{certificateData.completionDate}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-medium text-green-600">{certificateData.score}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Instructor:</span>
                    <span className="font-medium">{certificateData.instructorName}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Issued On:</span>
                    <span className="font-medium">{certificateData.issuedDate}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verified On:</span>
                    <span className="font-medium">{new Date(certificateData.verificationDate).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800">
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  This certificate has been successfully verified and is valid.
                </p>
              </div>
            </div>
          )}

          {verificationStatus === 'invalid' && (
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h2>
              <p className="text-gray-600 mb-8">We couldn't verify a certificate with ID: {params.id}</p>
              
              <div className="bg-red-50 rounded-lg p-4 mb-8">
                <p className="text-red-800">
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  This certificate could not be verified. It may be invalid or expired.
                </p>
              </div>
              
              <div className="text-gray-600">
                <p>If you believe this is an error, please contact support with the certificate ID.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}