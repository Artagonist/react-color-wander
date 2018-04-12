import React, { Component, Fragment } from 'react';

import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

import Art from '../lib';
import IconBtn from './IconBtn';
// import Fade, { FadeItem } from './Fade';

import { invert, getRandom } from './utils';

import './example.css';

class Example extends Component {
  state = {
    custom: false,
    full: false,
    map: getRandom().map,
    more: false,
    palette: ['#21242b', '#61dafb', '#6d6d6d', '#292c34', '#fff'],
    stopped: false
  };

  componentDidMount() {
    this.draw();
  }

  more = () => this.setState({ more: !this.state.more });

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

  renderArt = () => {
    if (this.state.full) {
      return (
        <Art
          map={this.state.map}
          palette={this.state.palette}
          ref={ref => (this.art = ref)}
        />
      );
    }

    const size = 512;

    return (
      <Canvas {...{ size }}>
        <Art
          height={size}
          map={this.state.map}
          palette={this.state.palette}
          ref={ref => (this.art = ref)}
          width={size}
        />
      </Canvas>
    );
  };

  renderPalette = () => {
    if (!this.state.palette) return null;

    return this.state.palette.map((color, i) => (
      <Input
        onChange={e => this.update(i, e.target.value)}
        style={{
          backgroundColor: this.state.palette[i],
          color: invert(this.state.palette[i])
        }}
        value={this.state.palette[i]}
      />
    ));
  };

  render() {
    // <IconBtn name="Input" onClick={this.input} />
    // <IconBtn name="Photo" onClick={this.upload} />

    const { more, stopped, custom } = this.state;

    return (
      <Container>
        {this.renderArt()}

        <Actions>
          <div>
            <IconBtn name="Settings" onClick={this.more} />

            {more && (
              <Fragment>
                <IconBtn name="Shuffle" onClick={this.randomize} />
                <IconBtn name="Pause" onClick={this.stop} disabled={stopped} />
                <IconBtn name="ColorLens" onClick={this.draw} />
                <IconBtn name="FormatColorFill" onClick={this.customize} />
                <IconBtn name="Fullscreen" onClick={this.full} />
                <IconBtn name="FileDownload" onClick={this.download} />
              </Fragment>
            )}
          </div>

          {more &&
            custom && (
              <Palette>
                {this.renderPalette()}

                <IconBtn name="Check" onClick={this.apply} />
              </Palette>
            )}
        </Actions>
      </Container>
    );
  }
}

const Actions = styled.div`
  left: 10px;
  position: absolute;
  top: 10px;
`;

const Palette = styled.div`
  margin-left: 240px;
`;

const Canvas = styled(props => <Paper square {...props} />)`
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1) !important;
  height: ${props => props.size}px;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Input = styled.input`
  border: none;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  font-family: 'Open Sans';
  height: 40px;
  margin: 10px;
  opacity: 0.75;
  outline: 0;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  width: 60px;
  &:hover {
    opacity: 1;
  }
`;

export default Example;
