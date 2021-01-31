<script>

  import { onMount } from "svelte";
  import PVector from 'pvectorjs';
  import SCAttractor from '../scClasses/SCAttractor';
  import SCNode from '../scClasses/SCNode';
  import SCNetwork from '../scClasses/SCNetwork';
  import { map, randomRGB } from "../utils";

  let canvas;
  let width = 680;
  let height = 500;
  const numAttractors = 5000;
  let handleClick;
  let handleMousemove;
  let handleKeydown;

  onMount(() => {
    const ctx = canvas.getContext('2d');

    const genAttractors = () => {
      return [...Array(numAttractors)].map((s, i) => {
        let pos = new PVector(Math.random() * width, Math.random() * height);
        return new SCAttractor(pos, ctx);
      });
    }

    const localSettings = {
      attractionDistance: 18,
      killDistance: 4,
      segmentLength: 3,
      showAttractorDots: false,
      showInfluencingAttractorRings: false,
    };

    // Initialise network with no node or attractors
    const network = new SCNetwork([], [], ctx, localSettings);

    network.attractors = genAttractors();

    const addNodeToNetwork = (x, y, colour) => {
      network.addNode(new SCNode(null, new PVector(x, y), true, ctx, colour))
    }

    for (let i = 0; i < 4; i++) {
      addNodeToNetwork(Math.random() * width, Math.random() * height, randomRGB())
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    let frame = requestAnimationFrame(draw);

    function draw(t) {
      requestAnimationFrame(draw);

      ctx.clearRect(0, 0, width, height);
      network.grow();
      network.draw();
    }

    handleClick = (e) => {
      addNodeToNetwork(e.offsetX, e.offsetY, randomRGB());
    }

    handleMousemove = (e) => {
      for (let i = 0; i < 6; i++) {
        let pos = new PVector(e.offsetX + map(Math.random(), 0, 1, -10, 10), e.offsetY + map(Math.random(), 0, 1, -10, 10));
        network.attractors.push(new SCAttractor(pos, ctx));
      }
    }

    handleKeydown = (e) => {
      // console.log(e);
      let { key, code } = e;
      if (key === "Enter") {
        network.settings.showAttractorDots = !network.settings.showAttractorDots;
      } else if (key === "Backspace") {
        network.attractors = [];
      } else if (code === "Space") {
        network.nodes = [];
      } else if (key === "r") {
        network.attractors = genAttractors();
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
    background: rgb(230, 230, 230);
  }
</style>

<svelte:window on:keydown={handleKeydown}/>

<h1 class="page-title">Space Explorer 2</h1>

<div class="canvasWrap">
  <p>Left click: Add Node</p>
  <p>Enter: Display/Hide All Attractors</p>
  <p>Mousemove: Generate Attractors around cursor</p>
  <p>Space: Remove all Nodes</p>
  <p>BackSpace: Remove all Attractors</p>
  <canvas bind:this={canvas} width={width} height={height} on:click={handleClick} on:mousemove={handleMousemove} />
</div>
