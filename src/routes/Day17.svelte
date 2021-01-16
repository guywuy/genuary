<script>

  import { onMount } from "svelte";
  import { map, dist } from '../utils';
  import SimplexNoise from 'simplex-noise';

  const threshold = 42;

  const sNoise = new SimplexNoise();

  class Particle {
    constructor(x, y, speedX, speedY, rgb, angle = 0) {
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
      this.x = this.x + this.speedX + (sNoise.noise2D(this.x, this.y) * 3);
      this.y = this.y + this.speedY + (sNoise.noise2D(this.x, this.y) * 3);

      // Bounce off walls
      if (this.x >= canvasWidth || this.x <= 0) this.speedX *= -1;
      if (this.y >= canvasHeight || this.y <= 0) this.speedY *= -1;
    }

    render(ctx, points) {
      // If within threshold of other point, draw line there...
      points.forEach(p => {
        let distanceAway = dist(this.x, this.y, p.x, p.y);
        if (this.id !== p.id && distanceAway < threshold) {
          ctx.strokeStyle = `rgba(${this.rgb}, ${map(distanceAway, threshold, 0, 0, 0.05)})`;
          ctx.beginPath();
          ctx.lineTo(this.x, this.y);
          let diffX = p.x - this.x;
          ctx.lineTo(this.x + diffX, this.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      })

      // Draw point circle
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = `rgba(${this.rgb}, 0.2)`;
      ctx.fill();
    }
  }

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const numParticles = 100;


    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillStyle = 'rgba(0 0 0 1)';

    // Create particles positioned around a circle
    const r = width/4;
    const particles = [];
    for (let index = 0; index < numParticles; index++) {
      let theta = ((Math.PI*2) / numParticles);
      let angle = (theta * index);
      let rPosX = width/2 +  (r * Math.cos(angle));
      let rPosY = height/2 + (r * Math.sin(angle));

      particles[index] = new Particle(rPosX, rPosY,  (Math.random() - 0.5) * 0.75, (Math.random() - 0.5) * 0.75, `${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}`);
    }

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
