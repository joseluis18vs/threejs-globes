import { useThree, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import ThreeGlobe from 'three-globe';
import { TextureLoader, Vector3, MeshPhongMaterial } from "three";

export default function Globe1() {

    const { scene } = useThree();
    const EarthDayMap = "/textures/earth/8k_earth_daymap.jpg";
    const EarthNormalMap = "/textures/earth/8k_earth_normal_map.jpg";
    const EarthSpecularMap = "/textures/earth/8k_earth_specular_map.jpg";
    const EarthCloudsMap = "/textures/earth/8k_earth_clouds.jpg";

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );


    
    const myData = [
        { lat: 40.7128, lng: -74.0060, value: 100 },
        { lat: 51.5074, lng: -0.1278, value: 200 },
        { lat: 48.8566, lng: 2.3522, value: 150 },
    ];

    useEffect(() => {

        async function addGlobe() {

            if (typeof window !== "undefined") {

                const globeImageUrlPromise = new Promise((resolve) => {
                    const image = new Image();
                    image.src = "/earth_color.jpg";
                    image.onload = () => resolve(image.src); // Resuelve la promesa con la URL de la imagen
                });

                const globeImageUrl = await globeImageUrlPromise;
                // const myGlobe = new ThreeGlobe().globeImageUrl(globeImageUrl).pointsData(myData);
                const myGlobe = new ThreeGlobe().pointsData(myData);

                // Crear materiales para las texturas
                const colorMaterial = new MeshPhongMaterial({ map: colorMap });
                const normalMaterial = new MeshPhongMaterial({ map: normalMap });
                const specularMaterial = new MeshPhongMaterial({ map: specularMap });
                const cloudsMaterial = new MeshPhongMaterial({ map: cloudsMap });

                // Aplicar los materiales a la geometría del globo
                myGlobe.material = [colorMap, normalMap, specularMap, cloudsMap];

                const newScale = new Vector3(1.8, 1.8, 1.8)
                myGlobe.scale.set(newScale.x, newScale.y, newScale.z)
                console.log(myGlobe);
                scene.add(myGlobe);
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
