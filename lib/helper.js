export const COLORS = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

export const resizeCanvas = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

export const hexToRGBA = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5), 16);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

console.log(hexToRGBA(COLORS[0], 1));
