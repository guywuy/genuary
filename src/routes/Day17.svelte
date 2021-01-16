<script>

  import { onMount } from "svelte";
  import { map, dist } from '../utils';
  import SimplexNoise from 'simplex-noise';

  const threshold = 62;

  const sNoise = new SimplexNoise();

  class Particle {
    constructor(x, y, speedX, speedY, rgb, size, angle = 0) {
      this.id = Math.floor(x + y);
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.rgb = rgb;
      this.size = Math.random() * 2;
      this.angle = angle;
    }

    getPos() {
      return {
        x: this.x,
        y: this.y,
      }
    }

    move(canvasWidth, canvasHeight) {
      this.x = this.x + this.speedX;
      this.y = this.y + this.speedY;

      // Bounce off walls
      if (this.x >= canvasWidth || this.x <= 0) this.speedX *= -1;
      if (this.y >= canvasHeight || this.y <= 0) this.speedY *= -1;

      // Change speed slightly based on noise map of canvas
      this.speedX -= sNoise.noise2D(this.x, this.y) * 0.25;
      this.speedY += sNoise.noise2D(this.x, this.y) * 0.25;
    }

    render(ctx, points) {
      // If within threshold of other point, draw line there...
      points.forEach(p => {
        let distanceAway = dist(this.x, this.y, p.x, p.y);
        if (this.id !== p.id && distanceAway < threshold) {
          ctx.strokeStyle = `rgba(${this.rgb}, ${map(distanceAway, threshold, 0, 0, 0.2)})`;
          ctx.beginPath();
          ctx.lineTo(this.x, this.y);
          let diffX = p.x - this.x;
          let diffY = p.y - this.y;
          ctx.lineTo(this.x + diffX, this.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      })

      // Draw point circle
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = `rgb(${this.rgb})`;
      ctx.fill();
    }
  }

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const numParticles = 80;


    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillStyle = 'rgba(0 0 0 1)';

    // Create particles with random positions and speeds
    const particles = [];
    for (let index = 0; index < numParticles; index++) {
      particles[index] = new Particle(Math.random() * width, Math.random() * height, (Math.random() * 2) - 1, (Math.random() * 2) - 1, `${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}`);
    }

    // console.log(particles);

    function draw(t) {
      requestAnimationFrame(draw);
      // ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.move(width, height);
        p.render(ctx, particles);
      })
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });

</script>

<style>
  .canvasWrap {
    position: relative;
  }
  canvas {
    max-width: 100%;
    max-height: 100%;
    border: 1px solid sandybrown;
  }
</style>

<h1 class="page-title">Particle Trails</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={600} height={600} />
</div>
