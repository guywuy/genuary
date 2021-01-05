<script>
  import { onMount } from "svelte";

  let canvas;
  let mouseX;
  let mouseY;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    const spacer = 20;
    mouseX = 100;
    mouseY = 200;

    let numX = canvas.width / spacer;
    let numY = canvas.height / spacer;

    let frame = requestAnimationFrame(loop);

    function loop(t) {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for(let x = 0; x<numX; x++) {
        for(let y = 0; y<numY; y++) {

          let originX = x*spacer;
          let originY = (y*spacer) + (spacer/2);
          let midX = originX + (spacer/2);
          let midY = originY;
          let halfLength = spacer/2;
          let rotationAmount = Math.atan2(midY-mouseY, midX-mouseX);

          let deltaThreshold = 100;
          let deltaX = Math.abs((mouseX - midX));
          let deltaY = Math.abs((mouseY - midY));
          let delta = deltaX + deltaY;
          ctx.strokeStyle = delta < deltaThreshold ? `rgba(0,0,0,${delta/100})` : 'black';

          ctx.save();
          ctx.translate(midX, midY);
          ctx.rotate(rotationAmount);

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

  const updateMousePos = e => {
    const {offsetX, offsetY} = e;
    mouseX = offsetX;
    mouseY = offsetY;
  }
</script>

<style>
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<h1 class="page-title">Canvas rotating lines towards mouse</h1>
<canvas bind:this={canvas} width={400} height={400} on:mousemove={updateMousePos} />
