import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {styles} from './Styles2';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

export default class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos: [],
      token: '',
      photo: '',
      task: '',
      desc: '',
      modal: true,
      modalEdit: false,
      addLoading: false,

      editId: null,
      editTask: '',
      editDesc: '',
      editIsDone: false,
      editPhoto: '',
    };
  }

  getToken = () => {
    AsyncStorage.getItem('token')
      .then((value) => {
        console.log(value);
        if (value !== null) {
          this.setState({token: value});
        } else {
          this.props.navigation.navigate('Mytodo');
        }
      })
      .then(() => this.getTodo());
  };

  addTodo = () => {
    const {task, desc, photo, token} = this.state;
    this.setAddLoading(true);
    if (task !== '' && desc !== '' && photo !== '') {
      const todo = {
        task: task,
        desc: desc,
        is_done: 0,
      };
      fetch('http://restful-api-laravel-7.herokuapp.com/api/todo', {
        method: 'POST',
        body: this.createFormData(photo, todo),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('upload succes', response);
          alert('Data ditambahkan!');
          this.getTodos();
          this.showModal(false);
          this.setAddLoading(false);
        })
        .catch((error) => {
          console.log('upload error', error);
          alert('Gagal ditambahkan');
          this.setAddLoading(false);
        });
    } else {
      alert('Isi dengan benar');
    }
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  handleEditPhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({editPhoto: response});
        console.log(JSON.stringify(response) + 'tes image');
      }
    });
  };

  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };
  editTodo() {
    const {editTask, editDesc, editPhoto, editId, editIsDone} = this.state;
    if (editPhoto.name === undefined) {
      this.setAddLoading(true);
      if (editTask !== '' && editDesc !== '' && editPhoto !== '') {
        const todo = {
          _method: 'PUT',
          task: editTask,
          desc: editDesc,
          is_done: editIsDone ? 1 : 0,
        };
        fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${editId}`, {
          method: 'POST',
          body: this.createFormData(editPhoto, todo),
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (response.status == 'success') {
              console.log('upload succes', response);
              alert('Data dirumbah!');
              this.getTodos();
              this.showModalEdit(false);
              this.setAddLoading(false);
            } else {
              alert('Error');
            }
          })
          .catch((error) => {
            console.log('upload error', error);
            alert('Gagal ditambahkan');
            this.setAddLoading(false);
          });
      } else {
        alert('Isi dengan benar');
        this.setAddLoading(false);
      }
    } else {
      alert('Gambar harus dirubah :)');
    }
  }

  getTodo = () => {
    fetch('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const {status} = responseJson;
        if (status) {
          alert(status);
          this.logOut();
        } else {
          this.setState({todos: responseJson});
          console.log(responseJson);
          this.setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setLoading(loading) {
    this.setState({loading: loading});
  }
  showModal(visible) {
    this.setState({modal: visible});
  }

  setAddLoading(loading) {
    this.setState({addLoading: loading});
  }

  showModalEdit(visible, data = null) {
    this.setState({modalEdit: visible});
    if (data !== null) {
      this.setState({
        editId: data.id,
        editTask: data.task,
        editDesc: data.desc,
        editPhoto: {
          name: data.image,
          uri: 'http://restful-api-laravel-7.herokuapp.com/img/' + data.image,
        },
        editIsDone: data.is_done,
      });
    }
  }

  deleteTodo = (id) => {
    this.setLoading(true);
    fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const {status} = json;
        if (status == 'success') {
          this.getTodo();
        } else {
          alert('failure');
        }
      });
  };

  componentDidMount() {
    this.getToken();
  }
  render() {
    console.log(this.state.todos);
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Image style={styles.gambar} source={require('./0.jpeg')} />
          <Text style={styles.sambut}>Selamat Datang</Text>
        </View>

        <View style={styles.isi}>
          <Text style={styles.todos}>ToDos</Text>
        </View>

        <View style={styles.add}>
          <Modal visible={this.state.modal} transparent={false}>
            <View>
              <TouchableOpacity style={styles.x}>
                <Text
                  onPress={() => this.showModal(false)}
                  style={styles.buttonx}>
                  x
                </Text>
              </TouchableOpacity>
              <Text>Add ToDo here</Text>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.handleChoosePhoto()}>
                {this.state.photo !== '' ? (
                  <Image
                    source={{uri: this.state.photo.uri}}
                    style={{width: 100, height: 100}}
                  />
                ) : (
                  <View>
                    <Text>upload Image</Text>
                  </View>
                )}

                <TextInput
                  style={[styles.input, styles.marginSmallV]}
                  placeholderTextColor="#aaaaaa"
                  placeholder="Task todo"
                  onChangeText={(task) => this.setState({task: task})}
                />

                <TextInput
                  style={[styles.input, styles.marginSmallV]}
                  placeholderTextColor="#aaaaaa"
                  placeholder="Description here"
                  onChangeText={(desc) => this.setState({desc: desc})}
                />

                <TouchableOpacity
                  style={[styles.button, styles.marginSmallV]}
                  onPress={() => this.addTodo()}>
                  {this.state.addLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text>Add Todo</Text>
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <Modal visible={this.state.modalEdit} transparent={true}>
          <View>
            <TouchableOpacity>
              <Text onPress={() => this.showModalEdit(false)}>x</Text>
            </TouchableOpacity>
            <Text> Edit Todo </Text>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => this.handleEditPhoto()}>
              <Image
                source={{
                  uri: this.state.editPhoto.uri,
                }}
                style={{width: 100, height: 100}}
              />
            </TouchableOpacity>

            <TextInput
              style={[styles.input, styles.marginSmallV]}
              placeholderTextColor="#aaaaaa"
              placeholder="Task todo"
              value={this.state.editTask}
              onChangeText={(task) => this.setState({editTask: task})}
            />
            <TextInput
              style={[styles.input, styles.marginSmallV]}
              placeholderTextColor="#aaaaaa"
              placeholder="Description here"
              value={this.state.editDesc}
              onChangeText={(desc) => this.setState({editDesc: desc})}
            />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() =>
                this.setState({editIsDone: !this.state.editIsDone})
              }>
              <Image
                source={
                  this.state.editIsDone
                    ? require('./check.png')
                    : require('./checkbox.png')
                }
              />
              <Text>{this.state.editIsDone ? 'Selesai' : 'Belum selesai'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.marginSmallV]}
              onPress={() => this.editTodo()}>
              {this.state.addLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text>Edit Todo</Text>
              )}
            </TouchableOpacity>
          </View>
        </Modal>

        <ScrollView>
          <View>
            {this.state.todos.length == 0 ? (
              <Text>kosong</Text>
            ) : (
              this.state.todos.map((value, index) => (
                <View style={styles.get} key={value.id}>
                  <Image
                    source={{
                      uri: `http://restful-api-laravel-7.herokuapp.com/img/${value.image}`,
                    }}
                    style={{width: 64, height: 64, borderRadius: 10}}
                  />
                  <View>
                    <Text style={styles.task}>{value.task}</Text>
                    <Text style={styles.desc}>{value.desc}</Text>
                  </View>

                  <View>
                    <TouchableOpacity onPress={() => this.deleteTodo(value.id)}>
                      <Text>hapus</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
