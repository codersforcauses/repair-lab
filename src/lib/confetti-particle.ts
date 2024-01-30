import { randBetween } from "@/lib/random";
const COLOURS = ["#f50f26", "#e310a7", "#1744e6", "#20e36e", "#e2fa2f"];

export default class ConfettiParticle {
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  rotation: number;
  x: number;
  y: number;
  velocity: number;
  color: string;

  constructor(context: CanvasRenderingContext2D | null) {
    this.ctx = context;
    this.width = randBetween(10, 15);
    this.height = randBetween(4, 15);
    this.rotation = randBetween(0, 360);
    this.x = randBetween(0, window.innerWidth);
    this.y = randBetween(-300, 0);
    this.velocity = randBetween(2, 3);
    this.color = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
  draw() {
    if (!this.ctx) return;

    // update position and rotation
    this.rotation += 0.01;
    this.y += this.velocity;

    // draw
    const rotate = (x: number, y: number) => ({
      x:
        (x - this.x) * Math.cos(this.rotation) -
        (y - this.y) * Math.sin(this.rotation) +
        this.x,
      y:
        (x - this.x) * Math.sin(this.rotation) +
        (y - this.y) * Math.cos(this.rotation) +
        this.y
    });

    // Draws rotated squares around a center point
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    const tl = rotate(this.x - this.width / 2, this.y - this.height / 2);
    const tr = rotate(this.x + this.width / 2, this.y - this.height / 2);
    const br = rotate(this.x + this.width / 2, this.y + this.height / 2);
    const bl = rotate(this.x - this.width / 2, this.y + this.height / 2);

    this.ctx.moveTo(tl.x, tl.y);
    this.ctx.lineTo(tr.x, tr.y);
    this.ctx.lineTo(br.x, br.y);
    this.ctx.lineTo(bl.x, bl.y);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
