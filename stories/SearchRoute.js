import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SearchRoute from '../src/components/SearchRoute/SearchRoute';

storiesOf('SearchRoute', module)
  .add('Default searchRoute', () => (
    <SearchRoute />
  ));
