import { OrbitControls } from "@react-three/drei";
import Globe1 from "./globe1";

export default function Env() {

    return(
        <>
                    {/* Controls */}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

            {/* Lights */}
            {/* <directionalLight
                castShadow
                shadow-mapSize={2048}
                shadow-bias={-0.001}
                position={[1, 2, 3]}
                intensity={0.7}
            /> */}

            <ambientLight intensity={25} />

            {/* 3D Models */}
            <Globe1 />
        </>
    )
}