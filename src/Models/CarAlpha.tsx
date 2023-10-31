import React from 'react'
import {useGLTF} from '@react-three/drei'
import {Mesh, Object3D} from 'three'
import { useFrame } from '@react-three/fiber';

export default function CarAlpha() {

    const gltf = useGLTF([
        process.env.PUBLIC_URL + '/assets/objects/maserati/scene3.gltf'
    ])[0].scene;
    console.log(gltf);

    React.useEffect(() => {
        gltf.scale.set(1,1,1);
        gltf.position.set(0,0,0);
        gltf.traverse((obj)=>{
            if(obj instanceof Mesh){
                obj.castShadow = true;
                obj.receiveShadow = true;
                obj.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);

    const w_container = gltf.children[0].children[0].children[0].children;
    const wheels: Object3D[] = [w_container[166], w_container[165], w_container[164], w_container[163]];

    useFrame(()=>{
        wheels.forEach((w) => {
            w.children[0].rotation.x += 0.03;
        })
    });

  return (
   <primitive object={gltf}/>
  )
}
