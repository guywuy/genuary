<script>
    import Photo from './components/Photo.svelte';
    import Svg from './components/Svg.svelte';
    // import Canvas from './components/Canvas.svelte';

    import imageUrl from './img/metro-steps_1000.jpg';
</script>

<style>
  .app {
      background: yellow;
  }
  .container {
    position: relative;
  }
</style>

<div class="app">
  <header>
    <h1>Hi</h1>
  </header>
  <main class="container">
    <Photo src={imageUrl} />
    <Svg />
    <!-- <Canvas /> -->
  </main>
</div>