// adapted from: https://stackoverflow.com/questions/21034924/lighten-hex-code-in-javascript/21038522

const hex2 = (c) => {
  c = Math.round(c);
  if (c < 0) c = 0;
  if (c > 255) c = 255;

  let s = c.toString(16);
  if (s.length < 2) s = "0" + s;

  return s;
};

const color = (r, g, b) => {
  return "#" + hex2(r) + hex2(g) + hex2(b);
};

export const shade = (col, light) => {
  let r = parseInt(col.substr(1, 2), 16);
  let g = parseInt(col.substr(3, 2), 16);
  let b = parseInt(col.substr(5, 2), 16);

  if (light < 0) {
      r = (1 + light) * r;
      g = (1 + light) * g;
      b = (1 + light) * b;
  } else {
      r = (1 - light) * r + light * 255;
      g = (1 - light) * g + light * 255;
      b = (1 - light) * b + light * 255;
  }

  return color(r, g, b);
};