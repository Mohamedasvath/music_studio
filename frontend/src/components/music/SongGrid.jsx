import { motion } from "framer-motion";

const SongGrid = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          whileHover={{ y: -8 }}
          className="bg-white/5 backdrop-blur border border-white/10
                     rounded-2xl p-4 hover:shadow-neon transition"
        >
          <div className="h-32 rounded-xl bg-gradient-to-br
                          from-neonPurple/40 to-neonBlue/40 mb-4" />

          <h3 className="font-semibold">Neon Track {i}</h3>
          <p className="text-xs text-white/60">Uploaded</p>

          <button className="mt-3 text-sm text-neonPink hover:underline">
            Delete
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default SongGrid;
