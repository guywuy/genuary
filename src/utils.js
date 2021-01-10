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