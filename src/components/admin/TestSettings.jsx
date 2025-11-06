import { useState, useEffect } from "react";
import { Save, Settings as SettingsIcon } from "lucide-react";

export default function TestSettings() {
  const [settings, setSettings] = useState({
    listening_questions: 50,
    structure_questions: 40,
    reading_questions: 50,
    time_limit_minutes: 120,
    audio_playback_limit: 1,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings || settings);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save settings. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      setMessage("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: parseInt(value) || value,
    }));
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
          ⚙️ Test Settings
        </h1>
        <p className="font-inter text-[#6D7A8B] dark:text-[#9CA3AF]">
          Configure test parameters and question limits
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl transition-colors duration-200">
        <div className="p-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
          <h2 className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white flex items-center">
            <SettingsIcon className="mr-3 text-[#30C4B5]" size={24} />
            Test Configuration
          </h2>
        </div>

        <div className="p-6 space-y-8">
          {/* Question Limits */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg text-[#001D2E] dark:text-white mb-4">
              Question Limits by Section
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-2">
                  Listening Questions
                </label>
                <input
                  type="number"
                  value={settings.listening_questions}
                  onChange={(e) =>
                    handleChange("listening_questions", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg bg-white dark:bg-[#262626] text-[#001D2E] dark:text-white focus:border-[#30C4B5] focus:outline-none transition-colors duration-200"
                  min="1"
                  max="100"
                />
                <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] mt-1">
                  Number of listening comprehension questions
                </p>
              </div>

              <div>
                <label className="block font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-2">
                  Structure Questions
                </label>
                <input
                  type="number"
                  value={settings.structure_questions}
                  onChange={(e) =>
                    handleChange("structure_questions", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg bg-white dark:bg-[#262626] text-[#001D2E] dark:text-white focus:border-[#30C4B5] focus:outline-none transition-colors duration-200"
                  min="1"
                  max="100"
                />
                <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] mt-1">
                  Number of structure & written expression questions
                </p>
              </div>

              <div>
                <label className="block font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-2">
                  Reading Questions
                </label>
                <input
                  type="number"
                  value={settings.reading_questions}
                  onChange={(e) =>
                    handleChange("reading_questions", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg bg-white dark:bg-[#262626] text-[#001D2E] dark:text-white focus:border-[#30C4B5] focus:outline-none transition-colors duration-200"
                  min="1"
                  max="100"
                />
                <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] mt-1">
                  Number of reading comprehension questions
                </p>
              </div>
            </div>
          </div>

          {/* Time Settings */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg text-[#001D2E] dark:text-white mb-4">
              Time Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-2">
                  Total Test Time (Minutes)
                </label>
                <input
                  type="number"
                  value={settings.time_limit_minutes}
                  onChange={(e) =>
                    handleChange("time_limit_minutes", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg bg-white dark:bg-[#262626] text-[#001D2E] dark:text-white focus:border-[#30C4B5] focus:outline-none transition-colors duration-200"
                  min="30"
                  max="300"
                />
                <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] mt-1">
                  Total time allowed for the entire test
                </p>
              </div>

              <div>
                <label className="block font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF] mb-2">
                  Audio Playback Limit
                </label>
                <select
                  value={settings.audio_playback_limit}
                  onChange={(e) =>
                    handleChange("audio_playback_limit", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-[#E3E8F4] dark:border-[#374151] rounded-lg bg-white dark:bg-[#262626] text-[#001D2E] dark:text-white focus:border-[#30C4B5] focus:outline-none transition-colors duration-200"
                >
                  <option value="1">One Time Only</option>
                  <option value="2">Twice</option>
                  <option value="3">Three Times</option>
                  <option value="-1">Unlimited</option>
                </select>
                <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] mt-1">
                  How many times students can play audio files
                </p>
              </div>
            </div>
          </div>

          {/* Score Calculation */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg text-[#001D2E] dark:text-white mb-4">
              Score Calculation Preview
            </h3>
            <div className="bg-[#F7F9FC] dark:bg-[#2A2A2A] rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Total Questions
                  </div>
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    {settings.listening_questions +
                      settings.structure_questions +
                      settings.reading_questions}
                  </div>
                </div>
                <div>
                  <div className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Test Duration
                  </div>
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    {Math.floor(settings.time_limit_minutes / 60)}h{" "}
                    {settings.time_limit_minutes % 60}m
                  </div>
                </div>
                <div>
                  <div className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Avg. Time per Question
                  </div>
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    {Math.round(
                      (settings.time_limit_minutes * 60) /
                        (settings.listening_questions +
                          settings.structure_questions +
                          settings.reading_questions),
                    )}
                    s
                  </div>
                </div>
                <div>
                  <div className="font-inter font-medium text-[#6D7A8B] dark:text-[#9CA3AF]">
                    Score Range
                  </div>
                  <div className="font-poppins font-bold text-2xl text-[#001D2E] dark:text-white">
                    310-677
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.includes("success")
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
              }`}
            >
              {message}
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-[#E7ECF3] dark:border-[#2A2A2A]">
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-inter font-medium px-6 py-3 rounded-lg flex items-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} className="mr-2" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
