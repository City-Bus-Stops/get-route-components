import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TechnologiesPanel from '../src/components/TechnologiesPanel/TechnologiesPanel';

storiesOf('TechnologiesPanel', module)
  .add('Default TechnologiesPanel', () => (
    <TechnologiesPanel />
  ));
