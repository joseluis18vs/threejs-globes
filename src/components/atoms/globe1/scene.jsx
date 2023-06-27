import { Canvas } from "@react-three/fiber";
import Env from "./environment";

export default function Scene() {
    return(
        <Canvas
            camera={
                {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [0, 0, -3],
                }
            }
        >
            <Env />
        </Canvas>
    )
}