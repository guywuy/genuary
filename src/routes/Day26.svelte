<script>

  import { onMount } from "svelte";
  import { map, setupCanvas, dist } from '../utils';

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  let odd = true;
  let duration = 600;
  let time = 0;

  onMount(() => {
    const ctx = setupCanvas(canvas);

    let frame = requestAnimationFrame(draw);

    const spacer = 80;
    const numSquares = Math.min(width, height) / spacer;


    const whites = [];
    const blacks = [];
    for (let x = -1; x <= numSquares; x+=2 ) {
      for (let y = -1; y <= (numSquares * 2) + 1; y++ ) {
        let h = x * spacer;
        let v = y * spacer/2;
        if ( y % 2 === 0 ) {
          whites.push([h + spacer, v]);
          blacks.push([h, v]);
        } else {
          whites.push([h, v]);
          blacks.push([h + spacer, v]);
        }
      }
    }

    function draw(t) {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      const halfSpacer = spacer/2;

      let step = TAU / duration * time * 2;
      let sinMod = Math.sin(step);

      let offset = map(time, 0, duration, 0, -spacer * 4); // Move slowly up and left
      // let offset = sinMod * spacer;

      let bendAmount = sinMod * spacer;

      const drawSquare = s => {
        ctx.save();
        let midX = s[0] + halfSpacer;
        let midY = s[1] + halfSpacer;

        ctx.translate(midX + offset, midY + offset);
        // Draw triangle
        ctx.beginPath();
        ctx.moveTo(0, -halfSpacer); // Top left

        odd ? 
          ctx.lineTo(spacer * sinMod, 0) :
          ctx.lineTo(-spacer * sinMod, 0);
        ctx.lineTo(0, halfSpacer);

        ctx.fillStyle = odd ? 'white' : 'black';
        ctx.fill();

        // Draw Circle curve
        ctx.beginPath();
        ctx.moveTo(0, -halfSpacer); // Top left
        ctx.quadraticCurveTo(bendAmount, 0, 0, halfSpacer); // Bottom Left
        ctx.quadraticCurveTo(-bendAmount, 0, 0, -halfSpacer); // Top left
        ctx.fillStyle = 'rgb(122, 122, 122)';
        ctx.fillStyle = `rgb(${sinMod * 225}, ${sinMod * 225}, ${sinMod * 225})`;
        ctx.fill();
        ctx.translate(-midX + offset, -midY + offset);
        ctx.restore();
      }

      if (odd) {
        ctx.fillStyle = `rgba(20, 20, 20, ${sinMod})`;
        ctx.fillRect(0, 0, width, height);

        whites.forEach(drawSquare)
      } else {
        ctx.fillStyle = `rgba(40, 40, 40, ${sinMod})`;
        ctx.fillRect(0, 0, width, height);

        blacks.forEach(drawSquare)
      }

      time ++;

      if (time === duration/4) {
        time = 0;
        odd = !odd;
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
  }
</style>

<h1 class="page-title">Negative Space Triangles Cones</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
