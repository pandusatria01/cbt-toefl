import { useState } from "react";
import useUser from "@/utils/useUser";

export default function CreateAdminPage() {
  const { data: user, loading } = useUser();
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/create-first-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Success! ${data.message}`);
        setTimeout(() => {
          window.location.href = "/admin";
        }, 2000);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Error: Failed to create admin");
    } finally {
      setIsLoading(false);
    }
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
    return (
      <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-2xl text-[#001D2E] dark:text-white mb-4">
            Access Required
          </h1>
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] mb-6">
            You need to be signed in to create an admin account.
          </p>
          <a
            href="/account/signin"
            className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-montserrat font-bold text-3xl text-[#001D2E] dark:text-white mb-2">
            🛡️ Create First Admin
          </h1>
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
            Set up the first administrator account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
          <form onSubmit={handleCreateAdmin} className="space-y-6">
            <div>
              <h3 className="font-montserrat font-semibold text-lg text-[#001D2E] dark:text-white mb-4">
                Current User Information
              </h3>
              <div className="bg-[#F7F9FC] dark:bg-[#2A2A2A] rounded-lg p-4 mb-6">
                <div className="font-inter text-sm">
                  <div className="text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Name:
                  </div>
                  <div className="font-medium text-[#001D2E] dark:text-white">
                    {user.name}
                  </div>
                </div>
                <div className="font-inter text-sm mt-2">
                  <div className="text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Email:
                  </div>
                  <div className="font-medium text-[#001D2E] dark:text-white">
                    {user.email}
                  </div>
                </div>
                <div className="font-inter text-sm mt-2">
                  <div className="text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Current Role:
                  </div>
                  <div className="font-medium text-[#001D2E] dark:text-white">
                    {user.role || "user"}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-inter font-medium text-sm text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200">
                Admin Secret Code
              </label>
              <div className="overflow-hidden rounded-lg border border-[#E3E8F4] dark:border-[#374151] bg-white dark:bg-[#262626] px-4 py-3 focus-within:border-[#30C4B5] focus-within:ring-1 focus-within:ring-[#30C4B5] transition-colors duration-200">
                <input
                  required
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter secret code"
                  className="w-full bg-transparent font-inter text-[#04111C] dark:text-[#E5E7EB] outline-none placeholder-[#8B93A3] dark:placeholder-[#6B7280]"
                />
              </div>
              <p className="font-inter text-xs text-[#6D7A8B] dark:text-[#9CA3AF]">
                Secret:{" "}
                <code className="bg-[#F7F9FC] dark:bg-[#2A2A2A] px-2 py-1 rounded">
                  CREATE_FIRST_ADMIN_2024
                </code>
              </p>
            </div>

            {message && (
              <div
                className={`rounded-lg p-4 text-sm ${
                  message.includes("Success")
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !secret}
              className="w-full bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white font-inter font-semibold rounded-lg px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Admin..." : "Create Admin Account"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h4 className="font-inter font-medium text-yellow-800 dark:text-yellow-300 mb-2">
              ⚠️ Important Security Note
            </h4>
            <p className="font-inter text-sm text-yellow-700 dark:text-yellow-400">
              After creating the first admin, please delete this page and the
              API endpoint
              <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">
                /api/admin/create-first-admin
              </code>
              for security reasons.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] hover:text-[#30C4B5] transition-colors duration-200"
          >
            ← Back to Home
          </a>
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
