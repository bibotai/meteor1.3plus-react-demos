import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import App from './app.jsx';

Meteor.startup(() => {
  console.log('aaa');
  render(<App />, document.getElementById('render-target'));
});
