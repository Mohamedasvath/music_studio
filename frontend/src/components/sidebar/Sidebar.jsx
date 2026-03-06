import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Upload, Mic, Music, Heart } from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  { to: "/", label: "Home", icon: <HomeIcon size={20} /> },
  { to: "/upload", label: "Upload", icon: <Upload size={20} /> },
  { to: "/record", label: "Record", icon: <Mic size={20} /> },
  { to: "/library", label: "Library", icon: <Music size={20} /> },
];

const Sidebar = () => {
  return (
    // BG-a pure dark-ah mathiyachu to avoid blue tint
    <aside className="h-full bg-[#020102] border-r border-white/5 p-6 flex flex-col">

      {/* --- LOGO AREA --- */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center">
          <Heart className="text-pink-500 fill-pink-500" size={18} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg tracking-tighter uppercase leading-none">
            BEE <span className="text-pink-500">❤️</span>
          </span>
          <span className="text-[8px] font-bold tracking-[0.3em] text-yellow-500/60 uppercase">Studio</span>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="space-y-3 flex-1">
        {menu.map((item, i) => (
          <NavLink key={i} to={item.to}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group
                ${isActive
                  ? "bg-gradient-to-r from-pink-500/20 to-yellow-500/10 border border-pink-500/20 text-white shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                  : "text-zinc-500 hover:text-white hover:bg-white/[0.03] border border-transparent"}`}
              >
                <div className={`${isActive ? "text-pink-500" : "group-hover:text-yellow-500"} transition-colors`}>
                  {item.icon}
                </div>
                <span className={`text-sm font-bold tracking-wide uppercase ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* --- SIDEBAR FOOTER --- */}
      <div className="mt-auto pt-6 border-t border-white/5 opacity-40">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
           <span>Bee Queen 🐝</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;