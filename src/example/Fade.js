import React from 'react';

import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const timeout = 500;

const Item = styled(props => (
  <CSSTransition
    timeout={timeout}
    unmountOnExit
    {...props}
    classNames={{
      appear: 'appear',
      appearActive: 'appear-active',
      enter: 'enter',
      enterActive: 'enter-active',
      exit: 'exit',
      exitActive: 'exit-active'
    }}
  />
))`
  &.appear {
    opacity: 0;
  }
  &.appear-active {
    opacity: 1;
    transition: opacity ${timeout}ms ease-in;
  }
  &.enter {
    opacity: 0;
  }
  &.enter-active {
    opacity: 1;
    transition: opacity ${timeout}ms ease-in;
  }
  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    transition: opacity ${timeout}ms ease-out;
  }
`;

export { TransitionGroup as default, Item as FadeItem };

// <Fade>
//   <FadeItem />
//   <FadeItem />
//   <FadeItem />
// </Fade>
