import { Plane, useTexture } from '@react-three/drei'
import {Texture, RepeatWrapping, LinearSRGBColorSpace} from 'three'
import React from 'react'
import { useFrame } from '@react-three/fiber';

export default function Grid() {

    const grid: Texture = useTexture(
        process.env.PUBLIC_URL + '/assets/textures/ground/grid.png'
    );

    React.useLayoutEffect(()=>{
        grid.wrapS = RepeatWrapping;
        grid.wrapT = RepeatWrapping;
        grid.repeat.set(1,1).multiplyScalar(50);
        grid.colorSpace = LinearSRGBColorSpace;
    },[grid]);

    useFrame(()=>{
      grid.offset.y -= .018;
    });

  return (
    <Plane args={[30,30]} rotation-x={-Math.PI / 2} position={[0,0.05,0]}>
        <meshStandardMaterial attach={'material'}
        map={grid}
        alphaMap={grid}
        transparent
        emissive={[1,1,1]}
        />
    </Plane>
  )
}
