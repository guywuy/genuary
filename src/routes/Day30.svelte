<script>

  import { onMount } from "svelte";
  import { map, dist } from '../utils';
  import PVector from 'pvectorjs';
  import SCAttractor from '../scClasses/SCAttractor';
  import SCNode from '../scClasses/SCNode';
  import SCNetwork from '../scClasses/SCNetwork';

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
  let width = 400;
  let height = 400;
  const numAttractors = 5000;
  let placeSeed;


  onMount(() => {
    const ctx = canvas.getContext('2d');

    const genAttractors = () => {
      return [...Array(numAttractors)].map((s, i) => {
        let pos = new PVector(Math.random() * width, Math.random() * height);
        return new SCAttractor(pos, ctx);
      });
    }


    // Initialise network with no node
    const network = new SCNetwork(genAttractors(), [], ctx);


    const addNodeToNetwork = (x, y) => {
      network.addNode(new SCNode(null, new PVector(x, y), true, ctx))
    }

    addNodeToNetwork(width/2, height/2);
    addNodeToNetwork(Math.random() * width, Math.random() * height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    let frame = requestAnimationFrame(draw);

    function draw(t) {
      if (network.getNumberNodes() < 1300) {
        requestAnimationFrame(draw);
      } else {
        console.log('finished');
        console.log(network.getNumberAttractors());
      }

      ctx.clearRect(0, 0, width, height);
      network.grow();
      network.draw();
    }

    placeSeed = (e) => {
      addNodeToNetwork(e.offsetX, e.offsetY);
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
    background: rgb(230, 230, 230);
  }
</style>

<h1 class="page-title">Space Explorer</h1>

<div class="canvasWrap">
  <canvas bind:this={canvas} width={width} height={height} on:click={placeSeed}/>
</div>
