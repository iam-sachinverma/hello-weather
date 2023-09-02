import React, { useEffect } from "react";
import * as THREE from "three";

import Texture1 from "../../img/texture/earthmap1k.jpg";
import Texture2 from "../../img/texture/earthbump.jpg";
import Texture3 from "../../img/texture/earthCloud.png";

const MyThreeJSComponent = () => {
  let scene;
  let camera;
  let renderer;
  let earthmesh;
  let cloudmesh;

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

    renderer.autoClear = false;
    renderer.setClearColor(0x00000, 0.0);

    // create earthgeometry
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

    // set ambientlight
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    // set point light
    const pointerlight = new THREE.PointLight(0xffffff, 0.9);

    // set light position
    pointerlight.position.set(5, 3, 5);
    scene.add(pointerlight);

    // cloud
    const cloudgeometry = new THREE.SphereGeometry(0.63, 32, 32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(`${Texture3}`),
      transparent: true,
    });

    cloudmesh = new THREE.Mesh(cloudgeometry, cloudmaterial);

    scene.add(cloudmesh);

    const animate = () => {
      requestAnimationFrame(animate);
      earthmesh.rotation.y -= 0.0015;
      cloudmesh.rotation.y += 0.0015;

      render();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup Three.js objects on unmount
    return () => {
      // Remove the Earth and cloud meshes from the scene
      scene.remove(earthmesh);
      scene.remove(cloudmesh);

      // Dispose of their geometry and materials to release resources
      earthmesh.geometry.dispose();
      earthmesh.material.dispose();
      cloudmesh.geometry.dispose();
      cloudmesh.material.dispose();

      // Dispose of the renderer and its resources
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
