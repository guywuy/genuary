<script>
  import { onMount } from "svelte";
  import { map } from '../utils';

  let canvas;
  let time = 0;
  let a = 1, b = 3.14, c = 0.33, d = 2.8;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);


    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;


    let x = 0;
    let y = 0;

    function draw(t) {
      requestAnimationFrame(draw);
      if (time === 0) ctx.clearRect(0, 0, width, height);
      time ++;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      if (time < 5000) {
        for (let i = 0; i < 10000; i++) {
          ctx.fillStyle = `rgba(${map(x, 0, 1, 0, 255)}, ${map(time, 0, 5000, 0, 255)}, ${map(y, 0, 1, 0, 255)}, 0.2)`;
          ctx.fillRect(halfW/2 * x + halfW, halfH/2 * y + halfH, 1, 1);
          x = Math.sin(a * y) - Math.cos(b * x)
          y = Math.sin(c * x) - Math.cos(d * y)
        }
      } else {
        cancelAnimationFrame(frame)
      }
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  const restart = () => {
    time = 0;
  }

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
  .controls {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>

<h1 class="page-title">Peter de Jong Attractor</h1>
<div class="controls">
  <div>
      <label for="a">a:</label>
      <input type="range" name="a" id="a" bind:value={a} step="0.01" min="0.1" max="2" on:change={restart}>
      <p>{a}</p>
  </div>
  <div>
      <label for="b">b:</label>
      <input type="range" name="b" id="b" bind:value={b} step="0.1" min="2" max="4" on:change={restart}>
      <p>{b}</p>
  </div>
  <div>
      <label for="c">c:</label>
      <input type="range" name="c" id="c" bind:value={c} step="0.01" min="0.1" max="1" on:change={restart}>
      <p>{c}</p>
  </div>
  <div>
      <label for="d">d:</label>
      <input type="range" name="d" id="d" bind:value={d} step="0.1" min="2" max="3" on:change={restart}>
      <p>{d}</p>
  </div>
</div>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={1000} height={800} />
</div>
