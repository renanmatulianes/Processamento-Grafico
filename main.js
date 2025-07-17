import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// ========== Inicialização da cena e do renderizador ==========
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock(); // usado para medir o tempo (util na animação de rotação)

// ========== CÂMERAS ==========

// Câmera 1: Visão geral da cena
const mainCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
mainCamera.position.set(-100, 80, 120);
// Faz a câmera olhar para o centro da cena (coordenadas da origem)
mainCamera.lookAt(0, 0, 0);


// Câmera 2: Visão de cima
const topDownCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
topDownCamera.position.set(20, 60, 0); 
topDownCamera.lookAt(0, 0, 0);

let activeCamera = mainCamera; // Inicia com a câmera de visão geral

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


// --- Objeto 2: Planeta Tatooine com Shader Próprio ---
let tatooine, tatooineMaterial;
const tatooineTexture = textureLoader.load('./texturas/tatooine.jpg');
Promise.all([
    fetch('shaders/tatooine.vert.glsl').then(res => res.text()),
    fetch('shaders/tatooine.frag.glsl').then(res => res.text())
]).then(([vertexShader, fragmentShader]) => {
    tatooineMaterial = new THREE.RawShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: { uTime: { value: 0.0 }, uTexture: { value: tatooineTexture } }
    });
    const tatooineGeometry = new THREE.SphereGeometry(15, 64, 64);
    tatooine = new THREE.Mesh(tatooineGeometry, tatooineMaterial);
    tatooine.position.set(0, 0, 100);
    scene.add(tatooine);
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

// ========== Ajustar a cena conforme tamanho da tela ==========
window.addEventListener('resize', () => {
    // Atualiza o aspect ratio da câmera e o tamanho do renderer
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.updateProjectionMatrix();
    topDownCamera.aspect = window.innerWidth / window.innerHeight;
    topDownCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Troca de câmera ao pressionar a tecla 'C'
window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'c') {
        if (activeCamera === mainCamera) {
            activeCamera = topDownCamera; // Troca para a câmera de cima
        } else {
            activeCamera = mainCamera; // Volta para a câmera principal
        }
    }
});

// ========== LOOP DE ANIMAÇÃO ==========
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Movimento orbital das naves
    chasePivot.rotation.y = elapsedTime * 0.9; // Velocidade da órbita

    // Atualiza o shader de Tatooine com o tempo
    if (tatooineMaterial) {
        tatooineMaterial.uniforms.uTime.value = elapsedTime;
    }
    
    renderer.render(scene, activeCamera);
}

animate();