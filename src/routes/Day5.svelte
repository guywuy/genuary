<script>
  import { onMount } from "svelte";

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(loop);

    const width = 400;
    const height = 400;
    const half = width/2;
    const quarter = half/2;

    const numPoints = 20;

    function loop(t) {
      let pointsToShow = t*0.001 % numPoints;
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'black';

      ctx.save();
      ctx.translate(half, half);
      
      ctx.beginPath();       // Start a new path
      ctx.moveTo(-quarter, 0);    // Move the pen to origin
      for( let x = 0; x <= pointsToShow; x++){
        ctx.rotate(-Math.PI / x);
        ctx.lineTo(quarter, 0);  // Draw a line
      }
      ctx.stroke();          // Render the path

      ctx.translate(-half, -half);

      ctx.restore();
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

<h1 class="page-title">Line becomes circle</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={400} height={400} />
  <div class="lines"></div>
</div>
