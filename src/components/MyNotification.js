import React, {useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import common from '../styles/common';
import {Easing} from 'react-native';

const MyNotification = props => {
  const valueY = useRef(new Animated.Value(-100)).current; // Initial value for translateY: -100
  const opacity = useRef(new Animated.Value(0.98)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(valueY, {
        toValue: 0,
        duration: 1150,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(); // start the sequence group

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueY]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{translateY: valueY}], // Bind opacity to animated value
        opacity,
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={common.notificationView}>
      <MyNotification style={common.notification}>
        <Text style={common.notificationText}>
          You have successfully created an order
        </Text>
      </MyNotification>
    </View>
  );
};
