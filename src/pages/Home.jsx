import React, { useState, useEffect } from "react";
import { RotateCcw, Plus, Minus, Settings, Volume2, VolumeX, HelpCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(33);
  const [currentDhikr, setCurrentDhikr] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [customDhikr, setCustomDhikr] = useState("");
  const [customTransliteration, setCustomTransliteration] = useState("");
  const [customMeaning, setCustomMeaning] = useState("");
  const [selectedColorTheme, setSelectedColorTheme] = useState(0);
  const [showAddDhikr, setShowAddDhikr] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showHelpTip, setShowHelpTip] = useState(true);

  const dhikrList = [
    {
      arabic: "سُبْحَانَ اللهِ",
      transliteration: "SubhanAllah",
      meaning: "Glory be to Allah",
      color: "from-green-500 to-green-600",
    },
    {
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      meaning: "Praise be to Allah",
      color: "from-blue-500 to-blue-600",
    },
    {
      arabic: "اللهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      meaning: "Allah is Greatest",
      color: "from-purple-500 to-purple-600",
    },
    {
      arabic: "لَا إِلَٰهَ إِلَّا اللهُ",
      transliteration: "La ilaha illa Allah",
      meaning: "There is no god but Allah",
      color: "from-amber-500 to-amber-600",
    },
    {
      arabic: "أَسْتَغْفِرُ اللهَ",
      transliteration: "Astaghfirullah",
      meaning: "I seek forgiveness from Allah",
      color: "from-red-500 to-red-600",
    },
    {
      arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
      transliteration: "La hawla wa la quwwata illa billah",
      meaning: "There is no power except with Allah",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      arabic: "مَا جِئۡتُم بِهِ ٱلسِّحۡرُۖ إِنَّ ٱللَّهَ سَيُبۡطِلُهُۥٓ",
      transliteration: "Ma ji'tum bihi as-sihr, inna Allaha sayubtiluh",
      meaning: "What you have brought is magic; Allah will surely nullify it",
      color: "from-rose-500 to-rose-600",
    },
    {
      arabic: "حَسْبُنَا ٱللَّٰهُ وَنِعْمَ ٱلْوَكِيلُ",
      transliteration: "Hasbuna Allahu wa ni'ma al-wakeel",
      meaning: "Allah is sufficient for us, and He is the best Disposer of affairs",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const colorThemes = [
    "from-green-500 to-green-600",
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-amber-500 to-amber-600",
    "from-red-500 to-red-600",
    "from-indigo-500 to-indigo-600",
    "from-pink-500 to-pink-600",
    "from-teal-500 to-teal-600",
    "from-orange-500 to-orange-600",
    "from-cyan-500 to-cyan-600",
    "from-emerald-500 to-emerald-600",
    "from-violet-500 to-violet-600",
  ];

  const [userDhikrList, setUserDhikrList] = useState(dhikrList);

  const currentDhikrData = userDhikrList[currentDhikr];

  const addCustomDhikr = () => {
    if (customDhikr.trim()) {
      const newDhikr = {
        arabic: customDhikr.trim(),
        transliteration: customTransliteration.trim() || "Custom Dhikr",
        meaning: customMeaning.trim() || "Personal Dhikr",
        color: colorThemes[selectedColorTheme],
      };
      setUserDhikrList([...userDhikrList, newDhikr]);
      setCustomDhikr("");
      setCustomTransliteration("");
      setCustomMeaning("");
      setShowAddDhikr(false);
    }
  };

  // Vibration and sound feedback function
  const provideFeedback = (isCompletion = false) => {
    // Vibration feedback
    if (vibrationEnabled && 'vibrate' in navigator) {
      if (isCompletion) {
        // Longer pattern for completion
        navigator.vibrate([100, 50, 100]);
      } else {
        // Short buzz for normal increment
        navigator.vibrate(40);
      }
    }
    
    // Sound feedback (could implement this later with actual audio files)
    if (soundEnabled) {
      try {
        const audio = new Audio(isCompletion ? '/complete-sound.mp3' : '/click-sound.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
      } catch (err) {
        console.log('Sound playback error:', err);
      }
    }
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount >= targetCount) {
      setCount(0);
      setCompletedRounds((prev) => prev + 1);
      provideFeedback(true); // Completion feedback
      // Optionally auto-advance to next dhikr
      // setCurrentDhikr((prev) => (prev + 1) % dhikrList.length);
    } else {
      setCount(newCount);
      provideFeedback(false); // Regular feedback
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompletedRounds(0);
  };

  const handleDhikrChange = (index) => {
    setCurrentDhikr(index);
    setCount(0);
    setCompletedRounds(0);
  };

  const removeCustomDhikr = (index) => {
    if (index >= dhikrList.length) {
      // Only allow removal of custom dhikr
      const newList = userDhikrList.filter((_, i) => i !== index);
      setUserDhikrList(newList);
      if (currentDhikr >= newList.length) {
        setCurrentDhikr(0);
      }
    }
  };

  const progress = (count / targetCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <motion.div 
              className="text-4xl mb-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >📿</motion.div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Tasbih Counter
            </h1>
            <p className="text-slate-600">Digital Prayer Beads</p>
            <p className="text-sm text-slate-500 mt-1">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          </div>
        </div>

        {/* Main Counter Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Current Dhikr Display */}
          <div className="text-center mb-8">
            <div
              className={`bg-gradient-to-r ${currentDhikrData.color} text-white rounded-2xl p-6 mb-4`}
            >
              <div
                className="text-3xl font-bold mb-2 leading-relaxed"
                style={{ fontFamily: "serif" }}
              >
                {currentDhikrData.arabic}
              </div>
              <div className="text-sm opacity-90 mb-1">
                {currentDhikrData.transliteration}
              </div>
              <div className="text-xs opacity-75">
                {currentDhikrData.meaning}
              </div>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg
                className="w-32 h-32 transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 3.14159} 314.159`}
                  className="transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">
                    {count}
                  </div>
                  <div className="text-sm text-slate-500">/{targetCount}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Counter Button */}
          <div className="text-center mb-6">
            <motion.button
              onClick={handleIncrement}
              className={`w-24 h-24 rounded-full bg-gradient-to-r ${currentDhikrData.color} text-white text-4xl font-bold shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-95`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 1 }}
            >
              +
            </motion.button>
          </div>

          {/* Completed Rounds */}
          <AnimatePresence>
            {completedRounds > 0 && (
              <motion.div 
                className="text-center mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  ✓ {completedRounds} round{completedRounds !== 1 ? "s" : ""}{" "}
                  completed
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors"
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Settings
              </h3>
              
              {/* Vibration and Sound Settings */}
              <div className="mb-5 border-b pb-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center">
                    <span className="text-slate-700 mr-2">Vibration</span>
                    {vibrationEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </label>
                  <div className="relative inline-block w-12 h-6 rounded-full transition bg-gray-200">
                    <input 
                      type="checkbox" 
                      className="absolute opacity-0 w-0 h-0" 
                      checked={vibrationEnabled}
                      onChange={() => setVibrationEnabled(!vibrationEnabled)}
                    />
                    <span 
                      className={`absolute cursor-pointer top-1 left-1 bg-white rounded-full h-4 w-4 transition-transform ${vibrationEnabled ? 'transform translate-x-6 bg-green-500' : ''}`}
                      onClick={() => setVibrationEnabled(!vibrationEnabled)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center">
                    <span className="text-slate-700 mr-2">Sound</span>
                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </label>
                  <div className="relative inline-block w-12 h-6 rounded-full transition bg-gray-200">
                    <input 
                      type="checkbox" 
                      className="absolute opacity-0 w-0 h-0" 
                      checked={soundEnabled}
                      onChange={() => setSoundEnabled(!soundEnabled)}
                    />
                    <span 
                      className={`absolute cursor-pointer top-1 left-1 bg-white rounded-full h-4 w-4 transition-transform ${soundEnabled ? 'transform translate-x-6 bg-green-500' : ''}`}
                      onClick={() => setSoundEnabled(!soundEnabled)}
                    />
                  </div>
                </div>
              </div>

            {/* Target Count Setting */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Target Count
              </label>
              <div className="flex items-center space-x-3 mb-2">
                <button
                  onClick={() => setTargetCount(Math.max(1, targetCount - 1))}
                  className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-semibold w-12 text-center">
                  {targetCount}
                </span>
                <button
                  onClick={() => setTargetCount(targetCount + 1)}
                  className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex space-x-2 mb-3">
                {[33, 99, 100].map((num) => (
                  <button
                    key={num}
                    onClick={() => setTargetCount(num)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      targetCount === num
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div>
                <label className="block text-xs text-slate-600 mb-1">
                  Or enter custom count:
                </label>
                <input
                  type="number"
                  min="1"
                  max="9999"
                  value={targetCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    if (value >= 1 && value <= 9999) {
                      setTargetCount(value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                  placeholder="Enter number (1-9999)"
                />
              </div>
            </div>

            {/* Add Custom Dhikr Section */}
            <div className="border-t pt-4">
              <button
                onClick={() => setShowAddDhikr(!showAddDhikr)}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
              >
                {showAddDhikr ? "Cancel" : "+ Add Custom Dhikr"}
              </button>

              {showAddDhikr && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Arabic Text *
                    </label>
                    <input
                      type="text"
                      value={customDhikr}
                      onChange={(e) => setCustomDhikr(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter Arabic dhikr"
                      style={{ fontFamily: "serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Transliteration
                    </label>
                    <input
                      type="text"
                      value={customTransliteration}
                      onChange={(e) => setCustomTransliteration(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="English pronunciation (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Meaning
                    </label>
                    <input
                      type="text"
                      value={customMeaning}
                      onChange={(e) => setCustomMeaning(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="English meaning (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Color Theme
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {colorThemes.map((theme, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColorTheme(index)}
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme} border-2 ${
                            selectedColorTheme === index
                              ? "border-gray-800"
                              : "border-gray-300"
                          } hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={addCustomDhikr}
                    disabled={!customDhikr.trim()}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Dhikr
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Dhikr Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Select Dhikr
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {userDhikrList.map((dhikr, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => handleDhikrChange(index)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    currentDhikr === index
                      ? `bg-gradient-to-r ${dhikr.color} text-white shadow-md`
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    className="font-semibold text-lg mb-1"
                    style={{ fontFamily: "serif" }}
                  >
                    {dhikr.arabic}
                  </div>
                  <div className="text-sm opacity-80">
                    {dhikr.transliteration}
                  </div>
                  <div className="text-xs opacity-70 mt-1">{dhikr.meaning}</div>
                </button>
                {/* Delete button for custom dhikr only */}
                {index >= dhikrList.length && (
                  <button
                    onClick={() => removeCustomDhikr(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vibration Helper */}
        <AnimatePresence>
          {showHelpTip && (
            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex">
                <div className="text-amber-500 mr-2"><Info size={18} /></div>
                <div>
                  <p className="text-sm text-slate-600">Tap the main counter button to count. Vibration feedback works on mobile devices with vibration support.</p>
                  <button 
                    className="text-xs text-blue-500 mt-2"
                    onClick={() => setShowHelpTip(false)}
                  >
                    Got it
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          className="text-center mt-6 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <p className="text-green-600 font-medium mb-2">🤲 May Allah accept your dhikr</p>
            <p className="text-xs text-slate-400 mb-2">"And remember your Lord much and exalt [Him with praise] in the evening and the morning." - Quran 3:41</p>
            <p className="text-xs opacity-75">Made with ❤️ by Hassan Javed</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
