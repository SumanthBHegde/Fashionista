import React from "react";

/**
 * UI Style Guide Component
 *
 * This component demonstrates all the standardized UI classes and components
 * used throughout the application. Useful for testing and maintaining consistency.
 */
const UIStyleGuide = () => {
  return (
    <div className="aipicker-container">
      <h3 className="panel-header">UI Style Guide</h3>

      {/* Button Examples */}
      <div className="control-section">
        <label className="control-label">Buttons</label>
        <div className="space-y-2">
          <button className="control-button-primary w-full">
            Primary Button
          </button>
          <button className="control-button-secondary w-full">
            Secondary Button
          </button>
          <div className="flex gap-2">
            <button className="control-button-toggle control-button-toggle-active flex-1">
              Active Toggle
            </button>
            <button className="control-button-toggle control-button-toggle-inactive flex-1">
              Inactive Toggle
            </button>
          </div>
        </div>
      </div>

      {/* Input Examples */}
      <div className="control-section">
        <label className="control-label">Form Controls</label>
        <div className="input-group">
          <label className="input-label-small">Range Input</label>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="control-input"
          />
          <div className="value-display">
            <span>Min: 0</span>
            <span>Max: 100</span>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="control-section">
        <label className="control-label">Status Indicators</label>
        <div className="flex gap-2">
          <span className="status-indicator status-visible">Visible</span>
          <span className="status-indicator status-hidden">Hidden</span>
        </div>
      </div>

      {/* Rotation Controls Example */}
      <div className="control-section">
        <label className="control-label">Rotation Controls</label>
        <div className="rotation-controls">
          <div className="rotation-axis">
            <label className="input-label-small">X-Axis: 0°</label>
            <input
              type="range"
              min="-180"
              max="180"
              defaultValue="0"
              className="control-input"
            />
          </div>
          <div className="rotation-axis">
            <label className="input-label-small">Y-Axis: 0°</label>
            <input
              type="range"
              min="-180"
              max="180"
              defaultValue="0"
              className="control-input"
            />
          </div>
        </div>
      </div>

      {/* Color Examples */}
      <div className="control-section">
        <label className="control-label">Color Scheme</label>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-blue-600 text-white p-2 rounded text-center">
            Blue
          </div>
          <div className="bg-green-600 text-white p-2 rounded text-center">
            Green
          </div>
          <div className="bg-red-600 text-white p-2 rounded text-center">
            Red
          </div>
          <div className="bg-gray-600 text-white p-2 rounded text-center">
            Gray
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIStyleGuide;
