<script>

  import { onMount } from "svelte";
  import { map, setupCanvas } from '../utils';

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

    const spacer = 60;
    const numSquares = Math.min(width, height) / spacer;


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

    ctx.lineWidth = '2'
    function draw(t) {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      const halfSpacer = spacer/2;

      let step = TAU / duration * time * 4;
      let sinMod = Math.sin(step);

      const timeMap = map(time, 0, duration, halfSpacer, spacer*4) * sinMod; // Up and down through one period

      let offset = map(time, 0, duration, 0, -spacer * 4); // Move slowly up and left

      const drawSquare = s => {
        ctx.save();
        let midX = s[0] + halfSpacer;
        let midY = s[1] + halfSpacer;

        let deltaX = Math.abs((width/2 - (midX + offset)));
        let deltaY = Math.abs((height/2 - (midY + offset)));
        let delta = map(deltaX + deltaY, 0, width, -6, 6);

        ctx.translate(midX + offset, midY + offset);
        ctx.beginPath();
        ctx.moveTo(-halfSpacer, -halfSpacer); // Top left
        ctx.rotate(timeMap * delta * 0.005)
        ctx.quadraticCurveTo(0, -timeMap * delta, halfSpacer, -halfSpacer); // Top right
        ctx.quadraticCurveTo(timeMap * delta, 0, halfSpacer, halfSpacer); // Btm right
        ctx.quadraticCurveTo(0, timeMap * delta, -halfSpacer, halfSpacer); // Btm left
        ctx.quadraticCurveTo(-timeMap * delta, 0, -halfSpacer, -halfSpacer); // Top left
        ctx.fill();
        ctx.stroke();
        ctx.translate(-midX + offset, -midY + offset);
        ctx.restore();
      }

      if (odd) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        whites.forEach(drawSquare)
      } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';
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

<h1 class="page-title">?</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} />
</div>
