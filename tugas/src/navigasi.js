import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Mytodo from './mytodo';
import Api from './api';

const Stack = createStackNavigator();

export default class Navigasi extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Mytodo" component={Mytodo} />
          <Stack.Screen name="Api" component={Api} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
