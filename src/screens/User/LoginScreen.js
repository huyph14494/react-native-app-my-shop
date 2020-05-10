import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import common from '../../styles/common';
import {useDispatch} from 'react-redux';
import * as userAction from '../../redux/action/user.action';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(userAction.onLoginTrial());
  };

  return (
    <View style={common.container(1, 'column')}>
      <LinearGradient
        colors={['#ca97ed', '#ee5353', '#ecbb77']}
        style={[
          common.container(1, 'column', {
            alignItems: 'center',
            justifyContent: 'center',
          }),
          common.width100Per,
        ]}>
        <View style={[common.viewLogoLogin, common.marginTopLogin]}>
          <Image
            style={common.logoLogin}
            resizeMode={'cover'}
            source={require('../../assets/rocket-icon.png')}
          />
        </View>
        <Text style={common.textLogin}>For Education</Text>
        <LinearGradient
          colors={[
            '#00FFFF',
            '#17C8FF',
            '#329BFF',
            '#4C64FF',
            '#6536FF',
            '#8000FF',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={common.btnLoginLinear}>
          <TouchableOpacity
            style={common.btnLoginGroup}
            activeOpacity={0.7}
            onPress={() => handleLogin()}>
            <Text style={common.brnLoginText}>TRIAL USE</Text>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
