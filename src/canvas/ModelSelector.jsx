import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import Shirt3DModel from "./ShirtModel";
import Hoodie3DModel from "./HoodieModel";

/**
 * GarmentModelSelector Component
 *
 * Intelligently selects and renders the appropriate 3D garment model
 * based on the current user selection from the global state.
 *
 * Supported Models:
 * - shirt: T-Shirt 3D model
 * - hoodie: Hoodie 3D model
 *
 * Features:
 * - Dynamic model switching
 * - Fallback handling for unknown models
 * - Performance optimization through conditional rendering
 */
const GarmentModelSelector = () => {
  const snap = useSnapshot(state);

  if (snap.debugMode) {
    console.log(`🎯 GarmentModelSelector rendering: ${snap.selectedModel}`);
  }

  switch (snap.selectedModel) {
    case "shirt":
      return <Shirt3DModel />;
    case "hoodie":
      return <Hoodie3DModel />;
    default:
      if (snap.debugMode) {
        console.warn(
          `Unknown garment model: ${snap.selectedModel}, defaulting to shirt`
        );
      }
      return <Shirt3DModel />;
  }
};

export default GarmentModelSelector;
