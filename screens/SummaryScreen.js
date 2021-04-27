import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import AppHeader from '../components/AppHeader';

export default class SummaryScreen extends Component {
  render() {
    return (
      <View>
        <AppHeader />
        <Text> Summary Screen </Text>
      </View>
    );
  }
}
