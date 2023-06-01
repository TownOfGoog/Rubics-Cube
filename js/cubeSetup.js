export function sideHandeling(cubeGroup, three, Side, direction) {
  const rotationSpeed = 0.01;

  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  let isCursorOverCube = false; // Flag to track cursor position over the cube
  let isIntersectionDetected = false; // Flag to track intersection detection

  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('mouseup', onMouseUp, false);

  // Left Click Check
  let isLeftClickPressed = false;
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);

  function checkCursorOverCube(event) {
    // Convert mouse coordinates to normalized device coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Perform raycasting to check for intersection with the cube
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, three.camera);

    const intersects = raycaster.intersectObjects([cubeGroup.children[Side]], true);

    return intersects.length > 0;
  }

  function onMouseDown(event) {
    if (event.button === 0) {
      // Left mouse button
      if (checkCursorOverCube(event)) {
        isCursorOverCube = true;
      }
      isDragging = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    }
  }

  function onMouseMove(event) {
    if (isDragging && isCursorOverCube && !isIntersectionDetected) {
      const deltaX = event.clientX - previousMouseX;
      const deltaY = event.clientY - previousMouseY;

      const cube = cubeGroup.children[Side];

      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, three.camera);

      const intersects = [];
      raycaster.intersectObject(cubeGroup, true, intersects);

      const isCursorObstructed = intersects.length > 0 && intersects[0].object !== cube;

      if (!isCursorObstructed) {
        const cube = cubeGroup.children[Side];
        if (direction === 'y'){
        cube.rotation.y += deltaX * rotationSpeed;
        } else if (direction === 'x'){
          cube.rotation.x += deltaX * rotationSpeed;
        } else if (direction === 'z'){
          cube.rotation.z += deltaX * rotationSpeed;
        }
      }
      
       else {
        isIntersectionDetected = true;
        return;
      }

      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    }
  }

  function waitForLeftClickRelease() {
    // Check if left-click is still pressed
    if (isLeftClickPressed) {
      requestAnimationFrame(waitForLeftClickRelease); // Continue waiting
    } else {
      // Left-click is released, reset the intersection flag
      isIntersectionDetected = false;
    }
  }

  function onMouseUp(event) {
    if (event.button === 0) {
      // Left mouse button
      isDragging = false;
      isCursorOverCube = false;
      isLeftClickPressed = false; // Reset the left-click flag when the mouse button is released
      waitForLeftClickRelease(); // Start waiting for left-click release
    }
  }
}
