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