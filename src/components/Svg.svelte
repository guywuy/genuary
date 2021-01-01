<script>

  const ran = () => Math.floor(Math.random() * 100);
  const gen5Points = () => new Array(5).fill(0).map( v => v = [ran(), ran(), ran()]);
  const gen100Points = () => new Array(100).fill(0).map( v => v = {x:ran(), y:ran(), z:ran()});

  // const genCubedArray = () => {
  //   let cube = [];
  //   for (let x = 0; x < 10; x++) {
  //     let arrX = [];
  //     for (let y = 0; y < 10; y++) {
  //       let arrY = [];
  //       for (let z = 0; z < 10; z++) {
  //         arrY.push(gen5Points());
  //       }
  //       arrX.push(arrY);
  //     }
  //     cube.push(arrX);
  //   };
  //   return cube;
  // }

  // let cube = genCubedArray();

  let array = gen100Points();
  console.log(array);
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    perspective: 500px;
    transform-style: preserve-3d;
    mix-blend-mode: difference;
  }

  svg ellipse {
    transform-origin: 50% 50% 0px;
  }
</style>

<svg viewbox="0 0 100 100" width={1000} height={667} preserveAspectRatio="xMidYMid meet">
{#each array as {x,y,z}, i}

  <ellipse cx={x} cy={y} rx={10} ry={10} fill={`hsl(${360*z*.1}, 100%, 50%)`} transform={`scale(${z*0.01})`}/>

{/each}
</svg>

