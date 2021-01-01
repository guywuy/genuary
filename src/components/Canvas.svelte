<script>
  import { onMount } from "svelte";
  import imageUrl from "../img/metro-steps_1000.jpg";

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    const brightnessThreshold = 600;
    let brightPixels = [];

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      getBrightPixels();
    };
    img.src = imageUrl;

    let frame = requestAnimationFrame(loop);

    function getBrightPixels() {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;
      for (let p = 0; p < data.length; p += 4) {
        const i = p / 4;
        const x = i % canvas.width;
        const y = (i / canvas.height) >>> 0;

        const brightness = data[p] + data[p + 1] + data[p + 2];
        const isBright = brightness >= brightnessThreshold;

        if (isBright) {
          brightPixels.push(p);
        }
      }
    }

    function loop(t) {
      frame = requestAnimationFrame(loop);

      if (!brightPixels.length) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;
      const tMod = Math.floor(t / 100);

      brightPixels.forEach(p => {
        const i = p / 4;
        const x = i % canvas.width;
        const y = (i / canvas.height) >>> 0;


        let neighbourLeft = p - 4*tMod;
        let neighbourRight = p + 4*tMod;
        let neighbourTop = p - (canvas.width * 4);
        let neighbourBottom = p + (canvas.width * 4);

        // const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000);
        // const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1000);
        // const b = 128;

        // data[p + 0] = r;
        // data[p + 1] = g;
        // data[p + 2] = b;
        data[neighbourLeft + 0] = data[p + 0]; // Make left pixel R the same as p
        data[neighbourRight + 1] = data[p + 1]; // Make right pixel G the same as p
        data[neighbourBottom + 2] = data[p + 2]; // Make Bottome pixel B the same as p
        data[neighbourTop + 2] = data[p + 2]; // Make Top pixel B the same as p
        // data[p + 1] = g;
        // data[p + 2] = b;
      });

      ctx.putImageData(imageData, 0, 0);
    }

    return () => {
      cancelAnimationFrame(frame);
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
