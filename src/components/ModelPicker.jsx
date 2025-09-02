import React from "react";
import { useSnapshot } from "valtio";
import state, { updateLogoPositionsForModel } from "../store";
import { APP_CONFIG } from "../config/app-config";

/**
 * ModelPicker Component
 *
 * Allows users to choose between different 3D models (shirt, hoodie, etc.)
 * Maintains all current settings (color, logos, etc.) when switching models
 */
const ModelPicker = () => {
  const snap = useSnapshot(state);

  const handleModelChange = (modelKey) => {
    state.selectedModel = modelKey;
    // Reset rotation when switching models for better UX
    state.modelRotation = [0, 0, 0];
    // Update logo positions for the selected model
    updateLogoPositionsForModel(modelKey);
    // Ensure logos remain visible when switching models
    if (!state.isLogoTexture) {
      state.isLogoTexture = true;
    }
  };

  return (
    <div className="aipicker-container">
      <h3 className="panel-header">Select Model</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(snap.availableModels).map(([key, model]) => (
          <button
            key={key}
            className={`control-button-toggle ${
              snap.selectedModel === key
                ? "control-button-toggle-active"
                : "control-button-toggle-inactive"
            } p-3 text-center`}
            onClick={() => handleModelChange(key)}
          >
            <div className="text-lg mb-1">{key === "shirt" ? "👕" : "🧥"}</div>
            <div className="text-xs">{model.name}</div>
          </button>
        ))}
      </div>

      {snap.debugMode && (
        <div className="control-section mt-4">
          <div className="text-xs text-gray-300">
            <strong>Current:</strong> {snap.selectedModel}
          </div>
          <div className="text-xs text-gray-300">
            <strong>Path:</strong>{" "}
            {snap.availableModels[snap.selectedModel]?.path}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelPicker;
