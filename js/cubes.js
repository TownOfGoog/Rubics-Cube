


export function setCubeColors(cubes) {
    // Set colors for each cube
    cubes.forEach((cube, index) => {
      const color = 0x000000;
      cube.material.color.set(color);
    });
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

  
  let material1 = [
    new THREE.MeshBasicMaterial({ color: 0xff3333 }), // Front face
    new THREE.MeshBasicMaterial({ color: 0x33ff33 }), // Back face
    new THREE.MeshBasicMaterial({ color: 0x3333ff }), // Top face
    new THREE.MeshBasicMaterial({ color: 0xffff33 }), // Bottom face
    new THREE.MeshBasicMaterial({ color: 0xff33ff }), // Right face
    new THREE.MeshBasicMaterial({ color: 0x33ffff }) // Left face
  ];

  let material2 = [
    new THREE.MeshBasicMaterial({ color: 0xff3333 }), // Front face
    new THREE.MeshBasicMaterial({ color: 0x33ff33 }), // Back face
    new THREE.MeshBasicMaterial({ color: 0x3333ff }), // Top face
    new THREE.MeshBasicMaterial({ color: 0xffff33 }), // Bottom face
    new THREE.MeshBasicMaterial({ color: 0xff33ff }), // Right face
    new THREE.MeshBasicMaterial({ color: 0x33ffff }) // Left face
  ];


  let material3 = [
    new THREE.MeshBasicMaterial({ color: 0xff3333 }), // Front face
    new THREE.MeshBasicMaterial({ color: 0x33ff33 }), // Back face
    new THREE.MeshBasicMaterial({ color: 0x3333ff }), // Top face
    new THREE.MeshBasicMaterial({ color: 0xffff33 }), // Bottom face
    new THREE.MeshBasicMaterial({ color: 0xff33ff }), // Right face
    new THREE.MeshBasicMaterial({ color: 0x33ffff }) // Left face
  ];