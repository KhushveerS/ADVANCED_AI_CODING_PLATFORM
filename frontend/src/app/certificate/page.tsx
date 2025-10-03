'use client';

import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useRouter } from 'next/navigation';

export default function CertificatePage() {
  const router = useRouter();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [quizResults, setQuizResults] = useState<any>(null);

  // Load quiz results from localStorage
  useEffect(() => {
    const results = localStorage.getItem('quizResults');
    if (results) {
      setQuizResults(JSON.parse(results));
    } else {
      // If no quiz results, redirect to home or show error
      router.push('/');
    }
  }, [router]);

  if (!quizResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  // Generate unique certificate ID
  const certificateId = 'CERT-2025-' + Math.floor(100000 + Math.random() * 900000);

  // Current date for certificate generation
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Certificate of Achievement</h1>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300"
          >
            Print Certificate
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div 
            ref={certificateRef}
            className="relative w-full h-[595px] bg-white border border-gray-200 rounded-lg overflow-hidden mx-auto"
            style={{ 
              width: '842px', 
              height: '595px',
              maxWidth: '100%',
              aspectRatio: '842/595'
            }}
          >
            {/* Enhanced Certificate Template */}
            <CertificateTemplate 
              studentName={quizResults.studentName}
              courseName={quizResults.courseName}
              completionDate={quizResults.completionDate}
              score={quizResults.score}
              instructorName={quizResults.instructorName}
              certificateId={certificateId}
              currentDate={currentDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CertificateTemplateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  score: string;
  instructorName: string;
  certificateId: string;
  currentDate: string;
}

function CertificateTemplate({
  studentName,
  courseName,
  completionDate,
  score,
  instructorName,
  certificateId,
  currentDate
}: CertificateTemplateProps) {
  // Create a verification URL that includes the certificate ID
  const verificationUrl = `https://dsa-platform.com/verify/${certificateId}`;
  
  return (
    
    <div
  className="relative w-full h-full overflow-hidden border-2 border-black"
  style={{ backgroundColor: '#FDF5E6' }}
>
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='2' fill='%234f46e5' fill-opacity='0.15'/%3E%3C/svg%3E")`
        }}
      />

      {/* Logo */}
      <div className="absolute top-6 left-6 z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg flex items-center justify-center shadow">
          <span className="text-white font-bold text-sm">DSCP</span>
        </div>
      </div>

      {/* QR Code */}
      <div className="absolute top-6 right-6 z-10">
        <QRCodeSVG
          value={verificationUrl}
          size={70}
          bgColor="#ffffff"
          fgColor="#1e3a8a"
          level="H"
        />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 py-12">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-serif font-bold text-blue-900">
            Certificate of Achievement
          </h1>
        </div>

        {/* Student Name */}
        <p className="text-xl text-gray-600">This is to certify that</p>
        <h2 className="text-2xl font-semibold text-blue-900 my-2">
          {studentName}
        </h2>
        <p className="text-sm text-gray-600">
          has successfully completed the assessment on
        </p>

        {/* Course */}
        <div className='text-center mb-3  p-2 rounded'>
        <h3 className="text-2xl font-bold text-black my-4">
          {courseName}
        </h3>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-center">
          <div>
            <p className="text-xs text-gray-500 uppercase">Completion Date</p>
            <p className="text-sm font-medium text-gray-800">{completionDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Final Score</p>
            <p className="text-lg font-bold text-indigo-600">{score}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Certificate ID</p>
            <p className="text-xs font-mono text-gray-700">{certificateId}</p>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-6">
          <span className="bg-yellow-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
            DISTINCTION
          </span>
        </div>

        {/* Signatures */}
     <div className="flex justify-between w-full max-w-2xl mt-10 text-xs text-gray-700">
      <div className="text-center flex-1">
        <img
        src="/instructor.png"
        alt="CEO Signature"
        className="h-14 mx-auto mb-1"
        />
        <p className="font-medium">{instructorName}</p>
        <p className="text-gray-500">Instructor</p>
      </div>
      <div className="text-center flex-1 text-black">
       <img
        src="/sign.png"
        alt="CEO Signature"
        className="h-14 mx-auto mb-1"
        />
        <p className="font-medium">Khushveer Singh</p>
        <p className="text-black">CEO, DSA Platform</p>
      </div>
      {/* Empty flex-1 to maintain spacing */}
      <div className="text-center flex-1 text-black">
         <div className="p-[3.5rem]">
         <p className="font-medium text-black">{currentDate}</p>
         <p className="text-black">Issued On</p>
       </div>
      </div>

    </div>

        {/* Issued Date section positioned at bottom right */}
        {/* <div className="flex justify-end w-full max-w-2xl mt-4 text-xs">
           <div className="text-center">
            <p className="font-medium text-black">{currentDate}</p>
             <p className="text-black">Issued On</p>
            </div>
          </div>
       */}
      </div>
    </div>
    
  );
}
