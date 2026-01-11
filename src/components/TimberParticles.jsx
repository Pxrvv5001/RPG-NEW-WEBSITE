import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Dust = (props) => {
    const ref = useRef();

    // Generate 500 random points inside a sphere
    const sphere = random.inSphere(new Float32Array(1500), { radius: 10 });

    useFrame((state, delta) => {
        // Rotate the entire cloud of particles slowly
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#d97706"  // Brand Orange
                    size={0.03}      // Very small, subtle dots
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};

const TimberParticles = () => {
    return (
        <div className="h-full w-full absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Dust />
            </Canvas>
        </div>
    );
};

export default TimberParticles;