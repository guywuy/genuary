<script>

  import { onMount } from "svelte";
  import { map, setupCanvas, roll } from '../utils';
  import SimplexNoise from 'simplex-noise';


  const sNoise = new SimplexNoise();

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  const noiseMod = 1;

  onMount(() => {
    const ctx = setupCanvas(canvas);

    let frame = requestAnimationFrame(draw);

    const numPoints = 70;


    const points = [...Array(numPoints)].map(_ => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        brightness: roll(0, 255),
      }
    });


    // ctx.lineWidth = '2'

    function draw(t) {
      requestAnimationFrame(draw);
      // ctx.clearRect(0, 0, width, height);


      const drawPoint = s => {
        let {x, y} = s;
        let deltaX = Math.abs((width/2 - (x)));
        let deltaY = Math.abs((height/2 - (y)));
        let delta = map(deltaX + deltaY, 0, width, 10, 1);

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.ellipse(0, 0, delta, delta, 0, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = Math.random() > 0.5 ? `rgb(${s.brightness},${s.brightness},${s.brightness})` : 'white';
        ctx.stroke();
        ctx.translate(-x, -y);
        ctx.restore();

        // Update x and y based on noise
        let n = sNoise.noise2D(x * noiseMod, y * noiseMod)
        let newX = s.x + Math.sin(n * TAU);
        let newY = s.y - Math.cos(n * TAU);
        newX <= 0 || newX >= width ? null : s.x = newX;
        newY <= 0 || newY >= height ? null : s.y = newY;
      }

      ctx.fillStyle = 'white';
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

<h1 class="page-title">Noisey Worms</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
