import { useSongs } from "../context/SongContext";
import { useState } from "react";
import API from "../api/axios";
import { Trash2, Music2, Disc, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Library = () => {
  const { songs, fetchSongs } = useSongs();
  const [playingId, setPlayingId] = useState(null);

  // 🔥 LOGIC FIX: Derive the Server Base URL from the environment variable
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const SERVER_BASE = API_URL.replace("/api", "");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this memory? 🐝")) return;
    try {
      await API.delete(`/songs/${id}`);
      await fetchSongs();
    } catch {
      alert("Delete failed ❌");
    }
  };

  const togglePlay = (id) => {
    const audio = document.getElementById(`audio-${id}`);
    if (playingId === id) {
      audio.pause();
      setPlayingId(null);
    } else {
      if (playingId) {
        const currentAudio = document.getElementById(`audio-${playingId}`);
        if (currentAudio) currentAudio.pause();
      }
      audio.play();
      setPlayingId(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-40 text-white min-h-screen">
      
      {/* 1. COMPACT HEADER */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Bee <span className="text-pink-500">Vault</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">
            {songs.length} Tracks Saved
          </p>
        </div>
        <div className="p-3 bg-pink-500/10 rounded-full">
           <Disc className={`text-pink-500 ${playingId ? 'animate-spin-slow' : ''}`} size={24} />
        </div>
      </header>

      {/* 2. LIST CONTAINER */}
      <div className="flex flex-col gap-2">
        {songs.length === 0 ? (
          <div className="text-center py-20 bg-zinc-950/30 rounded-[2rem] border border-dashed border-white/5">
            <p className="text-zinc-600 italic text-xs uppercase tracking-widest">No melodies found</p>
          </div>
        ) : (
          <AnimatePresence>
            {songs.map((song) => (
              <motion.div
                key={song._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group flex items-center gap-4 p-3 rounded-2xl transition-all ${
                  playingId === song._id ? "bg-white/10" : "hover:bg-white/5"
                }`}
                onClick={() => togglePlay(song._id)}
              >
                {/* A. THUMBNAIL / PLAY ICON */}
                <div className="relative shrink-0 w-14 h-14 bg-zinc-900 rounded-xl overflow-hidden border border-white/5">
                  {song.thumbnail ? (
                    <img src={song.thumbnail} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music2 size={20} className="text-zinc-700" />
                    </div>
                  )}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${playingId === song._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {playingId === song._id ? (
                      <Pause className="text-pink-500 fill-pink-500" size={24} />
                    ) : (
                      <Play className="text-white fill-white" size={24} />
                    )}
                  </div>
                </div>

                {/* B. SONG INFO */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-bold truncate uppercase italic ${playingId === song._id ? 'text-pink-500' : 'text-zinc-200'}`}>
                    {song.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-zinc-500 font-bold truncate uppercase tracking-tighter">
                      {song.artist || "Bee Artist"}
                    </span>
                    <span className="text-[10px] text-zinc-700">•</span>
                    <span className="text-[9px] text-zinc-600 font-black uppercase">
                      {song.category}
                    </span>
                  </div>
                </div>

                {/* C. HIDDEN AUDIO ELEMENT 🔥 FIXED SRC */}
                <audio 
                  id={`audio-${song._id}`} 
                  src={`${SERVER_BASE}${song.fileUrl}`} 
                  onEnded={() => setPlayingId(null)}
                  preload="metadata"
                />

                {/* D. ACTIONS */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleDelete(song._id); 
                    }}
                    className="p-3 text-zinc-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* 3. MOBILE STICKY PLAYER */}
      <AnimatePresence>
        {playingId && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-24 left-4 right-4 bg-pink-600 h-16 rounded-2xl shadow-2xl flex items-center justify-between px-5 z-50 backdrop-blur-lg border border-white/20"
          >
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-black/20 rounded-lg animate-spin-slow flex items-center justify-center">
                   <Music2 size={16} />
                </div>
                <div className="truncate">
                   <p className="text-xs font-black uppercase italic truncate leading-tight">
                     {songs.find(s => s._id === playingId)?.title}
                   </p>
                   <p className="text-[10px] font-bold text-white/70 uppercase">Now Buzzing...</p>
                </div>
            </div>
            <button onClick={() => togglePlay(playingId)} className="bg-white text-pink-600 p-2 rounded-full shadow-lg">
                <Pause size={20} fill="currentColor" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Library;