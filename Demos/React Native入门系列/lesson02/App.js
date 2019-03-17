/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { calc } from './utils/common'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ height: '100%' }}
        >
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('./unnamed.jpg')}
            />
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2205261245,3424157468&fm=26&gp=0.jpg' }}
            />
            <Image
              style={{ width: 66, height: 58 }}
              source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
            />
          </View>
          <View style={{ flexDirection: 'column', height: 800 }}>
            <Text style={{ height: calc(80), backgroundColor: 'green', textAlign: 'center', lineHeight: calc(80) }}>Header</Text>
            <Text style={{ flex: 1, backgroundColor: 'yellow' }}>aaa</Text>
            <Text style={{ flex: 1, backgroundColor: 'red' }}>bbb</Text>
          </View>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
