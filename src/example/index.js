import React, { Component, Fragment } from 'react';

import maps from './maps';

import Art from '../lib';

import { getRandomPalette, downloadArt, invertColor } from './utils';

import './example.css';

class Example extends Component {
  state = {
    custom: false,
    more: false,
    palette: ['#21242b', '#61dafb', '#6d6d6d', '#292c34', '#fff']
  };

  componentDidMount() {
    this.draw();
  }

  draw = () => {
    // just a trick for a smooth transition when re-drawing
    if (this.art.metadata().palette) {
      document.body.style.background = this.art.metadata().palette[0];
    }

    this.art.draw();
    console.log(this.art.metadata());
    this.setState({ palette: this.art.metadata().palette });
  };

  stop = () => this.art.stop();

  randomize = () =>
    this.setState({ palette: getRandomPalette() }, () => this.draw());

  customize = () => this.setState({ custom: !this.state.custom });

  show = () => this.setState({ more: !this.state.more });

  download = () => {
    this.stop();

    downloadArt(this.art.data(), this.art.metadata().seed);
  };

  update = (i, color) => {
    const newPallete = this.state.palette;
    newPallete[i] = color;
    this.setState({ palette: newPallete });
  };

  renderPalette = () => {
    if (!this.state.palette) return null;

    return this.state.palette.map((color, i) => (
      <input
        key={i}
        onChange={e => this.update(i, e.target.value)}
        style={{
          backgroundColor: this.state.palette[i],
          color: invertColor(this.state.palette[i])
        }}
        value={this.state.palette[i]}
      />
    ));
  };

  render() {
    return (
      <Fragment>
        <Art
          ref={ref => (this.art = ref)}
          {...{ maps }}
          palettes={[this.state.palette]}
          // seed="716680"
          // height={600}
          // width={800}
        />

        <div className="actions">
          <div>
            <button onClick={this.show}>
              <i className="mdi mdi-wrench" />
            </button>

            {this.state.more && (
              <span className="more">
                <button onClick={this.draw}>
                  <i className="mdi mdi-play" />
                </button>

                <button onClick={this.stop}>
                  <i className="mdi mdi-pause" />
                </button>

                <button onClick={this.randomize}>
                  <i className="mdi mdi-shuffle" />
                </button>

                <button onClick={this.customize}>
                  <i className="mdi mdi-format-color-fill" />
                </button>

                <button onClick={this.download}>
                  <i className="mdi mdi-download" />
                </button>
              </span>
            )}
          </div>

          {this.state.more &&
            this.state.custom && (
              <div className="palette">{this.renderPalette()}</div>
            )}
        </div>
      </Fragment>
    );
  }
}

export default Example;
