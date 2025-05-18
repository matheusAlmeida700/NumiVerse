import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { planets } from "@/data/planetsData";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const SolarSystem3D = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    planetObjects: Record<string, THREE.Mesh>;
    animationId?: number;
  } | null>(null);

  const handlePlanetClick = (planetId: string) => {
    const planet = planets.find((p) => p.id === planetId);

    if (planet && !planet.unlocked) {
      toast({
        title: "Planeta Bloqueado",
        description: `Complete os planetas anteriores para desbloquear ${planet.name}!`,
        variant: "destructive",
      });
      return;
    }

    setActiveId(activeId === planetId ? null : planetId);
  };

  const handleExplore = (planetId: string) => {
    navigate(`/planet/${planetId}`);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a18);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(0, 250, 700);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xfff9c4, 3, 2000, 1);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 200;
    controls.maxDistance = 1500;
    controls.enablePan = false;

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      sizeAttenuation: true,
    });

    const starsCount = 5000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 3000;
      positions[i3 + 1] = (Math.random() - 0.5) * 3000;
      positions[i3 + 2] = (Math.random() - 0.5) * 3000;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    const textureLoader = new THREE.TextureLoader();

    const planetObjects: Record<string, THREE.Mesh> = {};

    const sunTexture = textureLoader.load("/textures/sun-map.jpg");
    const sunGeometry = new THREE.SphereGeometry(50, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
      map: sunTexture,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    planetObjects[planets[0].id] = sun;

    const sunGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: textureLoader.load("/textures/circle.png"),
        color: 0xffee00,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    );
    sunGlow.scale.set(150, 150, 1);
    sun.add(sunGlow);

    const orbits: THREE.Line[] = [];

    planets.slice(1).forEach((planet, index) => {
      const orbitRadius = 120 + (index + 1) * 80;
      const orbitGeometry = new THREE.BufferGeometry();
      const orbitPoints = [];

      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        orbitPoints.push(
          new THREE.Vector3(
            Math.cos(angle) * orbitRadius,
            0,
            Math.sin(angle) * orbitRadius
          )
        );
      }

      orbitGeometry.setFromPoints(orbitPoints);
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0.3,
      });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
      orbits.push(orbit);

      let planetTexture;
      switch (planet.id) {
        case "aritmetica":
          planetTexture = textureLoader.load("/textures/earthMoon.png");
          break;
        case "estatistica":
          planetTexture = textureLoader.load("/textures/earth-map-1.jpg");
          break;
        case "funcoes":
          planetTexture = textureLoader.load("/textures/saturn-map.jpg");
          break;
        case "geometria":
          planetTexture = textureLoader.load("/textures/uranus-map.jpg");
          break;
        default:
          planetTexture = textureLoader.load("/textures/mercury-map.jpg");
      }

      const planetSize = planet.size / 3 + 10;
      const planetGeometry = new THREE.SphereGeometry(planetSize, 32, 32);
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture,
        metalness: 0.1,
        roughness: 0.8,
      });

      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

      // Calculate initial position on orbit
      const angle = index * ((2 * Math.PI) / (planets.length - 1));
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      planetMesh.position.set(x, 0, z);

      scene.add(planetMesh);

      planetObjects[planet.id] = planetMesh;

      if (planet.id === "funcoes") {
        const ringTexture = textureLoader.load("/textures/saturn-rings.jpg");
        const ringGeometry = new THREE.RingGeometry(
          planetSize + 5,
          planetSize + 20,
          64
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
          map: ringTexture,
          color: 0xffffff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        planetMesh.add(ring);
      }

      // Add glow effect based on planet's unlocked state
      const glowColor = planet.unlocked
        ? new THREE.Color(
            planet.glowColor.replace("bg-", "").replace("/40", "")
          )
        : new THREE.Color(0x333333);
      const glowIntensity = planet.unlocked ? 0.4 : 0.1;

      const glowSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: textureLoader.load("/textures/circle.png"),
          color: glowColor,
          transparent: true,
          blending: THREE.AdditiveBlending,
          opacity: glowIntensity,
        })
      );

      glowSprite.scale.set(planetSize * 4, planetSize * 4, 1);
      planetMesh.add(glowSprite);
    });

    // Set up raycaster for planet interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      const planetMeshes = Object.values(planetObjects);
      const intersects = raycaster.intersectObjects(planetMeshes);

      if (intersects.length > 0) {
        // Find which planet was clicked
        for (const [id, mesh] of Object.entries(planetObjects)) {
          if (mesh === intersects[0].object) {
            handlePlanetClick(id);
            break;
          }
        }
      }
    };

    // Add click event listener
    renderer.domElement.addEventListener("click", onMouseClick);

    // Handle window resize
    const handleResize = () => {
      if (!sceneRef.current) return;

      const { camera, renderer } = sceneRef.current;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;

      const animationId = requestAnimationFrame(animate);

      // Rotate sun
      sun.rotation.y += 0.001;

      // Animate planets if no planet is currently selected
      if (!activeId) {
        planets.slice(1).forEach((planet, index) => {
          const planetMesh = planetObjects[planet.id];
          if (!planetMesh) return;

          // Calculate orbit speed - convert from our data to reasonable rotation speed
          const speed = (1 / planet.orbitSpeed) * 0.01;

          // Calculate orbit radius
          const orbitRadius = 120 + (index + 1) * 80;

          // Get current angle from position
          let angle = Math.atan2(planetMesh.position.z, planetMesh.position.x);

          angle += speed;

          planetMesh.position.x = Math.cos(angle) * orbitRadius;
          planetMesh.position.z = Math.sin(angle) * orbitRadius;

          planetMesh.rotation.y += 0.005;
        });
      }

      controls.update();

      renderer.render(scene, camera);

      sceneRef.current.animationId = animationId;
    };

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      planetObjects,
    };

    animate();

    return () => {
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }

      renderer.domElement.removeEventListener("click", onMouseClick);
      window.removeEventListener("resize", handleResize);

      Object.values(planetObjects).forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      orbits.forEach((orbit) => {
        orbit.geometry.dispose();
      });

      renderer.dispose();

      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    if (activeId && sceneRef.current.planetObjects[activeId]) {
      const targetPlanet = sceneRef.current.planetObjects[activeId];

      const startPosition = sceneRef.current.camera.position.clone();

      const planetPosition = targetPlanet.position.clone();
      const distance =
        targetPlanet === sceneRef.current.planetObjects[planets[0].id]
          ? 200
          : 150;

      const targetPosition = new THREE.Vector3(
        planetPosition.x + distance,
        50,
        planetPosition.z + distance
      );

      let lerpFactor = 0;
      const lerpSpeed = 0.02;

      const animateCamera = () => {
        if (!sceneRef.current) return;

        if (lerpFactor < 1) {
          lerpFactor += lerpSpeed;

          const easedLerpFactor = 1 - Math.pow(1 - lerpFactor, 3);

          sceneRef.current.camera.position.lerpVectors(
            startPosition,
            targetPosition,
            easedLerpFactor
          );

          sceneRef.current.controls.target.copy(planetPosition);
          sceneRef.current.controls.update();

          requestAnimationFrame(animateCamera);
        }
      };

      animateCamera();
    }
  }, [activeId]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0" ref={canvasRef}></div>

      {activeId && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/70 backdrop-blur-md border border-white/10 rounded-xl p-6 animate-fade-in z-20">
          {planets
            .filter((p) => p.id === activeId)
            .map((planet) => (
              <div
                key={`details-${planet.id}`}
                className="flex flex-col items-center"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${planet.color} rounded-full flex items-center justify-center`}
                  >
                    {planet.icon && planet.icon()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {planet.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-sm text-white/80 text-center">
                  {planet.description}
                </p>

                <Button
                  onClick={() => handleExplore(planet.id)}
                  className="mt-5 w-full bg-space-purple hover:bg-space-purple/80"
                >
                  Explorar {planet.name}
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SolarSystem3D;
