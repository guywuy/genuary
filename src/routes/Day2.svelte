<script>
  // https://en.wikipedia.org/wiki/Rule_30

  const numCells = 81;
  let iteration = 0;

  const cells = [[]];

  for (let x = 0; x<numCells; x++) {
    cells[iteration].push(x === Math.floor(numCells/2) ? 1 : 0);
  }

  const nextIteration = () => {
    // Copy current iteration to new array
    let currentIterationCopy = [...cells[iteration]];
    cells[iteration + 1] = evolveCells(currentIterationCopy);
    iteration++;
  }

  const evolveCells = (cellArray) => {
    return cellArray.map( (cell, index) => {
      const left = index === 0 ? 0 : cells[iteration][index - 1];
      const right = (index === numCells - 1) ? 0 : cells[iteration][index + 1];
      // console.log(left, cell, right, left ^ (right | cell));

      // [left_cell XOR (central_cell OR right_cell)]
      return left ^ (right | cell)
    } )
  }

  const handleCellClick = (i, x) => {
    cells[i][x] = cells[i][x] === 0 ? 1 : 0;
    iteration = i;
  }
</script>

<style>
  svg {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<h1 class="page-title">Rule 30</h1>

<button on:click={nextIteration} class="btn bg-white mg-btm">Next</button>

<svg viewbox={`0 0 ${numCells*10} ${iteration > numCells ? iteration*10 : numCells*10}`} width={1100} preserveAspectRatio="xMidYMid meet">
{#each cells as generation, i}
  {#each generation as cell, num}
    <rect x={num*10} y={i*10} width={10} height={10} opacity={iteration < i ? '0.6' : '1'} fill={cell ? 'white' : 'black'} on:click={() => handleCellClick(i, num)}/>
  {/each}
{/each}
</svg>
