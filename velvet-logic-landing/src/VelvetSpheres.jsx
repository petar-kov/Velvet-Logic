import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

// Global mouse tracking (bypasses pointer events swallowing)
const mousePosGlobal = new THREE.Vector2(-999, -999);
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mousePosGlobal.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosGlobal.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

const VelvetMaterial = () => (
  <meshPhysicalMaterial 
    color="#2a004a" // Rich, deep purple
    emissive="#0a001a" 
    roughness={0.9} 
    metalness={0.05}
    sheen={1.0}
    sheenColor="#e29eff" // Vibrant bright violet-pink fuzz
    sheenRoughness={0.4}
    clearcoat={0.0}
  />
);

const Sphere = ({ pctX, pctY, baseZ, size, phase }) => {
  const meshRef = useRef();
  const vel = useRef(new THREE.Vector3());
  const { camera, viewport } = useThree();
  
  // Initialize with fallback or current viewport
  const currentPos = useRef(new THREE.Vector3(
    pctX * Math.max(viewport.width, 15) * 1.8, 
    pctY * Math.max(viewport.height, 10) * 1.8, 
    baseZ
  ));
  const targetScale = useRef(new THREE.Vector3(size, size, size));
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Base heavy, organic float using dynamic proportional sizing
    const baseX = pctX * viewport.width * 1.8;
    const baseY = pctY * viewport.height * 1.8;
    
    const floatOffset = new THREE.Vector3(
      Math.sin(t * 0.4 + phase) * 0.4,
      Math.cos(t * 0.3 + phase) * 0.5,
      Math.sin(t * 0.5 + phase) * 0.4
    );
    const target = new THREE.Vector3(baseX, baseY, baseZ).add(floatOffset);
    
    // Project mouse coordinates into world space
    let mousePos = new THREE.Vector3(-9999, -9999, -9999);
    if (mousePosGlobal.x !== -999) {
      const mouseVector = new THREE.Vector3(mousePosGlobal.x, mousePosGlobal.y, 0.5);
      mouseVector.unproject(camera);
      const dir = mouseVector.sub(camera.position).normalize();
      const distanceToZ0 = -camera.position.z / dir.z;
      mousePos = camera.position.clone().add(dir.multiplyScalar(distanceToZ0));
    }
    
    const distToMouse = currentPos.current.distanceTo(mousePos);
    let squashFactor = 0;
    
    // 1. Magnetic drift to cursor path
    if (distToMouse < 8) {
      const pullStrength = 0.01 * (8 - distToMouse);
      const pullDir = mousePos.clone().sub(currentPos.current);
      if (pullDir.lengthSq() > 0.001) {
        pullDir.normalize().multiplyScalar(pullStrength);
        vel.current.add(pullDir);
      }
    }
    
    // 2. Soft-repel buffer to prevent exact overlapping and cursor blocking
    if (distToMouse < 3.0) {
      const pushStrength = 0.04 * (3.0 - distToMouse);
      const pushDir = currentPos.current.clone().sub(mousePos);
      if (pushDir.lengthSq() > 0.001) {
        pushDir.normalize().multiplyScalar(pushStrength);
        vel.current.add(pushDir);
      }
      
      // Calculate squash magnitude based on proximity
      squashFactor = (3.0 - distToMouse) * 0.25; // max ~0.75 squash
    }
    
    // 2.5 Text section repel (Prevents balls from interfering with the text)
    // The hero text is centrally aligned and wide. We use an elliptical field.
    const boundsX = 6.5; // Horizontal repel width
    const boundsY = 3.5; // Vertical repel height
    
    const dx = currentPos.current.x;
    // Assuming text center is slightly offset upward based on standard layouts
    const dy = currentPos.current.y - 0.5; 
    
    // Calculate normalized elliptical distance
    const ellipticalDistSq = (dx * dx) / (boundsX * boundsX) + (dy * dy) / (boundsY * boundsY);
    
    if (ellipticalDistSq < 1.0) {
      // Sphere is inside the text safe zone; apply outward push force
      const pushStrength = 0.04 * (1.0 - ellipticalDistSq);
      
      // Normalize push direction so they slide off the text borders rather than getting stuck
      const pushDir = new THREE.Vector3(dx, dy, 0);
      if (pushDir.lengthSq() > 0.001) {
        pushDir.normalize().multiplyScalar(pushStrength);
        vel.current.add(pushDir);
      } else {
        vel.current.y += pushStrength; // fallback if perfectly centered
      }
      
      // Soft-body squash when bouncing off the text field
      const textBounceSquash = (1.0 - Math.sqrt(ellipticalDistSq)) * 0.3;
      squashFactor = Math.max(squashFactor, textBounceSquash);
    }
    
    // 3. Heavy spring back to floating base position
    const springForce = target.clone().sub(currentPos.current).multiplyScalar(0.005);
    vel.current.add(springForce);
    
    // 4. High inertia damping (heavy, expensive motion)
    vel.current.multiplyScalar(0.92); 
    
    currentPos.current.add(vel.current);
    meshRef.current.position.copy(currentPos.current);
    
    // Pseudo soft-body squash & stretch follow-through using velocity
    const speed = vel.current.length();
    const stretchX = Math.min(speed * 1.5, 0.5); // Cap stretch length
    
    // Calculate final scale targets: 
    // Y-axis squashes more natively towards center, X/Z bulge out. Speed adds forward stretch.
    targetScale.current.set(
      size * (1 - squashFactor * 0.5 + stretchX * 0.8), 
      size * (1 - squashFactor - stretchX * 0.2), 
      size * (1 + squashFactor * 0.5 + stretchX * 0.8)
    );
    
    // Low lerp factor for high-inertia follow-through
    meshRef.current.scale.lerp(targetScale.current, 0.08);

    // Organic rotational shift mapping to momentum to showcase the velvet sheen
    meshRef.current.rotation.x += vel.current.y * 0.06 + 0.002;
    meshRef.current.rotation.y += vel.current.x * 0.06 + 0.003;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <VelvetMaterial />
    </mesh>
  );
};

