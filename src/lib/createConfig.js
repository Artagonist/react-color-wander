import seedRandom from 'seed-random';

import createPalette from './createPalette';
import createRange from './createRange';

import maps from '../example/maps';
import palettes from '../example/palettes';

export default (seed = String(Math.floor(Math.random() * 1000000))) => {
  // eslint-disable-next-line
  console.log('seed:', seed);

  const randomFunc = seedRandom(seed);
  const random = createRange(randomFunc);

  const mapSrc = maps[Math.floor(random(maps.length))];
  // eslint-disable-next-line
  console.log('map:', mapSrc);

  return {
    // rendering opts
    count: Math.floor(random(50, 2000)),
    endlessBrowser: false, // whether to endlessly step in browser
    globalAlpha: 0.5,
    interval: random(0.001, 0.01),
    lineStyle: random(1) > 0.5 ? 'round' : 'square',
    maxRadius: random(5, 100),
    noiseScalar: [random(0.000001, 0.000001), random(0.0002, 0.004)],
    pointilism: random(0, 0.1),
    random: randomFunc,
    seedName: seed,
    startArea: random(0.0, 1.5),
    steps: Math.floor(random(100, 1000)),

    // background image that drives the algorithm
    backgorundFill: 'black',
    backgroundScale: 1,
    backgroundSrc: mapSrc,
    debugLuma: false,

    // browser options
    height: window.innerHeight * 2,
    palette: createPalette(palettes, random),
    pixelRatio: 1,
    width: window.innerWidth * 2
  };
};
