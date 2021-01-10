<script>

  import { onMount } from "svelte";
  import { map, dist } from '../utils';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;
    const spacer = 20;
    const numDots = Math.min(width, height) / spacer;


    // You basically need 3 things :

    // A periodic function (1-periodic)
    // What to do with the periodic function
    // An offset function


    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    const periodic = p => map(Math.cos(Math.PI*p), -1, 1, 0, 4);

    const offset = (x, y) => 0.01 * dist(x, y, halfW, halfH);
    const offset2 = (x, y) => 0.0005 * (x*x+2*y - y);

    function draw(t) {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x <= width; x+=spacer ) {
        for (let y = 0; y <= height; y+=spacer ) {
          ctx.beginPath();
          let size = periodic(t * 0.001 - offset2(x, y)); // Get size based on offset modulated by time
          let size2 = periodic(t * 0.001 - offset(x, y)); // Get size based on offset modulated by time
          ctx.ellipse(x, y, size2*2 + 2, size, size, 0, 2*Math.PI);
          ctx.strokeStyle = `rgba(${map(size2, 0, 10, 0, 255)}, 0, ${map(size, 0, 10, 0, 255)}, 1)`;
          ctx.stroke();
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
