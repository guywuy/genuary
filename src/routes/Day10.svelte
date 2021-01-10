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
    const spacer = 30;
    const numDots = Math.min(width, height) / spacer;


    // You basically need 3 things :

    // A periodic function (1-periodic)
    // What to do with the periodic function
    // An offset function


    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    const periodic = (context, time, x, y) => {
      let dist = Math.abs(halfW - (x*spacer)) + Math.abs(halfH - (y*spacer));
      let size = map(Math.sin(time * 0.00001 * dist), -1, 1, 0, 10);
      return context.ellipse(x*spacer, y*spacer, size, size, 0, 0, 2*Math.PI);
    }

    function draw(t) {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x <= numDots; x++ ) {
        for (let y = 0; y <= numDots; y++ ) {
          ctx.beginPath();
          periodic(ctx, t, x, y);
          ctx.fill();
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

<h1 class="page-title">Time Loop</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={600} height={600} />
</div>
