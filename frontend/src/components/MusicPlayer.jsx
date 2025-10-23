// src/components/MusicPlayer.jsx
import React from 'react';
import { motion } from 'framer-motion';

// SVG icons (Unchanged)
const PlayIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z" /></svg> );
const PauseIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> );
const CloseIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg> );

const MusicPlayer = ({ track, isPlaying, onPlayPause, volume, onVolumeChange, onClose }) => {
  
  const playerVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };

  return (
    <>
      {/* --- NEW: CSS for the Aurora effect, marquee, and custom slider --- */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(5%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }

          /* This pseudo-element creates the colorful glow behind the player */
          .aurora-glass::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 20%, #A855F766, transparent 50%), 
                        radial-gradient(circle at 80% 70%, #EC489966, transparent 50%);
            filter: blur(30px);
            z-index: -1;
            opacity: 0.8;
            transition: opacity 0.3s ease-in-out;
          }

          /* Custom Volume Slider Styles */
          .volume-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            outline: none;
            transition: background 0.3s;
          }

          .volume-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 8px rgba(236, 72, 153, 0.8), 0 0 4px rgba(255, 255, 255, 0.5);
            transition: box-shadow 0.2s ease-in-out;
          }
          .volume-slider::-webkit-slider-thumb:hover {
            box-shadow: 0 0 12px rgba(236, 72, 153, 1), 0 0 6px rgba(255, 255, 255, 0.7);
          }
        `}
      </style>

      <motion.div
        variants={playerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        // --- MODIFIED: New classes for the "Aurora Glass" look ---
        className="aurora-glass fixed top-24 right-4 w-72 bg-black/30 text-white p-4 flex flex-col gap-3 rounded-2xl z-[60] backdrop-blur-md shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="flex justify-between items-center">
          <div className="flex-grow overflow-hidden whitespace-nowrap mask-gradient">
            <span className="inline-block animate-marquee font-bold text-pink-200 text-shadow" title={track.title}>
              {track.title}&nbsp;&nbsp;•&nbsp;&nbsp;{track.title}&nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          </div>
          {/* --- MODIFIED: Enhanced button hover effect --- */}
          <button onClick={onClose} className="ml-4 flex-shrink-0 p-1 hover:bg-white/10 rounded-full transition-colors">
            <CloseIcon />
          </button>
        </div>
        
        <div className="flex justify-center">
           {/* --- MODIFIED: Enhanced button hover effect --- */}
          <button onClick={onPlayPause} className="p-2 hover:bg-white/10 rounded-full transition-colors transform hover:scale-110">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        <div className="flex flex-col items-center">
           <label htmlFor="volume" className="text-xs text-gray-300 mb-2 font-medium">Volume</label>
           {/* --- MODIFIED: Using the custom slider class --- */}
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={onVolumeChange}
            className="volume-slider"
          />
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;