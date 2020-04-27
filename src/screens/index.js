import React from 'react';
import {View} from 'react-native';
import {screenList, getIsTabBarVisible} from './configScreen.js';
import common from '../styles/common.js';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';

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

const App = function() {
  return (
    <View
      style={common.container(1, 'column', {
        backgroundColor: 'rgba(0,0,0,.075)',
      })}>
      <NavigationContainer>
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
      </NavigationContainer>
    </View>
  );
};

export default App;
