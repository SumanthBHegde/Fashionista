import { useSnapshot } from "valtio";
import { useState } from "react";
import state from "../store";

/**
 * LogoControl Component
 *
 * Controls for managing front and back logo properties independently.
 *
 * Debug Mode:
 * All console.log statements are controlled by debugMode setting in store.
 *
 * Features:
 * - Toggle between front/back logo controls
 * - Independent scaling, rotation, and positioning for each logo
 * - Visibility toggle for each logo
 * - Reset functionality for individual logos
 */

const LogoControl = () => {
  const snap = useSnapshot(state);
  const [activeLogoSide, setActiveLogoSide] = useState("front");

  const currentPosition =
    activeLogoSide === "front" ? snap.frontLogoPosition : snap.backLogoPosition;
  const currentScale =
    activeLogoSide === "front" ? snap.frontLogoScale : snap.backLogoScale;
  const currentRotation =
    activeLogoSide === "front" ? snap.frontLogoRotation : snap.backLogoRotation;
  const currentLogo =
    activeLogoSide === "front" ? snap.frontLogoDecal : snap.backLogoDecal;
  const isVisible =
    activeLogoSide === "front" ? snap.showFrontLogo : snap.showBackLogo;

  if (snap.debugMode) {
    console.log("LogoControl - Active side:", activeLogoSide);
    console.log("LogoControl - Current values:", {
      position: currentPosition,
      scale: currentScale,
      rotation: currentRotation,
      logo: currentLogo ? "exists" : "null",
      visible: isVisible,
    });
  }

  const handlePositionChange = (axis, value) => {
    const position = [
      ...(currentPosition || [
        0,
        0.04,
        activeLogoSide === "front" ? 0.15 : -0.15,
      ]),
    ];
    position[axis] = parseFloat(value);

    if (activeLogoSide === "front") {
      state.frontLogoPosition = position;
      if (snap.debugMode) {
        console.log("Updated frontLogoPosition:", position);
      }
    } else {
      state.backLogoPosition = position;
      if (snap.debugMode) {
        console.log("Updated backLogoPosition:", position);
      }
    }

    if (snap.debugMode) {
      console.log(`${activeLogoSide} logo position changed:`, position);
    }
  };

  const handleScaleChange = (value) => {
    const newScale = parseFloat(value);

    if (snap.debugMode) {
      console.log(`Changing ${activeLogoSide} logo scale to:`, newScale);
    }

    if (activeLogoSide === "front") {
      state.frontLogoScale = newScale;
      state._frontLogoState.scale = newScale;
    } else {
      state.backLogoScale = newScale;
      state._backLogoState.scale = newScale;
    }

    if (snap.debugMode) {
      console.log(
        `After ${activeLogoSide} update - Front: ${state.frontLogoScale}, Back: ${state.backLogoScale}`
      );
    }
  };

  const handleRotationChange = (axis, value) => {
    const rotation = [...(currentRotation || [0, 0, 0])];
    rotation[axis] = (parseFloat(value) * Math.PI) / 180;

    if (snap.debugMode) {
      console.log(
        `Attempting to change ${activeLogoSide} logo rotation axis ${axis} to:`,
        value,
        "degrees"
      );
    }

    if (activeLogoSide === "front") {
      state.frontLogoRotation = rotation;
      state._frontLogoState.rotation = [...rotation];

      if (snap.debugMode) {
        console.log("Updated frontLogoRotation:", rotation);
      }
    } else {
      state.backLogoRotation = rotation;
      state._backLogoState.rotation = [...rotation];

      if (snap.debugMode) {
        console.log("Updated backLogoRotation:", rotation);
      }
    }

    if (snap.debugMode) {
      console.log(
        `After ${activeLogoSide} update - Front rotation:`,
        state.frontLogoRotation,
        "Back rotation:",
        state.backLogoRotation
      );
    }
  };

  const toggleVisibility = () => {
    if (activeLogoSide === "front") {
      state.showFrontLogo = !snap.showFrontLogo;
    } else {
      state.showBackLogo = !snap.showBackLogo;
    }
  };

  const resetCurrentLogo = () => {
    if (activeLogoSide === "front") {
      state.frontLogoPosition = [0, 0.04, 0.15];
      state.frontLogoScale = 0.15;
      state.frontLogoRotation = [0, 0, 0];
      state._frontLogoState.position = [0, 0.04, 0.15];
      state._frontLogoState.scale = 0.15;
      state._frontLogoState.rotation = [0, 0, 0];
    } else {
      state.backLogoPosition = [0, 0.04, -0.15];
      state.backLogoScale = 0.15;
      state.backLogoRotation = [0, 0, 0];
      state._backLogoState.position = [0, 0.04, -0.15];
      state._backLogoState.scale = 0.15;
      state._backLogoState.rotation = [0, 0, 0];
    }

    if (snap.debugMode) {
      console.log(`Reset ${activeLogoSide} logo properties`);
    }
  };

  return (
    <div className="aipicker-container">
      <h3 className="panel-header">Logo Controls</h3>

      {/* Toggle Buttons for Front/Back */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveLogoSide("front")}
          className={`control-button-toggle ${
            activeLogoSide === "front"
              ? "control-button-toggle-active"
              : "control-button-toggle-inactive"
          }`}
        >
          Front Logo
        </button>
        <button
          onClick={() => setActiveLogoSide("back")}
          className={`control-button-toggle ${
            activeLogoSide === "back"
              ? "control-button-toggle-active"
              : "control-button-toggle-inactive"
          }`}
        >
          Back Logo
        </button>
      </div>

      {/* Current Logo Status */}
      <div className="control-section">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">
            {activeLogoSide === "front" ? "Front" : "Back"} Logo
          </span>
          <button
            onClick={toggleVisibility}
            className={`status-indicator ${
              isVisible ? "status-visible" : "status-hidden"
            }`}
          >
            {isVisible ? "Visible" : "Hidden"}
          </button>
        </div>

        {!currentLogo && (
          <p className="text-gray-400 text-sm text-center py-2">
            No {activeLogoSide} logo uploaded
          </p>
        )}
      </div>

      {/* Controls - only show if logo exists */}
      {currentLogo && (
        <>
          {/* Logo Size */}
          <div className="control-section">
            <label className="control-label">
              Size: {currentScale ? currentScale.toFixed(2) : "0.15"}
            </label>
            <input
              type="range"
              min={snap.minLogoScale || 0.05}
              max={snap.maxLogoScale || 0.5}
              step="0.01"
              value={currentScale || 0.15}
              onChange={(e) => handleScaleChange(e.target.value)}
              className="control-input"
            />
            <div className="value-display">
              <span>Min: {snap.minLogoScale || 0.05}</span>
              <span>Max: {snap.maxLogoScale || 0.5}</span>
            </div>
          </div>

          {/* Logo Rotation */}
          <div className="control-section">
            <label className="control-label">Rotation</label>
            <div className="rotation-controls">
              {["X", "Y", "Z"].map((axis, index) => (
                <div key={axis} className="rotation-axis">
                  <label className="input-label-small">
                    {axis}-Axis:{" "}
                    {currentRotation && currentRotation[index]
                      ? Math.round((currentRotation[index] * 180) / Math.PI)
                      : 0}
                    °
                  </label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    value={
                      currentRotation && currentRotation[index]
                        ? (currentRotation[index] * 180) / Math.PI
                        : 0
                    }
                    onChange={(e) =>
                      handleRotationChange(index, e.target.value)
                    }
                    className="control-input"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Logo Position */}
          <div className="control-section">
            <label className="control-label">Position</label>
            <div className="position-grid">
              {["X", "Y", "Z"].map((axis, index) => (
                <div key={axis} className="input-group">
                  <label className="input-label-small">
                    {axis}:{" "}
                    {currentPosition && currentPosition[index]
                      ? currentPosition[index].toFixed(2)
                      : "0.00"}
                  </label>
                  <input
                    type="range"
                    min={
                      index === 0
                        ? -0.3
                        : index === 1
                        ? -0.2
                        : activeLogoSide === "front"
                        ? 0.1
                        : -0.2
                    }
                    max={
                      index === 0
                        ? 0.3
                        : index === 1
                        ? 0.3
                        : activeLogoSide === "front"
                        ? 0.2
                        : -0.1
                    }
                    step="0.01"
                    value={
                      currentPosition && currentPosition[index]
                        ? currentPosition[index]
                        : activeLogoSide === "front"
                        ? index === 2
                          ? 0.15
                          : index === 1
                          ? 0.04
                          : 0
                        : index === 2
                        ? -0.15
                        : index === 1
                        ? 0.04
                        : 0
                    }
                    onChange={(e) =>
                      handlePositionChange(index, e.target.value)
                    }
                    className="control-input"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetCurrentLogo}
            className="control-button-secondary mt-4 w-full"
          >
            Reset {activeLogoSide === "front" ? "Front" : "Back"} Logo
          </button>
        </>
      )}
    </div>
  );
};

export default LogoControl;
