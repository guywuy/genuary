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