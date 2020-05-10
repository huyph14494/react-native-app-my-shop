import React from 'react';
import {View} from 'react-native';
import {screenList, getIsTabBarVisible} from './configScreen.js';
import common from '../styles/common.js';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import store from '../redux/store.js';
import {Provider, useSelector} from 'react-redux';
import {Easing} from 'react-native';
import LoginScreen from './User/LoginScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function showTabScreens() {
  return screenList.map((screenObj, key) => (
    <Tab.Screen
      key={key}
      initialParams={{Stack}}
      name={screenObj.name}
      component={screenObj.component}
      options={{
        tabBarLabel: screenObj.name,
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name={screenObj.icon}
            color={color}
            size={26}
          />
        ),
      }}
    />
  ));
}

const AuthNavigator = () => {
  const config = {
    animation: 'timing',
    config: {
      duration: 180,
      easing: Easing.in(Easing.linear),
    },
  };

  const transitionSpec = {
    open: config,
    close: config,
  };

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        gestureEnabled: false,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          transitionSpec,
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Order"
      backBehavior="order"
      screenOptions={({route}) => ({
        tabBarVisible: getIsTabBarVisible(route),
      })}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        tabStyle: {paddingVertical: 5},
      }}>
      {showTabScreens()}
    </Tab.Navigator>
  );
};

const NavigationMain = () => {
  const userInfo = useSelector(state => state.userInfo);

  return (
    <NavigationContainer>
      {userInfo.login_status && <AppNavigator />}
      {!userInfo.login_status && <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = function() {
  return (
    <View
      style={common.container(1, 'column', {
        backgroundColor: 'rgba(0,0,0,.075)',
      })}>
      <Provider store={store}>
        <NavigationMain />
      </Provider>
    </View>
  );
};

export default App;
