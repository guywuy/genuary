<script>
  // https://en.wikipedia.org/wiki/Rule_30

  const numCells = 61;
  let iteration = 0;

  class Cell {

    constructor(index, alive) {
      this.index = index;
      this.alive = alive;
    }

    getLeftState() {
      if (this.index === 0) return false;
      return cells[iteration][this.index - 1].alive;
    }

    getRightState() {
      if (this.index === numCells - 1) return false;
      return cells[iteration][this.index + 1].alive;
    }

    getThisOrRight() {
      return this.alive || this.getRightState();
    }

    // Next state, based on [left_cell XOR (central_cell OR right_cell)]
    evolve() {
      this.alive = this.getLeftState() ? !this.getThisOrRight() : this.getThisOrRight();
    }
  }

  const cells = [[]];

  for (let x = 0; x<numCells; x++) {
    const C = new Cell(x, x === Math.floor(numCells/2) ? true : false);
    cells[iteration].push(C);
  }

  const nextIteration = () => {
    // Copy current iteration to new array
    let currentIterationCopy = cells[iteration].map(cell => new Cell(cell.index, cell.alive));
    cells[iteration + 1] = evolveCells(currentIterationCopy);
    console.log(cells);
    iteration++;
  }

  const evolveCells = (cellArray) => {
    cellArray.forEach(cell => cell.evolve());
    return cellArray;
  }

  const handleCellClick = (i, x) => {
    cells[i][x].alive = !cells[i][x].alive;
    iteration = i;
  }
</script>

<style>
  svg {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<button on:click={nextIteration} class="btn bg-white mg-btm">Next</button>

<svg viewbox={`0 0 ${numCells*10} ${iteration > numCells ? iteration*10 : numCells*10}`} width={1100} preserveAspectRatio="xMidYMid meet">
{#each cells as generation, i}
  {#each generation as cell}
    <rect x={cell.index*10} y={i*10} width={10} height={10} opacity={iteration < i ? '0.6' : '1'} fill={cell.alive ? 'white' : 'black'} on:click={() => handleCellClick(i, cell.index)}/>
  {/each}
{/each}
</svg>
