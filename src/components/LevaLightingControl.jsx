import { useControls } from "leva";

const LevaLightingControl = () => {
  const lighting = useControls("Lighting", {
    ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
    keyLightIntensity: { value: 1.0, min: 0, max: 3, step: 0.1 },
    fillLightIntensity: { value: 0.6, min: 0, max: 2, step: 0.1 },
    backLightIntensity: { value: 0.8, min: 0, max: 2, step: 0.1 },
    sideLightIntensity: { value: 0.4, min: 0, max: 2, step: 0.1 },
    topLightIntensity: { value: 0.3, min: 0, max: 2, step: 0.1 },
    environmentPreset: {
      value: "sunset",
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
      ],
    },
  });

  return (
    <>
      <ambientLight intensity={lighting.ambientIntensity} />

      <directionalLight
        position={[10, 10, 10]}
        intensity={lighting.keyLightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        position={[-8, 8, 8]}
        intensity={lighting.fillLightIntensity}
      />

      {/* Back light - illuminates the back of the shirt */}
      <directionalLight
        position={[0, 8, -10]}
        intensity={lighting.backLightIntensity}
      />

      <directionalLight
        position={[15, 5, 0]}
        intensity={lighting.sideLightIntensity}
      />
      <directionalLight
        position={[-15, 5, 0]}
        intensity={lighting.sideLightIntensity}
      />

      <pointLight
        position={[0, 15, 0]}
        intensity={lighting.topLightIntensity}
        decay={2}
        distance={50}
      />

      <spotLight
        position={[10, 10, -10]}
        target-position={[0, 0, 0]}
        intensity={0.3}
        angle={Math.PI / 4}
        penumbra={0.5}
      />
      <spotLight
        position={[-10, 10, -10]}
        target-position={[0, 0, 0]}
        intensity={0.3}
        angle={Math.PI / 4}
        penumbra={0.5}
      />
    </>
  );
};

export default LevaLightingControl;
