// Linear Interpolation
// Also known as "lerp" or "mix"
export const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
}

export const degToRad = (degrees) => {
    return degrees * (Math.PI / 180);
  };

export const radToDeg = (rad) => {
    return rad / (Math.PI / 180);
};

export const dist = (x1, y1, x2, y2) => {
    return Math.hypot(x2 - x1, y2 - y1);
};

// value, in_min, in_max, out_min, out_max
export const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

export function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    // Scale css style to desired size
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

// Return a random integer or float between min and max
export function roll(min, max, floatFlag) {
    let r = Math.random() * (max - min) + min
    return floatFlag ? r : Math.floor(r)
}

// Return random rgba string
export function randomRGBA() {
    return `rgba(${roll(0, 255)}, ${roll(0, 255)}, ${roll(0, 255)}, ${Math.random().toFixed(2)})`;
}

// Return random rgb string
export function randomRGB() {
    return `rgba(${roll(0, 255)}, ${roll(0, 255)}, ${roll(0, 255)})`;
}

// Normal distribution - https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
export function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
    return num;
}