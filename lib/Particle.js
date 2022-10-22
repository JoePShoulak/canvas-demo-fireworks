import { COLORS, hexToRGBA } from "./helper.js";

export class Particle {
  static radius = 5;
  static initialSpeed = 7;
  static slowSpeed = 3;
  static gravity = 0.1;
  static deceleration = 0.985;
  static fadeRate = 0.005;

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 1;
    /** @type {CanvasRenderingContext2D} */
    this.c = context;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const startingAngle = Math.random() * Math.PI * 2;
    this.velocity = {
      x: Math.random() * Math.cos(startingAngle) * Particle.initialSpeed,
      y: Math.random() * Math.sin(startingAngle) * Particle.initialSpeed,
    };
  }

  get speed() {
    return Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
  }

  get onscreen() {
    return (
      this.x - Particle.radius > 0 &&
      this.y - Particle.radius > 0 &&
      this.x + Particle.radius < innerWidth &&
      this.y + Particle.radius < innerHeight
    );
  }

  update = () => {
    this.velocity.y += Particle.gravity;

    if (this.speed > Particle.slowSpeed) {
      this.velocity.x *= Particle.deceleration;
      this.velocity.y *= Particle.deceleration;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.opacity -= Particle.fadeRate;

    this.draw();
  };

  draw = () => {
    this.c.fillStyle = hexToRGBA(this.color, this.opacity);
    this.c.beginPath();
    this.c.arc(this.x, this.y, Particle.radius, 0, Math.PI * 2);
    this.c.fill();
  };
}
