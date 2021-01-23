<script>

  import { onMount } from "svelte";
  import { map, setupCanvas } from '../utils';
  import SimplexNoise from 'simplex-noise';

  // https://avinayak.github.io/art/2021/01/09/noise-planets.html

  const sNoise = new SimplexNoise();

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  let duration = 600;


  onMount(() => {
    const ctx = setupCanvas(canvas);

    let frame = requestAnimationFrame(draw);

    const numPoints = 100;


    const points = [...Array(numPoints)].map(_ => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
      }
    });


    ctx.lineWidth = '2'
    function draw(t) {
      requestAnimationFrame(draw);
      // ctx.clearRect(0, 0, width, height);


      const drawPoint = s => {
        let {x, y} = s;
        let deltaX = Math.abs((width/2 - (x)));
        let deltaY = Math.abs((height/2 - (y)));
        let delta = map(deltaX + deltaY, 0, width, 6, 1);

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.ellipse(0, 0, delta, delta, 0, 0, TAU);
        ctx.fill();
        ctx.stroke();
        ctx.translate(-x, -y);
        ctx.restore();

        // Update x and y based on noise
        let n = sNoise.noise2D(x, y)
        s.x += Math.sin(n * TAU)
        s.y += Math.cos(n * TAU)
      }

      ctx.strokeStyle = 'white';
      ctx.fillStyle = 'black';
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

<h1 class="page-title">Noise Planet</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
