precision highp float;

//Variável que recebemos do nosso código JavaScript.
uniform sampler2D uTexture; // Textura original
uniform float uTime;        // Tempo para a animação

//Variáveis que recebemos do Vertex Shader.
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  //Pegando a cor original da textura do planeta.
  vec3 originalColor = texture2D(uTexture, vUv).rgb;

  //A cor alvo da pulsação (vermelho).
  vec3 pulseColor = vec3(1.0, 0.0, 0.0); // R=1, G=0, B=0

  //Calculando o fator de pulsação. 
  //    A função seno nos dá um valor que oscila suavemente entre -1 e 1.
  //    Vamos mapeá-lo para oscilar entre 0 e 1 para usar na mistura.
  //    uTime * 3.0 fará a pulsação um pouco mais rápida.
  float pulseAmount = 0.5 + 0.5 * sin(uTime * 3.0); // Oscila entre 0.0 e 1.0

  // 4. Misturando a cor original com a cor vermelha.
  //    - Se pulseAmount for 0, a cor será 100% originalColor.
  //    - Se pulseAmount for 1, a cor será 100% pulseColor.
  //    - Se pulseAmount for 0.5, será uma mistura 50/50 das duas.
  vec3 finalColor = mix(originalColor, pulseColor, pulseAmount);

  // 5. Definimos a cor final do pixel.
  gl_FragColor = vec4(finalColor, 1.0);
}