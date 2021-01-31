<script>
  import Info from "../components/Info.svelte";
  // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

  const numX = 100;
  const numY = 80;
  let iteration = 0;
  let timer;
  let inProgress = false;

  let cells = [];

  for (let y = 0; y < numY; y++) {
    cells[y] = [];
    for (let x = 0; x < numX; x++) {
      cells[y].push(Math.random() > 0.5 ? 1 : 0);
    }
  }

  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  const evolveCells = (cellArr) => {
    iteration++;
    cells = cellArr.map((row, iY) => {
      return row.map((cell, iX) => {
        const left = iX === 0 ? 0 : row[iX - 1];
        const right = iX === numX - 1 ? 0 : row[iX + 1];
        const top = iY === 0 ? 0 : cellArr[iY - 1][iX];
        const bottom = iY === numY - 1 ? 0 : cellArr[iY + 1][iX];

        const tl = iY !== 0 && iX !== 0 && cellArr[iY - 1][iX - 1];
        const tr = iY !== 0 && iX !== numX - 1 && cellArr[iY - 1][iX + 1];
        const bl = iY !== numY - 1 && iX !== 0 && cellArr[iY + 1][iX - 1];
        const br =
          iY !== numY - 1 && iX !== numX - 1 && cellArr[iY + 1][iX + 1];

        const numLive = left + right + top + bottom + tl + tr + bl + br;

        return (numLive === 2 || numLive === 3) && cell === 1
          ? 1
          : numLive === 3 && cell === 0
          ? 1
          : 0;
      });
    });
  };

  const toggleEvolution = () => {
    inProgress
      ? clearInterval(timer)
      : (timer = setInterval(() => evolveCells(cells), 500));
    inProgress = !inProgress;
  };
</script>

<h1 class="page-title">Game of Life</h1>

<p>Iteration: {iteration}</p>
<button on:click={toggleEvolution} class="btn bg-white mg-btm"
  >{inProgress ? "Pause" : "Start"} evolution</button
>

<svg
  viewbox={`0 0 ${numX * 10} ${numY * 10}`}
  width={numX * 10}
  height={numY * 10}
  preserveAspectRatio="xMidYMid meet"
>
  {#each cells as row, i}
    {#each row as cell, num}
      <rect
        x={num * 10}
        y={i * 10}
        width={10}
        height={10}
        opacity={"1"}
        fill={cell ? "white" : "black"}
      />
    {/each}
  {/each}
</svg>

<Info>
  <h2>Conway's Game of Life</h2>
  <p>
    <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
      >Widipedia link</a
    >.
  </p>
  <ul>
    <li>Any live cell with two or three live neighbours survives.</li>
    <li>Any dead cell with three live neighbours becomes a live cell.</li>
    <li>
      All other live cells die in the next generation. Similarly, all other dead
      cells stay dead.
    </li>
  </ul>
</Info>

<style>
  svg {
    max-width: 100%;
    max-height: 100%;
    display: block;
    border: 1px solid sandybrown;
  }
</style>
