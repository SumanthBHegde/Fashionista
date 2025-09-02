import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { APP_CONFIG } from "../config/app-config";
import { DownloadIcon } from "../components/Icons";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EDITOR_TABS, FILTER_TABS, DECAL_TYPES } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
  RotationControl,
  LogoControl,
  UnifiedDebugPanel,
  IsolatedLogoControl,
  ModelPicker,
} from "../components";
import LevaRotationControl from "../components/LevaRotationControl";
import UnifiedLogoPicker from "../components/UnifiedLogoPicker";
import SimpleStatusIndicator from "../components/SimpleStatusIndicator";

/**
 * Customizer Page - Main customization interface for the 3D shirt
 *
 * Debug Mode:
 * - Click the "Debug" toggle to enable/disable debug mode
 * - When enabled, shows additional debugging components and controls
 * - Debug console logs can be enabled by uncommenting marked statements throughout the codebase
 *
 * Logo Controls:
 * - Front and back logos are controlled independently via LogoControl component
 * - Each logo has separate scale, rotation, and position controls
 * - Use the front/back toggle in LogoControl to switch between logo sides
 */

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoCloth: true,
    stylishCloth: false,
    viewToggle: false, // false = front view, true = back view
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorPicker":
        return <ColorPicker />;

      case "filePicker":
        return (
          <UnifiedLogoPicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        );

      case "modelPicker":
        return <ModelPicker />;

      case "rotationControl":
        return <RotationControl />;

      case "logoControl":
        return <LogoControl />;

      default:
        return null;
    }
  };

  /**
   * The function `handleDecals` updates the state with a given result and handles the active filter tab if necessary.
   */
  const handleDecals = (type, result, logoSide = "front") => {
    // Handle front/back logo uploads
    if (type === "logo" && logoSide) {
      if (logoSide === "front") {
        state.frontLogoDecal = result;
        state.logoDecal = result; // For backward compatibility
        state.showFrontLogo = true; // Ensure front logo is visible when uploaded
      } else if (logoSide === "back") {
        state.backLogoDecal = result;
        state.showBackLogo = true; // Ensure back logo is visible when uploaded
      }
    } else {
      // Handle regular decal types
      const decalType = DECAL_TYPES[type];
      state[decalType.stateProperty] = result;

      if (!activeFilterTab[decalType.filterTab]) {
        handleActiveFilterTab(decalType.filterTab);
      }
    }
  };

  const handleActiveFilterTab = (tabName) => {
    if (snap.debugMode) {
      console.log(`Filter tab clicked: ${tabName}`);
      console.log("Current activeFilterTab state:", activeFilterTab);
    }

    switch (tabName) {
      case "logoCloth":
        state.isLogoTexture = !activeFilterTab[tabName];
        if (snap.debugMode) {
          console.log("Setting isLogoTexture to:", !activeFilterTab[tabName]);
        }
        break;
      case "stylishCloth":
        state.isFullTexture = !activeFilterTab[tabName];
        if (snap.debugMode) {
          console.log("Setting isFullTexture to:", !activeFilterTab[tabName]);
        }
        break;
      case "viewToggle":
        // Toggle between front and back view
        const isCurrentlyBack = activeFilterTab[tabName];
        state.manualRotation = true;

        if (isCurrentlyBack) {
          // Currently showing back, switch to front
          state.modelRotation = [0, 0, 0]; // Front view (0 degrees Y rotation)
          if (snap.debugMode) {
            console.log("Switching to front view");
          }
        } else {
          // Currently showing front, switch to back
          state.modelRotation = [0, Math.PI, 0]; // Back view (180 degrees Y rotation)
          if (snap.debugMode) {
            console.log("Switching to back view");
          }
        }
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      const newState = {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
      if (snap.debugMode) {
        console.log("New activeFilterTab state:", newState);
      }
      return newState;
    });
  };

  const readFile = (type, logoSide = "front") => {
    reader(file).then((result) => {
      handleDecals(type, result, logoSide);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* Unified Debug Panel - Right side with all necessary debug data */}
          <UnifiedDebugPanel />

          {/* Leva Controls - Bottom positioned when debug mode is ON */}
          {snap.debugMode && <LevaRotationControl />}

          {/* Simple Status Indicator - Only show when debug mode is OFF */}
          <SimpleStatusIndicator />

          {/* left menu tabs */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editor-tabs-container tabs">
                {EDITOR_TABS.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isActiveTab={activeEditorTab === tab.name}
                    handleClick={() => {
                      if (activeEditorTab === tab.name) {
                        setActiveEditorTab("");
                      } else {
                        setActiveEditorTab(tab.name);
                      }
                    }}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* Go back button */}
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title={APP_CONFIG.branding.goBackButtonText}
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          {/* filter tabs - only show when debug mode is OFF */}
          {!snap.debugMode && (
            <motion.div
              className="filter-tabs-container"
              {...slideAnimation("up")}
            >
              {FILTER_TABS.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ))}

              <button className="download-btn" onClick={downloadCanvasToImage}>
                <DownloadIcon className="w-6 h-6" color="white" />
              </button>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
