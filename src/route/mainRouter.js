/**
 * @flow
 */
import {
  Easing,
  Animated
} from 'react-native'
import { createStackNavigator } from 'react-navigation'

import SCREENS from './screens'
import {
  DashboardScreen,
  SettingScreen,
  AboutScreen
} from '../screens'

export default createStackNavigator(
  {
    [SCREENS.DASHBOARD]: { screen: DashboardScreen },
    [SCREENS.SETTING]: { screen: SettingScreen },
    [SCREENS.ABOUT]: { screen: AboutScreen }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        })

        return { opacity, transform: [{ translateY }] }
      }
    })
  }
)
