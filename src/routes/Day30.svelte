<script>
  import { onMount } from "svelte";
  import PVector from "pvectorjs";
  import SCAttractor from "../scClasses/SCAttractor";
  import SCNode from "../scClasses/SCNode";
  import SCNetwork from "../scClasses/SCNetwork";
  import Info from "../components/Info.svelte";

  // https://medium.com/@jason.webb/space-colonization-algorithm-in-javascript-6f683b743dc5

  // Attractors are focal points of natural resources that promote growth. Exactly which resources these represent will depend on the specific branching system you want to model — auxin for leaves, sunlight for tree branches, nutrient concentrations for sea fans and corals, etc.

  // Nodes are the points through which lines are drawn to render branches. More nodes mean more fidelity, but poorer performance.

  // For open venation …
  // Associate each attractor with the single closest node within the pre-defined attraction distance.
  // Attractors are pruned as soon as any node enters its kill distance.

  // For closed venation …
  // Associate each attractor with all nodes in its relative neighborhood (also limited by the pre-defined attraction distance).
  // Only remove attractors when all of their associated nodes are within the kill distance. This is what causes branches to connect together into closed loops.

  const TAU = Math.PI * 2;

  let canvas;
  let width = 600;
  let height = 600;
  const numAttractors = 5000;
  let placeSeed;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    const genAttractors = () => {
      return [...Array(numAttractors)].map((s, i) => {
        let pos = new PVector(Math.random() * width, Math.random() * height);
        return new SCAttractor(pos, ctx);
      });
    };

    // Initialise network with no node or attractors
    const network = new SCNetwork([], [], ctx);

    network.attractors = genAttractors();

    const addNodeToNetwork = (x, y) => {
      network.addNode(new SCNode(null, new PVector(x, y), true, ctx));
    };

    addNodeToNetwork(width / 2, height / 2);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";

    let frame = requestAnimationFrame(draw);

    function draw(t) {
      if (network.getNumberAttractors() > 1800) {
        requestAnimationFrame(draw);
      } else {
        console.log("finished");
        console.log(network.getNumberAttractors());
      }

      ctx.clearRect(0, 0, width, height);
      network.grow();
      network.draw();
    }

    placeSeed = (e) => {
      addNodeToNetwork(e.offsetX, e.offsetY);
    };

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<h1 class="page-title">Space Explorer 1</h1>

<div class="canvasWrap">
  <canvas bind:this={canvas} {width} {height} on:click={placeSeed} />
</div>

<Info>
  <h3>Space Colonisation Algorithm</h3>
  <p>
    This is based on <a
      href="https://medium.com/@jason.webb/space-colonization-algorithm-in-javascript-6f683b743dc5"
      >a write up on medium</a
    > by Jason Webb. I could and should improve it, for example by adding quadtree
    so we don't have to loop over every node each frame.
  </p>
  <p>
    Attractors are focal points of natural resources that promote growth.
    Exactly which resources these represent will depend on the specific
    branching system you want to model — auxin for leaves, sunlight for tree
    branches, nutrient concentrations for sea fans and corals, etc.
  </p>

  <p>
    Nodes are the points through which lines are drawn to render branches. More
    nodes mean more fidelity, but poorer performance.
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
