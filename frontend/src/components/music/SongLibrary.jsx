import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Music2, Headphones, Activity } from "lucide-react";
import API from "../../api/axios";

const SongLibrary = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  API.get("/songs")
    .then((res) => {
      setSongs(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-44 bg-white/5 rounded-[2rem] animate-pulse border border-white/5" />
        ))}
      </div>
    );
  }

  if (!songs.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 bg-[#0A0A0A] rounded-[3rem] border border-dashed border-white/10"
      >
        <div className="p-5 bg-zinc-900 rounded-full mb-4">
          <Headphones className="text-zinc-700" size={40} />
        </div>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
          The Vault is Silent
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {songs.map((song, index) => (
          <motion.div
            key={song._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative bg-[#0A0A0A] border border-white/5 p-6 rounded-[2.5rem] 
                       hover:border-pink-500/30 transition-all shadow-2xl overflow-hidden"
          >
            {/* Decorative Audio Wave (Bottom Right) */}
            <Activity className="absolute bottom-4 right-4 text-pink-500/10 group-hover:text-pink-500/30 transition-colors" size={60} />

            {/* TOP HEADER: ICON & CATEGORY */}
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-zinc-900 rounded-2xl group-hover:bg-pink-500/10 transition-colors">
                <Music2 className="text-pink-500" size={20} />
              </div>
              <span className="text-[9px] font-black text-pink-500 bg-pink-500/5 border border-pink-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
                {song.category || "General"}
              </span>
            </div>

            {/* INFO */}
            <div className="mb-6">
              <h3 className="text-white font-black text-lg uppercase tracking-tight truncate italic">
                {song.title}
              </h3>
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
                {song.artist || "Bee Studio Artist"}
              </p>
            </div>

            {/* AUDIO CONTROL */}
            <div className="flex items-center gap-3">
              <div className="bg-white/5 rounded-2xl p-2 flex-1 border border-white/5 group-hover:bg-white/10 transition-all">
                <audio 
                  controls 
                  src={song.fileUrl} 
                  className="w-full h-8 invert opacity-30 hover:opacity-100 transition-opacity" 
                />
              </div>
            </div>

            {/* HOVER GLOW EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SongLibrary;