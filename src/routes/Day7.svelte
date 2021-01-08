<script>
  import { onMount } from "svelte";
  import { map } from '../utils';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;

    let a = 1, b = 3.14, c = 0.33, d = 2.8;

    let x = 0;
    let y = 0;

    function draw(t) {
      requestAnimationFrame(draw);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      if (t < 5000) {
        for (let i = 0; i < 10000; i++) {
          ctx.fillStyle = `rgba(${map(x, 0, 1, 0, 255)}, ${map(t, 0, 5000, 0, 255)}, ${map(y, 0, 1, 0, 255)}, 0.2)`;
          ctx.fillRect(halfW/2 * x + halfW, halfH/2 * y + halfH, 1, 1);
          x = Math.sin(a * y) - Math.cos(b * x)
          y = Math.sin(c * x) - Math.cos(d * y)
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
  .lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(40, 1fr);
    grid-template-rows: repeat(40, 1fr);
  }
</style>

<h1 class="page-title">Peter de Jong Attractor</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={1000} height={800} />
  <div class="lines"></div>
</div>
