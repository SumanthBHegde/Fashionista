import { useSnapshot } from "valtio";
import state from "../store";

const RotationControl = () => {
  const snap = useSnapshot(state);

  const handleRotationChange = (axis, value) => {
    const newRotation = [...state.modelRotation];
    newRotation[axis] = (value * Math.PI) / 180; // Convert degrees to radians
    state.modelRotation = newRotation;

    if (snap.debugMode) {
      console.log(
        `Rotation changed: axis ${axis}, value ${value}°, radians: ${newRotation[axis]}`
      );
      console.log("New rotation array:", newRotation);
    }
  };

  const toggleManualRotation = () => {
    state.manualRotation = !state.manualRotation;
    if (!state.manualRotation) {
      // Reset rotation when disabling manual mode
      state.modelRotation = [0, 0, 0];
    }
  };

  const resetRotation = () => {
    state.modelRotation = [0, 0, 0];
  };

  return (
    <div className="aipicker-container">
      <h3 className="panel-header">Rotation Control</h3>

      <div className="control-section">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="manualRotation"
            checked={snap.manualRotation}
            onChange={toggleManualRotation}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="manualRotation"
            className="text-white text-sm font-medium"
          >
            Enable Manual Rotation
          </label>
        </div>
      </div>

      {snap.manualRotation && (
        <>
          <div className="control-section">
            <label className="control-label">Rotation Controls</label>
            <div className="rotation-controls">
              {["X", "Y", "Z"].map((axis, index) => (
                <div key={axis} className="rotation-axis">
                  <label className="input-label-small">
                    {axis}-Axis:{" "}
                    {Math.round((snap.modelRotation[index] * 180) / Math.PI)}°
                  </label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    value={(snap.modelRotation[index] * 180) / Math.PI}
                    onChange={(e) =>
                      handleRotationChange(index, parseFloat(e.target.value))
                    }
                    className="control-input"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetRotation}
            className="control-button-secondary w-full"
          >
            Reset Rotation
          </button>
        </>
      )}
    </div>
  );
};

export default RotationControl;
