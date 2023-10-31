import React from 'react'
import {useFrame} from '@react-three/fiber'
import {Color, Material, Mesh, MeshStandardMaterial} from 'three'

export default function () {

    const itemsRef = React.useRef<any>([]);

    useFrame((state) => {
        const elapsed = state.clock.getElapsedTime();
        for(let i=0; i<itemsRef.current.length; i++){
            let mesh: Mesh = itemsRef.current[i];

            let z = (i-7) * 3.5 + ((elapsed * 0.32) % 3.5 * 2);
            mesh.position.set(0,0,-z);

            let dist = Math.abs(mesh.position.z);
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

            let colorScale = 1;
            if(dist > 2){
                colorScale = 1-(Math.min(dist,12) - 2) / 10;
            }
            colorScale *= 0.5;

            if(i%2 == 0){
                mesh.material = new MeshStandardMaterial({emissive: new Color(6,0.15,0.7).multiplyScalar(colorScale *25)});
            }else{
                mesh.material = new MeshStandardMaterial({emissive: new Color(0.1,0.7,3).multiplyScalar(colorScale *25)});
            }
        }
    })

  return (
    <>
        {[0,0,0,0,0,0,0,0,0,0,0,0,0].map((v, i) => (
            <mesh castShadow receiveShadow position={[0,0,0]} key={i} ref={(el) => (itemsRef.current[i] = el)}>
                <torusGeometry args={[3.5, .05, 16, 100]}/>
                <meshStandardMaterial color={[0,0,0]}/>
            </mesh>
        ))}
    </>
  )
}