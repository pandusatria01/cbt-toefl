import { useState, useEffect } from "react";
import {
  FileText,
  Headphones,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    listeningQuestions: 0,
    structureQuestions: 0,
    readingQuestions: 0,
    totalUsers: 0,
    completedTests: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard-stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Questions",
      value: stats.totalQuestions,
      icon: FileText,
      color: "bg-[#E4FAF1] dark:bg-[#1A332B]",
      iconColor: "text-[#30C4B5]",
    },
    {
      title: "Listening Questions",
      value: stats.listeningQuestions,
      icon: Headphones,
      color: "bg-[#EFE9FF] dark:bg-[#2A2440]",
      iconColor: "text-[#805EFF]",
    },
    {
      title: "Structure Questions",
      value: stats.structureQuestions,
      icon: FileText,
      color: "bg-[#FFF1E4] dark:bg-[#3D2B1A]",
      iconColor: "text-[#FF983B]",
    },
    {
      title: "Reading Questions",
      value: stats.readingQuestions,
      icon: BookOpen,
      color: "bg-[#E4F3FF] dark:bg-[#1A2E3D]",
      iconColor: "text-[#009EF7]",
    },
    {
      title: "Total Students",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-[#F0F9FF] dark:bg-[#1E293B]",
      iconColor: "text-[#0EA5E9]",
    },
    {
      title: "Completed Tests",
      value: stats.completedTests,
      icon: TrendingUp,
      color: "bg-[#F0FDF4] dark:bg-[#14532D]",
      iconColor: "text-[#22C55E]",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30C4B5]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-montserrat font-bold text-3xl text-[#001D2E] dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
          Overview of your TOEFL CBT system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon size={24} className={card.iconColor} />
                </div>
                <div className="text-right">
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    {card.value}
                  </div>
                </div>
              </div>
              <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                {card.title}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
        <h2 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] transition-colors duration-200 text-left">
            <div className="flex items-center mb-2">
              <Headphones size={20} className="text-[#30C4B5] mr-2" />
              <span className="font-inter font-medium text-[#001D2E] dark:text-white">
                Add Listening Question
              </span>
            </div>
            <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
              Create new audio-based questions
            </p>
          </button>

          <button className="p-4 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] transition-colors duration-200 text-left">
            <div className="flex items-center mb-2">
              <FileText size={20} className="text-[#805EFF] mr-2" />
              <span className="font-inter font-medium text-[#001D2E] dark:text-white">
                Add Structure Question
              </span>
            </div>
            <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
              Create grammar questions
            </p>
          </button>

          <button className="p-4 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] transition-colors duration-200 text-left">
            <div className="flex items-center mb-2">
              <BookOpen size={20} className="text-[#009EF7] mr-2" />
              <span className="font-inter font-medium text-[#001D2E] dark:text-white">
                Add Reading Question
              </span>
            </div>
            <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
              Create passage-based questions
            </p>
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
        <h2 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-4">
          System Status
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
              Database Connection
            </span>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-inter text-sm text-green-600 dark:text-green-400">
                Online
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
              Audio Upload Service
            </span>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-inter text-sm text-green-600 dark:text-green-400">
                Active
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
              Test Engine
            </span>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-inter text-sm text-green-600 dark:text-green-400">
                Running
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
