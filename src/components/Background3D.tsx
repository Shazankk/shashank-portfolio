import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NetworkGraph = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 150;
  const maxDistance = 4.5;

  const { positions, colors, linesPositions, linesColors } = useMemo(() => {
    const points = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Generate random nodes
    for (let i = 0; i < particleCount; i++) {
        points[i * 3] = (Math.random() - 0.5) * 30;     
        points[i * 3 + 1] = (Math.random() - 0.5) * 30; 
        points[i * 3 + 2] = (Math.random() - 0.5) * 30; 
        
        // Cyan to Purple colors
        const color = new THREE.Color();
        color.lerpColors(new THREE.Color('#00f1fe'), new THREE.Color('#ac89ff'), Math.random());
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    // Connect nodes that are close to each other
    const linesPositions = [];
    const linesColors = [];
    
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = points[i * 3] - points[j * 3];
        const dy = points[i * 3 + 1] - points[j * 3 + 1];
        const dz = points[i * 3 + 2] - points[j * 3 + 2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        if (dist < maxDistance) {
            linesPositions.push(
                points[i * 3], points[i * 3 + 1], points[i * 3 + 2],
                points[j * 3], points[j * 3 + 1], points[j * 3 + 2]
            );
            // Alpha fading based on distance could be done via shader, but we'll use solid color for simplicity or vertex colors
            linesColors.push(
                colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2],
                colors[j * 3], colors[j * 3 + 1], colors[j * 3 + 2]
            );
        }
      }
    }

    return {
        positions: points,
        colors: colors,
        linesPositions: new Float32Array(linesPositions),
        linesColors: new Float32Array(linesColors)
    };
  }, [particleCount, maxDistance]);

  useFrame((state) => {
    if (pointsRef.current && linesRef.current) {
        // Slow rotation 
        const rotY = state.clock.elapsedTime * 0.05;
        const rotX = state.clock.elapsedTime * 0.02;
        
        pointsRef.current.rotation.y = rotY;
        pointsRef.current.rotation.x = rotX;
        
        linesRef.current.rotation.y = rotY;
        linesRef.current.rotation.x = rotX;

        // Parallax effect based on mouse movement
        const targetX = (state.pointer.x * 3);
        const targetY = (state.pointer.y * 3);
        
        pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
        pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
        
        linesRef.current.position.x += (targetX - linesRef.current.position.x) * 0.02;
        linesRef.current.position.y += (targetY - linesRef.current.position.y) * 0.02;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
      </points>
      
      <lineSegments ref={linesRef}>
          <bufferGeometry>
             <bufferAttribute attach="attributes-position" args={[linesPositions, 3]} />
             <bufferAttribute attach="attributes-color" args={[linesColors, 3]} />
          </bufferGeometry>
          <lineBasicMaterial vertexColors transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
};

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <fog attach="fog" args={['#070d1f', 10, 40]} />
        <NetworkGraph />
      </Canvas>
    </div>
  );
}
