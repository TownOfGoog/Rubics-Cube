import { mainRotation } from './mainRotation.js';
import { sideHandeling } from './cubeSetup.js'
const three = new Threestrap.Bootstrap();


var cubes = [];
var BoundingBoxes = [];

for (var i = 1; i <= 28; i++) {
  var geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var cube = new THREE.Mesh(geometry, material);

  cube.name = "cube" + i;
  cubes.push(cube);
}

console.log(BoundingBoxes)


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


for (var i = 1; i <= 28; i++) {
  let BoundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
  BoundingBox.setFromObject(cubes[i-1]);
  BoundingBoxes.push(BoundingBox);
}

const lineGeometryZ = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -1.5, 0), 
  new THREE.Vector3(0, 1.5, 0)   
]);

const lineGeometryY = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-1.5, 0, 0), 
  new THREE.Vector3(1.5, 0, 0)   
]);

const lineGeometryX = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, -1.5), 
  new THREE.Vector3(0, 0, 1.5)   
]);

// Create the line material
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

const artificialZAxis = new THREE.Line(lineGeometryZ, lineMaterial);
const artificialXAxis = new THREE.Line(lineGeometryX, lineMaterial);
const artificialYAxis = new THREE.Line(lineGeometryY, lineMaterial);


cubeGroup.add(...[artificialZAxis, artificialXAxis, artificialYAxis]);


var geometry = new THREE.BoxGeometry(2.8, 0.1, 2.8);
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

var geometry = new THREE.BoxGeometry(2.8, 2.8, 0.1);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxNorth = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxNorth.visible = true;
rubicsCubeHitboxNorth.position.set(0,0,-1.45)
cubeGroup.add(rubicsCubeHitboxNorth)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var rubicsCubeHitboxSouth = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxSouth.visible = true;
rubicsCubeHitboxSouth.position.set(0,0,1.45)
cubeGroup.add(rubicsCubeHitboxSouth)

var geometry = new THREE.BoxGeometry(0.1, 2.8, 2.8);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1, visible: true });
var rubicsCubeHitboxWest = new THREE.Mesh(geometry, material);
rubicsCubeHitboxWest.visible = true;
rubicsCubeHitboxWest.position.set(-1.45,0,0)
cubeGroup.add(rubicsCubeHitboxWest)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1, visible: true });
var rubicsCubeHitboxEast = new THREE.Mesh(geometry, material);
rubicsCubeHitboxEast.visible = true;
rubicsCubeHitboxEast.position.set(1.45,0,0)
cubeGroup.add(rubicsCubeHitboxEast)

let BoundingBox1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
let BoundingBox2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
BoundingBox1.setFromObject(cubeGroup.children[31])
BoundingBox2.setFromObject(cubeGroup.children[33])











const sideGroup = new THREE.Group();
sideGroup.add(cubeGroup.children[1].clone());
sideGroup.add(cubeGroup.children[0].clone());
sideGroup.add(cubeGroup.children[2].clone());


three.scene.add(cubeGroup);




sideHandeling(cubeGroup, three, 30, "y")
sideHandeling(cubeGroup, three, 31, "y")
sideHandeling(cubeGroup, three, 32, "z")
sideHandeling(cubeGroup, three, 33, "z")
sideHandeling(cubeGroup, three, 34, "x")
sideHandeling(cubeGroup, three, 35, "x")

mainRotation(cubeGroup, three)




const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 0.15); // Adjust the pixel ratio
document.body.appendChild(renderer.domElement);

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  three.camera.aspect = window.innerWidth / window.innerHeight;
  three.camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);




function animate() {
  renderer.render(three.scene, three.camera);
  requestAnimationFrame(animate);

  

// Remove the loop that creates additional bounding box wireframes
for (var i = 1; i <= 27; i++) {
  // Update the bounding box
  BoundingBoxes[i - 1].copy(cubeGroup.children[i - 1].geometry.boundingBox).applyMatrix4(cubeGroup.children[i - 1].matrixWorld);

  // Remove previous wireframe representations
  if (cubeGroup.children[i - 1].children.length > 0) {
    const previousWireframes = cubeGroup.children[i - 1].children.filter(child => child.isWireframe);
    cubeGroup.children[i - 1].remove(...previousWireframes);
  }

  // Create a fixed size wireframe geometry
  const fixedSize = new THREE.Vector3(1.0, 1.0, 1.0); // Set your desired fixed size here
  const wireframeGeometry = new THREE.BoxGeometry().scale(fixedSize.x, fixedSize.y, fixedSize.z);
  const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const boundingBoxWireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
  boundingBoxWireframe.isWireframe = true;

  // Set the position of the bounding box wireframe to match the object's position
  boundingBoxWireframe.position.copy(cubeGroup.children[i - 1].position);

  // Add the bounding box wireframe as a child to the object
  cubeGroup.children[i - 1].add(boundingBoxWireframe);
}



BoundingBox1.add(boundingBoxWireframe)



  BoundingBox1.setFromObject(cubeGroup.children[31])
  BoundingBox2.setFromObject(cubeGroup.children[33])
  BoundingBoxes[22].copy( cubeGroup.children[22].geometry.boundingBox ).applyMatrix4( cubeGroup.children[22].matrixWorld );
  BoundingBox1.copy( cubeGroup.children[31].geometry.boundingBox ).applyMatrix4( cubeGroup.children[31].matrixWorld );
  console.log(BoundingBox1)
  if(BoundingBoxes[22].intersectsBox(BoundingBox1)){
    console.log("intersecting jojojojojo")
  } 
  cubeGroup.children[11].position.set(0,4,0)
  
}





// Pixel renderer
requestAnimationFrame(animate());