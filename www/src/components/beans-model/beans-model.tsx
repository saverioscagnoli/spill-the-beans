import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const BeansModel = () => {
  const beans = useGLTF("/beans/scene.gltf", true);

  return (
    <div className="w-1/3 h-80 self-center">
      <Canvas orthographic camera={{ position: [0, 10, 15], zoom: 130 }}>
        <Suspense fallback={null}>
          <OrbitControls autoRotate enablePan={false} />
          <directionalLight intensity={5} position={[0, 10, 0]} />
          <directionalLight intensity={10} position={[0, -10, 0]} />
          <directionalLight intensity={10} position={[-10, 0, 0]} />
          <directionalLight intensity={10} position={[10, 0, 0]} />
          <mesh position={[0, 0, 0]}>
            <primitive object={beans.scene}></primitive>
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
};

export { BeansModel };
