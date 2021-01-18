<script>
  import { onMount } from "svelte";
  import Delaunator from 'delaunator';

  let canvas;
  let mouseX;
  let mouseY;

  // On mouse move, create a particle with a limited lifespan. Add to array of points.
  // each Points, calculate triangles with all other points and render the triangles.

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(loop);

    function loop(t) {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

<h1 class="page-title">Frozen Brush - Delaunay Triangles</h1>
<canvas bind:this={canvas} width={600} height={600} />
