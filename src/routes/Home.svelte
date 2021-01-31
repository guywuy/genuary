<script>
    import Info from '../components/Info.svelte';
    import Photo from '../components/Photo.svelte';
    import imageUrl from '../img/metro-steps_1000.jpg';
</script>

<style>
    .home {
        display: grid;
        place-content: center;
        max-width: 80vw;
    }
</style>

<section class="home">
    <Photo src={imageUrl} />
</section>

<Info>
    <h2>31 Generative Art sketches</h2>
    <p>Every day in January, making a sketch using code. Mostly following prompts from [<a href="https://codecember.ink/2020/1/">Codecember</a>] and [<a href="https://genuary2021.github.io/prompts">Genuary</a>].</p>
    <p>The sketches probably won't run well on mobile, and might be CPU intensive, sorry.</p>
    <p>Source code is <a href="https://github.com/guywuy/genuary">on github</a></p>
    <p>I should optimise it for performance but in the meantime, if the browser slows down, refresh the page</p>
</Info>