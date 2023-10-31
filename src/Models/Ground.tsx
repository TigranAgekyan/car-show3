import { Plane, MeshReflectorMaterial, useTexture } from '@react-three/drei'
import {RepeatWrapping, LinearSRGBColorSpace, Vector2} from 'three'
import React from 'react'
import { useFrame } from '@react-three/fiber';

export default function Ground() {

    const [normal, rough] = useTexture([
        process.env.PUBLIC_URL + '/assets/textures/ground/normal.jpg',
        process.env.PUBLIC_URL + '/assets/textures/ground/roughness.jpg',
    ]);

    React.useLayoutEffect(()=>{
        [normal,rough].forEach((t)=>{
            console.log(t.wrapT);
            // t.needsUpdate = true;
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(1,1).multiplyScalar(5);
            t.colorSpace = LinearSRGBColorSpace;
        })
    },[normal,rough]);

    useFrame(()=>{
        normal.offset.y -= .0018;
        rough.offset.y -= .0018;
      });

  return (
    <Plane castShadow receiveShadow args={[30,30]} rotation-x={-Math.PI / 2}>
        <MeshReflectorMaterial
        normalMap={normal}
        normalScale={new Vector2(1,1).multiplyScalar(3)}
        roughnessMap={rough}
        envMapIntensity={0}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.5}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
    </Plane>
  )
}
