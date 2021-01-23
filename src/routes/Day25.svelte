<script>

  import { onMount } from "svelte";
  import { map, setupCanvas, dist } from '../utils';
  import SimplexNoise from 'simplex-noise';

  // https://avinayak.github.io/art/2021/01/09/noise-planets.html

  const sNoise = new SimplexNoise();

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  let border = 20;
  let threshold = width/2 - border;
  const noiseMod = 0.0025;

  onMount(() => {
    const ctx = setupCanvas(canvas);

    let frame = requestAnimationFrame(draw);

    const numPoints = 4000;


    let points = [...Array(numPoints)].map((_, i) => {
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
      }
    });


    ctx.lineWidth = '0.5'
    function draw(t) {

      if (points.length > 10) { 
        requestAnimationFrame(draw); 
      } else {
        console.log('ended');
      }

      const drawPoint = s => {
        let {x, y} = s;
        let delta = dist(width/2, height/2, x, y);

        // Remove points if they reach the edge of circle
        if (delta > threshold) return points = points.filter( p => p.id !== s.id);

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.ellipse(0, 0, 1, 2, 0, 0, TAU);
        ctx.fill();
        ctx.stroke();
        ctx.translate(-x, -y);
        ctx.restore();

        // Update x and y based on noise
        let n = sNoise.noise2D(x * noiseMod, y * noiseMod)
        s.x += Math.sin(n * TAU)
        s.y += Math.cos(n * TAU)
      }

      ctx.strokeStyle = 'white';
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      points.forEach(drawPoint)

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
    background: rgb(230, 230, 230)
  }
</style>

<h1 class="page-title">Noise Planet 2</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
