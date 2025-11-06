import {
  Home,
  FileText,
  Headphones,
  BookOpen,
  Settings,
  BarChart3,
  Power,
  Users,
} from "lucide-react";
import { useState } from "react";
import useUser from "@/utils/useUser";

export default function AdminSidebar({ activeSection, setActiveSection }) {
  const { data: user } = useUser();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "listening", label: "Listening Questions", icon: Headphones },
    { id: "structure", label: "Structure Questions", icon: FileText },
    { id: "reading", label: "Reading Questions", icon: BookOpen },
    { id: "settings", label: "Test Settings", icon: Settings },
    { id: "results", label: "Student Results", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
  ];

  const handleSignOut = async () => {
    window.location.href = "/account/logout";
  };

  return (
    <div className="w-64 bg-[#001D2E] dark:bg-[#0D1117] text-white flex flex-col fixed left-0 top-0 h-full font-inter transition-colors duration-200">
      {/* Header */}
      <div className="p-6 border-b border-[#0B3144] dark:border-[#1F2937]">
        <h1 className="font-montserrat font-bold text-lg text-white mb-1">
          TOEFL CBT Admin
        </h1>
        {user && (
          <div className="text-xs text-white opacity-60">
            Welcome, {user.name}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200
                ${
                  isActive
                    ? "bg-[#30C4B5] hover:bg-[#29AF9F] text-white"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }
              `}
            >
              <Icon
                size={18}
                className={`mr-3 ${isActive ? "text-white" : "text-white opacity-60"}`}
              />
              <span
                className={`font-medium text-sm ${isActive ? "text-white" : "text-white opacity-80"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-6 border-t border-[#0B3144] dark:border-[#1F2937]">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 hover:bg-red-600 hover:bg-opacity-20"
        >
          <Power size={18} className="text-white opacity-60 mr-3" />
          <span className="font-medium text-sm text-white opacity-80">
            Sign Out
          </span>
        </button>
      </div>

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
      `}</style>
    </div>
  );
}
