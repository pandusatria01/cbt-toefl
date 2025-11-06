import { useState } from "react";
import useAuth from "@/utils/useAuth";

export default function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      setError("Invalid email or password. Please try again.");
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
            Sign in to your account
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 transition-colors duration-200">
          <form onSubmit={onSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  className="w-full bg-transparent font-inter text-[#04111C] dark:text-[#E5E7EB] outline-none placeholder-[#8B93A3] dark:placeholder-[#6B7280]"
                />
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
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
              Don't have an account?{" "}
              <a
                href={`/account/signup${
                  typeof window !== "undefined" ? window.location.search : ""
                }`}
                className="text-[#30C4B5] hover:text-[#29AF9F] font-medium transition-colors duration-200"
              >
                Sign up
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
