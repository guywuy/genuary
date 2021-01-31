<script>
  import { link } from "svelte-spa-router";

  export let linkClick;

  const routes = [
    {
      route: "/",
      desc: "Home"
    },
    {
      route: "/1",
      desc: "1 - Triple Nested Loops"
    },
    {
      route: "/2",
      desc: "2 - Rule 30"
    },
    {
      route: "/3",
      desc: "3 - Canvas moving lines"
    },
    {
      route: "/4",
      desc: "4 - Canvas lines towards mouse"
    },
    {
      route: "/5",
      desc: "5 - Line becomes circle"
    },
    {
      route: "/6",
      desc: "6 - Unknown pleasures"
    },
    {
      route: "/7",
      desc: "7 - Peter de Jong Attractor"
    },
    {
      route: "/8",
      desc: "8 - Perlin Noise Fields"
    },
    {
      route: "/9",
      desc: "9 - Circle of arcs"
    },
    {
      route: "/10",
      desc: "10 - Time loops"
    },
    {
      route: "/11",
      desc: "11 - Triangular mesh"
    },
    {
      route: "/12",
      desc: "12 - Game of Life"
    },
    {
      route: "/13",
      desc: "13 - Wavy Hexagon"
    },
    {
      route: "/14",
      desc: "14 - Penrose L System"
    },
    {
      route: "/15",
      desc: "15 - Simple Particle System"
    },
    {
      route: "/16",
      desc: "16 - Simple Particle System - Taxicab Geometry"
    },
    {
      route: "/17",
      desc: "17 - Particle Trails"
    },
    {
      route: "/18",
      desc: "18 - Particle Waves"
    },
    {
      route: "/19",
      desc: "19 - Frozen Brush - Delaunay Triangles"
    },
    {
      route: "/20",
      desc: "20 - Negative Space Illusion"
    },
    {
      route: "/21",
      desc: "21 - Negative Space Illusion 2"
    },
    {
      route: "/22",
      desc: "22 - Negative Space Combination"
    },
    {
      route: "/23",
      desc: "23 - Noisey Worms"
    },
    {
      route: "/24",
      desc: "24 - Noise Planet"
    },
    {
      route: "/25",
      desc: "25 - Noise Planet 2"
    },
    {
      route: "/26",
      desc: "26 - Negative Space Triangles Cones"
    },
    {
      route: "/27",
      desc: "27 - SVG Shapes"
    },
    {
      route: "/28",
      desc: "28 - SVG Path Generation"
    },
    {
      route: "/29",
      desc: "29 - Greyscale Gradients",
    },
    {
      route: "/30",
      desc: "30 - Space Explorer 1"
    },
    // {
    //   route: "/31",
    //   desc: "31 - "
    // },
  ];
</script>

<style>
  .page {
    background: rgb(216, 216, 0);
    margin: 1rem;
    padding: 1rem;
    height: calc(100vh - 2rem);
    font-size: 1.2rem;
    font-weight: light;
    display: grid;
    align-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  nav {
    height: 100%;
    overflow: auto;
  }
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    columns: 300px 2;
  }
  li {
    margin-bottom: 1rem;
  }
</style>

<section class="page" id="nav">
  <nav>
    <ol>
      {#each routes as {route, desc}}
        <li>
          <a href={route} use:link on:click={linkClick}>{desc}</a>
        </li>
      {/each}
    </ol>
  </nav>
</section>
