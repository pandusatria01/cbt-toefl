import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30C4B5] mx-auto mb-4"></div>
        <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
          Loading...
        </p>
      </div>
    </div>
  );
}

function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-[#E9EDF3] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white">
            TOEFL CBT System
          </h1>
          <div className="flex items-center space-x-4">
            <a
              href="/account/signin"
              className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] hover:text-[#30C4B5] transition-colors duration-200"
            >
              Sign In
            </a>
            <a
              href="/account/signup"
              className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl text-[#001D2E] dark:text-white mb-6">
              TOEFL Practice Test
            </h1>
            <p className="font-inter text-xl text-[#6D7A8B] dark:text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              Professional computer-based testing system for TOEFL preparation
              with comprehensive Listening, Structure, and Reading sections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/account/signup?role=user"
                className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Start Practice Test
              </a>
              <a
                href="/account/signup?role=admin"
                className="border border-[#30C4B5] text-[#30C4B5] hover:bg-[#30C4B5] hover:text-white font-inter font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Admin Dashboard
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
              <div className="w-12 h-12 bg-[#E4FAF1] dark:bg-[#1A332B] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-[#30C4B5]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white mb-2">
                Listening Comprehension
              </h3>
              <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
                Audio-based questions with one-time playback restriction for
                authentic test experience
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
              <div className="w-12 h-12 bg-[#EFE9FF] dark:bg-[#2A2440] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-[#805EFF]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white mb-2">
                Structure & Expression
              </h3>
              <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
                Grammar and structure questions to test written English
                proficiency
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
              <div className="w-12 h-12 bg-[#FFF1E4] dark:bg-[#3D2B1A] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-[#FF983B]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white mb-2">
                Reading Comprehension
              </h3>
              <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
                Passage-based reading questions with comprehensive score
                analysis
              </p>
            </div>
          </div>

          {/* Admin Features */}
          <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
            <h3 className="font-montserrat font-bold text-2xl text-[#001D2E] dark:text-white mb-4">
              Administrator Features
            </h3>
            <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] mb-6 max-w-2xl mx-auto">
              Comprehensive test management system with question creation, audio
              upload, test settings configuration, and detailed results
              analytics.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="font-inter font-semibold text-[#001D2E] dark:text-white mb-2">
                  Question Management
                </h4>
                <ul className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] space-y-1">
                  <li>• Add, edit, and delete questions by section</li>
                  <li>• Upload and manage audio files for listening</li>
                  <li>• Rich text support for reading passages</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-inter font-semibold text-[#001D2E] dark:text-white mb-2">
                  Analytics & Reports
                </h4>
                <ul className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] space-y-1">
                  <li>• View detailed student performance</li>
                  <li>• Section-wise score analysis</li>
                  <li>• TOEFL scaled score calculation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  const { data: user, loading } = useUser();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setRedirecting(true);
      // Redirect based on user role
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else if (user.role === "user") {
        window.location.href = "/dashboard";
      } else {
        // User doesn't have a role assigned, go to onboarding
        window.location.href = "/onboarding";
      }
    }
  }, [user, loading]);

  if (loading || redirecting) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <WelcomePage />;
  }

  return <LoadingSpinner />;
}
