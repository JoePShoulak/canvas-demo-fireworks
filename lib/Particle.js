import { COLORS } from "./helper.js";

export class Particle {
  static radius = 5;
  static initialSpeed = 10;
  static slowSpeed = 1;
  static gravity = 0.1;
  static deceleration = 0.98;

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
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

    this.draw();
  };

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.beginPath();
    this.c.arc(this.x, this.y, Particle.radius, 0, Math.PI * 2);
    this.c.fill();
  };
}