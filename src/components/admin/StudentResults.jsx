import { useState, useEffect } from "react";
import { Search, Download, Eye } from "lucide-react";

export default function StudentResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch("/api/admin/results");
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results.filter(
    (result) =>
      result.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.user_email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const calculateTOEFLScore = (totalCorrect, totalQuestions) => {
    // Simplified TOEFL score calculation (310-677 range)
    const percentage = (totalCorrect / totalQuestions) * 100;
    return Math.round(310 + (percentage / 100) * 367);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-montserrat font-bold text-3xl text-[#001D2E] dark:text-white mb-2">
            📊 Student Results
          </h1>
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
            View and analyze student test performance
          </p>
        </div>
        <button className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-6 py-3 rounded-lg flex items-center transition-colors duration-200">
          <Download size={20} className="mr-2" />
          Export Results
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Total Tests
          </h3>
          <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
            {results.length}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Average Score
          </h3>
          <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
            {results.length > 0
              ? Math.round(
                  results.reduce((sum, r) => sum + (r.scaled_score || 0), 0) /
                    results.length,
                )
              : 0}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Highest Score
          </h3>
          <div className="font-poppins font-bold text-2xl text-green-600 dark:text-green-400">
            {results.length > 0
              ? Math.max(...results.map((r) => r.scaled_score || 0))
              : 0}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Pass Rate (≥500)
          </h3>
          <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
            {results.length > 0
              ? Math.round(
                  (results.filter((r) => (r.scaled_score || 0) >= 500).length /
                    results.length) *
                    100,
                )
              : 0}
            %
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6D7A8B] dark:text-[#9CA3AF]"
            />
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg bg-white dark:bg-[#262626] text-[#001D2E] dark:text-white placeholder-[#6D7A8B] dark:placeholder-[#9CA3AF] focus:border-[#30C4B5] focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl transition-colors duration-200">
        <div className="p-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
          <h2 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white">
            Test Results ({filteredResults.length})
          </h2>
        </div>

        {filteredResults.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-2">
              No results found
            </h3>
            <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Students haven't completed any tests yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F9FC] dark:bg-[#2A2A2A]">
                <tr>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Student
                  </th>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Test Date
                  </th>
                  <th className="text-center font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Listening
                  </th>
                  <th className="text-center font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Structure
                  </th>
                  <th className="text-center font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Reading
                  </th>
                  <th className="text-center font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    TOEFL Score
                  </th>
                  <th className="text-right font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result, index) => (
                  <tr
                    key={result.id}
                    className="border-b border-[#E7ECF3] dark:border-[#2A2A2A] hover:bg-[#F7F9FC] dark:hover:bg-[#2A2A2A] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-inter font-medium text-[#001D2E] dark:text-white">
                          {result.user_name || "Unknown Student"}
                        </div>
                        <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                          {result.user_email || "No email"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-inter text-[#001D2E] dark:text-white">
                        {result.completed_at
                          ? new Date(result.completed_at).toLocaleDateString()
                          : "In Progress"}
                      </div>
                      <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                        {result.completed_at
                          ? new Date(result.completed_at).toLocaleTimeString()
                          : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-inter font-medium ${getScoreColor(result.listening_score || 0, 50)}`}
                      >
                        {result.listening_score || 0}/50
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-inter font-medium ${getScoreColor(result.structure_score || 0, 40)}`}
                      >
                        {result.structure_score || 0}/40
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-inter font-medium ${getScoreColor(result.reading_score || 0, 50)}`}
                      >
                        {result.reading_score || 0}/50
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-poppins font-bold text-lg text-[#001D2E] dark:text-white">
                        {result.scaled_score ||
                          calculateTOEFLScore(
                            (result.listening_score || 0) +
                              (result.structure_score || 0) +
                              (result.reading_score || 0),
                            140,
                          )}
                      </div>
                      <div className="font-inter text-xs text-[#6D7A8B] dark:text-[#9CA3AF]">
                        TOEFL Scale
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedResult(result)}
                          className="p-2 text-[#6D7A8B] hover:text-[#30C4B5] hover:bg-[#E4FAF1] rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Result Details Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-6">
              Test Result Details
            </h3>

            <div className="space-y-6">
              {/* Student Info */}
              <div>
                <h4 className="font-inter font-semibold text-[#001D2E] dark:text-white mb-2">
                  Student Information
                </h4>
                <div className="bg-[#F7F9FC] dark:bg-[#2A2A2A] rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                        Name:
                      </span>
                      <div className="font-inter font-medium text-[#001D2E] dark:text-white">
                        {selectedResult.user_name || "Unknown"}
                      </div>
                    </div>
                    <div>
                      <span className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                        Email:
                      </span>
                      <div className="font-inter font-medium text-[#001D2E] dark:text-white">
                        {selectedResult.user_email || "No email"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scores */}
              <div>
                <h4 className="font-inter font-semibold text-[#001D2E] dark:text-white mb-2">
                  Section Scores
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#E4FAF1] dark:bg-[#1A332B] rounded-lg p-4 text-center">
                    <div className="font-inter text-sm text-[#30C4B5] mb-1">
                      Listening
                    </div>
                    <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                      {selectedResult.listening_score || 0}/50
                    </div>
                    <div className="font-inter text-xs text-[#6D7A8B] dark:text-[#9CA3AF]">
                      {Math.round(
                        ((selectedResult.listening_score || 0) / 50) * 100,
                      )}
                      %
                    </div>
                  </div>

                  <div className="bg-[#EFE9FF] dark:bg-[#2A2440] rounded-lg p-4 text-center">
                    <div className="font-inter text-sm text-[#805EFF] mb-1">
                      Structure
                    </div>
                    <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                      {selectedResult.structure_score || 0}/40
                    </div>
                    <div className="font-inter text-xs text-[#6D7A8B] dark:text-[#9CA3AF]">
                      {Math.round(
                        ((selectedResult.structure_score || 0) / 40) * 100,
                      )}
                      %
                    </div>
                  </div>

                  <div className="bg-[#E4F3FF] dark:bg-[#1A2E3D] rounded-lg p-4 text-center">
                    <div className="font-inter text-sm text-[#009EF7] mb-1">
                      Reading
                    </div>
                    <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                      {selectedResult.reading_score || 0}/50
                    </div>
                    <div className="font-inter text-xs text-[#6D7A8B] dark:text-[#9CA3AF]">
                      {Math.round(
                        ((selectedResult.reading_score || 0) / 50) * 100,
                      )}
                      %
                    </div>
                  </div>
                </div>

                {/* Total TOEFL Score */}
                <div className="mt-4 bg-[#F7F9FC] dark:bg-[#2A2A2A] rounded-lg p-6 text-center">
                  <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] mb-2">
                    Total TOEFL Score
                  </div>
                  <div className="font-poppins font-bold text-4xl text-[#30C4B5]">
                    {selectedResult.scaled_score ||
                      calculateTOEFLScore(
                        (selectedResult.listening_score || 0) +
                          (selectedResult.structure_score || 0) +
                          (selectedResult.reading_score || 0),
                        140,
                      )}
                  </div>
                  <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Scale: 310-677
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-6 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
