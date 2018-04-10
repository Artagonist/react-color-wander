# react-color-wander

[![npm version](https://badge.fury.io/js/react-color-wander.svg)](https://badge.fury.io/js/react-color-wander)

# Installation

`yarn add react-color-wander`

# Usage

```javascript
import Art from 'react-color-wander';

<Art
  ref={ref => (this.art = ref)}
  maps={[require('./map.png')]}
  palettes={[['red,', 'green', 'blue']]}
  // seed="259022"
  // height={600} // default = innerHeight
  // width={800} // default = innerWidth
/>;

// to start drawing
this.art.draw();

// to stop drawing
this.art.stop();

// to get drawing dataURL (image/png)
this.art.data();

// to get some metadata
this.art.metadata();

// to get a ref. to the canvas
this.art.ref();

// hint: in Chrome, you can right-click the canvas and "Save As"
```

## Example

[![Edit r1ywx7978m](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/r1ywx7978m)

Available [here](https://github.com/sonaye/react-color-wander/tree/master/src/example).
