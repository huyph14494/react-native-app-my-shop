import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import {formatDate} from '../../helpers/moment.js';

class Home extends Component {
  render() {
    return (
      <View style={common.container(1, 'column', {alignItems: 'center'})}>
        <Header name={this.props.route.name} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[common.groupWidth(1, 'column'), common.marginTop(15)]}>
            <View
              style={[
                common.container(1, 'row', {
                  justifyContent: 'space-between',
                }),
                common.padding(15, 15),
                common.borderBottom('rgba(0,0,0,.075)', 1),
              ]}>
              <Text style={common.textHeader}>General</Text>
              <Text style={common.textHeader}>{formatDate(new Date())}</Text>
            </View>

            {/* ------------------------------------------------------------------------------ */}
            <View style={[common.container(1, 'row'), common.padding(15)]}>
              <View
                style={common.container(1, 'column', {alignItems: 'center'})}>
                <Text style={common.marginBottom(15)}>Products</Text>
                <Text>2</Text>
              </View>
              <View
                style={common.container(1, 'column', {alignItems: 'center'})}>
                <Text style={common.marginBottom(15)}>Orders</Text>
                <Text>18</Text>
              </View>
              <View
                style={common.container(1, 'column', {alignItems: 'center'})}>
                <Text style={common.marginBottom(15)}>Revenue</Text>
                <Text>100$</Text>
              </View>
            </View>
          </View>
          {/* ------------------------------------------------------------------------------ */}
          <View style={[common.groupWidth(1, 'row'), common.marginTop(15)]}>
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
