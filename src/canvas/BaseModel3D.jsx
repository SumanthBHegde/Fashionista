import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import state from "../store";

/**
 * Base3DModel Component
 *
 * Base component for 3D garment models with shared functionality:
 * - Logo decal rendering (front/back)
 * - Interactive rotation controls
 * - Dynamic material handling
 * - Texture loading and management
 * - Mouse/touch interactions
 */
const Base3DModel = ({
  modelPath,
  geometryName,
  materialName = null,
  fallbackGeometryNames = [],
}) => {
  const snap = useSnapshot(state);
  const modelRef = useRef();
  const { camera, gl } = useThree();

  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const rotationRef = useRef({ x: 0, y: 0 });

  const isHoodie = modelPath.includes("hoodie");

  const gltfData = useGLTF(modelPath);
  const nodes = gltfData?.nodes || {};
  const materials = gltfData?.materials || {};

  if (snap.debugMode && modelPath.includes("hoodie")) {
    console.log("🧥 [HOODIE DEBUG] Available nodes:", Object.keys(nodes));
    console.log(
      "🧥 [HOODIE DEBUG] Available materials:",
      Object.keys(materials)
    );
    Object.keys(nodes).forEach((nodeName) => {
      const node = nodes[nodeName];
      if (node.geometry) {
        console.log(`🧥 [HOODIE DEBUG] Node '${nodeName}' has geometry:`, {
          type: node.geometry.type,
          vertices: node.geometry.attributes?.position?.count,
          hasUV: !!node.geometry.attributes?.uv,
        });
      }
    });
  }

  // Load textures
  const frontLogoTexture = useTexture(snap.frontLogoDecal);
  const backLogoTexture = useTexture(snap.backLogoDecal || snap.frontLogoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const materialRef = useRef();

  const getGeometry = () => {
    if (geometryName && nodes[geometryName]?.geometry) {
      if (snap.debugMode) {
        console.log(
          `✅ [${modelPath}] Using primary geometry: '${geometryName}'`
        );
      }
      return nodes[geometryName].geometry;
    }

    for (const name of fallbackGeometryNames) {
      if (nodes[name]?.geometry) {
        if (snap.debugMode) {
          console.log(
            `⚠️ [${modelPath}] Using fallback geometry: '${name}' (primary '${geometryName}' not found)`
          );
        }
        return nodes[name].geometry;
      }
    }

    // Auto-detect first available geometry
    const firstNode = Object.values(nodes).find((node) => node?.geometry);
    if (firstNode) {
      if (snap.debugMode) {
        console.log(
          `🔍 [${modelPath}] Auto-detected geometry: '${firstNode.name}'`
        );
      }
      return firstNode.geometry;
    }

    if (snap.debugMode) {
      console.error(
        `❌ [${modelPath}] No geometry found. Available nodes:`,
        Object.keys(nodes)
      );
    }
    return null;
  };

  // Get material
  const getMaterial = () => {
    // Try specific material name if provided
    if (materialName && materials[materialName]) {
      if (snap.debugMode) {
        console.log(
          `✅ [${modelPath}] Using specified material: '${materialName}'`
        );
      }
      return materials[materialName];
    }

    // Try first available material
    const materialNames = Object.keys(materials);
    if (materialNames.length > 0) {
      if (snap.debugMode) {
        console.log(
          `⚠️ [${modelPath}] Using first available material: '${materialNames[0]}' (specified '${materialName}' not found)`
        );
      }
      return materials[materialNames[0]];
    }

    // Fallback material
    if (snap.debugMode) {
      console.log(`🔧 [${modelPath}] Using fallback MeshStandardMaterial`);
    }
    return new THREE.MeshStandardMaterial({ color: snap.color });
  };

  const geometry = getGeometry();

  // Update material reference
  React.useEffect(() => {
    if (materials) {
      materialRef.current = getMaterial();
    }
  }, [materials]);

  // Animation frame
  useFrame((state, delta) => {
    // Update material color
    if (materialRef.current && materialRef.current.color) {
      easing.dampC(materialRef.current.color, snap.color, 0.25, delta);
    }

    if (modelRef.current) {
      if (snap.manualRotation) {
        // Use manual rotation values from state
        easing.dampE(modelRef.current.rotation, snap.modelRotation, 0.1, delta);
      } else {
        // Use pointer-based rotation
        const targetRotation = [state.pointer.y / 7, -state.pointer.x / 2, 0];
        easing.dampE(modelRef.current.rotation, targetRotation, 0.2, delta);
      }
    }
  });

  // Mouse event handlers
  const handlePointerDown = (event) => {
    if (!snap.manualRotation) return;
    event.stopPropagation();
    mouseRef.current.isDown = true;
    mouseRef.current.x = event.clientX;
    mouseRef.current.y = event.clientY;
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = () => {
    mouseRef.current.isDown = false;
    document.body.style.cursor = snap.manualRotation ? "grab" : "default";
  };

  const handlePointerMove = (event) => {
    if (!snap.manualRotation || !mouseRef.current.isDown) return;

    const deltaX = event.clientX - mouseRef.current.x;
    const deltaY = event.clientY - mouseRef.current.y;

    const sensitivity = 0.005;
    rotationRef.current.y += deltaX * sensitivity;
    rotationRef.current.x -= deltaY * sensitivity;

    rotationRef.current.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, rotationRef.current.x)
    );

    state.modelRotation = [
      rotationRef.current.x,
      rotationRef.current.y,
      snap.modelRotation[2],
    ];

    mouseRef.current.x = event.clientX;
    mouseRef.current.y = event.clientY;
  };

  // Global event listeners
  React.useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (mouseRef.current.isDown) {
        handlePointerUp();
      }
    };

    const handleGlobalPointerMove = (event) => {
      handlePointerMove(event);
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointermove", handleGlobalPointerMove);

    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointermove", handleGlobalPointerMove);
    };
  }, [snap.manualRotation]);

  if (!geometry) {
    if (snap.debugMode) {
      console.error(
        `❌ [${modelPath}] Failed to load geometry - rendering fallback cube`
      );
    }
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (snap.debugMode) {
    console.log(`🎨 [${modelPath}] Rendering 3D model`);
    console.log(
      `🔍 [${modelPath}] Logo state - Front: ${
        snap.showFrontLogo ? "visible" : "hidden"
      }, Back: ${snap.showBackLogo ? "visible" : "hidden"}`
    );
    console.log(
      `🔍 [${modelPath}] Logo positions - Front: [${snap.frontLogoPosition.join(
        ", "
      )}], Back: [${snap.backLogoPosition.join(", ")}]`
    );
    console.log(
      `🔍 [${modelPath}] Logo scales - Front: ${snap.frontLogoScale}, Back: ${snap.backLogoScale}`
    );
  }

  return (
    <mesh
      ref={modelRef}
      castShadow
      geometry={geometry}
      material={materialRef.current || getMaterial()}
      material-roughness={1}
      dispose={null}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={() => {
        if (snap.manualRotation) {
          document.body.style.cursor = "grab";
        }
      }}
      onPointerOut={() => {
        if (!mouseRef.current.isDown) {
          document.body.style.cursor = "default";
        }
      }}
    >
      {/* Cloth full texture */}
      {snap.isFullTexture && (
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
          map={fullTexture}
        />
      )}

      {/* Front Logo */}
      {snap.isLogoTexture && snap.showFrontLogo && !isHoodie && (
        <>
          {snap.debugMode &&
            console.log(
              `🎯 [${modelPath}] Rendering FRONT logo at position:`,
              snap.frontLogoPosition,
              "scale:",
              snap.frontLogoScale
            )}
          <Decal
            position={snap.frontLogoPosition}
            rotation={snap.frontLogoRotation || [0, 0, 0]}
            scale={snap.frontLogoScale || 0.15}
            map={frontLogoTexture}
            {...{
              mapAnisotropy: 16,
              depthTest: false,
              depthWrite: false,
              transparent: true,
              opacity: 1,
              polygonOffset: true,
              polygonOffsetFactor: -10,
              polygonOffsetUnits: -1,
            }}
          />
        </>
      )}

      {/* Back Logo */}
      {snap.isLogoTexture &&
        snap.showBackLogo &&
        snap.backLogoDecal &&
        !isHoodie && (
          <Decal
            position={snap.backLogoPosition}
            rotation={[
              (snap.backLogoRotation || [0, 0, 0])[0],
              (snap.backLogoRotation || [0, 0, 0])[1] + Math.PI,
              (snap.backLogoRotation || [0, 0, 0])[2],
            ]}
            scale={snap.backLogoScale || 0.15}
            map={backLogoTexture}
            {...{
              mapAnisotropy: 16,
              depthTest: false,
              depthWrite: true,
              transparent: true,
              opacity: 1,
            }}
          />
        )}
    </mesh>
  );
};

export default Base3DModel;
