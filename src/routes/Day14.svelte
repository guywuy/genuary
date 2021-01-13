<script>
  import { onMount } from "svelte";

  // https://codecember.ink/2020/12

  // L System. Start with an axiom, 
  // rules to change the axiom string every iteration,
  // and a way of turning the finished string into lines

  const TAU = Math.PI * 2;

  class PenroseLSystem {
    constructor() {
      this.steps = 0;

      this.axiom = "[X]++[X]++[X]++[X]++[X]"; // These chars will get replaced by rule strings
      this.ruleW = "YF++ZF----XF[-YF----WF]++";
      this.ruleX = "+YF--ZF[---WF--XF]+";
      this.ruleY = "-WF++XF[+++YF++ZF]-";
      this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

      this.startLength = 820;
      this.theta = TAU / 10;

      this.complete = false;
      this.generations = 0;
      this.production = this.axiom;
      this.drawLength = this.startLength;
    }

    reset() {
      this.production = this.axiom;
      this.drawLength = this.startLength;
      this.generations = 0;
    }

    getAge() {
      return this.generations;
    }

    simulate(gen) {
      while (this.getAge() < gen) {
        this.iterate(this.production);
      }
    }

    // Build up the production string
    iterate(prod) {
      let newProduction = prod
      .split('')
      .map( c => {
        // Substitute character in string for rule if applicable
        if (c === 'W') {
          return this.ruleW
        } else if (c === 'X') {
          return this.ruleX
        } else if (c === 'Y') {
          return this.ruleY
        } else if (c === 'Z') {
          return this.ruleZ
        } else if (c !== 'F') {
            return c
        }
      })
      .join('');
      this.generations ++;
      this.drawLength = this.drawLength * 0.5;
      this.production = newProduction;
    }

    render(halfW, halfH, ctx) {
      if (this.complete) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // I don't know why this is necessary but it is
      ctx.translate(halfW, halfH);

      this.steps += 40;
      if (this.steps > this.production.length) {
        this.complete = true;
      }

      for (let i = 0; i < this.steps; ++i) {
        const c = this.production.charAt(i);

        if (c === '[') {
          // Next drawing state
          ctx.save();
        } else if (c === ']') {
          // Restore last drawing state
          ctx.restore();
        } else if (c === '+') {
          ctx.rotate(this.theta);
        } else if (c === '-') {
          ctx.rotate(-this.theta);
        } else if (c === 'F') {
          // Draw a line and move there
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -this.drawLength);
          ctx.stroke();
          ctx.translate(0, -this.drawLength);
        }
      }
    }
  }

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const halfW = width/2;
    const halfH = height/2;

    const pen = new PenroseLSystem();
    pen.simulate(6); // 6 Iterations of string substitution

    ctx.strokeStyle = `rgba(0, 0, 0, 0.06)`;

    let frame = requestAnimationFrame(draw);

    function draw(t) {
      requestAnimationFrame(draw);
      pen.render(halfW, halfH, ctx);
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });

</script>

<style>
  .canvasWrap {
    position: relative;
  }
  canvas {
    max-width: 100%;
    max-height: 100%;
    border: 1px solid sandybrown;
  }
</style>

<h1 class="page-title">Penrose L System</h1>
<div class="canvasWrap">
  <canvas bind:this={canvas} width={500} height={500} />
</div>
