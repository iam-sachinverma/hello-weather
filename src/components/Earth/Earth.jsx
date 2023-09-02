import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Texture1 from "../../img/texture/earthmap1k.jpg";
import Texture2 from "../../img/texture/earthbump.jpg";
import Texture3 from "../../img/texture/earthCloud.png";

const MyThreeJSComponent = () => {
  let scene;
  let camera;
  let renderer;
  let earthmesh;
  let cloudmesh;
  let markerMesh;
  let controls;

  useEffect(() => {
    const canvas = document.querySelector("#c");

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;

    renderer.autoClear = false;
    renderer.setClearColor(0x00000, 0.0);

    const earthgeometry = new THREE.SphereGeometry(0.6, 32, 32);

    const earthmaterial = new THREE.MeshPhongMaterial({
      roughness: 1,
      metalness: 0,
      map: new THREE.TextureLoader().load(`${Texture1}`),
      bumpMap: new THREE.TextureLoader().load(`${Texture2}`),
      bumpScale: 0.3,
    });

    earthmesh = new THREE.Mesh(earthgeometry, earthmaterial);
    scene.add(earthmesh);

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    const pointerlight = new THREE.PointLight(0xffffff, 0.9);
    pointerlight.position.set(5, 3, 5);
    scene.add(pointerlight);

    const cloudgeometry = new THREE.SphereGeometry(0.63, 32, 32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(`${Texture3}`),
      transparent: true,
    });

    cloudmesh = new THREE.Mesh(cloudgeometry, cloudmaterial);
    scene.add(cloudmesh);

    // Function to calculate 3D position from latitude and longitude
    function latLongToVector3(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      return new THREE.Vector3(x, y, z);
    }

    // Coordinates
    const parisLatitude = 20.5937;
    const parisLongitude = 78.9629;
    const markerRadius = 0.7;

    const markerPosition = latLongToVector3(
      parisLatitude,
      parisLongitude,
      markerRadius
    );

    const markerGeometry = new THREE.SphereGeometry(0.02, 32, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
    markerMesh.position.copy(markerPosition);
    scene.add(markerMesh);

    // Set camera lookAt the marker's position
    camera.lookAt(markerPosition);

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();
      render();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      scene.remove(earthmesh);
      scene.remove(cloudmesh);
      scene.remove(markerMesh);

      earthmesh.geometry.dispose();
      earthmesh.material.dispose();
      cloudmesh.geometry.dispose();
      cloudmesh.material.dispose();
      markerMesh.geometry.dispose();
      markerMesh.material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas
        id="c"
        style={{
          maxWidth: "800px",
          maxHeight: "400px",
        }}
      />
    </div>
  );
};

export default MyThreeJSComponent;
