/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
const resourceURL = 'https://qyjno1ufa0.execute-api.us-east-2.amazonaws.com/prod/kindlenotes';

export default class App extends Component<Props> {

 state = { isDisabled: false,
           secret: null };

 fetchSecret = () => {
    this.setState({
          isDisabled: true,
      });

    fetch(resourceURL)
      .then(response => {
        if (response.ok) {
            console.log(response._bodyText);
            return response._bodyText;
        } else {
           var error = new Error('Error ' + response.status + ': ' + response.statusText);
           error.response = response;
           throw error;
        }
      })
      .then(secret => this.setState({
          secret,
          isDisabled: false
      }))
      .catch(error => this.setState({
          secret: "Hitherto shalt thou come, but no further",
          isDisabled: false
      }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.stretch}
          source={require('./resources/mona_one.jpg')}
        />
      <Button
        onPress={this.fetchSecret}
        title="Bouton de secret"
        disabled={this.state.isDisabled}
      />
      <Text style={styles.welcome}>{this.state.secret}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  stretch: {
    width: '100%',
    height: 500,
    borderWidth: 8,
    borderColor: '#C5B358'
  }
});
