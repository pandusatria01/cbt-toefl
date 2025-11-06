import { useState, useEffect } from "react";
import { Search, UserCheck, UserX, Shield } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      user: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[role] || styles.user}`}
      >
        {role === "admin" ? (
          <Shield size={12} className="mr-1" />
        ) : (
          <UserCheck size={12} className="mr-1" />
        )}
        {role || "user"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30C4B5]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-montserrat font-bold text-3xl text-[#001D2E] dark:text-white mb-2">
          👥 User Management
        </h1>
        <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
          Manage user accounts and permissions
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Total Users
          </h3>
          <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
            {users.length}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Students
          </h3>
          <div className="font-poppins font-bold text-2xl text-blue-600 dark:text-blue-400">
            {users.filter((user) => user.role === "user" || !user.role).length}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Administrators
          </h3>
          <div className="font-poppins font-bold text-2xl text-red-600 dark:text-red-400">
            {users.filter((user) => user.role === "admin").length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6D7A8B] dark:text-[#9CA3AF]"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg bg-white dark:bg-[#262626] text-[#001D2E] dark:text-white placeholder-[#6D7A8B] dark:placeholder-[#9CA3AF] focus:border-[#30C4B5] focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl transition-colors duration-200">
        <div className="p-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
          <h2 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white">
            All Users ({filteredUsers.length})
          </h2>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-2">
              No users found
            </h3>
            <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "No users have registered yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F9FC] dark:bg-[#2A2A2A]">
                <tr>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    User
                  </th>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Role
                  </th>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Joined
                  </th>
                  <th className="text-right font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#E7ECF3] dark:border-[#2A2A2A] hover:bg-[#F7F9FC] dark:hover:bg-[#2A2A2A] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#30C4B5] rounded-full flex items-center justify-center mr-3">
                          <span className="font-inter font-semibold text-white text-sm">
                            {(user.name || user.email || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-inter font-medium text-[#001D2E] dark:text-white">
                            {user.name || "Unnamed User"}
                          </div>
                          <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      <div className="font-inter text-[#001D2E] dark:text-white">
                        {new Date().toLocaleDateString()}
                      </div>
                      <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                        Recent
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        {user.role === "admin" ? (
                          <button
                            onClick={() => updateUserRole(user.id, "user")}
                            className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors duration-200"
                            title="Remove Admin Role"
                          >
                            Remove Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => updateUserRole(user.id, "admin")}
                            className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200"
                            title="Make Admin"
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Warning Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="font-inter font-medium text-yellow-800 dark:text-yellow-300">
              Important Notice
            </h3>
            <div className="mt-2 font-inter text-sm text-yellow-700 dark:text-yellow-400">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Admin users have full access to question management, settings,
                  and student data
                </li>
                <li>Be careful when granting admin permissions to users</li>
                <li>
                  You can revoke admin access at any time by clicking "Remove
                  Admin"
                </li>
                <li>
                  Regular users can only take tests and view their own results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
