<script>

  import { onMount } from "svelte";
  import { map, setupCanvas, dist, randn_bm } from '../utils';

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  const numPoints = 1000;
  const numStrips = 12;
  const stripHeight = height/numStrips;
  let toggleCircles;

  let isCircles = true;

  onMount(() => {
    const ctx = setupCanvas(canvas);

    let frame = requestAnimationFrame(draw);

    const genStrips = () => {
      return [...Array(numStrips)].map((str, i) => {
        return [...Array(numPoints)].map(_ => {
          let posX = i % 2 === 0 ?
          map(Math.pow(Math.random(), i/3 + 1), 0, 1, 0, width):
          map(Math.pow(Math.random(), i/3 + 1), 1, 0, 0, width)
          ; 
          return {
            i,
            x: posX,
            y: (Math.random() * stripHeight) + (stripHeight * i),
          }
        })
      });
    }

    let strips = genStrips();

    function draw(t) {
      // requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      const drawPoint = s => {
        let {x, y, i} = s;

        ctx.beginPath();
        if (isCircles) {
          ctx.ellipse(x, y, i + 1, i + 1, 0, 0, TAU)
          ctx.stroke()
        } else {
          ctx.ellipse(x, y, 1, 1, 0, 0, TAU)
          ctx.fill();
        }
      }
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'black';
      strips.forEach(points => points.forEach(drawPoint));

    }

    toggleCircles = () => {
      isCircles = !isCircles;
      strips = genStrips();
      requestAnimationFrame(draw);
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
  <p>Click on the canvas to toggle between circles and dots</p>
  <canvas bind:this={canvas} width={width} height={height} on:click={toggleCircles}/>
</div>
