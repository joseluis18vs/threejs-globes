import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector3 } from "three"

export default function Globe1() {

    const { scene } = useThree();

    const myData = [
        { lat: 40.7128, lng: -74.0060, value: 100 },
        { lat: 51.5074, lng: -0.1278, value: 200 },
        { lat: 48.8566, lng: 2.3522, value: 150 },
        // Agrega más objetos según tus necesidades
    ];

    useEffect(() => {
        async function addGlobe() {
            if (typeof window !== "undefined") {
                const ThreeGlobe = (await import('three-globe')).default;
                const myGlobe = new ThreeGlobe().globeImageUrl("/earth_color.jpg").pointsData(myData);
                scene.add(myGlobe);
                const secondChild = scene.children[1];
                /* const newScale = new Vector3(0.1, 0.1, 0.1);
                secondChild.scale.set(newScale.x, newScale.y, newScale.z); */
                console.log(secondChild);
            }
        }

        addGlobe();

        return () => {
            scene.children.forEach(child => {
                if (child instanceof ThreeGlobe) {
                    scene.remove(child);
                }
            });
        };
    }, [scene]);

    return null;
}
