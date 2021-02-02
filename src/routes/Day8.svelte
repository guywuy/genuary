<script>
  import { onMount } from "svelte";
  import SimplexNoise from 'simplex-noise';

  let simplex = new SimplexNoise();

  let canvas;
  let noiseMod = 0.05;
  let redraw;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const spacer = width/30;


    function draw(t) {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      for (let x = 0; x <= width/spacer; x++) {
        for (let y = 0; y <= width/spacer; y++) {
          const mod = simplex.noise2D(x * noiseMod, y * noiseMod);
          ctx.save();
          ctx.translate(x*spacer, y*spacer);

          ctx.rotate(Math.PI * 2 * mod);
          const posMod = mod + 1;
          ctx.fillRect(-2, -2, 4, 4);
          ctx.beginPath();
          ctx.moveTo(-2, 0);
          ctx.lineTo(15 * (mod * 1.5), 0);
          ctx.stroke();

          ctx.translate(-x*spacer, -y*spacer);
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
  <div class="controls">
    <label for="scale">Scale</label>
    <input type="range" name="scale" min="0.0005" max="0.15" step="0.0005" bind:value={noiseMod}>
  </div>
</div>
