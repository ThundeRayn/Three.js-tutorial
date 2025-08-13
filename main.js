import * as THREE from 'three';
import './style.css';
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// Scene
const scene = new THREE.Scene();

//create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
    color: '#ffffffff'
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//light
const light = new THREE.PointLight(0xffffff, 50, 50, 2);
light.position.set(7, 7, 7); //light.position.set(x, y, z)
scene.add(light);
// ambientLight
const ambientLight = new THREE.AmbientLight(0xfff0f0, 0.1);
//scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 0, 20); //camera.position.set(x, y, z)
scene.add(camera);

// Renderer
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true,
    physicallyCorrectLights: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true; //smoother drag overflow
controls.enablePan = false; //dont' want users to drag geometry around
controls.enableZoom = false; //disable zoom in and out
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resize (responsive)
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// loop
const loop = () =>{
    //animation if you want
    //light.position.x +=0.2; 
    //this depends on the computer fps, so it will act differntly depend on computers
    //we would want the same speed, for different settings

    controls.update();
    //re-render
    renderer.render(scene,camera);
    window.requestAnimationFrame(loop);
}
loop();

//timeline magic!
const t1 = gsap.timeline({defaults: {duration:1}});
t1.fromTo(sphere.scale, {z:0,x:0,y:0},{z:1,x:1,y:1}); //sphere pushing it animation
t1.fromTo("header",{y:'-100%'}, {y:"0%"}); //header coming down
t1.fromTo("title",{opacity:0},{opacity:1}); //title showing up