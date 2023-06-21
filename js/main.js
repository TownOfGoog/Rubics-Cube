import { mainRotation } from './mainRotation.js';
import { sideHandeling } from './cubeSetup.js'
const three = new Threestrap.Bootstrap();


var cubes = [];
var BoundingBoxes = [];
var sideBoundingBoxes = [];



for (var i = 1; i <= 31; i++) {
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
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false });
var rubicsCubeHitboxTop = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxTop.visible = true;
rubicsCubeHitboxTop.position.set(0,1.45,0)
cubeGroup.add(rubicsCubeHitboxTop)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false });
var rubicsCubeHitboxBottom = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxBottom.visible = true;
rubicsCubeHitboxBottom.position.set(0,-1.45,0)
cubeGroup.add(rubicsCubeHitboxBottom)

var geometry = new THREE.BoxGeometry(2.8, 2.8, 0.1);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false });
var rubicsCubeHitboxNorth = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxNorth.visible = true; 
rubicsCubeHitboxNorth.position.set(0,0,-1.45)
cubeGroup.add(rubicsCubeHitboxNorth)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false });
var rubicsCubeHitboxSouth = new THREE.Mesh(geometry, materials);
rubicsCubeHitboxSouth.visible = true;
rubicsCubeHitboxSouth.position.set(0,0,1.45)
cubeGroup.add(rubicsCubeHitboxSouth)

var geometry = new THREE.BoxGeometry(0.1, 2.8, 2.8);
var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false });
var rubicsCubeHitboxWest = new THREE.Mesh(geometry, material);
rubicsCubeHitboxWest.visible = true;
rubicsCubeHitboxWest.position.set(-1.45,0,0)
cubeGroup.add(rubicsCubeHitboxWest)

var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false });
var rubicsCubeHitboxEast = new THREE.Mesh(geometry, material);
rubicsCubeHitboxEast.visible = false;
rubicsCubeHitboxEast.position.set(1.45,0,0)
cubeGroup.add(rubicsCubeHitboxEast)

let BoundingBox1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
let BoundingBox2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
BoundingBox1.setFromObject(cubeGroup.children[31])
BoundingBox2.setFromObject(cubeGroup.children[33])




for (var i = 1; i < 7; i++) {
  let sideBoundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
  sideBoundingBox.setFromObject(cubeGroup.children[i+29]);
  sideBoundingBoxes.push(sideBoundingBox);
}







for (var i = 1; i <= 28; i++) {
  let BoundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
  BoundingBox.setFromObject(cubes[i-1]);
  BoundingBoxes.push(BoundingBox);
}

three.scene.add(cubeGroup);









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



sideHandeling(cubeGroup, three, 30, "y", sideBoundingBoxes, BoundingBoxes)
sideHandeling(cubeGroup, three, 31, "y", sideBoundingBoxes, BoundingBoxes)
sideHandeling(cubeGroup, three, 32, "z", sideBoundingBoxes, BoundingBoxes)
sideHandeling(cubeGroup, three, 33, "z", sideBoundingBoxes, BoundingBoxes)
sideHandeling(cubeGroup, three, 34, "x", sideBoundingBoxes, BoundingBoxes)
sideHandeling(cubeGroup, three, 35, "x", sideBoundingBoxes, BoundingBoxes)

mainRotation(cubeGroup, three)


function animate() {
  renderer.render(three.scene, three.camera);
  requestAnimationFrame(animate);

  // Remove previous wireframe representations
  cubeGroup.traverse(child => {
    if (child.isWireframe) {
      child.parent.remove(child);
    }
  });

  // Create and display bounding box wireframes for cubes
  for (let i = 0; i < 27; i++) {
    const boundingBox = BoundingBoxes[i];
    const cube = cubeGroup.children[i];
    
    // Create a fixed size wireframe geometry
    const fixedSize = new THREE.Vector3(1.0, 1.0, 1.0);
    const wireframeGeometry = new THREE.BoxGeometry().scale(fixedSize.x, fixedSize.y, fixedSize.z);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const boundingBoxWireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    boundingBoxWireframe.isWireframe = true;

    // Set the position of the bounding box wireframe to match the cube's position
    boundingBoxWireframe.position.copy(cube.position);

    // Add the bounding box wireframe as a child to the cube
    cube.add(boundingBoxWireframe);
  }

  // Create and display bounding box wireframes for sides
  for (let i = 0; i < 7; i++) {
    const sideBoundingBox = sideBoundingBoxes[i];
    const sideCube = cubeGroup.children[i + 29];

    // Create a fixed size wireframe geometry
    const fixedSize = new THREE.Vector3(3.1, 3.1, 3.1);
    const wireframeGeometry = new THREE.BoxGeometry().scale(fixedSize.x, fixedSize.y, fixedSize.z);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const sideBoundingBoxWireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    sideBoundingBoxWireframe.isWireframe = true;

    // Set the position of the bounding box wireframe to match the side cube's position
    sideBoundingBoxWireframe.position.copy(sideCube.position);

    // Add the bounding box wireframe as a child to the side cube
    sideCube.add(sideBoundingBoxWireframe);
  }


  // Update bounding box positions

  const sideBoundingBoxToCheck = sideBoundingBoxes[1];

  for (let i = 0; i < BoundingBoxes.length; i++) {
    const boundingBox = BoundingBoxes[i];
  
    if (boundingBox.intersectsBox(sideBoundingBoxToCheck)) {
      // Intersection detected
      //   console.log(`BoundingBox ${i} intersects with sideBoundingBoxes[1]`);
      
      // Perform further actions or modifications based on the intersection
      // For example, you can access the corresponding cube using cubeGroup.children[i]
    }
  }
  
  
  // Example cube position update
}






// Pixel renderer
//requestAnimationFrame(animate());