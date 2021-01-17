<script>
  import { onMount } from "svelte";
  import { map, degToRad } from '../utils';
  import SimplexNoise from 'simplex-noise';

  let simplex = new SimplexNoise();
  // console.log(simplex);

  let canvas;

  let updatePoints;
  let useNoise = true;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;
    const spacer = width/8;
    const num = width/spacer;


    // Make array of points
    updatePoints = () => {
      useNoise = !useNoise;
      requestAnimationFrame(draw)
    }

    function draw(t) {

      let points = []
      for( let h = 0; h < num; h++){
        let y = (h * spacer) + spacer/2;
        points[h] = [];
        for (let w = 0; w < num; w++) {
          let x = (w * spacer) + spacer/3;

          const mod = simplex.noise2D(w, h);
          if (!useNoise) {
            x += map(Math.random(), 0, 1, -spacer/4, spacer/4);
            y += map(Math.random(), 0, 1, -spacer/4, spacer/4);
          } else {
            x += map(mod, -1, 1, -spacer/4, spacer/4);
            y += map(mod, -1, 1, -spacer/4, spacer/4);
          }
          h%2 === 0 ? x += (spacer/2) : null;
          points[h][w] = {x, y}
        }
      }

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      for (let h = 0; h <= points.length - 1; h++) {
        for (let w = 0; w <= points[h].length - 1; w++) {

          let {x, y} = points[h][w];

          if (w !== points[h].length - 1 && h !== points.length - 1) {
            // this is not the last one across or down -> draw to right and below
            ctx.beginPath();
            ctx.moveTo(x, y);
            let pointToRight = points[h][w + 1];
            let pointBelow = points[h+1][w];
            ctx.lineTo(pointToRight.x, pointToRight.y);
            ctx.lineTo(pointBelow.x, pointBelow.y);
            ctx.closePath();
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()}`;
            ctx.fill();
            ctx.stroke();
          }
          if (h !== 0 && w !== 0) {
            // this is not the first one across or down -> draw to left and up
            ctx.beginPath();
            ctx.moveTo(x, y);
            let pointToLeft = points[h][w - 1];
            let pointAbove = points[h-1][w];
            ctx.lineTo(pointToLeft.x, pointToLeft.y);
            ctx.lineTo(pointAbove.x, pointAbove.y);
            ctx.closePath();
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()}`;
            ctx.fill();
            ctx.stroke();
          }
        }
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
    /* border: 1px solid sandybrown; */
  }
</style>

<h1 class="page-title">Triangular mesh</h1>
<div class="canvasWrap">
  <div>
    Using - { useNoise ? 'Simplex noise' : 'Random points' }
    <button on:click={updatePoints} class="btn">Change</button>
  </div>
  <canvas bind:this={canvas} width={600} height={600} />
</div>
