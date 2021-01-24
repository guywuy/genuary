<script>
  import { roll, map, randomRGBA } from '../utils.js';

  let width = 100; 
  let height = 100;

  const options = [
    'rect',
    // 'path',
    'circle',
    'line',
    'polyline',
  ]

  const generate = {
    rect() {
      let w = roll(0, 50);
      let x = roll(0, width - (w/2));
      let h = roll(0, 50);
      let y = roll(0, height - (h/2));
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${generate.attributes()} />`
    },
    path() {
      return `<path />`
    },
    circle() {
      let r = roll(0, 50);
      let x = roll(0, width - (r/2));
      let y = roll(0, height - (r/2));
      return `<circle cx="${x}" cy="${y}" r="${r}" ${generate.attributes()} />`
    },
    line() {
      let x1 = roll(0, width);
      let y1 = roll(0, height);
      let x2 = roll(0, width);
      let y2 = roll(0, height);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${generate.attributes()} />`
    },
    polyline() {
      const numPoints = roll(0, 10);
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push(`${roll(0, width)}, ${roll(0, height)}`)
      }
      return `<polyline points="${points.join(' ')}" ${generate.attributes()} />`
    },
    attributes() {
      return `fill="${randomRGBA()}" stroke-width="${roll(1, 4)}" stroke="${randomRGBA()}"`;
    }
  }

  const generateShapes = () => {
    return [...Array(12)].map( m => {
      let shape = options[roll(0, options.length)];
      return generate[shape]();
    }).join('');
  }

</script>

<style>
  svg {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<h1 class="page-title">SVG Shapes</h1>

<svg viewbox={`0 0 ${width} ${height}`} width={1000} preserveAspectRatio="xMidYMid meet">
  {@html generateShapes()}
</svg>
