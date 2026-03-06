import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, StopCircle, Upload, Music, User, Image as ImageIcon, Type, Sparkles, Heart, Loader2 } from "lucide-react";
import API from "../api/axios";
import { useSongs } from "../context/SongContext";

const Record = () => {
  const { fetchSongs } = useSongs();

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [artist, setArtist] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRecording]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      recorder.start();
      setTimer(0);
      setIsRecording(true);
    } catch (err) {
      alert("Mic permission denied ❌");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleUpload = async () => {
    if (!audioBlob) return alert("Record something first! 🐝");
    setIsUploading(true);

    const file = new File([audioBlob], `${title || "recorded-song"}.webm`, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("song", file);
    formData.append("title", title || "Untitled Recording");
    formData.append("description", description);
    formData.append("category", category);
    formData.append("artist", artist || "Bee Studio Artist");
    formData.append("type", "recorded");
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await API.post("/songs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchSongs();
      alert("Recorded melody sealed! ✨");
      setAudioBlob(null);
      setAudioURL(null);
      setTimer(0);
      setTitle("");
      setArtist("");
    } catch (err) {
      alert("Upload failed ❌");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-32 text-white">
      {/* HEADER */}
      <header className="mb-12 flex flex-col items-center md:items-start">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-500/10 rounded-lg">
             <Heart className="text-pink-500 fill-pink-500" size={20} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Studio <span className="text-pink-500">Mode</span>
          </h1>
        </div>
        <p className="text-zinc-500 text-sm font-medium italic ml-1">Whisper your heart into the honey jar.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* RECORDING ZONE */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/10 blur-[80px] rounded-full" />

          <div className="relative z-10">
            {isRecording && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.8, opacity: 0.15 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-pink-500 rounded-full"
              />
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
                isRecording ? "bg-white text-black" : "bg-pink-600 text-white hover:bg-pink-500"
              }`}
            >
              {isRecording ? <StopCircle size={48} strokeWidth={1.5} /> : <Mic size={48} strokeWidth={1.5} />}
            </motion.button>
          </div>

          <div className="mt-8 text-center relative z-10">
            <h2 className="text-4xl font-black tracking-tighter italic">
              {formatTime(timer)}
            </h2>
            <p className={`text-[10px] font-black mt-2 uppercase tracking-[0.4em] ${isRecording ? "text-pink-500 animate-pulse" : "text-zinc-600"}`}>
              {isRecording ? "Capturing Frequency" : "Idle Studio"}
            </p>
          </div>

          <AnimatePresence>
            {audioURL && !isRecording && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full mt-10 p-4 bg-white/5 rounded-2xl border border-white/5">
                <label className="text-[10px] font-bold text-zinc-500 mb-3 block uppercase tracking-widest">Seal Preview</label>
                <audio controls src={audioURL} className="w-full h-8 invert opacity-60 hover:opacity-100 transition-opacity" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FORM DETAILS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"><Music size={12}/> Title</label>
              <input
                type="text"
                placeholder="Name the melody..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl focus:border-pink-500/50 outline-none text-sm transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"><User size={12}/> Artist</label>
              <input
                type="text"
                placeholder="Who's whispering?"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl focus:border-pink-500/50 outline-none text-sm transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"><Type size={12}/> Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl focus:border-pink-500/50 outline-none text-sm appearance-none font-medium"
              >
                {["Love", "Sad", "Melody", "HipHop", "Rap", "Folk", "Other"].map(cat => (
                   <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"><ImageIcon size={12}/> Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="w-full bg-[#0A0A0A] border border-white/5 p-3 rounded-2xl text-[10px] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-zinc-800 file:text-zinc-400 file:uppercase hover:file:bg-pink-500 hover:file:text-white transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Deep Thoughts</label>
            <textarea
              rows="3"
              placeholder="What inspired this track?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl focus:border-pink-500/50 outline-none resize-none text-sm font-medium"
            />
          </div>

          <motion.button
            whileHover={{ scale: audioBlob ? 1.01 : 1 }}
            whileTap={{ scale: audioBlob ? 0.99 : 1 }}
            onClick={handleUpload}
            disabled={!audioBlob || isUploading}
            className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] italic flex items-center justify-center gap-3 shadow-2xl transition-all ${
              !audioBlob || isUploading
                ? "bg-zinc-900 text-zinc-700 cursor-not-allowed border border-white/5"
                : "bg-white text-black hover:bg-pink-500 hover:text-white"
            }`}
          >
            {isUploading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <> Seal in Vault <Sparkles size={18} /> </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Record;