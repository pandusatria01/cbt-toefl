import useAuth from "@/utils/useAuth";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
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
            Sign out of your account
          </p>
        </div>

        {/* Sign Out Form */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-8 text-center transition-colors duration-200">
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] mb-6">
            Are you sure you want to sign out?
          </p>

          <button
            onClick={handleSignOut}
            className="w-full bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white font-inter font-semibold rounded-lg px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50"
          >
            Sign Out
          </button>

          <p className="text-center font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] mt-4">
            <a
              href="/"
              className="text-[#30C4B5] hover:text-[#29AF9F] font-medium transition-colors duration-200"
            >
              Go back to home
            </a>
          </p>
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
