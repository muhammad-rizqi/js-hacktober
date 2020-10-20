import React, {Component} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './Styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class Mytodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
    };
    AsyncStorage.getItem('token').then((value) => {
      console.log(value);
      if (value !== null) {
        this.props.navigation.navigate('Api');
      } else {
        this.props.navigation.navigate('Mytodo');
      }
    });
  }

  Login = () => {
    const {email, password} = this.state;

    var dataToSend = {email: email, password: password, mobile: true};
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://restful-api-laravel-7.herokuapp.com/api/login', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const {token} = responseJson;
        if (token) {
          AsyncStorage.setItem('token', token);
          this.props.navigation.navigate('Api');
        } else {
          alert('Pastikan Email dan Password BENAR!');
        }
      })
      .catch((error) => {
        alert('Pastikan Email dan Password BENAR!');
      });
  };

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Image style={styles.gambar} source={require('./0.jpeg')} />
          <Text style={styles.sambut}>Selamat Datang</Text>
        </View>
        <View style={styles.isi}>
          <Text style={styles.todos}>Login</Text>
        </View>
        <View style={styles.input}>
          <Text>Email</Text>
          <TextInput
            onChangeText={(email) => this.setState({email})}
            style={styles.input2}
            placeholder="masukan email"
          />
        </View>
        <View style={styles.input}>
          <Text>Password</Text>
          <TextInput
            onChangeText={(password) => this.setState({password})}
            style={styles.input2}
            secureTextEntry={true}
            placeholder="masukan password"
          />
        </View>
        <TouchableOpacity onPress={() => this.Login()} style={styles.button}>
          <Text style={styles.but}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
