<script>
  import { onMount } from "svelte";
  import { map } from '../utils';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const half = width/2;

    const numLines = 26;
    const spacer = (height - 60)/numLines;
    
    const numCurves = 12;
    const xSpacer = width/numCurves;

    // let start = width * 0.2; // Start wave 0.2 across
    // let end = width * 0.8; // End with 0.2 to go
    // let dx = (end - start) / numCurves; // Distance across for each wave to go

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      const genCurve = (x, yPos) => {
        // let xPos = start + (x*dx);
          // let xPosEnd = start + ((x+1)*dx);
          let xPos = (x * xSpacer);
          let xPosEnd = ((x+1)*xSpacer);

          // Modifier -> should be higher in the center. From 0 - 100
          let dFromCenter = map(Math.abs(half - xPos), half, 0, 0, 100);

          let yPosEnd = yPos - Math.random()*dFromCenter;

          let c1x = (xPos + xPosEnd)/2;
          let c1y = (yPos + yPosEnd)/2;
          // ctx.lineTo(xPosEnd, yPosEnd);
          return ctx.quadraticCurveTo(xPos, yPosEnd, c1x, c1y);
          // ctx.quadraticCurveTo(c1x, c1y, xPosEnd, yPosEnd);
      }

      for( let y = 0; y <= numLines; y++){
        let yPos = (y * spacer) + 50;

        ctx.beginPath();
        ctx.moveTo(0, yPos);

        for (let x = 0; x <= numCurves-2; x++) {
          genCurve(x, yPos)
        }

        let penultimateX = numCurves - 1;

        ctx.lineTo(penultimateX * xSpacer, yPos);
        ctx.lineTo(width, yPos);
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out'; // Control composite to hide lines underneath
        ctx.fill();
        ctx.restore();
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
