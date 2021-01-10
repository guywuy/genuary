<script>
  import { onMount } from "svelte";
  import { map, degToRad } from '../utils';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;
    const arcWidth = Math.min(width, height) / 40;
    const spacer = 4;


    // You basically need 3 things :

    // A periodic function (1-periodic)
    // What to do with the periodic function
    // An offset function


    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = arcWidth;
    ctx.lineCap = 'round';

    const arcs = [];
    for (let i = 0; i < 15; i++) {
      arcs.push({
        x: halfW,
        y: halfH,
        radius: (i * arcWidth) + (i * spacer),
        startAngle: Math.random() * Math.PI * 2,
        endAngle: Math.random() * Math.PI * 2,
        clockwise: Math.random() > 0.5,
        speed: Math.random() * 0.001,
      })
    }

    function draw(t) {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      arcs.forEach((arc,i) => {
        ctx.beginPath();
        const {x, y, radius, startAngle, endAngle, clockwise, speed } = arc;
        let sAngle = startAngle + (t * speed);
        let eAngle = endAngle + (t * speed);
        if (clockwise) {
          sAngle *= -1;
          eAngle *= -1;
        }
        ctx.arc(x, y, radius, sAngle , eAngle, clockwise);
        ctx.stroke();
      })
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

<h1 class="page-title">Time Loop</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={600} height={600} />
</div>
