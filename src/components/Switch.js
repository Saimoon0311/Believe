import React, {PureComponent} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '@/theme/Variables';

export default class Switch extends PureComponent {
  constructor(props) {
    super(props);
    this.moveAnimation = new Animated.ValueXY({x: 2, y: 0});
  }
  state = {
    color: Colors.grayScale,
    isMounted: false,
  };

  componentDidMount() {
    const {status} = this.props;
    this._open = !status;
    this._moveBall();
  }

  _moveBall = () => {
    const toValueCheck = this._open ? 0 : 1;
    const {setDisabled} = this.props;
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
    if (this.state.isMounted) setDisabled();
    else this.setState({isMounted: true});
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._moveBall}
        disabled={Boolean(this.props?.isDetails)}>
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
    borderRadius: 10,
    // borderWidth: 2,
    justifyContent: 'center',
    // borderColor: Colors.white,
    backgroundColor: Colors.switch,
  },
});
