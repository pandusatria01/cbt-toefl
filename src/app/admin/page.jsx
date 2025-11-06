import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import AdminSidebar from "@/components/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import QuestionManager from "@/components/admin/QuestionManager";
import TestSettings from "@/components/admin/TestSettings";
import StudentResults from "@/components/admin/StudentResults";
import UserManagement from "@/components/admin/UserManagement";

export default function AdminPage() {
  const { data: user, loading } = useUser();
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    // Redirect non-admin users
    if (!loading && user && user.role !== "admin") {
      window.location.href = "/dashboard";
    }
  }, [user, loading]);

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

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-2xl text-[#001D2E] dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] mb-6">
            You need administrator privileges to access this page.
          </p>
          <a
            href="/dashboard"
            className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "listening":
        return <QuestionManager section="listening" />;
      case "structure":
        return <QuestionManager section="structure" />;
      case "reading":
        return <QuestionManager section="reading" />;
      case "settings":
        return <TestSettings />;
      case "results":
        return <StudentResults />;
      case "users":
        return <UserManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">{renderContent()}</div>
      </div>

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
