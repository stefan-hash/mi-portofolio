const canvas = document.getElementById("tetrisCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1800;
canvas.height = 160;

const blockSize = 5;

const frase1 = "Stefan Liviu Goran";
const frase2 = "Tecnico Superior en Desarrollo";
const frase3 = "de Aplicaciones Multiplataforma";

const speed = 0.4; // Velocidad de caída de los bloques

// 💡 Mapa de letras con bloques tipo Tetris
const alphabet = {
  A: [
    [1,0],
    [0,1],[2,1],
    [0,2],[1,2],[2,2],
    [0,3],[2,3],
    [0,4],[2,4]
  ],
  C: [[1,0],[0,1],[0,2],[0,3],[1,4]],
  D: [
    [0,0],[1,0],[2,1],
    [2,2],[2,3],[1,4],[0,4],
    [0,1],[0,2],[0,3]
  ],
  E: [[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[0,3],[0,4],[1,4],[2,4]],
  F: [[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[0,3],[0,4]],
  G: [[1,0],[0,1],[0,2],[0,3],[1,4],[2,2],[2,3]],
  I: [[0,0],[1,0],[2,0],[1,1],[1,2],[1,3],[0,4],[1,4],[2,4]],
  L: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,4]],
  N: [
    [0,0],[0,1],[0,2],[0,3],[0,4],
    [1,1],[2,2],[3,3],
    [4,0],[4,1],[4,2],[4,3],[4,4]
  ],
  O: [[1,0],[0,1],[2,1],[0,2],[2,2],[0,3],[2,3],[1,4]],
  P: [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[0,3],[0,4]],
  R: [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[0,3],[2,3],[2,4]],
  S: [[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[2,2],[2,3],[0,4],[1,4],[2,4]],
  T: [[0,0],[1,0],[2,0],[1,1],[1,2],[1,3],[1,4]],
  U: [[0,0],[0,1],[0,2],[0,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4]],
  V: [
  [0,0],[0,1],[0,2],
  [1,3],
  [2,4],
  [3,3],
  [4,0],[4,1],[4,2]
],
  M: [
    [0,0],[0,1],[0,2],[0,3],[0,4],
    [1,1],[2,2],
    [3,1],[4,0],[4,1],[4,2],[4,3],[4,4]
  ],
  X: [[0,0],[2,0],[1,1],[0,2],[2,2]],
  Y: [[0,0],[2,0],[1,1],[1,2],[1,3]],
  Z: [[0,0],[1,0],[2,0],[1,1],[1,2],[0,2],[1,3],[1,4],[2,4]],
  G: [[1,0],[0,1],[0,2],[0,3],[1,4],[2,2],[2,3]],
  " ": []
};

class Block {
  constructor(x, y, delay, color = "#64ffda") {
    this.x = x;
    this.y = -3;
    this.targetY = y;
    this.color = color;
    this.delay = delay;
    this.timer = 0;
  }

  update() {
    if (this.timer < this.delay) {
      this.timer++;
    } else if (this.y < this.targetY) {
      this.y += speed;
    }
  }

  draw() {
    if (this.timer >= this.delay) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x * blockSize, this.y * blockSize, blockSize - 1, blockSize - 1);
    }
  }
}

function buildWord(word, startX, startY) {
  const spacing = 6;
  let delayOffset = 0;
  let blocks = [];

  for (let i = 0; i < word.length; i++) {
    const char = word[i].toUpperCase();
    if (char === " ") {
      startX += spacing;
      continue;
    }
    const letterMap = alphabet[char];
    if (!letterMap) continue;

    letterMap.forEach((pos, idx) => {
      const x = startX + pos[0];
      const y = startY + pos[1];
      blocks.push(new Block(x, y, delayOffset + idx * 5));
    });

    startX += spacing;
    delayOffset += 50;
  }

  return blocks;
}

const blocks = [
  ...buildWord(frase1, 2, 2),
  ...buildWord(frase2, 2, 9),
  ...buildWord(frase3, 2, 16)
];

// 🔁 Loop animado
function animateLetter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(block => {
    block.update();
    block.draw();
  });
  requestAnimationFrame(animateLetter);
}
animateLetter();