const SpheresField = () => {
  
  const spheres = useMemo(() => {
    const temp = [];
    
    for(let i=0; i<35; i++){
      let pctX = 0, pctY = 0, baseZ = 0;
      let valid = false;
      let attempts = 0;
      
      // Ensure spheres NEVER spawn permanently trapped inside the text box 
      while (!valid && attempts < 100) {
        pctX = (Math.random() - 0.5);
        pctY = (Math.random() - 0.5);
        
        // Approximate average layout bounds for collision verification
        const dx = pctX * 15 * 1.8;
        const dy = (pctY * 10 * 1.8) - 0.5;
        const ellipticalDistSq = (dx * dx) / (7.0 * 7.0) + (dy * dy) / (4.0 * 4.0);
        
        if (ellipticalDistSq > 1.0) valid = true;
        attempts++;
      }
      
      baseZ = (Math.random() - 0.5) * 8 - 4; // varied depth
      const size = Math.random() * 0.8 + 0.4;
      const phase = Math.random() * Math.PI * 2;
      temp.push({ pctX, pctY, baseZ, size, phase, id: i});
    }
    return temp;
  }, []); // Run ONCE, fully immune to resize re-rolls

  return (
    <group>
      {spheres.map((s) => (
        <Sphere key={s.id} {...s} />
      ))}
    </group>
  );
};

export default function VelvetSpheres() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        
        {/* Soft global illumination */}
        <ambientLight intensity={0.5} />
        
        {/* Main top-right key light */}
        <directionalLight 
          position={[8, 15, 8]} 
          intensity={1.8} 
          color="#fbe4ff"
          castShadow 
          shadow-mapSize={[1024, 1024]} 
          shadow-camera-near={0.5}
          shadow-camera-far={40}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-bias={-0.0001}
        />
        
        {/* Fill light */}
        <directionalLight 
          position={[-10, 0, 5]} 
          intensity={0.6} 
          color="#aa77ff"
        />

        {/* Strong rim light for velvet fuzz pop */}
        <spotLight 
          position={[-15, -10, -5]} 
          intensity={8} 
          distance={60}
          angle={0.8}
          penumbra={1} 
          color="#d27dff" 
        />
        
        <SpheresField />
        
        {/* Soft studio environment reflection (Suspended so it doesn't block loading) */}
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
