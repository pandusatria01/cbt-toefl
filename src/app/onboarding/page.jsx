import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";

export default function OnboardingPage() {
  const { data: user, loading: userLoading, refetch } = useUser();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load pending role from localStorage
    if (typeof window !== "undefined") {
      const pendingRole = localStorage.getItem("pendingRole");
      if (pendingRole) {
        setRole(pendingRole);
      }
    }
  }, []);

  useEffect(() => {
    // Redirect if user already has a role assigned
    if (user && user.role) {
      if (typeof window !== "undefined") {
        if (user.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }
    }
  }, [user]);

  const handleRoleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("pendingRole");
        }

        // Refetch user data
        await refetch();

        // Redirect based on role
        if (role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] flex items-center justify-center">
        <div className="text-[#6D7A8B] dark:text-[#9CA3AF] font-inter">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="font-montserrat font-bold text-3xl text-[#001D2E] dark:text-white mb-2">
            Welcome to TOEFL CBT
          </h1>
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
            Let's complete your profile setup
          </p>
        </div>

        {/* Onboarding Form */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-inter font-medium text-sm text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200">
                Select Your Account Type
              </label>
              <div className="space-y-4">
                <label className="flex items-start cursor-pointer p-4 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] transition-colors duration-200">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 mt-1 text-[#30C4B5] border-[#E3E8F4] dark:border-[#374151] focus:ring-[#30C4B5] focus:ring-2"
                  />
                  <div className="ml-3">
                    <div className="font-inter font-medium text-[#04111C] dark:text-[#E5E7EB]">
                      Student Account
                    </div>
                    <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                      Take TOEFL practice tests, view your scores, and track
                      your progress
                    </div>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer p-4 border border-[#E3E8F4] dark:border-[#374151] rounded-lg hover:border-[#30C4B5] transition-colors duration-200">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 mt-1 text-[#30C4B5] border-[#E3E8F4] dark:border-[#374151] focus:ring-[#30C4B5] focus:ring-2"
                  />
                  <div className="ml-3">
                    <div className="font-inter font-medium text-[#04111C] dark:text-[#E5E7EB]">
                      Administrator Account
                    </div>
                    <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                      Manage test questions, configure settings, and view all
                      student results
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleRoleSubmit}
              disabled={loading || !role}
              className="w-full bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white font-inter font-semibold rounded-lg px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Setting up..." : "Continue"}
            </button>
          </div>
        </div>
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
