import React, { Component } from 'react';
import Stack from './Stack';
import { Provider } from 'react-redux';
import store from './store/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}

export default App;
