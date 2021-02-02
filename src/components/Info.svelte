<script>
  export let title;
  let open = false;

</script>

<style>
  .page {
    background: rgb(162, 218, 208);
    margin: 1rem;
    padding: 1rem;
    height: calc(100vh - 2rem);
    font-size: 1.2rem;
    font-weight: 200;
    display: grid;
    align-content: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 2rem);
  }
  button {
    letter-spacing: 0.1rem;
    position: fixed;
    top: 0;
    left: 6rem;
    z-index: 3;
  }
  .content {
    padding: 2rem;
    background: rgb(234, 235, 233);
    max-width: 80ch;
    overflow: auto;
  }
</style>

<button on:click={() => open = !open} class="btn bg-white">{title ?? 'Info'}</button>
{#if open}
<section class="page">
  <div class="content">
    <slot>
      
    </slot>
  </div>
</section>
{/if}