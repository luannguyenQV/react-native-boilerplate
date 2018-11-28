/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './src/store'
import Router from './src/route'

type Props = {}

export default class App extends Component<Props> {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    )
  }
}
