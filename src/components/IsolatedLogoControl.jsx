import { useSnapshot } from "valtio";
import { useState, useEffect } from "react";
import state from "../store";

/**
 * Alternative Logo Control using local React state instead of Valtio
 * This ensures complete isolation between front and back logo properties
 */
const IsolatedLogoControl = () => {
  const snap = useSnapshot(state);
  const [activeLogoSide, setActiveLogoSide] = useState("front");

  const [frontLogoState, setFrontLogoState] = useState({
    scale: 0.15,
    rotation: [0, 0, 0],
    position: [0, 0.04, 0.15],
  });

  const [backLogoState, setBackLogoState] = useState({
    scale: 0.15,
    rotation: [0, 0, 0],
    position: [0, 0.04, -0.15],
  });

  // Sync local state with Valtio state
  useEffect(() => {
    if (activeLogoSide === "front") {
      state.frontLogoScale = frontLogoState.scale;
      state.frontLogoRotation = [...frontLogoState.rotation];
      state.frontLogoPosition = [...frontLogoState.position];
    } else {
      state.backLogoScale = backLogoState.scale;
      state.backLogoRotation = [...backLogoState.rotation];
      state.backLogoPosition = [...backLogoState.position];
    }
  }, [frontLogoState, backLogoState, activeLogoSide]);

  const currentState =
    activeLogoSide === "front" ? frontLogoState : backLogoState;
  const setCurrentState =
    activeLogoSide === "front" ? setFrontLogoState : setBackLogoState;

  const handleScaleChange = (value) => {
    const newScale = parseFloat(value);
    setCurrentState((prev) => ({ ...prev, scale: newScale }));

    if (snap.debugMode) {
      console.log(`Isolated: Updated ${activeLogoSide} scale to:`, newScale);
    }
  };

  const handleRotationChange = (axis, value) => {
    const newRotation = [...currentState.rotation];
    newRotation[axis] = (parseFloat(value) * Math.PI) / 180;
    setCurrentState((prev) => ({ ...prev, rotation: newRotation }));

    if (snap.debugMode) {
      console.log(
        `Isolated: Updated ${activeLogoSide} rotation axis ${axis} to:`,
        value,
        "degrees"
      );
    }
  };

  const handlePositionChange = (axis, value) => {
    const newPosition = [...currentState.position];
    newPosition[axis] = parseFloat(value);
    setCurrentState((prev) => ({ ...prev, position: newPosition }));

    if (snap.debugMode) {
      console.log(
        `Isolated: Updated ${activeLogoSide} position axis ${axis} to:`,
        value
      );
    }
  };

  const resetCurrentLogo = () => {
    if (activeLogoSide === "front") {
      setFrontLogoState({
        scale: 0.15,
        rotation: [0, 0, 0],
        position: [0, 0.04, 0.15],
      });
    } else {
      setBackLogoState({
        scale: 0.15,
        rotation: [0, 0, 0],
        position: [0, 0.04, -0.15],
      });
    }

    if (snap.debugMode) {
      console.log(`Isolated: Reset ${activeLogoSide} logo properties`);
    }
  };

  return (
    <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-bold text-purple-600">
        Isolated Logo Control
      </h3>

      {/* Logo Side Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveLogoSide("front")}
          className={`px-3 py-1 rounded ${
            activeLogoSide === "front"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Front Logo
        </button>
        <button
          onClick={() => setActiveLogoSide("back")}
          className={`px-3 py-1 rounded ${
            activeLogoSide === "back"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Back Logo
        </button>
      </div>

      {/* Current Values Display */}
      <div className="text-sm bg-purple-100 p-2 rounded">
        <div>
          <strong>Current {activeLogoSide} values:</strong>
        </div>
        <div>Scale: {currentState.scale.toFixed(3)}</div>
        <div>
          Rotation: [
          {currentState.rotation
            .map((r) => ((r * 180) / Math.PI).toFixed(1))
            .join("°, ")}
          °]
        </div>
        <div>
          Position: [{currentState.position.map((p) => p.toFixed(3)).join(", ")}
          ]
        </div>
      </div>

      {/* Scale Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Scale: {currentState.scale.toFixed(3)}
        </label>
        <input
          type="range"
          min="0.05"
          max="0.5"
          step="0.01"
          value={currentState.scale}
          onChange={(e) => handleScaleChange(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Rotation Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rotation (degrees)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["X", "Y", "Z"].map((axis, index) => (
            <div key={axis}>
              <label className="block text-xs text-gray-600">
                {axis}:{" "}
                {((currentState.rotation[index] * 180) / Math.PI).toFixed(1)}°
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={(currentState.rotation[index] * 180) / Math.PI}
                onChange={(e) => handleRotationChange(index, e.target.value)}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Position Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["X", "Y", "Z"].map((axis, index) => (
            <div key={axis}>
              <label className="block text-xs text-gray-600">
                {axis}: {currentState.position[index].toFixed(3)}
              </label>
              <input
                type="range"
                min="-0.5"
                max="0.5"
                step="0.01"
                value={currentState.position[index]}
                onChange={(e) => handlePositionChange(index, e.target.value)}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetCurrentLogo}
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset {activeLogoSide} Logo
      </button>

      {/* State Comparison */}
      <div className="text-xs bg-yellow-100 p-2 rounded">
        <div>
          <strong>State Comparison:</strong>
        </div>
        <div>
          Front Scale: {frontLogoState.scale.toFixed(3)} | Back Scale:{" "}
          {backLogoState.scale.toFixed(3)}
        </div>
        <div>
          Are they different?{" "}
          {frontLogoState.scale !== backLogoState.scale ? "YES ✅" : "NO ❌"}
        </div>
      </div>
    </div>
  );
};

export default IsolatedLogoControl;
