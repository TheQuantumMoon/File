import { useState } from "react";
import SettingsOverlay from "./SettingsOverlay";
import { Wrench } from "lucide-react";

const SettingsButton = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button
        className="m-3  absolute top-0 right-0 z-50
     p-2 text-xs font-black
    bg-[#11B0A5] text-white
    rounded-lg shadow-md tracking-wide uppercase
    transition-transform
    hover:scale-105 active:scale-95
    "
        onClick={() => setShowSettings(true)}
      >
        <Wrench size={24} />
      </button>
      <SettingsOverlay isOpen={showSettings} setIsOpen={setShowSettings} />
    </>
  );
};

export default SettingsButton;
