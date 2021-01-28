<script>

  import { onMount } from "svelte";
  import { map, setupCanvas, dist, randn_bm } from '../utils';

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  const numPoints = 10000;
  const numStrips = 12;
  const stripHeight = height/numStrips;

  onMount(() => {
    const ctx = setupCanvas(canvas);

    let frame = requestAnimationFrame(draw);

    const strips = [...Array(numStrips)].map((str, i) => {
      return [...Array(numPoints)].map(_ => {
        let posX = i % 2 === 0 ?
        map(Math.pow(Math.random(), i + 1), 0, 1, 0, width):
        map(Math.pow(Math.random(), i + 1), 1, 0, 0, width)
        ; 
        return {
          x: posX,
          y: (Math.random() * stripHeight) + (stripHeight * i),
        }
      })
    });

    function draw(t) {
      // requestAnimationFrame(draw);
      // ctx.clearRect(0, 0, width, height);

      const drawPoint = s => {
        let {x, y} = s;

        ctx.beginPath();
        ctx.ellipse(x, y, 1, 1, 0, 0, TAU);
        ctx.fill();
        // ctx.stroke();
      }

      // ctx.strokeStyle = 'white';
      ctx.fillStyle = 'black';
      strips.forEach(points => points.forEach(drawPoint));

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
    background: rgb(230, 230, 230)
  }
</style>

<h1 class="page-title">Greyscale Gradient - no lines</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
