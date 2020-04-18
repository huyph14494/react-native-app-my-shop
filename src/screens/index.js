import React from 'react';
import {View} from 'react-native';
import ListTab from './ListTab.js';
import common from '../styles/common.js';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

enableScreens();

const Tab = createBottomTabNavigator();

function showTabScreens() {
  return ListTab.map((screenObj, key) => (
    <Tab.Screen
      key={key}
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
          initialRouteName="Home"
          backBehavior="order"
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
