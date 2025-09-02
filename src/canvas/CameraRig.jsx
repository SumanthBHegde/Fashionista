import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import PropTypes from "prop-types";

import state from "../store";

/**
 * The CameraRig component is a React component that handles the positioning and rotation of a 3D model
 * based on the state and user input.
 * @returns The CameraRig component is returning a group element with a ref attribute set to the group
 * useRef() reference. The children of the CameraRig component are rendered inside this group element.
 */
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  /* Using the `useFrame` hook from the `@react-three/fiber` library to update the
position and rotation of a 3D model in a React component. */
  useFrame((state, delta) => {
    if (!group.current) return; // Safety check

    if (snap.debugMode) {
      console.log("Camera position:", state.camera.position);
    }

    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) {
        targetPosition = [0, 0, 2.5];
      } else {
        targetPosition = [0, 0, 2];
      }
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Only apply pointer-based rotation when manual rotation is OFF
    if (!snap.manualRotation) {
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 7, -state.pointer.x / 2, 0],
        0.2,
        delta
      );
    }
    // When manual rotation is ON, don't rotate the camera rig - let the shirt rotate instead
  });

  return <group ref={group}>{children}</group>;
};

CameraRig.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CameraRig;
