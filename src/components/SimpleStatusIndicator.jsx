import { useSnapshot } from "valtio";
import state from "../store";

const SimpleStatusIndicator = () => {
  const snap = useSnapshot(state);

  // Always return null - this component should not be displayed
  return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-black bg-opacity-80 p-2 rounded-lg">
      <div className="flex gap-3 text-xs text-white">
        <span
          className={snap.manualRotation ? "text-blue-300" : "text-gray-400"}
        >
          {snap.manualRotation ? "Manual" : "Auto"}
        </span>
        <span
          className={snap.showFrontLogo ? "text-green-300" : "text-gray-400"}
        >
          Front: {snap.showFrontLogo ? "ON" : "OFF"}
        </span>
        <span
          className={snap.showBackLogo ? "text-green-300" : "text-gray-400"}
        >
          Back: {snap.showBackLogo ? "ON" : "OFF"}
        </span>
        <span className="text-yellow-300">
          Scale: {snap.logoScale.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default SimpleStatusIndicator;
