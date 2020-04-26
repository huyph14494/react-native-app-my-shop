import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import common from '../styles/common.js';
import Header from '../components/Header.js';

class Home extends Component {
  render() {
    return (
      <View style={common.container(1, 'column', {alignItems: 'center'})}>
        <Header name={this.props.route.name} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={common.group(1, 'column', 15)}>
            <View
              style={[
                common.container(1, 'row', {
                  justifyContent: 'space-between',
                }),
                common.padding(15, 15),
                common.borderBottom('rgba(0,0,0,.075)', 1),
              ]}>
              <Text>Quản lý chung</Text>
              <Text>{new Date().getFullYear()}</Text>
            </View>

            {/* ------------------------------------------------------------------------------ */}
            <View style={[common.container(1, 'row'), common.padding(15)]}>
              <View
                style={common.container(1, 'column', {alignItems: 'center'})}>
                <Text style={{marginBottom: 15}}>Customer</Text>
                <Text>2</Text>
              </View>
              <View
                style={common.container(1, 'column', {alignItems: 'center'})}>
                <Text style={{marginBottom: 15}}>Order</Text>
                <Text>18</Text>
              </View>
              <View
                style={common.container(1, 'column', {alignItems: 'center'})}>
                <Text style={{marginBottom: 15}}>Revenue</Text>
                <Text>100$</Text>
              </View>
            </View>
          </View>
          {/* ------------------------------------------------------------------------------ */}
          <View style={common.group(1, 'row', 15)}>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                }),
                common.padding(15, 15),
              ]}>
              <Button title="+ Create Product" type="outline" />
            </View>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                }),
                common.padding(15, 15),
              ]}>
              <Button title="+ Create Order" type="outline" />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
