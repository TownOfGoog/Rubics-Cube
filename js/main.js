import { mainRotation } from './mainRotation.js';
import { sideHandeling } from './cubeSetup.js'
const three = new Threestrap.Bootstrap();


var cubes = [];

for (var i = 1; i <= 28; i++) {
  var geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var cube = new THREE.Mesh(geometry, material);

  cube.name = "cube" + i;
  cubes.push(cube);
}
var geometry = new THREE.BoxGeometry(2.8, 2.8, 2.8);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitbox = new THREE.Mesh(geometry, material);
rubicsCubeHitbox.visible = false;


three.scene.add(cubes);

three.camera.position.set(0, 0, 8);
three.camera.lookAt(new THREE.Vector3(0, 0, 0));

const cubeGroup = new THREE.Group();
let num = 1;

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xffd3cf }), // Front face (Bright pink)
  new THREE.MeshBasicMaterial({ color: 0xc5f7dc }), // Back face (Bright green)
  new THREE.MeshBasicMaterial({ color: 0xb9e9ff }), // Top face (Bright blue)
  new THREE.MeshBasicMaterial({ color: 0xfff8bf }), // Bottom face (Bright yellow)
  new THREE.MeshBasicMaterial({ color: 0xe3c1f0 }), // Right face (Bright purple)
  new THREE.MeshBasicMaterial({ color: 0xffffff })  // Left face (Pastel turquoise)
];

for (var q = -1; q <= 1; q++) {
  for (var w = -1; w <= 1; w++) {
    for (var e = -1; e <= 1; e++) {
      three.scene.add(cubes[num])
      if (q != 2 && w != 2 && e != 2) {
        cubes[num].material = materials

        cubes[num].position.set(q, w, e);
        cubeGroup.add(cubes[num])
        num++;

      }
    }
  }
}
cubeGroup.add(rubicsCubeHitbox)

const lineGeometryZ = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -1.5, 0), // Start point
  new THREE.Vector3(0, 1.5, 0)   // End point
]);

const lineGeometryY = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-1.5, 0, 0), // Start point
  new THREE.Vector3(1.5, 0, 0)   // End point
]);

const lineGeometryX = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, -1.5), // Start point
  new THREE.Vector3(0, 0, 1.5)   // End point
]);
// Create the line material
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

const artificialZAxis = new THREE.Line(lineGeometryZ, lineMaterial);
const artificialXAxis = new THREE.Line(lineGeometryX, lineMaterial);
const artificialYAxis = new THREE.Line(lineGeometryY, lineMaterial);


cubeGroup.add(...[artificialZAxis, artificialXAxis, artificialYAxis]);





var geometry = new THREE.BoxGeometry(2.9, 0.1, 2.9);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxTop = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxTop.visible = true;
rubicsCubeHitboxTop.position.set(0,1.45,0)
cubeGroup.add(rubicsCubeHitboxTop)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxBottom = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxBottom.visible = true;
rubicsCubeHitboxBottom.position.set(0,-1.45,0)
cubeGroup.add(rubicsCubeHitboxBottom)

var geometry = new THREE.BoxGeometry(2.9, 2.9, 0.1);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxNorth = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxNorth.visible = false;
rubicsCubeHitboxNorth.position.set(0,0,-1.45)
cubeGroup.add(rubicsCubeHitboxNorth)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxSouth = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxSouth.visible = false;
rubicsCubeHitboxSouth.position.set(0,0,1.45)
cubeGroup.add(rubicsCubeHitboxSouth)

var geometry = new THREE.BoxGeometry(0.1, 2.9, 2.9);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxWest = new THREE.Mesh(geometry, material);
rubicsCubeHitboxWest.visible = false;
rubicsCubeHitboxWest.position.set(-1.45,0,0)
cubeGroup.add(rubicsCubeHitboxWest)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxEast = new THREE.Mesh(geometry, material);
rubicsCubeHitboxEast.visible = false;
rubicsCubeHitboxEast.position.set(1.45,0,0)
cubeGroup.add(rubicsCubeHitboxEast)

















three.scene.add(cubeGroup);

cubeGroup.children[32].position.set(0, 4, 0);


sideHandeling(cubeGroup, three, 32)

mainRotation(cubeGroup, three)


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 0.15); // Adjust the pixel ratio as needed
document.body.appendChild(renderer.domElement);

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  three.camera.aspect = window.innerWidth / window.innerHeight;
  three.camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(three.scene, three.camera);
}



// Pixel boy
animate();