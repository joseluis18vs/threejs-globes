import { useEffect, useRef } from "react"
import * as THREE from "three"
import ThreeGlobe from 'three-globe';

export default function Globe1(){

    const globeContainerRef = useRef(null)
    const myGlobe = new ThreeGlobe().globeImageUrl("/earth_color.jpg")
    const myScene = new THREE.Scene();
    
    myScene.add(myGlobe);  /// Sgregar estp a la scena de fiber con el hook useThree de reac-three-fiber

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    useEffect(() => {

        globeContainerRef.current.appendChild(renderer.domElement)

        return () => {
            globeContainerRef.current.removeChild(renderer.domElement)
        };
    }, [])

    return(
        <div className="globe-container" ref={globeContainerRef}>
        </div>
    )
}