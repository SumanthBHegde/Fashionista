import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

/**
 * UnifiedDebugPanel Component
 *
 * Comprehensive debug interface with all necessary debug information
 * Positioned on the right side of the screen
 */
const UnifiedDebugPanel = () => {
  const snap = useSnapshot(state);

  const toggleDebugMode = () => {
    state.debugMode = !state.debugMode;
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "front":
        state.manualRotation = true;
        state.modelRotation = [0, 0, 0];
        state.showFrontLogo = true;
        state.showBackLogo = false;
        break;
      case "back":
        state.manualRotation = true;
        state.modelRotation = [0, Math.PI, 0];
        state.showFrontLogo = false;
        state.showBackLogo = true;
        break;
      case "reset":
        state.modelRotation = [0, 0, 0];
        state.manualRotation = false;
        break;
    }
  };

  return (
    <>
      {/* Debug Toggle - Always Accessible in Top Left */}
      <button
        onClick={toggleDebugMode}
        className={`fixed top-5 left-5 z-50 px-2 py-1 rounded text-xs font-medium transition-colors ${
          snap.debugMode
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
        title={snap.debugMode ? "Hide Debug" : "Show Debug"}
      >
        {snap.debugMode ? "🐛" : "🔧"}
      </button>

      {/* Comprehensive Debug Panel - Right Side */}
      {snap.debugMode && !snap.intro && (
        <div className="fixed top-5 right-2 bottom-16 z-40 pointer-events-auto w-48 sm:w-52 md:w-56 overflow-hidden">
          <div className="bg-black bg-opacity-95 rounded-lg shadow-xl text-white h-full flex flex-col border border-gray-600">
            <div className="font-semibold px-3 py-2 text-cyan-300 text-sm border-b border-gray-700 flex-shrink-0">
              Debug Panel
            </div>
            <div className="overflow-y-auto flex-1 px-3 py-2 text-xs space-y-3">
              {/* Quick Actions */}
              <div className="pb-2 border-b border-gray-700">
                <div className="font-medium mb-2 text-yellow-300 text-xs">
                  Actions
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => handleQuickAction("front")}
                    className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-xs"
                  >
                    Front
                  </button>
                  <button
                    onClick={() => handleQuickAction("back")}
                    className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-xs"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleQuickAction("reset")}
                    className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-700 text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* System Status */}
              <div className="pb-2 border-b border-gray-700">
                <div className="font-medium mb-2 text-green-300 text-xs">
                  System
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="truncate">Model:</span>
                    <span className="text-cyan-300 text-xs truncate ml-1">
                      {snap.selectedModel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Color:</span>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded border border-gray-400 flex-shrink-0"
                        style={{ backgroundColor: snap.color }}
                      />
                      <span className="text-gray-300 text-xs">
                        {snap.color.slice(-6)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span
                      className={
                        snap.manualRotation ? "text-blue-300" : "text-green-300"
                      }
                    >
                      {snap.manualRotation ? "Manual" : "Auto"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Model Rotation */}
              <div className="pb-2 border-b border-gray-700">
                <div className="font-medium mb-2 text-purple-300 text-xs">
                  Rotation
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-gray-400 text-xs">X</div>
                    <div className="text-yellow-300 text-xs">
                      {((snap.modelRotation[0] * 180) / Math.PI).toFixed(0)}°
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-xs">Y</div>
                    <div className="text-yellow-300 text-xs">
                      {((snap.modelRotation[1] * 180) / Math.PI).toFixed(0)}°
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-xs">Z</div>
                    <div className="text-yellow-300 text-xs">
                      {((snap.modelRotation[2] * 180) / Math.PI).toFixed(0)}°
                    </div>
                  </div>
                </div>
              </div>

              {/* Hoodie Debug Controls - Only show for hoodie model */}
              {snap.selectedModel === "hoodie" && (
                <div className="pb-2 border-b border-gray-700">
                  <div className="font-medium mb-2 text-orange-300 text-xs">
                    Hoodie Debug
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Scale:</span>
                        <span className="text-yellow-300 text-xs">
                          {snap.hoodieDebugScale?.toFixed(3) || "0.012"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.001"
                        max="0.1"
                        step="0.001"
                        value={snap.hoodieDebugScale || 0.012}
                        onChange={(e) => {
                          state.hoodieDebugScale = Number(e.target.value);
                        }}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Pos Y:</span>
                        <span className="text-yellow-300 text-xs">
                          {snap.hoodieDebugPosition?.[1]?.toFixed(1) || "-1.5"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-5"
                        max="2"
                        step="0.1"
                        value={snap.hoodieDebugPosition?.[1] || -1.5}
                        onChange={(e) => {
                          const newPos = [
                            ...(snap.hoodieDebugPosition || [0, -1.5, 0]),
                          ];
                          newPos[1] = Number(e.target.value);
                          state.hoodieDebugPosition = newPos;
                        }}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Pos X:</span>
                        <span className="text-yellow-300 text-xs">
                          {snap.hoodieDebugPosition?.[0]?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-3"
                        max="3"
                        step="0.1"
                        value={snap.hoodieDebugPosition?.[0] || 0}
                        onChange={(e) => {
                          const newPos = [
                            ...(snap.hoodieDebugPosition || [0, -1.5, 0]),
                          ];
                          newPos[0] = Number(e.target.value);
                          state.hoodieDebugPosition = newPos;
                        }}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span>Pos Z:</span>
                        <span className="text-yellow-300 text-xs">
                          {snap.hoodieDebugPosition?.[2]?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-3"
                        max="3"
                        step="0.1"
                        value={snap.hoodieDebugPosition?.[2] || 0}
                        onChange={(e) => {
                          const newPos = [
                            ...(snap.hoodieDebugPosition || [0, -1.5, 0]),
                          ];
                          newPos[2] = Number(e.target.value);
                          state.hoodieDebugPosition = newPos;
                        }}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Copy values for production:
                      <br />
                      Scale: {snap.hoodieDebugScale?.toFixed(3)}
                      <br />
                      Position: [
                      {snap.hoodieDebugPosition
                        ?.map((p) => p?.toFixed(1))
                        .join(", ")}
                      ]
                    </div>
                  </div>
                </div>
              )}

              {/* Front Logo Status */}
              <details className="pb-2 border-b border-gray-700">
                <summary className="font-medium text-green-300 text-xs cursor-pointer hover:text-green-200">
                  ▶ Front Logo
                </summary>
                <div className="mt-2 space-y-1 pl-2">
                  <div className="flex justify-between">
                    <span>Visible:</span>
                    <span
                      className={
                        snap.showFrontLogo ? "text-green-400" : "text-red-400"
                      }
                    >
                      {snap.showFrontLogo ? "YES" : "NO"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scale:</span>
                    <span className="text-yellow-300">
                      {snap.frontLogoScale?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <div className="break-all">
                      R: [
                      {snap.frontLogoRotation
                        ?.map((r) => r?.toFixed(1) || "0")
                        .join(",")}
                      ]
                    </div>
                    <div className="break-all">
                      P: [
                      {snap.frontLogoPosition
                        ?.map((p) => p?.toFixed(1) || "0")
                        .join(",")}
                      ]
                    </div>
                  </div>
                </div>
              </details>

              {/* Back Logo Status */}
              <details className="pb-2 border-b border-gray-700">
                <summary className="font-medium text-blue-300 text-xs cursor-pointer hover:text-blue-200">
                  ▶ Back Logo
                </summary>
                <div className="mt-2 space-y-1 pl-2">
                  <div className="flex justify-between">
                    <span>Visible:</span>
                    <span
                      className={
                        snap.showBackLogo ? "text-green-400" : "text-red-400"
                      }
                    >
                      {snap.showBackLogo ? "YES" : "NO"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scale:</span>
                    <span className="text-yellow-300">
                      {snap.backLogoScale?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exists:</span>
                    <span
                      className={
                        snap.backLogoDecal ? "text-green-400" : "text-red-400"
                      }
                    >
                      {snap.backLogoDecal ? "YES" : "NO"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <div className="break-all">
                      R: [
                      {snap.backLogoRotation
                        ?.map((r) => r?.toFixed(1) || "0")
                        .join(",")}
                      ]
                    </div>
                    <div className="break-all">
                      P: [
                      {snap.backLogoPosition
                        ?.map((p) => p?.toFixed(1) || "0")
                        .join(",")}
                      ]
                    </div>
                  </div>
                </div>
              </details>

              {/* Legacy Properties */}
              <div>
                <div className="font-medium mb-2 text-orange-300 text-xs">
                  Legacy
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Scale:</span>
                    <span className="text-yellow-300">
                      {snap.logoScale?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <div className="break-all">
                      R: [
                      {snap.logoRotation
                        ?.map((r) => r?.toFixed(1) || "0")
                        .join(",") || "0,0,0"}
                      ]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnifiedDebugPanel;
