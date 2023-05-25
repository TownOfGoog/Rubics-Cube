import { mainRotation } from './mainRotation.js';
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




var geometry = new THREE.BoxGeometry(2.9, 0.1, 2.9);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxTop = new THREE.Mesh(geometry, material);
rubicsCubeHitboxTop.visible = false;
rubicsCubeHitboxTop.position.set(0,0,0)
cubeGroup.add(rubicsCubeHitboxTop)


var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxBottom = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxBottom.visible = true;
rubicsCubeHitboxBottom.position.set(0,1.5,0)
cubeGroup.add(rubicsCubeHitboxBottom)

var geometry = new THREE.BoxGeometry(2.8, 2.8, 2.8);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxNorth = new THREE.Mesh(geometry, material);
rubicsCubeHitboxNorth.visible = false;

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxWest = new THREE.Mesh(geometry, material);
rubicsCubeHitboxWest.visible = false;

var geometry = new THREE.BoxGeometry(2.8, 2.8, 2.8);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxSouth = new THREE.Mesh(geometry, material);
rubicsCubeHitboxSouth.visible = false;

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxEast = new THREE.Mesh(geometry, material);
rubicsCubeHitboxEast.visible = false;

















three.scene.add(cubeGroup);



mainRotation(cubeGroup, three)


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 0.2); // Adjust the pixel ratio as needed
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
animate();