<script>
  import { link } from "svelte-spa-router";
  export let num;
</script>

<style>
  a {
    display: grid;
    place-content: center;
    height: 100%;
    position: relative;
  }
  a:hover {
    box-shadow: 0 0 0 2px var(--primary);
  }
  a:focus:after,
  a:hover:after {
    position: absolute;
    display: grid;
    place-content: center;
    width: 100%;
    height: 100%;
    content: attr(data-num);
    font-size: 6rem;
    text-decoration: none;
    color: white;
    text-shadow: 0 0 2px yellow;
    filter: drop-shadow(0 0 2px var(--primary));
  }
  img {
    max-width: 100%;
    display: block;
    max-height: 250px;
    object-fit: contain;
  }
</style>
<a href={`/${num}`} use:link data-num={num}>
  <img src={`/img/thumbs/thumb_${num}.png`} alt="Screenshot of sketch" loading="lazy">
</a>