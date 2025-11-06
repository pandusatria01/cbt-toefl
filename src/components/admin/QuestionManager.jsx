import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Upload } from "lucide-react";

export default function QuestionManager({ section }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const sectionNames = {
    listening: "Listening Comprehension",
    structure: "Structure & Written Expression",
    reading: "Reading Comprehension",
  };

  const sectionIcons = {
    listening: "🎧",
    structure: "📝",
    reading: "📚",
  };

  useEffect(() => {
    fetchQuestions();
  }, [section]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/questions?section=${section}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const response = await fetch(`/api/admin/questions/${questionId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQuestions(questions.filter((q) => q.id !== questionId));
      }
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
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
            {sectionIcons[section]} {sectionNames[section]}
          </h1>
          <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
            Manage {section} questions and content
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-6 py-3 rounded-lg flex items-center transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" />
          Add Question
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Total Questions
          </h3>
          <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
            {questions.length}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            Average Points
          </h3>
          <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
            {questions.length > 0
              ? Math.round(
                  questions.reduce((sum, q) => sum + (q.points || 1), 0) /
                    questions.length,
                )
              : 0}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6">
          <h3 className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-1">
            {section === "listening"
              ? "Audio Files"
              : section === "reading"
                ? "Passages"
                : "Grammar Items"}
          </h3>
          <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
            {section === "listening"
              ? questions.filter((q) => q.audio_url).length
              : section === "reading"
                ? questions.filter((q) => q.passage).length
                : questions.length}
          </div>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl transition-colors duration-200">
        <div className="p-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
          <h2 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white">
            Question List
          </h2>
        </div>

        {questions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">{sectionIcons[section]}</div>
            <h3 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-2">
              No questions yet
            </h3>
            <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] mb-6">
              Start by creating your first {section} question
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Create First Question
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F9FC] dark:bg-[#2A2A2A]">
                <tr>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Question
                  </th>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Type
                  </th>
                  <th className="text-left font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Points
                  </th>
                  <th className="text-right font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr
                    key={question.id}
                    className="border-b border-[#E7ECF3] dark:border-[#2A2A2A] hover:bg-[#F7F9FC] dark:hover:bg-[#2A2A2A] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-inter font-medium text-[#001D2E] dark:text-white">
                        Question {index + 1}
                      </div>
                      <div className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] truncate max-w-md">
                        {question.question_text}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E4FAF1] text-[#30C4B5]">
                        {question.question_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-inter text-[#001D2E] dark:text-white">
                        {question.points || 1} pts
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingQuestion(question)}
                          className="p-2 text-[#6D7A8B] hover:text-[#30C4B5] hover:bg-[#E4FAF1] rounded-lg transition-colors duration-200"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 text-[#6D7A8B] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={16} />
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

      {/* Add/Edit Modal Placeholder */}
      {(showAddModal || editingQuestion) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white mb-4">
              {editingQuestion ? "Edit Question" : "Add New Question"}
            </h3>
            <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF] mb-6">
              Question creation form will be implemented here with
              section-specific fields.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingQuestion(null);
                }}
                className="px-4 py-2 border border-[#E3E8F4] dark:border-[#374151] text-[#6D7A8B] dark:text-[#9CA3AF] rounded-lg hover:bg-[#F7F9FC] dark:hover:bg-[#2A2A2A] transition-colors duration-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg transition-colors duration-200">
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
