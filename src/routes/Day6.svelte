<script>
  import { onMount } from "svelte";
  import { map } from '../utils';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const half = width/2;

    const numLines = 20;
    const spacer = (height - 60)/numLines;

    const numCurves = 4;

    let start = width * 0.2; // Start wave 0.2 across
    let end = width * 0.8; // End with 0.2 to go
    let dx = (end - start) / numCurves; // Distance across for each wave to go

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      for( let y = 0; y <= numLines; y++){
        let yPos = (y * spacer) + 50;

        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(start, yPos);

        for (let x = 0; x <= numCurves; x++) {

          let xPos = start + (x*dx);

          // Modifier -> should be higher in the center. From 0 - 100
          let dFromCenter = map(Math.abs(half - xPos), 120, 0, 0, 100);

          let c1x = xPos;
          let c1y = -spacer + yPos + (spacer * Math.random());
          console.log(x, c1y);
          let c2x = xPos;
          let c2y = Math.random() * spacer + yPos - (spacer * Math.random());
          let endX = xPos;
          let endY = yPos - dFromCenter;
          ctx.bezierCurveTo(c1x, c1y, c2x, c2y, endX, endY);
        }
        ctx.lineTo(width, yPos);
        ctx.stroke();
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

<h1 class="page-title">Unknown pleasures</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={400} height={600} />
  <div class="lines"></div>
</div>
