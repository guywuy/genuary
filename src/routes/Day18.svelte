<script>
  import { onMount } from "svelte";

  let canvas;
  let mouseX;
  let mouseY;

  let showCircles = false;

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
      ctx.lineWidth = 3;

      for(let x = 0; x<numX; x++) {
        for(let y = 0; y<numY; y++) {

          ctx.strokeStyle = 'rgba(0,0,0,1)';
          let originX = x*spacer;
          let originY = (y*spacer) + (spacer/2);
          let midX = originX + (spacer/2);
          let midY = originY + (spacer/2);
          let halfLength = spacer/2;
          let offset = x + y;
          let rotation = t*0.005;

          ctx.beginPath();
          ctx.arc(midX, midY, halfLength, 0 + offset + rotation, 6 + offset + rotation, true);
          ctx.stroke();

          if (showCircles) {
            ctx.beginPath();
            ctx.arc(midX, midY, halfLength, 0, Math.PI * 2, true);
            ctx.strokeStyle = 'rgba(255, 255, 0, 0.2)'
            ctx.stroke();
          }
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

<h1 class="page-title">Particle Waves</h1>
  <div>
    <button on:click={() => showCircles = !showCircles}>Toggle Circles</button>
  </div>
<canvas bind:this={canvas} width={600} height={600} />
