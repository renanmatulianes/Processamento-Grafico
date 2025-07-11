import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// ========== Inicialização da cena e do renderizador ==========
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Câmera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

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

// Objeto 1: Estrela da Morte, posicionada na origem (0, 0, 0)
const deathStarMtlLoader = new MTLLoader();
const deathStarObjLoader = new OBJLoader();

deathStarMtlLoader.setPath('./modelos/EstrelaMorte/');
deathStarMtlLoader.load('materials.mtl', (materials) => {
    materials.preload();
    deathStarObjLoader.setMaterials(materials);
    deathStarObjLoader.setPath('./modelos/EstrelaMorte/');
    deathStarObjLoader.load('model.obj', (object) => {
        const deathStarModel = object;
        deathStarModel.scale.set(60, 60, 60); 
        deathStarModel.position.set(0, 0, 0);
        scene.add(deathStarModel);
    }, undefined, (error) => {
        console.error('Erro ao carregar o modelo da Estrela da Morte', error);
    });
}, undefined, (error) => {
    console.error('Erro ao carregar o MTL da Estrela da Morte', error);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();