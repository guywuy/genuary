<script>

  import { onMount } from "svelte";
  import { map, dist } from '../utils';
  import SimplexNoise from 'simplex-noise';

  const threshold = 42;
  let width=600;
  let height=600;

  const sNoise = new SimplexNoise();

  class Particle {
    constructor(x, y, speedX, speedY, rgb, angle = 0) {
      this.id = Math.floor(x + y);
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY;
      this.rgb = rgb;
      this.angle = angle;
    }

    getPos() {
      return {
        x: this.x,
        y: this.y,
      }
    }

    move() {
      this.x = this.x + this.speedX;
      this.y = this.y + this.speedY;

      // Bounce off walls
      if (this.x >= width || this.x <= 0) this.speedX *= -1;
      if (this.y >= height || this.y <= 0) this.speedY *= -1;

      // Change speed slightly based on noise map of canvas
      this.speedX += sNoise.noise2D(this.x, this.y) * 0.05;
      this.speedY += sNoise.noise2D(this.x, this.y) * 0.05;
    }

    render(ctx, points) {
      // If within threshold of other point, draw line there...
      points.forEach(p => {
        let distanceAway = dist(this.x, this.y, p.x, p.y);
        if (this.id !== p.id && distanceAway < threshold) {
          ctx.strokeStyle = `rgba(${this.rgb}, ${map(distanceAway, threshold, 0, 0, 0.5)})`;
          ctx.beginPath();
          ctx.lineTo(this.x, this.y);
          ctx.lineTo(p.x, p.y);
          ctx.closePath();
          ctx.stroke();
        }
      })

      // Draw point circle
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, 3, 3, 0, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = `rgb(${this.rgb})`;
      ctx.fill();
    }
  }

  let canvas;
  let wHeight;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

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
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.move();
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
    position: absolute;
    inset: 0;
  }
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<svelte:window bind:innerWidth={width} bind:innerHeight={height}/>

<h1 class="page-title">Simple Particle System</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
