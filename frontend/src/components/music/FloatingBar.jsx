import { Mic, Upload } from "lucide-react";
import Dashboard from "../../pages/Dashboard";

const FloatingBar = ({ onMic }) => {
  return (
    
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2
      flex gap-6 px-6 py-3 rounded-full
      bg-black/60 backdrop-blur-xl border border-white/10">

      <button
        onClick={onMic}
        className="p-3 rounded-full bg-pink-500 hover:scale-110 transition"
      >
        <Mic />
      </button>

      <button className="p-3 rounded-full bg-cyan-500 hover:scale-110 transition">
        <Upload />
      </button>

    </div>
  );
};

export default FloatingBar;
