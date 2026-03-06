import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Music, Sparkles, Heart, Mic2, Disc, 
  ArrowRight, Activity, Zap, Headphones, Stars, Quote, Waves, X 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Emotional Floating Emojis Component
const FloatingEmoji = ({ emoji, delay, left, duration }) => (
  <motion.div
    initial={{ y: "100vh", opacity: 0, scale: 0.5, rotate: 0 }}
    animate={{ 
      y: "-10vh", 
      opacity: [0, 1, 1, 0], 
      scale: [0.5, 1.2, 0.8],
      rotate: [0, 20, -20, 0] 
    }}
    transition={{ duration: duration, delay: delay, ease: "linear" }}
    className="fixed z-[101] text-3xl pointer-events-none"
    style={{ left: `${left}%` }}
  >
    {emoji}
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Session Storage check - Only shows on first load or hard refresh
    const hasSeenPopup = sessionStorage.getItem("hasSeenHomePopup");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("hasSeenHomePopup", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Emoji data for the celebration
  const celebrationEmojis = [
    { e: "💖", l: 10, d: 0, du: 5 }, { e: "✨", l: 25, d: 0.5, du: 4 },
    { e: "🥺", l: 40, d: 1, du: 6 }, { e: "🎵", l: 60, d: 0.2, du: 5 },
    { e: "💝", l: 80, d: 0.7, du: 4 }, { e: "🔥", l: 90, d: 1.2, du: 5 },
    { e: "🐝", l: 15, d: 1.5, du: 6 }, { e: "✨", l: 70, d: 1.8, du: 4 }
  ];

  return (
    <div className="min-h-screen bg-[#020102] text-white selection:bg-pink-500/30 overflow-x-hidden font-sans pb-32">
      
      {/* --- EMOTIONAL CELEBRATION & POPUP --- */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Floating Emojis Layer */}
            {celebrationEmojis.map((item, i) => (
              <FloatingEmoji key={i} emoji={item.e} left={item.l} delay={item.d} duration={item.du} />
            ))}

            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPopup(false)}
                className="absolute inset-0 bg-black/85 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 40 }}
                className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[3.5rem] p-10 md:p-14 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
                
                <button 
                  onClick={() => setShowPopup(false)}
                  className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="space-y-8 text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="inline-flex p-4 bg-pink-500/10 rounded-3xl"
                  >
                    <Heart className="text-pink-500" fill="currentColor" size={40} />
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">
                      I made this just for you-Boo🥹
                    </h2> 
                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-medium italic">
                      Everything here was made for you. Please keep it safe. I'm truly excited to hear your song.
                    </p>
                  </div>

                  <button 
                    onClick={() => setShowPopup(false)}
                    className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase italic text-xs tracking-[0.2em] hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-pink-500/10"
                  >
                   Enter the Studio
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* --- BACKGROUND ANIMATION --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-pink-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[50%] bg-yellow-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-10">
        
        {/* --- NAV --- */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-700 rounded-xl flex items-center justify-center shadow-lg">
               <Disc className="text-white animate-spin-slow" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter italic leading-none uppercase">Bee Studio</span>
              <span className="text-[7px] font-black tracking-[0.3em] text-pink-500 uppercase">Premium Audio</span>
            </div>
          </div>
          <button onClick={() => navigate("/library")} className="text-[10px] font-black uppercase tracking-widest px-6 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
            Open Vault
          </button>
        </nav>

        {/* --- HERO SECTION --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center justify-center min-h-[60vh] text-center lg:text-left mb-24">
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative order-1 lg:order-2">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px]">
                <div className="absolute inset-0 bg-pink-500/15 blur-[80px] rounded-full animate-pulse" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative w-full h-full bg-[#080808] rounded-full shadow-2xl border-[10px] border-zinc-900 flex items-center justify-center overflow-hidden"
                >
                   <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-radial-gradient(circle, #333 0, #333 2px, transparent 4px, transparent 6px)' }} />
                   <div className="relative w-28 h-28 md:w-44 md:h-44 bg-pink-600 rounded-full border-[6px] md:border-[8px] border-zinc-900 flex flex-col items-center justify-center text-center p-2 shadow-inner">
                      <Heart fill="white" size={24} className="mb-1 animate-beat" />
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-tight">Bee <br/> Studio</span>
                   </div>
                </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full">
              <Activity size={12} className="text-pink-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400">Frequency: Pure Love</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-black leading-[0.9] tracking-tighter">
              BEE <span className="text-pink-500 italic underline decoration-pink-500/20">MINE</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-rose-600">
                MELODY
              </span>
            </h1>
            
            <p className="text-zinc-500 text-sm md:text-lg max-w-md mx-auto lg:mx-0 font-medium leading-relaxed italic">
              Transforming every vibration into a timeless memory. Your personal sanctuary of sound.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center lg:justify-start">
              <button onClick={() => navigate("/upload")} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl uppercase italic text-sm">
                Upload Song <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate("/record")} className="w-full sm:w-auto px-8 py-4 bg-zinc-950 text-white font-black rounded-2xl border border-white/10 flex items-center justify-center gap-3 uppercase italic text-sm hover:bg-zinc-900 transition-all">
                <Mic2 size={18} className="text-pink-500" /> Record Your Voice
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- FOOTER (Stats removed for cleaner look as requested previously) --- */}
        <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
           <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest">Bee Studio © 2026</p>
              <p className="text-[9px] font-bold text-purple-500 mt-1 uppercase">This Is For U</p>
           </div>
           <div className="flex items-center gap-6">
              <Music size={16} />
              <Heart size={16} />
           </div>
        </footer>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes beat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .animate-beat { animation: beat 1.5s ease-in-out infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      ` }} />
    </div>
  );
};

export default Home;