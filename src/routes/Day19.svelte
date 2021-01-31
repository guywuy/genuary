<script>
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import Delaunator from "delaunator";
  import { map } from "../utils";
  import Info from "../components/Info.svelte";

  let canvas;
  let mouseX;
  let mouseY;
  let width = 600;
  let height = 600;
  let delaunay;

  // On mouse move, create a particle with a limited lifespan. Add to array of points.
  // each Points, calculate triangles with all other points and render the triangles.
  class Particle {
    constructor(id, x, y, lifetime = 100) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.lifetime = lifetime;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
    }

    getPos() {
      return {
        x: this.x,
        y: this.y,
      };
    }

    getPosArray() {
      return [this.x, this.y];
    }

    update() {
      this.lifetime = this.lifetime - 1;

      this.x += this.speedX;
      this.y += this.speedY;

      if (this.lifetime === 0) {
        // console.log('removing');
        removeParticle(this.id);
      }
    }
  }

  let particles = [];

  const removeParticle = (id) =>
    (particles = [...particles.filter((p) => p.id !== id)]);

  const createParticle = () =>
    withLog(
      "creating particle",
      particles.push(
        new Particle(
          uuidv4(),
          Math.random() * width,
          Math.random() * height,
          Math.floor(Math.random() * 1000)
        )
      )
    );

  const withLog = (msg, f) => {
    console.log(msg);
    return f;
  };

  function nextHalfedge(e) {
    return e % 3 === 2 ? e - 2 : e + 1;
  }
  function edgesOfTriangle(t) {
    return [3 * t, 3 * t + 1, 3 * t + 2];
  }

  function pointsOfTriangle(delaunay, t) {
    return edgesOfTriangle(t).map((e) => delaunay.triangles[e]);
  }

  function forEachTriangleEdge(points, delaunay, callback) {
    for (let e = 0; e < delaunay.triangles.length; e++) {
      if (e > delaunay.halfedges[e]) {
        const p = points[delaunay.triangles[e]];
        const q = points[delaunay.triangles[nextHalfedge(e)]];
        callback(e, p, q);
      }
    }
  }

  onMount(() => {
    const ctx = canvas.getContext("2d");

    let frame = requestAnimationFrame(loop);

    // for (let i = 0; i < 20; i++) {
    //   createParticle();
    // }

    function loop(t) {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, width, height);

      if (particles.length === 0) return;

      particles.forEach((part) => {
        // get delaunay calc, make triangles array
        ctx.fillRect(part.x, part.y, 3, 3);
        part.update();
      });
      delaunay = Delaunator.from(particles.map((p) => p.getPosArray()));

      forEachTriangleEdge(
        particles.map((p) => p.getPosArray()),
        delaunay,
        (e, p, q) => {
          ctx.strokeStyle = `rgba(${map(p[0], 0, width, 0, 255)}, ${map(
            p[1],
            0,
            height,
            0,
            255
          )}, 0, 0.6)`;
          ctx.beginPath();
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(q[0], q[1]);
          ctx.stroke();
        }
      );
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  const updateMousePos = (e) => {
    const { offsetX, offsetY } = e;
    particles.push(
      new Particle(
        uuidv4(),
        offsetX + Math.random() * 30,
        offsetY + Math.random() * 30,
        70
      )
    );
  };
</script>

<h1 class="page-title">Frozen Brush - Delaunay Triangles</h1>
<p>Move the mouse over the canvas</p>
<canvas bind:this={canvas} {width} {height} on:mousemove={updateMousePos} />

<Info>
  <p>
    Replicating/copying <a href="https://www.openprocessing.org/sketch/413567"
      >this sketch</a
    >.
  </p>
  <p>
    Uses <a href="https://en.wikipedia.org/wiki/Delaunay_triangulation"
      >Delaunay Triangulation</a
    >. I don't really understand it.
  </p>
</Info>

<style>
  canvas {
    max-width: 100%;
    max-height: 100%;
    border: 1px solid royalblue;
  }
</style>
