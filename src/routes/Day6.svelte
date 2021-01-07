<script>
  import { onMount } from "svelte";
  import { map } from '../utils';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const half = width/2;

    const numLines = 30;
    const ySpacer = height/numLines;

    const numCurves = 30;
    const xSpacer = width/numCurves;

    // Make array of points
    const points = [];
    for( let h = 0; h < numLines; h++){
      let y = (h * ySpacer + 20);
      points[h] = [];
      for (let w = 0; w < numCurves; w++) {
        let x = w * xSpacer;
        let dFromCenter = map(Math.abs(x - half), half, 0, 0, 50);
        let yRandom = y - (Math.random()*dFromCenter); // Change y value as random modified by distance from centre
        points[h][w] = {x, y: yRandom}
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      for( let h = 2; h < points.length; h++){
        ctx.beginPath();
        ctx.moveTo(points[h][0].x, points[h][0].y);

        for( var w = 0; w < points[h].length-2; w++){
          const {x, y} = points[h][w];
          const cX = (x + points[h][w+1].x) / 2; // Half way between this point and next point
          const cY = (y + points[h][w+1].y) / 2; // Half way between this point and next point
          // ctx.lineTo(x, y);
          ctx.quadraticCurveTo(x, y, cX, cY);
        }
        ctx.quadraticCurveTo(points[h][w].x, points[h][w].y, points[h][w + 1].x, points[h][w + 1].y);
        ctx.lineTo(width, points[h][w+1].y);

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
</style>

<h1 class="page-title">Unknown pleasures</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={400} height={600} />
</div>
