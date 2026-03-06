import { motion } from "framer-motion";
import { Sparkles, Music4, Mic2, Rocket, Waves, TrendingUp, Info } from "lucide-react";
import UploadSong from "../components/music/UploadSong";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-10 p-4 md:p-6 min-h-screen overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-2xl"
      >
        {/* Background Blobs - Slightly toned down for mobile performance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-purple-600/20 blur-[80px] md:blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 md:w-80 md:h-80 bg-cyan-500/10 blur-[80px] md:blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 px-5 py-8 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          
          {/* Left Side Content */}
          <div className="text-center md:text-left space-y-4 md:space-y-5 w-full md:w-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-purple-300 backdrop-blur-md"
            >
              <Sparkles size={12} className="animate-pulse text-yellow-400" />
              <span>The Future of Sound</span>
            </motion.div>

            <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight text-white">
              Bee Music <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Studio
              </span>
            </h1>

            <p className="text-gray-400 max-w-sm mx-auto md:mx-0 text-xs md:text-base leading-relaxed">
              Create your rhythm, record your soul, and vibe with the world.
            </p>

            {/* Quick Action Badges - Scrollable on very small screens */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
               {[
                 { icon: <Mic2 size={12}/>, text: "Record", color: "text-pink-400" },
                 { icon: <Music4 size={12}/>, text: "Mix", color: "text-cyan-400" },
                 { icon: <Rocket size={12}/>, text: "Release", color: "text-yellow-400" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold text-white/70 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg">
                    <span className={item.color}>{item.icon}</span> {item.text}
                 </div>
               ))}
            </div>
          </div>

          {/* Visualizer Art - Optimized for Mobile */}
          <div className="relative group mt-4 md:mt-0">
            <div className="absolute inset-0 bg-purple-500/10 blur-2xl rounded-full"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="relative w-32 h-32 md:w-56 md:h-56 rounded-full border border-dashed border-white/20 flex items-center justify-center p-4"
            >
               <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600/80 to-pink-500/80 flex items-center justify-center">
                  <span className="text-4xl md:text-6xl">💓</span>
               </div>
            </motion.div>
            
            {/* Waveform - Hidden on small mobile to save vertical space, shown on MD up */}
            <div className="hidden md:flex absolute -bottom-4 left-1/2 -translate-x-1/2 items-end gap-1 h-12 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
               {[...Array(8)].map((_, i) => (
                 <motion.div
                  key={i}
                  animate={{ height: [5, 20, 5] }}
                  transition={{ repeat: Infinity, duration: 0.5 + Math.random() }}
                  className="w-1 bg-cyan-400 rounded-full"
                 />
               ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Upload Card */}
        <div className="lg:col-span-2 order-1">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-10 shadow-xl"
          >
             <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <Waves className="text-cyan-400 w-5 h-5" /> Upload Track
                </h2>
             </div>
             <div className="w-full overflow-hidden">
                <UploadSong />
             </div>
          </motion.div>
        </div>

        {/* Sidebar - Stats and Tips */}
        <div className="space-y-6 order-2 lg:order-2">
          {/* Quick Tip */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl md:rounded-3xl p-5 md:p-6 text-white shadow-lg">
             <div className="flex items-center gap-2 mb-2">
                <Info size={16} />
                <h3 className="font-bold text-sm md:text-lg">Pro Tip</h3>
             </div>
             <p className="text-blue-50 text-[11px] md:text-sm leading-relaxed">
               Use <b>.WAV</b> for best quality. High quality audio gets more vibes!
             </p>
          </div>

          {/* Stats */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6">
             <h3 className="font-bold text-gray-200 mb-4 text-sm flex items-center gap-2">
                <TrendingUp size={16} className="text-green-400" /> Stats
             </h3>
             <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                   <p className="text-[9px] text-gray-400 uppercase font-bold">Songs</p>
                   <p className="text-xl font-black text-white">24</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                   <p className="text-[9px] text-gray-400 uppercase font-bold">Used</p>
                   <p className="text-xl font-black text-white">65%</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;