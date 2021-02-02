<script>
  import { onMount } from "svelte";

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    const spacer = 20;
    
    let frame = requestAnimationFrame(loop);
    
    function loop(t) {
      let numX = canvas.width / spacer;
      let numY = canvas.height / spacer;
      frame = requestAnimationFrame(loop);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'tomato'
      ctx.strokeStyle = 'rgba(0,0,0,0.05)'
      const tMod = Math.floor(t / 100);

      for(let x = 0; x<numX; x++) {
        for(let y = 0; y<numY; y++) {
          for(let z = 5; z>0; z--) {
            // console.log(Math.cos(t));
            ctx.fillStyle = `rgba(${255/5*z}, ${255*Math.sin(t*0.001)}, ${255*y/x/5}, 0.2)`
            ctx.fillRect((x*spacer) + 2.5, (y*spacer) + 2.5, 2*z, 2*z);
            ctx.beginPath();       // Start a new path
            ctx.moveTo(x*spacer, y*spacer);    // Move the pen to origin
            ctx.lineTo(z*(Math.cos(t*0.001))*spacer + 5, y*(Math.tan(t*0.0001))*spacer);  // Draw a line
            ctx.stroke();          // Render the path
          };
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

<h1 class="page-title">Triple nested loops</h1>
<canvas bind:this={canvas} width={400} height={400} />
