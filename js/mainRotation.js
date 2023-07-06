

export function mainRotation(cubeGroup, three) {
  const rotationSpeed = 0.01;

let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

let isCursorOverCube = false; // Flag to track cursor position over the cube

function checkCursorOverCube(event) {
// Convert mouse coordinates to normalized device coordinates
const mouse = new THREE.Vector2();
mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// Perform raycasting to check for intersection with the cube
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, three.camera);

const intersects = raycaster.intersectObjects(cubeGroup.children);

return intersects.length > 0;
}

function onMouseDown(event) {
if (event.button === 0) { // Left mouse button
  if (!checkCursorOverCube(event)) {
    isDragging = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
  }
}
}

function onMouseMove(event) {
if (isDragging) {
  const deltaX = event.clientX - previousMouseX;
  const deltaY = event.clientY - previousMouseY;

  cubeGroup.rotation.y += (deltaX * rotationSpeed);

  // Restrict rotation along the X axis
  const newXRotation = cubeGroup.rotation.x + (deltaY * rotationSpeed);
  cubeGroup.rotation.x = Math.max(-Math.PI / 3.5, Math.min(Math.PI / 3.5, newXRotation));

  previousMouseX = event.clientX;
  previousMouseY = event.clientY;
}
}

function onMouseUp(event) {
if (event.button === 0) { // Left mouse button
  isDragging = false;
}
}
}

function getRandomColor() {
  // Generate a random color
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}