import React, { Component } from 'react';

import { saveAs } from 'file-saver';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

// import InputIcon from '@material-ui/icons/Input';
// import UploadIcon from '@material-ui/icons/Photo';
import ActionsIcon from '@material-ui/icons/Settings';
import Check from '@material-ui/icons/Check';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import CustomizeIcon from '@material-ui/icons/FormatColorFill';
import DownloadIcon from '@material-ui/icons/FileDownload';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import RandomizeIcon from '@material-ui/icons/Shuffle';
import StopIcon from '@material-ui/icons/Pause';

import Art from '../lib';

import { getRandom, invertColor } from './utils';

import './example.css';

class Example extends Component {
  state = {
    actions: false,
    custom: false,
    full: false,
    map: getRandom().map,
    palette: ['#21242b', '#61dafb', '#6d6d6d', '#292c34', '#fff'],
    stopped: false
  };

  componentDidMount() {
    this.draw();
  }

  actions = () => this.setState({ more: !this.state.actions });

  draw = () => {
    // just a trick for a smooth transition when re-drawing
    if (this.art.metadata().palette)
      document.body.style.background = this.art.metadata().palette[0];

    this.art.draw();

    this.setState({ palette: this.art.metadata().palette, stopped: false });
  };

  randomize = () => {
    const random = getRandom();

    this.setState({ map: random.map, palette: random.palette }, () =>
      this.draw()
    );
  };

  stop = () => {
    this.art.stop();

    this.setState({ stopped: true });
  };

  customize = () => this.setState({ custom: !this.state.custom });

  apply = () => this.setState({ custom: false }, () => this.draw());

  full = () => this.setState({ full: !this.state.full }, () => this.draw());

  download = () => {
    this.stop();

    this.art
      .ref()
      .toBlob(blob => saveAs(blob, `${this.art.metadata().seed}.png`));
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
    const size = 400;

    const icon = { className: 'icon' };

    return (
      <div className="container">
        {this.state.full ? (
          <Art
            map={this.state.map}
            palette={this.state.palette}
            ref={ref => (this.art = ref)}
          />
        ) : (
          <Paper
            className="canvas"
            square
            style={{ height: size, width: size }}>
            <Art
              height={size}
              map={this.state.map}
              palette={this.state.palette}
              ref={ref => (this.art = ref)}
              width={size}
            />
          </Paper>
        )}

        <div className="actions">
          <div>
            <Button onClick={this.actions}>
              <ActionsIcon {...icon} />
            </Button>

            {this.state.more && (
              <span className="more">
                <Button onClick={this.randomize}>
                  <RandomizeIcon {...icon} />
                </Button>

                <Button onClick={this.stop} disabled={this.state.stopped}>
                  <StopIcon {...icon} />
                </Button>

                <Button onClick={this.draw}>
                  <ColorLensIcon {...icon} />
                </Button>

                <Button onClick={this.customize}>
                  <CustomizeIcon {...icon} />
                </Button>

                {/* <Button onClick={this.input}>
                  <InputIcon {...icon} />
                </Button>

                <Button onClick={this.upload}>
                  <UploadIcon {...icon} />
                </Button> */}

                <Button onClick={this.full}>
                  <FullscreenIcon {...icon} />
                </Button>

                <Button onClick={this.download}>
                  <DownloadIcon {...icon} />
                </Button>
              </span>
            )}
          </div>

          {this.state.more &&
            this.state.custom && (
              <div className="palette">
                {this.renderPalette()}

                <Button onClick={this.apply}>
                  <Check {...icon} />
                </Button>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Example;
