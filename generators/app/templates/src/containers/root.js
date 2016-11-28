import React from 'react';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../store';
import routes from './routes';

const stores = { store };
const history = syncHistoryWithStore(hashHistory, store);

const DevTools = global.DEBUG ? require('./devtools').default : () => null;

class Root extends React.PureComponent {
  render() {
    return (
      <Provider {...stores}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
