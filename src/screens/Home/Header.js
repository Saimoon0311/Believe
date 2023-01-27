import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {believe} from '@/Assets/Images';
import {Touchable} from '@/components/Touchable';
import {styles} from './styles';

const Header = ({user, navigation, coins}) => {
  const [greeting, setGreeting] = useState('');

  /**
   * If the current time is between 5am and 12pm, set the greeting to 'Morning'. If the current time is
   * between 12pm and 5pm, set the greeting to 'Afternoon'. If the current time is between 5pm and 9pm,
   * set the greeting to 'Evening'. If the current time is between 9pm and 5am, set the greeting to
   * 'Night'
   */
  const updateAction = () => {
    const date = new Date();
    const currentTime = date.getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setGreeting('Morning');
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting('Afternoon');
    } else if (currentTime >= 17 && currentTime < 21) {
      setGreeting('Evening');
    } else if (currentTime >= 21 || currentTime < 5) {
      setGreeting('Night');
    } else {
      setGreeting('Night');
    }
  };

  /* This is a React Hook. It is a function that lets you “hook into” React features. For example,
useState is a Hook that lets you add React state to function components. */
  useEffect(() => {
    /* Adding a listener to the navigation object. The listener is listening for the focus event. When
    the focus event is triggered, the updateAction function is called. */
    const greetUpdate = navigation.addListener('focus', updateAction);

    return greetUpdate;
  }, []);
  /* This is a ternary operator. It is a conditional operator that is used to assign a value to a
variable based on a condition. */
  const formatedCoins = coins < 1 ? coins : Number(coins).toFixed(2);
  return (
    <View style={styles.padding}>
      {/* <View style={styles.headerContainer}>
        <Touchable Opacity={0.7} style={styles.rightHeader}>
          <Image source={believe} style={styles.icon2} />
          <Text style={styles.balanceText}>Coins</Text>
          <View style={styles.row}>
            <Text style={styles.creditText}>{formatedCoins}</Text>
          </View>
        </Touchable>
      </View> */}
      <View style={styles.center}>
        <Text numberOfLines={2} style={styles.headerText}>
          Good {greeting}, {user?.name?.split(' ').slice(0, 1)}
        </Text>
        <Text style={styles.bottomText}>Enjoy your {greeting}</Text>
      </View>
    </View>
  );
};

export default Header;
