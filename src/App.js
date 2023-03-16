import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import "./style.css"
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";
import { Boxes } from "./Boxes";
import {Bloom, ChromaticAberration, EffectComposer} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function CarShow() {
  return (
      <>
          <OrbitControls target={[0, .35, 0]} maxPolarAngle={1.45} />

          <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

          <color args={[0, 0, 0]} attach="background" />

          {/* Cube camera creates 6 cameras */}
          <CubeCamera resolution={256} frames={Infinity}>
              {(texture) => (
                  <>
                      <Environment map={texture} />
                      <Car />
                  </>
              )}
          </CubeCamera>

          <Rings />
          <Boxes />

          <spotLight
              color={[1, 0.25, 0.7]}
              intensity={1.5}
              angle={0.6}
              penumbra={0.5}
              position={[5, 5, 0]}
              castShadow={true}
              shadow-bias={-0.01}
          />
          <spotLight
              color={[0.14, 0.5, 1]}
              intensity={2}
              angle={0.6}
              penumbra={0.5}
              position={[-5, 5, 0]}
              castShadow={true}
              shadow-bias={-0.01}
          />

          <Ground />

          <EffectComposer>
              <Bloom
                  blendFunction={BlendFunction.ADD}
                  intensity={1.3} // The bloom intensity.
                  width={500} // render width
                  height={500} // render height
                  kernelSize={5} // blur kernel size
                  luminanceThreshold={0.95} // luminance threshold. Raise this value to mask out darker elements in the scene.
                  luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
              />
              <ChromaticAberration
                  blendFunction={BlendFunction.NORMAL} // blend mode
                  offset={[0.0005, 0.0012]} // color offset
              />
          </EffectComposer>
      </>
  );
}
function App() {
  return (
   <Suspense fallback={null}>
     <Canvas shadows>
       <CarShow />
     </Canvas>
   </Suspense>
  );
}

export default App;
