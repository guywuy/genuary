<script>

  import { onMount } from "svelte";
  import { map } from '../utils';

  const TAU = Math.PI * 2;

  let canvas;
  let width = 400;
  let height = 400;
  let odd = true;
  let duration = 400;
  let time = 0;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const spacer = 40;
    const numSquares = Math.min(width, height) / spacer;


    // Have two sets of squares, interspersed.
    // For a set duration, have the bg one colour and animate one set of squares.
    // Then for the next duration, swap the bg colour and animate the other squares.

    // Create squares
    const whites = [];
    const blacks = [];
    for (let x = 0; x <= numSquares; x+=2 ) {
      for (let y = 0; y <= numSquares; y++ ) {
        let h = x * spacer;
        let v = y * spacer;
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
      
      const drawSquare = s => {
        ctx.save();
        let midX = s[0] + spacer/2;
        let midY = s[1] + spacer/2;
        ctx.translate(midX, midY);
        ctx.rotate(map(time, 0, duration, 0, TAU));
        ctx.fillRect(-spacer/2, -spacer/2, spacer, spacer);
        ctx.translate(-midX, -midY);
        ctx.restore();
      }
      
      if (odd) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = 'white';
        whites.forEach(drawSquare)
      } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = 'black';
        blacks.forEach(drawSquare)
      }

      time ++;

      if (time >= duration/4) {
        time = 0;
        odd = !odd;
      }

      // ctx.fillStyle = 'yellow';
      // ctx.fillText(time, 0, 100);
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

<h1 class="page-title">Negative Space Illusion</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
