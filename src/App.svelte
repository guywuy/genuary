<script>
  import Router from 'svelte-spa-router';
  import {fade} from 'svelte/transition'
  import Menu from './components/Menu.svelte';
  import Home from './routes/Home.svelte';
  import Day1 from './routes/Day1.svelte';
  import Day2 from './routes/Day2.svelte';
  import Day3 from './routes/Day3.svelte';
  import Day4 from './routes/Day4.svelte';
  import Day5 from './routes/Day5.svelte';
  import Day6 from './routes/Day6.svelte';
  import Day7 from './routes/Day7.svelte';
  import Day8 from './routes/Day8.svelte';
  import Day9 from './routes/Day9.svelte';
  import Day10 from './routes/Day10.svelte';
  import Day11 from './routes/Day11.svelte';
  import Day12 from './routes/Day12.svelte';
  import Day13 from './routes/Day13.svelte';
  import Day14 from './routes/Day14.svelte';
  import Day15 from './routes/Day15.svelte';
  import Day16 from './routes/Day16.svelte';
  import Day17 from './routes/Day17.svelte';
  import Day18 from './routes/Day18.svelte';
  import Day19 from './routes/Day19.svelte';
  import Day20 from './routes/Day20.svelte';
  import Day21 from './routes/Day21.svelte';
  import Day22 from './routes/Day22.svelte';
  import Day23 from './routes/Day23.svelte';
  import Day24 from './routes/Day24.svelte';
  import Day25 from './routes/Day25.svelte';
  import Day26 from './routes/Day26.svelte';
  import Day27 from './routes/Day27.svelte';
  import Day28 from './routes/Day28.svelte';
  import Day29 from './routes/Day29.svelte';
  import Day30 from './routes/Day30.svelte';
  import Day31 from './routes/Day31.svelte';

  let showMenu = false;

  const routes = {
    '/': Home,
    '/1': Day1,
    '/2': Day2,
    '/3': Day3,
    '/4': Day4,
    '/5': Day5,
    '/6': Day6,
    '/7': Day7,
    '/8': Day8,
    '/9': Day9,
    '/10': Day10,
    '/11': Day11,
    '/12': Day12,
    '/13': Day13,
    '/14': Day14,
    '/15': Day15,
    '/16': Day16,
    '/17': Day17,
    '/18': Day18,
    '/19': Day19,
    '/20': Day20,
    '/21': Day21,
    '/22': Day22,
    '/23': Day23,
    '/24': Day24,
    '/25': Day25,
    '/26': Day26,
    '/27': Day27,
    '/28': Day28,
    '/29': Day29,
    '/30': Day30,
    '/31': Day31,
  };

  const toggleMenu = () => showMenu = !showMenu;

</script>

<style>
  .app>main {
    background: rgb(216, 216, 216);
    margin: 1rem;
    padding: 1rem;
    min-height: calc(100vh - 2rem);
    display: grid;
    place-content: center;
    position: relative;
  }
  .menu-button {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }
</style>

<div class="app">
  <main>
    <Router {routes} restoreScrollState={true}/>
  </main>
  {#if showMenu}
    <div transition:fade>
      <Menu linkClick={toggleMenu}/>
    </div>
  {/if}
  <button class="menu-button btn bg-white" on:click={toggleMenu}>{showMenu ? 'Close' : 'Show'} Menu</button>
</div>