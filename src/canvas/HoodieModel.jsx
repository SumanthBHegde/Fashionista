import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";
import Base3DModel from "./BaseModel3D";

/**
 * Hoodie3DModel Component - Handles decals outside scaled group
 */
const Hoodie3DModel = () => {
  const snap = useSnapshot(state);

  const frontLogoTexture = useTexture(snap.frontLogoDecal);
  const backLogoTexture = useTexture(snap.backLogoDecal || snap.frontLogoDecal);

  const scale = 0.009;
  const position = [0, -1.2, 0];

  return (
    <>
      <group scale={[scale, scale, scale]} position={position}>
        <Base3DModel
          modelPath={import.meta.env.BASE_URL + "hoodie.glb"}
          geometryName="Hoodie_FABRIC_3_FRONT_1850_0"
          materialName="FABRIC_3_FRONT_1850"
          fallbackGeometryNames={[
            "hoodie_single",
            "Hoodie001",
            "Mesh",
            "hoodie",
            "Object",
            "Cube",
          ]}
        />
      </group>
    </>
  );
};

// Preload the model
useGLTF.preload(import.meta.env.BASE_URL + "hoodie.glb");

export default Hoodie3DModel;
