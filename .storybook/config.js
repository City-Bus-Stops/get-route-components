import { configure } from '@kadira/storybook';

import '../node_modules/semantic-ui/dist/semantic.min.css';
import '../public/css/index.css';
import 'leaflet/dist/leaflet.css';

const componentsStories = require.context('../stories/', true, /.js$/);

function loadStories() {
  componentsStories.keys().forEach((filename) => componentsStories(filename));
}

configure(loadStories, module);
