import { useSongs } from "../context/SongContext";
import API from "../api/axios";
import { Trash2, Music2, Play, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SongList = () => {
  const { songs, fetchSongs } = useSongs();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this track? 🐝")) return;
    try {
      await API.delete(`/songs/${id}`);
      await fetchSongs();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence mode="popLayout">
        {songs.length > 0 ? (
          songs.map((song) => (
            <motion.div
              key={song._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="relative group bg-[#0A0A0A] border border-white/5 
                         rounded-[2rem] p-5 shadow-2xl transition-all 
                         hover:border-pink-500/30 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500/5 blur-3xl rounded-full transition-opacity group-hover:bg-pink-500/10" />

              <div className="flex items-center gap-4 relative z-10">
                {/* Icon/Thumbnail */}
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-zinc-800 transition-colors">
                  <Music2 className="text-pink-500" size={24} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm uppercase tracking-tight truncate italic">
                    {song.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest truncate">
                      {song.artist || "Unknown"}
                    </p>
                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    <span className="text-pink-500/80 text-[9px] font-black uppercase tracking-widest">
                      {song.type === "recorded" ? "🎙 Live" : "💿 Upload"}
                    </span>
                  </div>
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(song._id)}
                  className="p-2.5 text-zinc-700 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Mini Player / Visual */}
              <div className="mt-4 flex items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-2">
                    <Play size={12} className="text-pink-500 fill-pink-500" />
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Preview</span>
                 </div>
                 <audio 
                    src={song.fileUrl} 
                    className="h-6 w-24 opacity-30 hover:opacity-100 transition-opacity invert" 
                    controls 
                 />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-[2.5rem]">
             <Sparkles className="mx-auto text-zinc-800 mb-2" size={32} />
             <p className="text-zinc-600 italic text-sm">No tracks found in the vault.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SongList;