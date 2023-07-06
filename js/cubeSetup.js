export function sideHandeling(cubeGroup, three, Side, direction, sideHitboxes, segmentHitboxes) {
  const rotationSpeed = 0.01;

  let intersectionGroup = new THREE.Group();
  let followGroup = new THREE.Group(); // Group to hold the objects that follow the rotating object

  function checkIntersections(cubeGroup, Side) {
    intersectionGroup.clear(); // Clear the intersection group

    for (let i = 0; i < 26; i++) {
      let cube = cubeGroup.children[i];

      // Check for intersection between cube and cube32
      let intersection = checkIntersection(cube, cubeGroup.children[Side]);
      if (intersection) {
        intersectionGroup.add(cube); // Add intersecting objects to the intersection group
      }
    }

    intersectionGroup.add(cubeGroup.children[Side]); // Add cubeGroup.children[32] to the intersection group

    // Add the intersecting objects to the follow group
    intersectionGroup.children.forEach((object) => {
      followGroup.add(object);
    });
  }

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
      const hitbox = sideHitboxes[Side-30];
  
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, three.camera);
  
      let intersects = [];
      raycaster.intersectObject(cubeGroup, true, intersects);
  
      const isCursorObstructed = intersects.length > 0 && intersects[0].object !== cube;
  
      const sideBoundingBoxToCheck = hitbox
      let intersections = [];



      //PROBLEM PROBLEM PROBLEM PROBLEM

      for (let i = 0; i < 27; i++) {
          let cube = cubeGroup.children[i];
          let boundingBox = cube.geometry.boundingBox.clone().applyMatrix4(cube.matrixWorld);
        
          if (cube !== cubeGroup.children[Side] && boundingBox.intersectsBox(sideBoundingBoxToCheck)) {
            // Intersection detected
            intersections.push(i);
          }
        
      }
      //PROBLEM PROBLEM PROBLEM PROBLEM

      
      console.log("Intersecting BoundingBoxes:", intersections);


if (!isCursorObstructed) {
  if (direction === 'y') {
    cube.rotation.y += deltaX * rotationSpeed;
  } else if (direction === 'x') {
    cube.rotation.x += deltaX * rotationSpeed;
  } else if (direction === 'z') {
    cube.rotation.z += deltaX * rotationSpeed;
  }

  for (let i = 0; i < intersections.length; i++) {
    let segment = cubeGroup.children[intersections[i]];

    // Calculate the offset between the segment and the cube
    let offset = new THREE.Vector3().subVectors(segment.position, cube.position);

    if (direction === 'y') {
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), deltaX * rotationSpeed);
      segment.rotateY(deltaX * rotationSpeed);
    } else if (direction === 'x') {
      offset.applyAxisAngle(new THREE.Vector3(1, 0, 0), deltaX * rotationSpeed);
      segment.rotateX(deltaX * rotationSpeed);
    } else if (direction === 'z') {
      offset.applyAxisAngle(new THREE.Vector3(0, 0, 1), deltaX * rotationSpeed);
      segment.rotateZ(deltaX * rotationSpeed);
    }

    // Set the new position for the segment
    segment.position.copy(cube.position).add(offset);
  }
} else {
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
