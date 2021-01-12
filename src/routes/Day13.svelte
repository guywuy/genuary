<script>
  import { onMount } from "svelte";
  import { map, degToRad } from '../utils';
  import SimplexNoise from 'simplex-noise';
  import PVector from 'pvectorjs';

  const TAU = Math.PI * 2;

  const simplex = new SimplexNoise();
  // console.log(simplex);

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;
    const spacer = width/30;

    
    function draw(t) {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height)
      const cosT = Math.cos(t * 0.0001 * TAU) * 0.15
      const sinT = Math.sin(t * 0.0001 * TAU) * 0.15

      const N = 80
      for(let i = 0; i < N; i ++) {
        let y = map(i, 0, N - 1, -100, height + 100)
        const points = []
        for(let x = -100; x <= width + 100; x += 2) {
          const angle = simplex.noise4D(x / (width + 200), y / (height + 200), cosT, sinT) * TAU
          points.push(PVector(x, y).add(PVector.fromAngle(angle).setMag(40)))
        }

        ctx.beginPath();
        points.forEach(pt => ctx.lineTo(pt.x, pt.y));
        points.reverse().forEach(pt => {
          pt.add(PVector.fromAngle(-Math.PI/4).setMag(6))
          ctx.lineTo(pt.x, pt.y)
        })
        ctx.fillStyle = `rgba(255, ${map(i, 0, N, 0, 255)}, 255, 1)`;
        ctx.closePath();
        ctx.fill();
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

<h1 class="page-title">Wavy Hexagon</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={500} height={500} />
</div>
