
import { useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";

import calmSound from "./sounds/calm.mp3";
import hopefulSound from "./sounds/hopeful.mp3";
import sadSound from "./sounds/sad.mp3";
import inspiredSound from "./sounds/inspired.mp3";

export default function App() {
  const [mood, setMood] = useState("calm");
  const [bpm, setBpm] = useState(60);
  const [playing, setPlaying] = useState(false);

  const playMap = {
    calm: useSound(calmSound, { loop: true })[0],
    hopeful: useSound(hopefulSound, { loop: true })[0],
    sad: useSound(sadSound, { loop: true })[0],
    inspired: useSound(inspiredSound, { loop: true })[0],
  };

  const colors = {
    calm: "bg-blue-300",
    hopeful: "bg-green-300",
    sad: "bg-purple-300",
    inspired: "bg-yellow-300",
  };

  const handlePlay = () => {
    if (!playing) playMap[mood]();
    setPlaying(!playing);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Inner Music</h1>

      <div className="w-full max-w-md space-y-4">
        <label className="block">
          <span className="text-lg">Your Current Mood</span>
          <select
            className="w-full p-2 mt-1 rounded border"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="calm">Calm</option>
            <option value="hopeful">Hopeful</option>
            <option value="sad">Sad</option>
            <option value="inspired">Inspired</option>
          </select>
        </label>

        <label className="block">
          <span className="text-lg">Estimated Heartbeat (BPM)</span>
          <input
            type="range"
            min="50"
            max="120"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center">{bpm} BPM</p>
        </label>

        <button
          onClick={handlePlay}
          className="w-full p-3 bg-indigo-600 text-white rounded"
        >
          {playing ? "Stop Music" : "Play My Inner Music"}
        </button>

        {playing && (
          <motion.div
            className={`h-40 mt-6 rounded shadow-inner flex items-center justify-center text-xl text-black ${colors[mood]}`}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 60 / bpm,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {mood.toUpperCase()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
