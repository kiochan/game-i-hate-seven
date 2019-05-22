import { DeviceEventEmitter, AsyncStorage } from 'react-native'

import { newNumber } from './logic'

const eventName = {
  right: 'right',
  wrong: 'wrong',
  like: 'like',
  hate: 'hate',
}

const listener = {
  like () {
    DeviceEventEmitter.emit(eventName.like)
  },
  hate () {
    DeviceEventEmitter.emit(eventName.hate)
  }
}

export {
  eventName, listener
}
