# react-color-wander

[![npm version](https://badge.fury.io/js/react-color-wander.svg)](https://badge.fury.io/js/react-color-wander)

# Installation

`yarn add react-color-wander`

# Usage

```javascript
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

// hint: in Chrome, you can right-click the canvas and "Save As"
```

## Example

[![Edit 0](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0)

Available [here](https://github.com/sonaye/react-color-wander/tree/master/src/example).
