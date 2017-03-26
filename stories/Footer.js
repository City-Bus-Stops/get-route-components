import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Footer from '../src/components/Footer/Footer';

storiesOf('Footer', module)
  .add('Default footer', () => (
    <div>
      <Footer />
    </div>
  ));
