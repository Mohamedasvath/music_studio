import Sidebar from "../sidebar/Sidebar";
import BottomBar from "./BottomBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // Background-a pure slate-la irunthu deep black-ish (#050505) ku mathiruken
    <div className="min-h-screen bg-[#050505] text-white selection:bg-pink-500/30">

      {/* Desktop Sidebar - Added border for separation */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-[#080808]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen relative">
        {/* Subtle Gradient Glow for the whole app background */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-pink-600/5 blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 p-4 sm:p-8 pb-32 md:pb-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Bar - Fixed at bottom with blur */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomBar />
      </div>

    </div>
  );
};

export default MainLayout;