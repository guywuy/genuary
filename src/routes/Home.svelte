<script>
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