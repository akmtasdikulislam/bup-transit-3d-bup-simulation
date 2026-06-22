import {
  ArrowCounterClockwise,
  ArrowsOut,
  Crosshair,
  GithubLogo,
  Globe,
  LinkedinLogo,
  Pause,
  Play,
  SlidersHorizontal,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import BusTracker from "./BusTracker";
import bupTransitLogo from "./assets/bup-transit-logo.png";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isTracking, setIsTracking] = useState(true);

  // --- MAP & SIMULATION CONTROLS STATE ---
  const [pitch, setPitch] = useState(70);
  const [zoom, setZoom] = useState(18);
  const [bearing, setBearing] = useState(0);
  const [simState, setSimState] = useState("playing");
  const [speed, setSpeed] = useState(1); // Default 1x speed
  const [restartSimTrigger, setRestartSimTrigger] = useState(0);

  // Resets only the Map View parameters to initial default
  const handleResetMap = () => {
    setPitch(70);
    setZoom(18);
    setBearing(0);
  };

  // Restarts the bus simulation path
  const handleRestartSimulation = () => {
    setRestartSimTrigger((prev) => prev + 1);
    setSimState("playing");
  };

  // --- SECURITY HOOK TO DETER CODE INSPECTION ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "i" || e.key === "j")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden relative selection:bg-bup-sky/30"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,100..900;1,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Sora:wght@100..800&display=swap');
        
        .mapboxgl-canvas { outline: none !important; }

        /* Custom styling for sleek sliders */
        input[type=range] {
          -webkit-appearance: none;
          background: transparent;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #50A2CA; 
          cursor: pointer;
          margin-top: -5px;
          box-shadow: 0 0 10px rgba(80,162,202,0.5);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #1e293b; 
          border-radius: 2px;
        }
      `}</style>

      <div className="absolute inset-0 z-0 w-full h-full">
        {/* ADDED speed PROP HERE */}
        <BusTracker
          pitch={pitch}
          zoom={zoom}
          bearing={bearing}
          simState={simState}
          restartTrigger={restartSimTrigger}
          isTracking={isTracking}
          speed={speed}
        />
      </div>

      {/* Top-Left Branding Header */}
      <header className="absolute top-0 left-0 px-6 py-6 flex items-start justify-between z-10 pointer-events-none w-full">
        <div className="flex items-center gap-4 pointer-events-auto ">
          <img
            src={bupTransitLogo}
            alt="BUP Transit Logo"
            className="h-12 w-auto drop-shadow-[0_0_8px_rgba(254,164,6,0.3)]"
          />
          <div className="flex flex-col">
            <h1
              className="text-2xl font-bold tracking-tight text-bup-green-light drop-shadow-md"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              BUP Transit
            </h1>
            <span className="text-xs font-bold tracking-[0.2em] text-bup-golden uppercase opacity-90">
              Live Fleet Simulator
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Attribution Block */}
          <div
            className="z-10 pointer-events-auto"
            style={{
              translate: isPanelOpen ? "-300px" : "0px", // 364px leaves a nice gap before the panel
              transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="bg-slate-900/70 backdrop-blur-md pl-5 pr-3 py-2 rounded-xl border border-bup-golden/30 shadow-[0_0_15px_rgba(254,164,6,0.1)] flex items-center gap-4 transition-all hover:bg-slate-900/90">
              <div className="flex flex-col text-right justify-center">
                <span className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-1">
                  Simulator Developed By
                </span>
                <span
                  className="text-sm font-black text-white tracking-wide leading-none mb-1.5"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Akm Tasdikul Islam
                </span>
                <span
                  className="text-[8px] font-bold text-slate-400 tracking-widest uppercase leading-none"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  DEPT. of CSE, BUP | CSE-04
                </span>
              </div>

              <div className="w-px h-8 bg-slate-700/80"></div>

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/akmtasdikulislam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-800 hover:bg-white hover:text-slate-900 text-slate-300 rounded-md transition-all text-[10px] font-bold uppercase tracking-widest shadow-sm border border-slate-700 hover:border-white"
                >
                  <GithubLogo size={14} weight="fill" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/akmtasdikulislam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-800 hover:bg-[#0A66C2] hover:text-white text-slate-300 rounded-md transition-all shadow-sm border border-slate-700 hover:border-[#0A66C2]"
                >
                  <LinkedinLogo size={16} weight="fill" />
                </a>
                <a
                  href="https://www.akmtasdikulislam.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-800 hover:bg-bup-green-light hover:text-white text-slate-300 rounded-md transition-all shadow-sm border border-slate-700 hover:border-green-800"
                >
                  <Globe size={16} weight="bold" />
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`pointer-events-auto flex items-center justify-center p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-lg text-bup-golden hover:text-white hover:bg-slate-800 transition-all z-[60] ${isPanelOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <SlidersHorizontal size={24} weight="bold" />
          </button>
        </div>
      </header>

      {/* Floating & Collapsible Control Panel */}
      <div
        className={`fixed top-6 right-6 w-[340px] h-fit bg-slate-900/70 backdrop-blur-2xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 z-50 flex flex-col gap-6 transition-all duration-400 ease-in-out ${
          isPanelOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-[120%] opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
          <h2
            className="text-sm font-bold text-white tracking-wide flex items-center gap-2"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <SlidersHorizontal size={18} className="text-bup-golden" />
            Simulation Controls
          </h2>
          <button
            onClick={() => setIsPanelOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Camera Pitch Control */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Map Pitch
            </span>
            <span className="text-[10px] font-mono text-bup-sky bg-slate-800 px-2 py-0.5 rounded">
              {pitch}°
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="85"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
          />
        </div>

        {/* Camera Zoom Control */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Camera Zoom
            </span>
            <span className="text-[10px] font-mono text-bup-sky bg-slate-800 px-2 py-0.5 rounded">
              {zoom}x
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="22"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        {/* Camera Direction Control */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Direction
            </span>
            <span className="text-[10px] font-mono text-bup-sky bg-slate-800 px-2 py-0.5 rounded">
              {bearing}°
            </span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            value={bearing}
            onChange={(e) => setBearing(Number(e.target.value))}
          />
        </div>

        <div className="w-full h-px bg-slate-700/50 my-1"></div>

        {/* Tracking Control */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Tracking
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${isTracking ? "bg-bup-green text-white" : "bg-slate-800 text-slate-500"}`}
              style={{ fontFamily: "'Azeret Mono', monospace" }}
            >
              {isTracking ? "FOLLOWING" : "FREE CAM"}
            </span>
          </div>

          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`w-full py-2 flex items-center justify-center gap-2 text-xs font-bold tracking-widest rounded-lg transition-all border uppercase shadow-sm ${
              isTracking
                ? "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white"
                : "bg-bup-golden text-bup-navy border-bup-golden shadow-[0_0_15px_rgba(254,164,6,0.4)] hover:bg-white"
            }`}
          >
            {isTracking ? (
              <>
                <Pause size={16} weight="duotone" /> Stop Tracking
              </>
            ) : (
              <>
                <Crosshair size={16} weight="duotone" /> Follow Bus
              </>
            )}
          </button>
        </div>

        {/* Simulation Controls (Speed, Play/Pause, Restart) */}
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Simulation
            </span>
            <span className="text-[10px] font-mono text-bup-sky bg-slate-800 px-2 py-0.5 rounded">
              {speed}x Speed
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="mb-2"
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                setSimState(simState === "playing" ? "paused" : "playing")
              }
              className={`py-2 flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-wider rounded-lg transition-all border uppercase shadow-sm ${
                simState === "playing"
                  ? "bg-bup-golden text-bup-navy border-bup-golden shadow-[0_0_10px_rgba(254,164,6,0.3)] hover:bg-white"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:border-white hover:text-white"
              }`}
            >
              {simState === "playing" ? (
                <>
                  <Pause size={16} weight="fill" /> Pause
                </>
              ) : (
                <>
                  <Play size={16} weight="fill" /> Start
                </>
              )}
            </button>
            <button
              onClick={handleRestartSimulation}
              className="py-2 flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-all border border-slate-700 uppercase shadow-sm"
            >
              <ArrowCounterClockwise size={16} weight="bold" /> Restart
            </button>
          </div>
        </div>

        {/* Reset Map View */}
        <button
          onClick={handleResetMap}
          className="w-full py-2.5 mt-1 flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-bup-navy bg-bup-sky rounded-lg hover:bg-white transition-colors uppercase shadow-[0_0_15px_rgba(80,162,202,0.3)]"
        >
          <ArrowsOut size={16} weight="bold" /> Reset Map View
        </button>
      </div>
    </div>
  );
}

export default App;
