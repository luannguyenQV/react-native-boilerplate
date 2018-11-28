import React from 'react'
import {
  View
} from 'react-native'

export default class MainPage extends React.PureComponent {
  render () {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
      </View>
    )
  }
}
