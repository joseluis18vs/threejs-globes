import { Canvas } from "@react-three/fiber";
import Env from "./environment";
import { Suspense } from "react";

export default function Scene() {
    return(
        <Canvas
            camera={
                {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    /* position: [5, 0, -5], */
                }
            }
        >
            <Suspense fallback={null}>
                <Env />
            </Suspense>
        </Canvas>
    )
}