import React, {PureComponent} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '@/theme/Variables';

export default class ReminderSwitch extends PureComponent {
  constructor(props) {
    super(props);
    this.moveAnimation = new Animated.ValueXY({x: 2, y: 0});
  }
  state = {
    color: this.props.color || Colors.grayScale,
  };

  componentDidMount() {
    const {disabled} = this.props;
    this._open = !disabled;
    this._moveBall();
  }

  componentDidUpdate() {
    const {disabled} = this.props;
    this._open = !disabled;
    this._moveBall();
  }

  _moveBall = () => {
    const {setDisabled, color} = this.props;
    const toValueCheck = this._open ? 0 : 1;
    this._open = !this._open;
    if (toValueCheck == 0) {
      Animated.spring(this.moveAnimation, {
        toValue: {x: 5, y: 0},
        useNativeDriver: false,
      }).start();
      this.setState({color: color || Colors.grayScale});
      setDisabled(false);
    } else {
      Animated.spring(this.moveAnimation, {
        toValue: {x: 24, y: 0},
        useNativeDriver: false,
      }).start();
      this.setState({color: Colors.greenFaded});
      setDisabled(true);
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
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  tennisBall: {
    width: 20,
    height: 18,
    borderRadius: 7,
  },
  btnContainer: {
    width: 50,
    height: 27.5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: Colors.switch,
  },
});
