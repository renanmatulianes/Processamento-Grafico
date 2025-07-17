# PP2 Processamento Gráfico | Cena Star Wars com Three.js

Esse projeto consiste em uma cena 3D inspirada no universo de Star Wars, implementada usando a biblioteca Three.js. <br>
Na cena, simulamos uma perseguição espacial em que um Caça TIE Fighter persegue uma nave X-Wing, enquanto ambas <br>
Esse projeto consiste em uma cena 3D inspirada no universo de Star Wars, implementada usando a biblioteca Three.js.
Na cena, simulamos uma perseguição espacial em que um Caça TIE Fighter persegue uma nave X-Wing, enquanto ambas
orbitam a Estrela da Morte, que por sua vez, está apontando um "raio de destruição" no planeta Tatooine.

## Preview
![preview](https://github.com/renanmatulianes/Processamento-Grafico/blob/main/assets_readme/cena%20preview.gif)

## Especificação de avaliação
- [x] Visualização de pelo menos um objeto 3D por membro do grupo, redimensionando e posicionando cada objeto individualmente no ambiente virtual;
    - Renan: Caça TLE imperial
    - João: Planeta Tatooine
    - Lucas: Estrela da Morte
    - Juan: X-wing caça da resistência
- [x] Utilização de um shader próprio em um dos objetos (RawShaderMaterial);
    - Feito no objeto Planeta Tatooine
- [x] Definição de pelo menos duas câmera;
- [x] Movimento simples de pelo menos um objeto;
    - Movimento das naves
- [x] Documentar no github (readme principal), contendo: as especificações atendidas do projeto, modo de interação e descrição das principais características implementadas.

## Como Executar

Para executar o projeto é necessário fazer o download do zip do repositório ou cloná-lo usando o comando:

```
git clone https://github.com/renanmatulianes/Processamento-Grafico.git
```

E inicialize em um servidor local com uma das seguintes maneiras:

### Usando Live Server no VS Code

1. Instale a extensão **Live Server** no Visual Studio Code.
2. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.

### Usando Python

```bash
cd caminho/para/o/projeto
python -m http.server
```

Abra seu navegador em `http://localhost:8000`.\
Pressione **C** para alternar entre as câmeras.

---

## Modelos 3D e Objetos

A cena utiliza modelos 3D externos e geometrias criadas via código:

### Estrela da Morte

- Carregada a partir de um arquivo `.obj` com **MTLLoader** e **OBJLoader**.

### Nave X-Wing

- Modelo `.obj` + `.mtl` carregado com **MTLLoader** e **OBJLoader**.
- Posicionada como líder na perseguição.

### Caça TIE Fighter

- Carregado via **MTLLoader** e **OBJLoader**.
- Posicionado atrás da X-Wing para simular perseguição contínua.

### Planeta Tatooine e Shader Customizado

- Criado com `THREE.SphereGeometry()`.
- Material customizado: `THREE.RawShaderMaterial` com shaders:
  - **Vertex Shader**: calcula posição dos vértices, definindo atributos (`position`, `uv`, `normal`) e uniformes (`projectionMatrix`, `modelViewMatrix`) manualmente.
  - **Fragment Shader**: mistura a textura de Tatooine com um tom de vermelho pulsante via função senoidal baseada em `uTime`.
  - **Uniforms**: `uTexture` (textura do planeta) e `uTime` (contador de tempo).

---

## Iluminação

- **DirectionalLight** (`THREE.DirectionalLight()`): luz distante 
- **AmbientLight** (`THREE.AmbientLight()`): ilumina uniformemente todas as áreas, evitando objetos completamente escuros.

---

## Câmeras

Duas câmeras fixas, alternadas pela tecla **C**:

### Câmera de Visão Geral

- `THREE.PerspectiveCamera()` posicionada para visão ampla, capturando todos os objetos da cena.
- Foca no centro da cena com `camera.lookAt(0, 0, 0)`.

![camera1](https://github.com/renanmatulianes/Processamento-Grafico/blob/main/assets_readme/camera1preview.gif)

### Câmera Top-Down

- `THREE.PerspectiveCamera()` posicionada acima da estrela da morte.
- Visão de cima-baixo com `camera.lookAt(0, 0, 0)`.

![camera2](https://github.com/renanmatulianes/Processamento-Grafico/blob/main/assets_readme/camera2preview.gif)

---

## Animação

A animação de perseguição utiliza um **pivot**:

1. Foi criado um objeto `chasePivot` (`THREE.Object3D`) no centro da cena.
2. Adicionados a X-Wing e o TIE Fighter como filhos, em posições diferentes (X-Wing mais perto, TIE Fighter mais distante).
3. No loop de animação, rotacionamos `chasePivot`; as naves orbitam juntas mantendo a formação de perseguição.

---

## Membros

- **João Augusto Luvizotto** – [GitHub](https://github.com/JoaoALuvizotto)
- **Juan Pedro** – [GitHub](https://github.com/JuanP-04)
- **Lucas Pereira Goes** – [GitHub](https://github.com/LucasGoes123)
- **Renan Matulianes Arnaldo** – [GitHub](https://github.com/renanmatulianes)
