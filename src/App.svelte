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
  };

  const toggleMenu = () => showMenu = !showMenu;

</script>

<style>
  .app>main {
    background: rgb(209, 209, 167);
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
    z-index: 1;
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