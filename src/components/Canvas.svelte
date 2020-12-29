<script>
  import { onMount } from "svelte";
  import imageUrl from '../img/metro-steps_1000.jpg';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }
    img.src = imageUrl;
    console.log(img);
    // let frame = requestAnimationFrame(loop);

    function loop(t) {
      // frame = requestAnimationFrame(loop);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (let p = 0; p < imageData.data.length; p += 4) {
        const i = p / 4;
        const x = i % canvas.width;
        const y = (i / canvas.height) >>> 0;
        // console.log(p, i, x, y);

        // const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000);
        // const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1000);
        // const b = 128;

        // imageData.data[p + 0] = r;
        // imageData.data[p + 1] = g;
        // imageData.data[p + 2] = b;
        // imageData.data[p + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    return () => {
      // cancelAnimationFrame(frame);
    };
  });
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
  }
</style>

<canvas bind:this={canvas} width={1000} height={667} />
