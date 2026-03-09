import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, Trash2, Music2, Heart, Sparkles, Loader2 } from "lucide-react";
import API from "../../api/axios";

const UploadSong = () => {
  const [file, setFile] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // 🔥 LOGIC FIX: Get the server root URL by removing '/api' from the base URL
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const SERVER_BASE = API_URL.replace("/api", "");

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const fetchSongs = async () => {
    try {
      const res = await API.get("/songs");
      setSongs(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Select file first! 🐝");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("song", file);
    formData.append("title", file.name.replace(/\.[^/.]+$/, ""));
    formData.append("category", "Honey Track");
    formData.append("artist", "Bee Studio");
    formData.append("type", "uploaded");

    try {
      await API.post("/songs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      await fetchSongs();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this track?")) return;
    try {
      await API.delete(`/songs/${id}`);
      fetchSongs();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto p-4 pb-28">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-pink-500/10 rounded-xl">
          <Heart className="text-pink-500 fill-pink-500" size={24} />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          Honey <span className="text-pink-500">Vault</span>
        </h2>
      </div>

      {/* UPLOAD BOX */}
      <label className="cursor-pointer group">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[2.5rem] bg-[#0A0A0A] backdrop-blur-xl py-20 px-6 group-hover:border-pink-500/40 transition-all shadow-2xl"
        >
          <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 border border-white/5 shadow-inner">
            <CloudUpload className={`${isUploading ? "animate-bounce" : ""} text-pink-500 w-10 h-10`} />
          </div>
          <p className="text-white font-black text-xl text-center uppercase tracking-tight">
            {file ? file.name : "Select your track"}
          </p>
          <p className="text-zinc-600 text-[10px] font-bold mt-2 tracking-[0.3em] uppercase">
            MP3, WAV, FLAC — Max 50MB
          </p>
        </motion.div>
        <input type="file" accept="audio/*" hidden onChange={(e) => setFile(e.target.files[0])} disabled={isUploading} />
      </label>

      {/* UPLOAD BUTTON */}
      <motion.button
        onClick={handleUpload}
        disabled={isUploading || !file}
        whileHover={{ scale: 1.02 }}
        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] italic flex items-center justify-center gap-3 shadow-2xl transition-all
          ${file && !isUploading ? "bg-white text-black hover:bg-pink-500 hover:text-white" : "bg-zinc-900 text-zinc-700 border border-white/5 cursor-not-allowed"}`}
      >
        {isUploading ? <Loader2 className="animate-spin" /> : <>Upload Track <Sparkles size={18} /></>}
      </motion.button>

      {/* SONG LIST SECTION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <Music2 className="text-yellow-500" size={16} />
          <h3 className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em]">Recent Drips</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {songs.map((song) => (
              <motion.div
                key={song._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col sm:flex-row items-center gap-4 bg-[#0A0A0A] border border-white/5 p-5 rounded-[2.5rem] hover:border-pink-500/20 transition-all group"
              >
                <div className="bg-zinc-900 p-4 rounded-2xl shrink-0 group-hover:bg-zinc-800 transition-colors">
                  <Music2 className="text-pink-500 w-6 h-6" />
                </div>

                <div className="flex flex-col flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="text-white font-bold truncate text-sm uppercase tracking-tight">{song.title}</p>
                    <span className="text-[9px] font-black text-pink-500/60 uppercase tracking-widest bg-pink-500/5 px-2 py-0.5 rounded border border-pink-500/10 w-fit">
                      {song.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest italic">{song.artist}</p>
                    <p className="text-yellow-500 text-[10px] font-black italic">{formatDuration(song.duration)}</p>
                  </div>

                  {/* 🔥 FIXED AUDIO SRC: Combine Server Base + fileUrl */}
                  <audio
                    controls
                    src={`${SERVER_BASE}${song.fileUrl}`}
                    className="mt-4 w-full h-8 opacity-40 hover:opacity-100 transition-opacity invert"
                  />
                </div>

                <button onClick={() => handleDelete(song._id)} className="p-3 text-zinc-700 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all">
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UploadSong;