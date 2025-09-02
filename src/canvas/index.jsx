import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { Suspense } from "react";

import GarmentModelSelector from "./ModelSelector";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import LevaLightingControl from "../components/LevaLightingControl";
import state from "../store";

const CanvasModel = () => {
  const snap = useSnapshot(state);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }} // fov = field of view
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      {/* Professional 360-degree lighting system - only show in debug mode */}
      {snap.debugMode && <LevaLightingControl />}
      <Environment
        preset="sunset"
        background={false}
        environmentIntensity={0.4}
      />

      <CameraRig>
        <Backdrop />
        <Center>
          <Suspense
            fallback={
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="gray" />
              </mesh>
            }
          >
            <GarmentModelSelector />
          </Suspense>
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
