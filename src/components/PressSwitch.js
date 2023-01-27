import React, {PureComponent} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '@/theme/Variables';

export default class PressSwitch extends PureComponent {
  constructor(props) {
    super(props);
    this.moveAnimation = new Animated.ValueXY({x: 2, y: 0});
  }
  state = {
    color: Colors.grayScale,
  };

  componentDidMount() {
    // const {status} = this.props;
    // this._open = !status;
    this._moveBall();
  }

  _moveBall = () => {
    const toValueCheck = this._open ? 0 : 1;
    if (toValueCheck == 0) {
      this._open = !this._open;
      Animated.spring(this.moveAnimation, {
        toValue: {x: 5, y: 0},
        useNativeDriver: false,
      }).start();
      this.setState({
        color: Colors.grayScale,
      });
    } else {
      this._open = !this._open;
      Animated.spring(this.moveAnimation, {
        toValue: {x: 34, y: 0},
        useNativeDriver: false,
      }).start();
      this.setState({
        color: Colors.greenFaded,
      });
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this._moveBall}>
        <View style={styles.btnContainer}>
          <Animated.View
            style={[
              styles.tennisBall,
              this.moveAnimation.getLayout(),
              {
                backgroundColor: this.state.color,
              },
            ]}></Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  tennisBall: {
    width: 30,
    height: 29,
    borderRadius: 7,
  },
  btnContainer: {
    width: 70,
    height: 37.5,
    // borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    // borderColor: Colors.white,
    backgroundColor: Colors.switch,
  },
  // tennisBall: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 180,
  // },
  // btnContainer: {
  //   width: 70,
  //   height: 37.5,
  //   borderWidth: 2,
  //   borderRadius: 180,
  //   justifyContent: 'center',
  //   borderColor: Colors.white,
  //   backgroundColor: Colors.white,
  // },
});
