const three = new Threestrap.Bootstrap();
//import * as POSTPROCESSING from 'postprocessing';
import { setCubeColors } from './cubes.js';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




var cubes = [];

for (var i = 1; i <= 28; i++) {
  var geometry = new THREE.BoxGeometry(0.9,0.9, 0.9);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var cube = new THREE.Mesh(geometry, material);
  
  cube.name = "cube" + i;
  cubes.push(cube);
}



setCubeColors(cubes);
three.scene.add(cube);
three.camera.position.set(1, 1, 8);
three.camera.lookAt(new THREE.Vector3(0, 0, 0));

const cubeGroup = new THREE.Group();
let num = 1;


const materials = [
  new THREE.MeshBasicMaterial({ color: 0xf5b7b1 }), // Front face (Pastel pink)
  new THREE.MeshBasicMaterial({ color: 0xb2dbbf }), // Back face (Pastel green)
  new THREE.MeshBasicMaterial({ color: 0xaed6f1 }), // Top face (Pastel blue)
  new THREE.MeshBasicMaterial({ color: 0xf9e79f }), // Bottom face (Pastel yellow)
  new THREE.MeshBasicMaterial({ color: 0xd7bde2 }), // Right face (Pastel purple)
  new THREE.MeshBasicMaterial({ color: 0xffffff })  // Left face (Pastel turquoise)
];



for (var q = -1; q <= 1; q++) {
  for (var w = -1; w <= 1; w++) {
    for (var e = -1; e <= 1; e++) {
      three.scene.add(cubes[num])
      if(q!=2&&w!=2&&e!=2){
      cubes[num].material = materials

      cubes[num].position.set(q,w,e);
      cubeGroup.add(cubes[num])
      num++;
        
      }
    }
  }
  cubes[14].material = material
}

var testgeometry = new THREE.BoxGeometry(0.9,0.9, 0.9);
var testmaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

var edges = new THREE.EdgesGeometry(testgeometry);
edges.scale(0.95, 0.95, 0.95);

var testcube = new THREE.Mesh(testgeometry, testmaterial);

three.scene.add(testcube)
testcube.position.set(0,0,4)








three.scene.add(cubeGroup)







const rotationSpeed = 0.01; 

let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseDown(event) {
  if (event.button === 0) { // Left mouse button
    isDragging = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
  }
}

function onMouseMove(event) {
  if (isDragging) {
    const deltaX = event.clientX - previousMouseX;
    const deltaY = event.clientY - previousMouseY;

    cubeGroup.rotation.y += (deltaX * rotationSpeed);

    // Restrict rotation along the X axis
    const newXRotation = cubeGroup.rotation.x + (deltaY * rotationSpeed);
    cubeGroup.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, newXRotation));

    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
  }
}

function onMouseUp(event) {
  if (event.button === 0) { // Left mouse button
    isDragging = false;
  }
}



//const composer = new POSTPROCESSING.EffectComposer(renderer);
//composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
//
//const pixelationEffect = new POSTPROCESSING.PixelationEffect();
//composer.addPass(pixelationEffect);
//
//pixelationEffect.resolution.set(512, 512);
//pixelationEffect.pixelSize = 8.0;

document.addEventListener("mouseover", mouseOverCube, false)




function animate() {
  requestAnimationFrame(animate);
  composer.render();
}
animate();