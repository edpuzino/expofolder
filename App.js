import React from 'react';
import {
  Gyroscope,
} from 'expo';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT } from 'expo/build/av/Audio';


export default class GyroscopeSensor extends React.Component {
  state = {
    gyroscopeData: {},
    frequency: 2.404,
    volume: 5,
    pitch: 0,
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  }

  _fast = () => {
    Gyroscope.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Gyroscope.addListener((result) => {
      this.setState({gyroscopeData: result});        
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    let { x, y, z } = this.state.gyroscopeData;
    let frequency = this.state.frequency;
    let volume = this.state.volume;
    let pitch = this.state.pitch;

    return (
      <View style={styles.sensor}>
        <Text>Gyroscope:</Text>
        <Text>x: {round(x)}</Text>
        <Text>y: {round(y)}</Text>
        <Text>z: {round(z)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>start/stop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
        <Text>frequency: {round(frequency + (x * 240))}</Text>
        <Text>volume: {round(volume + (y/10))}</Text>
        <Text>pitch: {round(pitch + z)}</Text>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#cccccc',
  },
  sensor: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
});