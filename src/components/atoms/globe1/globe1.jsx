import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader, SphereGeometry, MeshStandardMaterial, TubeGeometry, Vector3, CubicBezierCurve3, CatmullRomCurve3, CubicBezierCurve, BufferGeometry} from "three";
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Html } from "@react-three/drei";

export default function Globe1() {

    const EarthDayMap = "/textures/earth/8k_earth_daymap.jpg";
    const EarthNormalMap = "/textures/earth/8k_earth_normal_map.jpg";
    const EarthSpecularMap = "/textures/earth/8k_earth_specular_map.jpg";
    const EarthCloudsMap = "/textures/earth/8k_earth_clouds.jpg";

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );

    const myData = [
        { lat: 15.5499123, lng: 92.2869496},
        { lat: 12.5499123, lng: 95.2869496},
        { lat: 40.5499123, lng: 175.2869496},
    ];

    const arco = [
        { lat: 15.5499123, lng: 92.2869496, value: 15},
        { lat: 35.4499123, lng: 122.5, value: 15},
        { lat: 40.5499123, lng: 175.2869496, value: 15},
    ];

    const startPoint = arco[0];
    const midPoint = arco[1];
    const endPoint = arco[2];

    const startPointPhi = (90 - startPoint.lat) * (Math.PI / 180);
    const startPointTheta = (180 - startPoint.lng) * (Math.PI / 180);

    const midPointPhi = (90 - midPoint.lat) * (Math.PI / 180);
    const midPointTheta = (180 - midPoint.lng) * (Math.PI / 180);

    const endPointPhi = (90 - endPoint.lat) * (Math.PI / 180);
    const endPointTheta = (180 - endPoint.lng) * (Math.PI / 180);

    const arcInitVector = new Vector3(
        Math.sin(startPointPhi) * Math.cos(startPointTheta),
        Math.cos(startPointPhi),
        Math.sin(startPointPhi) * Math.sin(startPointTheta)
    )

    const arcMedVector = new Vector3(
        Math.sin(midPointPhi) * Math.cos(midPointTheta),
        Math.cos(midPointPhi),
        Math.sin(midPointPhi) * Math.sin(midPointTheta)
    )
    
    const arcEndVector = new Vector3(
        Math.sin(endPointPhi) * Math.cos(endPointTheta),
        Math.cos(endPointPhi),
        Math.sin(endPointPhi) * Math.sin(endPointTheta) 
    );
    
    const curve = new CatmullRomCurve3([arcInitVector, arcMedVector, arcEndVector])

    /**
     * 
     */
    const initialRadius = 0.015
    const pointGeometry = new SphereGeometry(initialRadius);
    const pointMaterial = new MeshStandardMaterial({ color: 0xfc1c45 });
    const [isGrowing, setIsGrowing] = useState(true);
    
    const groupRef = useRef();
    const pointGeometryRef = useRef()
    const markerRef = useRef();

    useFrame(() => {

        const pointGeometry = pointGeometryRef.current;
        const scaleFactor = 1.1;

        if (isGrowing) {
            pointGeometry.radius *= scaleFactor;
        } else {
            pointGeometry.radius /= scaleFactor;
        }

        if (pointGeometry.radius > initialRadius * 1.1) {
            setIsGrowing(false);
        } else if (pointGeometry.radius < initialRadius * 0.9) {
            setIsGrowing(true);
        }

        pointGeometry.elementsNeedUpdate = true;

        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003; // Ajusta la velocidad y dirección de la rotación aquí
            markerRef.current.rotation.z += 0.01
        }
    });

    return(
        <group ref={groupRef}>
            <mesh
            >
                <sphereGeometry  args={[1.004, 32, 32]} />
                <meshStandardMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} />

            </mesh>

            <mesh
                castShadow
                receiveShadow
                position={[0, 0, 0]}
                visible={true}
            >
                <sphereGeometry  args={[1, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial map={colorMap} normalMap={normalMap} />

                <group position={[0.08, 0.23, 1.1]} rotation={[0, 0, 0]} ref={markerRef}>
                    <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
                        <div style={{ position: 'absolute', fontSize: 3, letterSpacing: -0.5, left: 0, top: -4 }}>SAGENSA</div>
                        <FaMapMarkerAlt size={10} style={{ color: 'blue' }} />
                    </Marker>
                </group>

            </mesh>

            {
                myData.map((element, index) => {
                    const phi = (90 - element.lat) * (Math.PI / 180);
                    const theta = (180 - element.lng) * (Math.PI / 180);

                    return (
                        <mesh 
                            key={index}
                            geometry={pointGeometry}
                            material={pointMaterial}
                            position={[Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)]}
                            ref={pointGeometryRef}
                            visible={false}
                        />
                    );
                })
            }

            <mesh
                material={pointMaterial}
                visible={false}
            >
                <tubeBufferGeometry args={[curve, 30, 0.01, 8, false]} />
            </mesh>
        </group>

    );
}

function Marker({ children, ...props }) {
    const ref = useRef()

    const [isOccluded, setOccluded] = useState()
    const [isInRange, setInRange] = useState()
    const isVisible = isInRange && !isOccluded

    const vec = new Vector3()
        useFrame((state) => {
            const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
            if (range !== isInRange) setInRange(range)
        })

        return (
            <group ref={ref}>
            <Html
                // 3D-transform contents
                transform
                // Hide contents "behind" other meshes
                occlude
                // Tells us when contents are occluded (or not)
                onOcclude={setOccluded}
                // We just interpolate the visible state into css opacity and transforms
                style={{ transition: 'all 0.2s', opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.25})` }}
                {...props}>
                {children}
            </Html>
            </group>
        )
}