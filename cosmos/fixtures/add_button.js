import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import AddButton from '../../src/client/components/add_button';

export default {
  component: AddButton,
  props: {
    title: 'Record',
    onClick: () => { console.log('Clicked on the button'); },
  },
};
