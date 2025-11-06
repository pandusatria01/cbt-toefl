import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  Play,
  Clock,
  BookOpen,
  Headphones,
  FileText,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";

export default function DashboardPage() {
  const { data: user, loading } = useUser();
  const [stats, setStats] = useState({
    testsCompleted: 0,
    averageScore: 0,
    bestScore: 0,
    recentTests: [],
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    // Redirect admin users to admin panel
    if (!loading && user && user.role === "admin") {
      window.location.href = "/admin";
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch("/api/user/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleStartTest = () => {
    window.location.href = "/test/start";
  };

  if (loading) {
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

  if (!user) {
    window.location.href = "/account/signin";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-[#E9EDF3] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white">
            TOEFL CBT System
          </h1>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <div className="font-inter font-medium text-[#001D2E] dark:text-white text-sm">
                  {user.name}
                </div>
                <div className="font-inter text-xs text-[#6D7A8B] dark:text-[#9CA3AF]">
                  Student
                </div>
              </div>
              <div className="w-8 h-8 bg-[#30C4B5] rounded-full flex items-center justify-center">
                <span className="font-inter font-semibold text-white text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <a
              href="/account/logout"
              className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] hover:text-[#30C4B5] transition-colors duration-200"
            >
              Sign Out
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="font-montserrat font-bold text-3xl text-[#001D2E] dark:text-white mb-2">
              Welcome back, {user.name?.split(" ")[0]}! 👋
            </h1>
            <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
              Ready to continue your TOEFL preparation?
            </p>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-r from-[#30C4B5] to-[#29AF9F] rounded-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-montserrat font-bold text-2xl mb-2">
                  Start New TOEFL Test
                </h2>
                <p className="font-inter mb-6 opacity-90">
                  Complete practice test with Listening, Structure, and Reading
                  sections
                </p>
                <div className="flex items-center space-x-6 text-sm mb-6">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>2 hours</span>
                  </div>
                  <div className="flex items-center">
                    <FileText size={16} className="mr-2" />
                    <span>140 questions</span>
                  </div>
                  <div className="flex items-center">
                    <Award size={16} className="mr-2" />
                    <span>Score: 310-677</span>
                  </div>
                </div>
                <button
                  onClick={handleStartTest}
                  className="bg-white text-[#30C4B5] font-inter font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center"
                >
                  <Play size={20} className="mr-2" />
                  Start Test
                </button>
              </div>
              <div className="hidden lg:block">
                <div className="text-8xl opacity-20">📚</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#E4FAF1] dark:bg-[#1A332B] rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-[#30C4B5]" />
                </div>
                <div className="text-right">
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    {loadingStats ? "-" : stats.testsCompleted}
                  </div>
                </div>
              </div>
              <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                Tests Completed
              </h3>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EFE9FF] dark:bg-[#2A2440] rounded-lg flex items-center justify-center">
                  <Award size={24} className="text-[#805EFF]" />
                </div>
                <div className="text-right">
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    {loadingStats ? "-" : stats.averageScore || "N/A"}
                  </div>
                </div>
              </div>
              <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                Average Score
              </h3>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#FFF1E4] dark:bg-[#3D2B1A] rounded-lg flex items-center justify-center">
                  <Award size={24} className="text-[#FF983B]" />
                </div>
                <div className="text-right">
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    {loadingStats ? "-" : stats.bestScore || "N/A"}
                  </div>
                </div>
              </div>
              <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                Best Score
              </h3>
            </div>
          </div>

          {/* Test Sections Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#E4FAF1] dark:bg-[#1A332B] rounded-lg flex items-center justify-center mr-4">
                  <Headphones size={24} className="text-[#30C4B5]" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white">
                    Listening
                  </h3>
                  <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                    50 questions
                  </p>
                </div>
              </div>
              <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
                Audio-based comprehension questions with one-time playback
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#EFE9FF] dark:bg-[#2A2440] rounded-lg flex items-center justify-center mr-4">
                  <FileText size={24} className="text-[#805EFF]" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white">
                    Structure
                  </h3>
                  <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                    40 questions
                  </p>
                </div>
              </div>
              <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
                Grammar and written expression questions
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FFF1E4] dark:bg-[#3D2B1A] rounded-lg flex items-center justify-center mr-4">
                  <BookOpen size={24} className="text-[#FF983B]" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white">
                    Reading
                  </h3>
                  <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                    50 questions
                  </p>
                </div>
              </div>
              <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
                Passage-based reading comprehension questions
              </p>
            </div>
          </div>

          {/* Recent Tests */}
          <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl transition-colors duration-200">
            <div className="p-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
              <h2 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white">
                Recent Test Results
              </h2>
            </div>

            {loadingStats ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#30C4B5] mx-auto mb-4"></div>
                <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
                  Loading results...
                </p>
              </div>
            ) : stats.recentTests?.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-2">
                  No test results yet
                </h3>
                <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] mb-6">
                  Take your first TOEFL practice test to see your results here
                </p>
                <button
                  onClick={handleStartTest}
                  className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Start First Test
                </button>
              </div>
            ) : (
              <div className="p-6">
                <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] text-center">
                  Your test results will appear here after completion
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
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
