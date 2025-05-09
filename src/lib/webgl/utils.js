import { randomNormal } from "d3";

import vert from "./vert.glsl?raw";
import frag from "./frag.glsl?raw";

import { shade } from "./color";

export const toWebGLCoordinates = (pos, width, height) => {
  const [x, y] = pos;
  const webGLX = (x / width) * 2 - 1;
  const webGLY = -((y / height) * 2 - 1);
  return [webGLX, webGLY];
};

export const hexToWebGLColor = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length !== 6) {
    throw new Error("Invalid hex color format. Expected #RRGGBB.");
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

export const createParticles = (
  regl,
  { n, width, height, origin, color }
) => {
  const particles = Array(n)
    .fill()
    .map(() => ({
      position: toWebGLCoordinates(origin, width, height),
      velocity: [
        Math.random() * 0.6 * 3,
        (Math.random() - 0.5) * 2,
      ],
      size: (Math.random() / 2 + 0.5) * height * Math.min(width, 500) * 0.002,
      color: hexToWebGLColor(shade(color, Math.random() - 0.5)),
      opacity: Math.random(),
      life: randomNormal(0.8, 0.05)(),
    }));

  const particleBuffer = regl.buffer(
    particles.map((p) => [
      p.position[0],
      p.position[1], // x, y
      p.velocity[0],
      p.velocity[1], // vx, vy
      p.opacity, // alpha factor
      p.color[0],
      p.color[1],
      p.color[2], // color
      p.size, // size
      p.life, // lifetime
    ])
  );
  return particleBuffer;
};

export const createDrawFunction = (regl) => {
  return regl({
    vert,
    frag,
    attributes: {
      position: {
        buffer: (_, props) => props.particles,
        stride: 40,
        offset: 0,
      },
      velocity: {
        buffer: (_, props) => props.particles,
        stride: 40,
        offset: 8,
      },
      opacity: {
        buffer: (_, props) => props.particles,
        stride: 40,
        offset: 16,
      },
      color: {
        buffer: (_, props) => props.particles,
        stride: 40,
        offset: 20,
      },
      size: {
        buffer: (_, props) => props.particles,
        stride: 40,
        offset: 32,
      },
      life: {
        buffer: (_, props) => props.particles,
        stride: 40,
        offset: 36,
      },
    },
    uniforms: {
      time: (_, props) => 10 + props.tick * 0.001,
      wind: (_, props) => [0, 0.3 * Math.sin(props.tick * 0.005)],
    },
    depth: {
      enable: false,
      mask: false,
    },
    blend: {
      enable: true,
      func: {
        srcRGB: "one",
        srcAlpha: "one",
        dstRGB: "one minus src alpha",
        dstAlpha: "one minus src alpha",
      },
    },
    count: (_, props) => props.n,
    primitive: "points",
  });
};
