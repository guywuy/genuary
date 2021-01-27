<script>
  import { roll, randomRGB } from '../utils.js';

  // Generate a path with various amount of stops,
  // with straight lines and curves.
  // Use dash offset and css keyframes to animate.

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

  // MoveTo: M, m
  // LineTo: L, l, H, h, V, v
  // Cubic Bézier Curve: C, c, S, s
  // Quadratic Bézier Curve: Q, q, T, t
  // Elliptical Arc Curve: A, a
  // ClosePath: Z, z

  // lowercase moves RELATIVE to last position. Let's use that.

  let width = 100; 
  let height = 100;
  let path = '';
  let numPaths = 5;

  const options = [
    // 'M',
    // 'L',
    // 'H',
    // 'V',
    // 'C',
    // 'S',
    // 'Q',
    // 'T',
    'm',
    'l',
    'h',
    'v',
    'c',
    's',
    'q',
    't',
  ]

  const paramMap = {
    // 'M': 1,
    // 'L': 1,
    // 'H': 1,
    // 'V': 1,
    // 'C': 3,
    // 'S': 2,
    // 'Q': 2,
    // 'T': 1,
    'm': 1,
    'l': 1,
    'h': 1,
    'v': 1,
    'c': 3,
    's': 2,
    'q': 2,
    't': 1,
  }

  const generate = {
    path() {
      let d = [];
      d.push(`M 50,50`);
      // Push random amount of `[command] [parameters]`
      const numCommands = roll(3, 23);

      for (let i = 0; i < numCommands; i++) {
        let command = options[roll(0, options.length)]; // Choose a command
        let paramPairsNeeded = paramMap[command]; // How many params do we need

        let distLimit = 20;
        let params = [...Array(paramPairsNeeded)].map(p => {
          return `${roll(-distLimit, distLimit)},${roll(-distLimit, distLimit)}`
        });

        d.push(`${command} ${params}`); // Add the command and params to array
      }

      if (Math.random() > 0.5) d.push('z'); // Maybe close the path or don't
      return `<path class="path" d="${d.join(' ')}" ${generate.attributes()} />`
    },
    attributes() {
      return `fill="none" stroke-width="${roll(1, 4)}" stroke="${randomRGB()}" stroke-linecap="${Math.random() > 0.5 ? 'round' : 'square'}" pathLength="1"`;
    }
  }

  const generatePaths = (n) => {
    let p = '';
    for (let i = 0; i < n; i++) {
      p += generate.path();
    }
    return p;
  }

  path = generatePaths(numPaths);
</script>

<style>
  svg {
    max-width: 100%;
    max-height: 100%;
    background-color: ghostwhite;
    border: 1px solid ghostwhite;
  }
  .controls {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.path) {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
    animation: draw 5s linear alternate infinite;
  }
</style>

<h1 class="page-title">SVG Path Generation</h1>

<div class="controls">
  <div>
      <label for="numPaths">Number of Paths:</label>
      <span>{numPaths}</span>
      <input type="range" name="numPaths" id="numPaths" bind:value={numPaths} step="1" min="1" max="10" on:change={() => path = generatePaths(numPaths)}>
  </div>
</div>
<svg viewbox={`0 0 ${width} ${height}`} width={1000} preserveAspectRatio="xMidYMid meet">
  {@html path}
</svg>
