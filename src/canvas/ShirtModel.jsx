import React from "react";
import Base3DModel from "./BaseModel3D";

/**
 * Shirt3DModel Component
 *
 * 3D T-Shirt garment implementation using the base model framework.
 * Configured specifically for shirt-baked.glb with appropriate geometry and material mappings.
 *
 * Model Specifications:
 * - File: shirt-baked.glb
 * - Primary Geometry: T_Shirt_male
 * - Material: lambert1
 * - Fallback geometries for model variations
 */
const Shirt3DModel = () => {
  return (
    <Base3DModel
      modelPath={import.meta.env.BASE_URL + "shirt-baked.glb"}
      geometryName="T_Shirt_male"
      materialName="lambert1"
      fallbackGeometryNames={["Object_2", "Object_0", "Shirt", "shirt", "Mesh"]}
    />
  );
};

export default Shirt3DModel;
