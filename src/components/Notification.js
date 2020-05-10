import React, {useRef} from 'react';
import {Animated, Text, View} from 'react-native';
// import {Easing} from 'react-native';
// Animated.timing(this.state.xPosition, {
//   toValue: 100,
//   easing: Easing.back(),
//   duration: 2000
// }).start();

const Notification = props => {
  const valueY = useRef(new Animated.Value(-100)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(valueY, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [valueY]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{translateY: valueY}], // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 2,
        top: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Notification
        style={{
          backgroundColor: 'powderblue',
          width: 250,
          height: 50,
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </Notification>
    </View>
  );
};
