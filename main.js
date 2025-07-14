import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// ========== Inicialização da cena e do renderizador ==========
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock(); // usado para medir o tempo (util na animação de rotação)

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

// Pivôs para a rotação das naves, faz as naves ficarem girando ao redor da death star
const chasePivot = new THREE.Object3D();
scene.add(chasePivot);

//Objeto 3: TieFighter
let tieFighter;
const tieFighterMtlLoader = new MTLLoader();
const tieFighterObjLoader = new OBJLoader();

const tieFighterPath = './modelos/Tie-Fighter/';
const mtlFile = 'TieFighter1_joined_with_stand.mtl';
const objFile = 'TieFighter1_joined_with_stand.obj';

tieFighterMtlLoader.setPath(tieFighterPath);
tieFighterMtlLoader.load(mtlFile, (materials) => {
    materials.preload();

    tieFighterObjLoader.setMaterials(materials);
    tieFighterObjLoader.setPath(tieFighterPath);
    tieFighterObjLoader.load(objFile, (object) => {
        
        tieFighter = object;

        tieFighter.scale.set(0.5, 0.5, 0.5);

        // Lógica de posicionamento e rotação
        tieFighter.position.set(-20, 0, 0); // Distância do pivô
        tieFighter.rotation.y = 2* Math.PI; // Aponta para a frente

        // Adiciona o TIE Fighter ao seu pivô para movimento orbital
        chasePivot.add(tieFighter);
        
    }, undefined, (error) => {
        console.error('Erro ao carregar o OBJ do TIE Fighter', error);
    });

}, undefined, (error) => {
    console.error('Erro ao carregar o MTL do TIE Fighter', error);
});

// Objeto 4: X-Wing
const xWingMtlLoader = new MTLLoader();
const xWingObjLoader = new OBJLoader();

let xWing;

xWingMtlLoader.setPath('./modelos/x-wing/');
xWingMtlLoader.load('materials.mtl', (materials) => {
    materials.preload();
    xWingObjLoader.setMaterials(materials);
    xWingObjLoader.setPath('./modelos/x-wing/');
    xWingObjLoader.load('model.obj', (object) => {
        xWing = object;

        xWing.scale.set(2, 2, 2); 

        xWing.position.set(-20, 0, -20);
        xWing.rotation.y = Math.PI;
        chasePivot.add(xWing);
        
    }, undefined, (error) => {
        console.error('Erro ao carregar o OBJ da X-Wing', error);
    });
}, undefined, (error) => {
    console.error('Erro ao carregar o MTL da X-Wing', error);
});

// ========== LOOP DE ANIMAÇÃO ==========
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Movimento orbital das naves
    chasePivot.rotation.y = elapsedTime * 0.9; // Velocidade da órbita
    
    renderer.render(scene, camera);
}

animate();