import { useControls } from "leva";
import { useSnapshot } from "valtio";
import state from "../store";

const LevaRotationControl = () => {
  const snap = useSnapshot(state);

  // Leva controls for rotation
  const { rotationX, rotationY, rotationZ, resetRotation } = useControls(
    "Model Rotation",
    {
      rotationX: {
        value: snap.modelRotation[0],
        min: -Math.PI,
        max: Math.PI,
        step: 0.1,
        onChange: (value) => {
          state.modelRotation = [
            value,
            state.modelRotation[1],
            state.modelRotation[2],
          ];
        },
      },
      rotationY: {
        value: snap.modelRotation[1],
        min: -Math.PI,
        max: Math.PI,
        step: 0.1,
        onChange: (value) => {
          state.modelRotation = [
            state.modelRotation[0],
            value,
            state.modelRotation[2],
          ];
        },
      },
      rotationZ: {
        value: snap.modelRotation[2],
        min: -Math.PI,
        max: Math.PI,
        step: 0.1,
        onChange: (value) => {
          state.modelRotation = [
            state.modelRotation[0],
            state.modelRotation[1],
            value,
          ];
        },
      },
      resetRotation: {
        value: false,
        onChange: (value) => {
          if (value) {
            state.modelRotation = [0, 0, 0];
          }
        },
      },
    }
  );

  const { manualRotation } = useControls("Rotation Mode", {
    manualRotation: {
      value: snap.manualRotation,
      onChange: (value) => {
        state.manualRotation = value;
      },
    },
  });

  return null; // Leva renders its own UI
};

export default LevaRotationControl;
