import { NavLink } from "react-router-dom";
import { Home, Upload, Mic, Music, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menu = [
  { to: "/", icon: <Home size={22} />, label: "Home" },
  { to: "/upload", icon: <Upload size={22} />, label: "Upload" },
  { to: "/record", icon: <Mic size={22} />, label: "Record" },
  { to: "/library", icon: <Music size={22} />, label: "Library" },
];

const BottomBar = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe"
    >
      {/* Container with Pure Black Glass Effect */}
      <div className="relative mx-4 mb-4 overflow-hidden rounded-[2rem] bg-[#020102]/80 backdrop-blur-2xl border border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Subtle Gradient Glow inside the bar */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-yellow-500/5 pointer-events-none" />

        <div className="flex justify-around items-center h-20 px-2 relative z-10">
          {menu.map((item, i) => (
            <NavLink key={i} to={item.to} className="relative py-2">
              {({ isActive }) => (
                <div className="flex flex-col items-center justify-center min-w-[64px]">
                  
                  {/* Indicator Dot/Heart for Active State */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bottomTabIndicator"
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 10 }}
                        className="absolute -top-1"
                      >
                        <div className="w-1 h-1 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    animate={{ 
                      y: isActive ? -4 : 0,
                      color: isActive ? "#ec4899" : "#71717a" 
                    }}
                    className="relative"
                  >
                    {item.icon}
                    
                    {/* Glowing effect behind active icon */}
                    {isActive && (
                      <motion.div 
                        layoutId="glow"
                        className="absolute inset-0 bg-pink-500/20 blur-lg rounded-full"
                      />
                    )}
                  </motion.div>

                  {/* Optional Label - Small and clean */}
                  <span className={`text-[10px] mt-1 font-bold tracking-tight uppercase transition-colors duration-300 ${
                    isActive ? "text-pink-500" : "text-zinc-500"
                  }`}>
                    {item.label}
                  </span>

                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomBar;