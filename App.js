/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'

type Props = {}

export default class App extends Component<Props> {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Text style={{}}>Welcome to React Native!</Text>
        </PersistGate>
      </Provider>
    )
  }
}
