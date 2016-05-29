import React from 'react';
import { render } from 'react-dom';
import debug from 'debug';

import Root from './containers/root';

const error = debug('app:error');

window.handleError = e => {
  error(e, e.stack);
};

Promise.onPossiblyUnhandledRejection(window.handleError);

window.onerror = (msg, url, line, column, e) => {
  window.handleError(e || new Error(`${msg}(${url}):${line}-${column}`));
};

try {
  render(<Root />, document.getElementById('app'));
} catch (e) {
  window.handleError(e);
}
