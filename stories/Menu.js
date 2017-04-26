import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Menu from '../src/components/Menu/Menu';

storiesOf('Menu', module)
  .add('Default menu', () => (
    <Menu
      pathname="search-route"
      userName="Denis Krivichanin"
    />
  ));
