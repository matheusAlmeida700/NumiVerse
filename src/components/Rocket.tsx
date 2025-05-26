import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Rockets = ({ isMobile }) => {
  const { scene, animations } = useGLTF("./spaceship.glb");
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);
  return (
    <group dispose={null}>
      <hemisphereLight intensity={0.5} groundColor="white" />
      <directionalLight
        position={[150, 200, 150]}
        intensity={2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <primitive
        object={scene}
        scale={isMobile ? 8.5 : 8}
        position={[0, -1, 0]}
        rotation={[0, 400, 0]}
      />
    </group>
  );
};

const Rocket = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={window.devicePixelRatio}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Rockets isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default Rocket;
