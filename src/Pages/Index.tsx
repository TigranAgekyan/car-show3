import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {PerspectiveCamera, OrbitControls, CubeCamera, Environment, } from '@react-three/drei'
import {Bloom, ChromaticAberration, DepthOfField, EffectComposer} from '@react-three/postprocessing'
import {Vector2} from 'three'
import Ground from '../Models/Ground';
import CarAlpha from '../Models/CarAlpha';
import Rings from '../Models/Rings';
import Grid from '../Models/Grid'
import Boxes from '../Models/Boxes'

function Scene() {

  return (
    <>
      {/* Camera & Controls */}
      <PerspectiveCamera fov={10} makeDefault position={[20,10,20]}/>
      <OrbitControls target={[0,.5,0]}/>

      {/* Background */}
      <color args={[0,0,0]} attach={'background'}/>
      <fog attach={'fog'} color={[0,0,0]} far={50}/>

      {/* Lighting */}
      <spotLight
          color={[1, 0.25, 0.7]}
          intensity={300}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={400}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture}/>
            <CarAlpha/>
          </>
        )}
      </CubeCamera>

      {/* Geometry */}
      <Ground/>
      <Grid/>
      <Rings/>
      <Boxes/>
      

      {/* Post Process */}
      <EffectComposer>
        <DepthOfField focalLength={.009} target={[0,.5,0]} focusDistance={1} bokehScale={15} width={1080} height={1080}/>
        <Bloom
        width={1080}
        height={1080}
        kernelSize={5}
        intensity={.1}
        />
        <ChromaticAberration
        offset={new Vector2(1,1).multiplyScalar(.0015)}
        />
      </EffectComposer>
    </>
  );
}

export default function Index() {

  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Scene/>
      </Canvas>
    </Suspense>
  )
}
