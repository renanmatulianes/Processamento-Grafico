import * as THREE from 'three';

// ========== Inicialização da cena e do renderizador ==========
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Câmera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Verde
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();