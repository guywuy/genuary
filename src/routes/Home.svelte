<script>
    import Info from '../components/Info.svelte';
    import Thumb from '../components/Thumb.svelte';
    let nums = [...Array(31)].map( (_, i) => i + 1);
</script>

<style>
    h1 {
        color: var(--primary);
        text-decoration: underline;
        text-decoration-style: wavy;
        text-underline-offset: 0.5rem;
        letter-spacing: 0.1rem;
        margin-bottom: 3rem;
    }
    .home {
        text-align: center;
        width: 100%;
        max-width: 80vw;
    }
    .thumbs {
        margin: 0;
        padding: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat( auto-fit, 250px );
        list-style: none;
        justify-content: center;
        gap: 0.5rem;
    }
</style>

<section class="home">
    <h1>31 Small Creative Code sketches</h1>
    <ul class="thumbs">
        {#each nums as num}
        <li class="thumb">
            <Thumb num={num} />
        </li>
        {/each}
    </ul>
    <!-- <Photo src={imageUrl} /> -->
</section>

<Info title="About">
    <h2>31 Generative Art sketches</h2>
    <p>Every day in January, making a sketch using code. Mostly following prompts from [<a href="https://codecember.ink/2020/1/">Codecember</a>] and [<a href="https://genuary2021.github.io/prompts">Genuary</a>].</p>
    <p>The sketches probably won't run well on mobile, and might be CPU intensive, sorry.</p>
    <p>Source code is <a href="https://github.com/guywuy/genuary">on github</a></p>
    <p>I should optimise it for performance but in the meantime, if the browser slows down, refresh the page</p>
</Info>