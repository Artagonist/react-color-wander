import createLoop from 'raf-loop';

import createConfig from './createConfig';
import createRenderer from './createRenderer';

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const background = new window.Image();

const loop = createLoop();

const reload = config => {
  loop.stop();

  const opts = Object.assign(
    {},
    {
      backgroundImage: background,
      context
    },
    config
  );

  const pixelRatio = typeof opts.pixelRatio === 'number' ? opts.pixelRatio : 1;

  canvas.width = opts.width * pixelRatio;
  canvas.height = opts.height * pixelRatio;

  // document.body.style.background = opts.palette[0];

  background.onload = () => {
    const renderer = createRenderer(opts);

    if (opts.debugLuma) renderer.debugLuma();
    else {
      renderer.clear();

      let stepCount = 0;

      loop.on('tick', () => {
        renderer.step(opts.interval);

        stepCount += 1;

        if (!opts.endlessBrowser && stepCount > opts.steps) loop.stop();
      });

      loop.start();
    }
  };

  background.src = config.backgroundSrc;
};

// resize and reposition canvas to form a letterbox view
const letterbox = (element, parent) => {
  const el = element;

  const aspect = el.width / el.height;
  const pwidth = parent[0];
  const pheight = parent[1];

  const width = pwidth;
  const height = Math.round(width / aspect);
  const y = Math.floor(pheight - height) / 2;

  el.style.top = `${y}px`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
};

const resize = () => letterbox(canvas, [window.innerWidth, window.innerHeight]);

const draw = () => {
  reload(createConfig());
  resize();
};

draw();
