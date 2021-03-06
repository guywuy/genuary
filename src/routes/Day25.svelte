<script>
  import { onMount } from "svelte";
  import { map, setupCanvas, dist } from "../utils";
  import SimplexNoise from "simplex-noise";
  import Info from "../components/Info.svelte";

  // https://avinayak.github.io/art/2021/01/09/noise-planets.html

  const sNoise = new SimplexNoise();

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  let border = 20;
  let threshold = width / 2 - border;
  const noiseMod = 0.0025;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(draw);

    const numPoints = 4000;

    let points = [...Array(numPoints)].map((_, i) => {
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
      };
    });

    ctx.lineWidth = "0.5";
    function draw(t) {
      if (points.length > 10) {
        requestAnimationFrame(draw);
      } else {
        console.log("ended");
      }

      const drawPoint = (s) => {
        let { x, y } = s;
        let delta = dist(width / 2, height / 2, x, y);

        // Remove points if they reach the edge of circle
        if (delta > threshold)
          return (points = points.filter((p) => p.id !== s.id));

        let n = sNoise.noise2D(x * noiseMod, y * noiseMod);

        ctx.beginPath();
        ctx.ellipse(
          x,
          y,
          map(delta, 0, threshold, 3, 1),
          map(Math.abs(n), 0, 1, 1, 8),
          0,
          0,
          TAU
        );
        ctx.fillStyle = `rgb(${map(Math.abs(n), 0, 1, 0, 255)}, 0, 0)`;
        ctx.fill();
        ctx.stroke();

        // Update x and y based on noise
        s.x += Math.sin(n * TAU);
        s.y += Math.cos(n * TAU);
      };

      ctx.strokeStyle = "white";
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      points.forEach(drawPoint);
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<h1 class="page-title">Noise Planet 2</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} {width} {height} />
</div>

<Info>
  <h2>Noise Planets</h2>
  <p>
    Create a noise map, add particles, let them follow the noise vectors. A good
    write up of a similar process <a
      href="https://avinayak.github.io/art/2021/01/09/noise-planets.html"
      >is here</a
    >.
  </p>
</Info>

<style>
  .canvasWrap {
    position: relative;
  }
  canvas {
    max-width: 100%;
    max-height: 100%;
    background: rgb(230, 230, 230);
  }
</style>
