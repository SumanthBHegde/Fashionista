import { useState } from "react";
import { useSnapshot } from "valtio";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import state from "../store";

/**
 * Unified Logo Picker component that handles both front and back logo uploads
 */
const UnifiedLogoPicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state);
  const [activeLogoSide, setActiveLogoSide] = useState("front");

  // Store uploaded files for each side to allow re-applying without re-upload
  const [uploadedFiles, setUploadedFiles] = useState({
    front: null,
    back: null,
  });

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Store the file for the current active side
    setUploadedFiles((prev) => ({
      ...prev,
      [activeLogoSide]: uploadedFile,
    }));
  };

  const handleApplyLogo = (type) => {
    if (file) {
      readFile(type, activeLogoSide);
    }
  };

  const handleReapplyLogo = (side, type) => {
    if (uploadedFiles[side]) {
      const currentFile = file;
      setFile(uploadedFiles[side]);

      setTimeout(() => {
        readFile(type, side);
        setFile(currentFile);
      }, 0);
    }
  };

  const handleCancelLogo = (side) => {
    if (side === "front") {
      state.frontLogoDecal = import.meta.env.BASE_URL + "react.png";
      state.logoDecal = import.meta.env.BASE_URL + "react.png";
    } else {
      state.backLogoDecal = null;
      state.showBackLogo = false;
    }

    // Clear the uploaded file for this side
    setUploadedFiles((prev) => ({
      ...prev,
      [side]: null,
    }));

    // If we're currently working on this side, clear the file input
    if (activeLogoSide === side) {
      setFile("");
    }
  };

  const getCurrentLogo = (side) => {
    return side === "front" ? snap.frontLogoDecal : snap.backLogoDecal;
  };

  const hasDefaultLogo = (side) => {
    const currentLogo = getCurrentLogo(side);
    return side === "front"
      ? currentLogo === import.meta.env.BASE_URL + "react.png"
      : !currentLogo || currentLogo === "" || currentLogo === null;
  };

  return (
    <div className="aipicker-container">
      <h3 className="panel-header">Logo Upload</h3>

      {/* Logo Side Selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveLogoSide("front")}
          className={`control-button-toggle flex-1 ${
            activeLogoSide === "front"
              ? "control-button-toggle-active"
              : "control-button-toggle-inactive"
          }`}
        >
          Front Logo
        </button>
        <button
          onClick={() => setActiveLogoSide("back")}
          className={`control-button-toggle flex-1 ${
            activeLogoSide === "back"
              ? "control-button-toggle-active"
              : "control-button-toggle-inactive"
          }`}
        >
          Back Logo
        </button>
      </div>

      {/* File Upload Section */}
      <div className="control-section">
        <label className="control-label">
          Upload {activeLogoSide === "front" ? "Front" : "Back"} Logo
        </label>
        <div className="input-group">
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            value="" // Controlled input to allow re-upload of same file
            className="hidden"
          />
          <label
            htmlFor="logo-upload"
            className="control-button-primary w-full text-center cursor-pointer"
          >
            Choose Image File
          </label>

          <p className="text-white text-xs text-center mt-2">
            {file?.name
              ? `Selected: ${file.name}`
              : `No ${activeLogoSide} logo selected`}
          </p>

          {/* Apply Buttons */}
          {file && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleApplyLogo("logo")}
                className="control-button-secondary flex-1 text-xs"
              >
                Apply as Logo
              </button>
              <button
                onClick={() => handleApplyLogo("full")}
                className="control-button-primary flex-1 text-xs"
              >
                Apply as Full
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Current Logos Management */}
      <div className="control-section">
        <label className="control-label">Current Logos</label>

        <div className="space-y-3">
          {/* Front Logo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-300">Front Logo:</p>
              <div className="flex gap-1">
                {uploadedFiles.front && (
                  <button
                    onClick={() => handleReapplyLogo("front", "logo")}
                    className="text-xs px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
                  >
                    Reapply
                  </button>
                )}
                <button
                  onClick={() => handleCancelLogo("front")}
                  className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  {hasDefaultLogo("front") ? "Default" : "Reset"}
                </button>
              </div>
            </div>
            {getCurrentLogo("front") && (
              <img
                src={getCurrentLogo("front")}
                alt="Front logo"
                className="w-12 h-12 object-cover rounded border bg-white"
              />
            )}
          </div>

          {/* Back Logo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-300">Back Logo:</p>
              <div className="flex gap-1">
                {uploadedFiles.back && (
                  <button
                    onClick={() => handleReapplyLogo("back", "logo")}
                    className="text-xs px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
                  >
                    Reapply
                  </button>
                )}
                <button
                  onClick={() => handleCancelLogo("back")}
                  className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Clear
                </button>
              </div>
            </div>
            {getCurrentLogo("back") &&
            getCurrentLogo("back") !== "" &&
            getCurrentLogo("back") !== null ? (
              <img
                src={getCurrentLogo("back")}
                alt="Back logo"
                className="w-12 h-12 object-cover rounded border bg-white"
              />
            ) : (
              <div className="w-12 h-12 border border-dashed border-gray-400 rounded flex items-center justify-center text-xs text-gray-400">
                None
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-400 p-3 bg-black bg-opacity-30 rounded-lg">
        <p className="mb-1">• Select Front/Back tab</p>
        <p className="mb-1">• Upload & Apply image</p>
        <p>• Use Logo Control panel to adjust position/size</p>
      </div>
    </div>
  );
};

UnifiedLogoPicker.propTypes = {
  file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setFile: PropTypes.func.isRequired,
  readFile: PropTypes.func.isRequired,
};

export default UnifiedLogoPicker;
