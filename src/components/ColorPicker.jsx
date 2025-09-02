import { useState } from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";
import { APP_CONFIG } from "../config/app-config";

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const [hexInput, setHexInput] = useState(snap.color);

  const handleHexInputChange = (e) => {
    const value = e.target.value;
    setHexInput(value);

    // Validate hex color (3 or 6 digits)
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(value)) {
      state.color = value;
    }
  };

  const handleSketchPickerChange = (color) => {
    state.color = color.hex;
    setHexInput(color.hex);
  };

  return (
    <div className="aipicker-container">
      <h3 className="panel-header">Color Picker</h3>

      <div className="control-section">
        <label className="control-label">Hex Color</label>
        <input
          type="text"
          value={hexInput}
          onChange={handleHexInputChange}
          placeholder="#000000"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          maxLength={7}
        />
      </div>

      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={APP_CONFIG.colorPresets.map((preset) => preset.color)}
        onChange={handleSketchPickerChange}
      />
    </div>
  );
};

export default ColorPicker;
