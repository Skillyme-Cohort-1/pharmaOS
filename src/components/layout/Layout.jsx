import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  // This state controls whether the sidebar is open on mobile devices
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar receives the state and the function to close itself */}
      <Sidebar toggled={toggled} setToggled={setToggled} />

      <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative">
        {/* Navbar receives the function to open the sidebar */}
        <Navbar setToggled={setToggled} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-all">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}