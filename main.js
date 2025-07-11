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

// ========== LUZES ==========
// Luz ambiente para iluminar a cena toda de forma suave
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Luz direcional para simular um sol distante
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(100, 100, 50);
scene.add(directionalLight);

// ========== FUNDO ESTRELADO ==========
const textureLoader = new THREE.TextureLoader();
const spaceTexture = textureLoader.load('./texturas/space.jpg');
scene.background = spaceTexture;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();