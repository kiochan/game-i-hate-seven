import React from 'react'
import { View, DeviceEventEmitter, AsyncStorage } from 'react-native'
import { Appbar, Button, Text } from 'react-native-paper'

import styles from '../styles'
import getText from '../getText'
import { isRightNumber, newNumber } from '../logic'
import { eventName, listener } from '../events'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.listener = {}
    this.state = {
      number: 0,
      right: 0,
      wrong: 0
    }
  }

  newGame () {
    this.setState({
      number: newNumber()
    })
  }

  check (like) {
    const isN = isRightNumber(this.state.number)
    if (like === isN) {
      this.setState({
        right: this.state.right + 1
      })
    } else {
      this.setState({
        wrong: this.state.wrong + 1
      })
    }
    const d = JSON.stringify({
      right: this.state.right,
      wrong: this.state.wrong
    })
    AsyncStorage.setItem('data', d)
    this.newGame()
  }

  componentDidMount () {
    AsyncStorage.getItem('data', (error, result) => {
      const res = JSON.parse(result)
      if (error || !result || result === null || res === null) {
        DeviceEventEmitter.emit('setInit', {
          right: 0,
          wrong: 0
        })
      } else {
        DeviceEventEmitter.emit('setInit', {
          right: res.right,
          wrong: res.wrong
        })
      }
      this.listener = {
        like: DeviceEventEmitter.addListener(eventName.like, () => {
          this.check(true)
        }),
        hate: DeviceEventEmitter.addListener(eventName.hate, () => {
          this.check(false)
        }),
        init: DeviceEventEmitter.addListener('setInit', () => {
          this.setState({
            right: res.right,
            wrong: res.wrong
          })
          this.newGame()
        })
      }
    })
    this.newGame()
  }

  componentWillUnmount () {
    for (let l in this.listener) {
      if (object.hasOwnProperty(l)) {
        this.listener[l].remove()
      }
    }
  }

  render () {
    const s = this.state
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content
            title={getText('title')}
            subtitle={getText('titleSub')}
          />
        </Appbar.Header>
        <View style={[styles.center, styles.flex1]}>
          <Text style={styles.intro}>{getText('intro')}</Text>
        </View>
        <View style={[styles.center, styles.flex1]}>
          <Text style={styles.number}>{(s.number === 0 ? 'INIT' : s.number)}</Text>
        </View>
        <View style={[styles.center, styles.flex1]}>
          <Text style={styles.intro}>{getText('then')}</Text>
        </View>
        <View style={[styles.center, styles.flex1]}>
          <View style={styles.row}>
            <Button mode="contained" style={styles.actionButton} onPress={listener.like}>
              {getText('fine')}
            </Button>
            <Button mode="contained" style={styles.actionButton} onPress={listener.hate}>
              {getText('hate')}
            </Button>
          </View>
        </View>
        <View style={[styles.center, styles.flex1]}>
          <Text>{getText('outro')}</Text>
          <Text>{
            getText(
              'result', s.right, s.wrong,
              (
                s.right / (
                  ((s.right + s.wrong) > 0 ) ?
                  (s.right + s.wrong) : 1
                )
              )
            )
          }</Text>
        </View>
      </View>
    )
  }
}
