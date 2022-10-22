import { resizeCanvas } from "./lib/helper.js";
import { Particle } from "./lib/Particle.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const particlesPerFirework = 400;
const bgAlpha = 0.1;

let particles = [];
const fireWorks = ({ x, y }) => {
  for (let i = 0; i < particlesPerFirework; i++) {
    particles.push(new Particle(c, x, y));
  }
};

const setup = () => {
  particles = [];
  resizeCanvas(canvas);
};

const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle) => {
    particle.update();
  });

  particles = particles.filter((particle) => particle.onscreen);
};

addEventListener("click", (event) => {
  fireWorks(event);
});

addEventListener("resize", () => {
  resizeCanvas(canvas);
});

addEventListener("contextmenu", (event) => {
  event.preventDefault();

  setup();
});

setup();
animate();
