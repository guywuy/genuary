<script>
  import { onMount } from "svelte";
  import { map, degToRad } from '../utils';
  import SimplexNoise from 'simplex-noise';

  let simplex = new SimplexNoise();
  // console.log(simplex);

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;
    const spacer = width/30;


    function draw(t) {
      // requestAnimationFrame(draw);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      for (let x = 0; x <= width; x+=spacer) {
        for (let y = 0; y <= width; y+=spacer) {
          const mod = simplex.noise2D(x, y);
          ctx.save();
          ctx.translate(x, y);

          ctx.rotate(degToRad(360 * mod));
          const posMod = mod + 1;
          ctx.fillRect(-2, -2, 4, 4);
          ctx.beginPath();
          ctx.moveTo(-2, 0);
          ctx.lineTo(15, 0);
          ctx.stroke();

          ctx.translate(-x, -y);
          ctx.restore();
        }
      }
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

<h1 class="page-title">Perlin Noise Fields</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={600} height={600} />
</div>
