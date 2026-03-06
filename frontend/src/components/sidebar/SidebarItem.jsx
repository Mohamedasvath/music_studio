import { motion } from "framer-motion";

const SidebarItem = ({ icon, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, x: 5 }}
      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer
                 hover:bg-yellow-400 hover:text-black transition"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </motion.div>
  );
};

export default SidebarItem;
