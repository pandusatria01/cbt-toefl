import { useState } from "react";
import useAuth from "@/utils/useAuth";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Store role selection for onboarding
      localStorage.setItem("pendingRole", role);

      await signUpWithCredentials({
        email,
        password,
        name,
        callbackUrl: "/onboarding",
        redirect: true,
      });
    } catch (err) {
      setError("Failed to create account. Email may already be registered.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="font-montserrat font-bold text-3xl text-[#001D2E] dark:text-white mb-2">
            TOEFL CBT System
          </h1>
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
            Create your account
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-inter font-medium text-sm text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200">
                Full Name
              </label>
              <div className="overflow-hidden rounded-lg border border-[#E3E8F4] dark:border-[#374151] bg-white dark:bg-[#262626] px-4 py-3 focus-within:border-[#30C4B5] focus-within:ring-1 focus-within:ring-[#30C4B5] transition-colors duration-200">
                <input
                  required
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent font-inter text-[#04111C] dark:text-[#E5E7EB] outline-none placeholder-[#8B93A3] dark:placeholder-[#6B7280]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-inter font-medium text-sm text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200">
                Email Address
              </label>
              <div className="overflow-hidden rounded-lg border border-[#E3E8F4] dark:border-[#374151] bg-white dark:bg-[#262626] px-4 py-3 focus-within:border-[#30C4B5] focus-within:ring-1 focus-within:ring-[#30C4B5] transition-colors duration-200">
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent font-inter text-[#04111C] dark:text-[#E5E7EB] outline-none placeholder-[#8B93A3] dark:placeholder-[#6B7280]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-inter font-medium text-sm text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200">
                Password
              </label>
              <div className="overflow-hidden rounded-lg border border-[#E3E8F4] dark:border-[#374151] bg-white dark:bg-[#262626] px-4 py-3 focus-within:border-[#30C4B5] focus-within:ring-1 focus-within:ring-[#30C4B5] transition-colors duration-200">
                <input
                  required
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full bg-transparent font-inter text-[#04111C] dark:text-[#E5E7EB] outline-none placeholder-[#8B93A3] dark:placeholder-[#6B7280]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-inter font-medium text-sm text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200">
                Account Type
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-[#30C4B5] border-[#E3E8F4] dark:border-[#374151] focus:ring-[#30C4B5] focus:ring-2"
                  />
                  <span className="ml-3 font-inter text-[#04111C] dark:text-[#E5E7EB]">
                    Student - Take TOEFL practice tests
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-[#30C4B5] border-[#E3E8F4] dark:border-[#374151] focus:ring-[#30C4B5] focus:ring-2"
                  />
                  <span className="ml-3 font-inter text-[#04111C] dark:text-[#E5E7EB]">
                    Administrator - Manage questions and view results
                  </span>
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white font-inter font-semibold rounded-lg px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
              Already have an account?{" "}
              <a
                href={`/account/signin${
                  typeof window !== "undefined" ? window.location.search : ""
                }`}
                className="text-[#30C4B5] hover:text-[#29AF9F] font-medium transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </form>
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
