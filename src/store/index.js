import { proxy } from "valtio";
import { APP_CONFIG } from "../config/app-config";

/**
 * Global State Store
 *
 * This file contains the main application state using Valtio proxy.
 *
 * Debug Mode:
 * - Set debugMode to true to enable debug components in the UI
 * - All console.log statements are controlled by debugMode
 * - In development, state is available globally as window.state for debugging
 *
 * Logo System:
 * - frontLogo* properties control the front logo
 * - backLogo* properties control the back logo
 * - Legacy logo* properties are kept for compatibility with debug components
 * - _frontLogoState and _backLogoState are separate object instances to prevent reference sharing
 */

const state = proxy({
  intro: true,
  color: APP_CONFIG.defaults.clothColor,
  isLogoTexture: APP_CONFIG.defaults.isLogoTexture,
  isFullTexture: APP_CONFIG.defaults.isFullTexture,
  logoDecal: APP_CONFIG.defaults.logoDecal, // For backward compatibility
  fullDecal: APP_CONFIG.defaults.fullDecal,

  // Model selection
  selectedModel: APP_CONFIG.defaults.selectedModel || "shirt", // Default to shirt
  availableModels: APP_CONFIG.models || {
    shirt: {
      path: import.meta.env.BASE_URL + "shirt-baked.glb",
      name: "T-Shirt",
      geometry: "T_Shirt_male",
    },
    hoodie: {
      path: import.meta.env.BASE_URL + "hoodie.glb",
      name: "Hoodie",
      geometry: "Hoodie_FABRIC_3_FRONT_1850_0",
    },
  },

  // Logo decals
  frontLogoDecal: APP_CONFIG.defaults.frontLogoDecal,
  backLogoDecal: APP_CONFIG.defaults.backLogoDecal,

  // Rotation and interaction
  manualRotation: false,
  modelRotation: [0, 0, 0],

  // Logo positioning and scaling
  frontLogoPosition: [0, 0.04, 0.15],
  backLogoPosition: [0, 0.04, -0.15],

  // Model-specific logo positioning
  modelLogoPositions: {
    shirt: {
      front: [0, 0.04, 0.15],
      back: [0, 0.04, -0.15],
      frontScale: 0.15,
      backScale: 0.15,
    },
    hoodie: {
      front: [0, 0.04, 0.15], // Exactly same as shirt
      back: [0, 0.04, -0.15], // Exactly same as shirt
      frontScale: 0.15, // Exactly same as shirt
      backScale: 0.15,
    },
  },

  // Separate scale and rotation for front and back logos
  frontLogoScale: 0.15,
  backLogoScale: 0.15, // Set to same as front for consistency
  frontLogoRotation: [0, 0, 0],
  backLogoRotation: [0, 0, 0], // Set to same as front for consistency

  // Force separate object instances to prevent reference sharing
  _frontLogoState: {
    scale: 0.15,
    rotation: [0, 0, 0],
    position: [0, 0.04, 0.15],
  },
  _backLogoState: {
    scale: 0.15, // Set to same as front for consistency
    rotation: [0, 0, 0], // Set to same as front for consistency
    position: [0, 0.04, -0.15],
  },

  // Legacy logo state (for debug components)
  logoScale: 0.15,
  logoRotation: [0, 0, 0],

  showFrontLogo: true,
  showBackLogo: true,

  // Logo constraints
  minLogoScale: 0.05,
  maxLogoScale: 0.5,
  defaultLogoScale: 0.15,

  debugMode: true,
});

// Make state available globally in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.state = state;
}

// Function to update logo positions based on selected model
export const updateLogoPositionsForModel = (modelName) => {
  const modelConfig = state.modelLogoPositions[modelName];
  if (modelConfig) {
    if (state.debugMode) {
      console.log(`📍 [Store] Updating logo positions for model: ${modelName}`);
    }

    state.frontLogoPosition = modelConfig.front;
    state.backLogoPosition = modelConfig.back;
    state.frontLogoScale = modelConfig.frontScale;
    state.backLogoScale = modelConfig.backScale;

    // Update legacy state objects as well
    state._frontLogoState.position = modelConfig.front;
    state._frontLogoState.scale = modelConfig.frontScale;
    state._backLogoState.position = modelConfig.back;
    state._backLogoState.scale = modelConfig.backScale;

    if (state.debugMode) {
      console.log(
        `✅ [Store] Logo positions updated - Front: [${modelConfig.front.join(
          ", "
        )}], Back: [${modelConfig.back.join(", ")}]`
      );
      console.log(
        `✅ [Store] Logo scales updated - Front: ${modelConfig.frontScale}, Back: ${modelConfig.backScale}`
      );
    }
  } else {
    if (state.debugMode) {
      console.warn(
        `⚠️ [Store] No logo configuration found for model: ${modelName}`
      );
    }
  }
};

// Initialize logo positions for the default model
setTimeout(() => {
  updateLogoPositionsForModel(state.selectedModel);
}, 0);

export default state;
