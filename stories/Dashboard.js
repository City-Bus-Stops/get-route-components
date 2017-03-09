import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Dashboard from '../src/components/Dashboard';

storiesOf('Dashboard', module)
  .add('Default Dashboard', () => (
    <Dashboard />
  ));
