<script>
  import { onMount } from "svelte";

  let canvas;
  let mouseX;
  let mouseY;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    const spacer = 20;
    mouseX = 0;
    mouseY = 200;

    let numX = canvas.width / spacer;
    let numY = canvas.height / spacer;

    let frame = requestAnimationFrame(loop);

    function loop(t) {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0,0,0,0.8)'

      for(let x = 0; x<numX; x++) {
        for(let y = 0; y<numY; y++) {

          let originX = x*spacer;
          let originY = (y*spacer) + (spacer/2);
          let endX = originX + spacer;
          let endY = originY;
          let midX = originX + (spacer/2);
          let midY = originY;
          let halfLength = spacer/2;

          ctx.save();
          ctx.translate(midX, midY);
          ctx.rotate(Math.PI / 2*x*y*t*0.0001);

          ctx.beginPath();       // Start a new path
          ctx.moveTo(-halfLength, 0);    // Move the pen to origin
          ctx.lineTo(halfLength, 0);  // Draw a line
          ctx.stroke();          // Render the path

          ctx.translate(-midX, -midY);

          ctx.restore();
        };
      };
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<style>
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<h1 class="page-title">Canvas rotating lines</h1>
<canvas bind:this={canvas} width={400} height={400} />
