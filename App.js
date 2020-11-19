import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      nome: '',
    };

    this.gravaNome = this.gravaNome.bind(this)
  }

  //Quando é montado em tela
  async componentDidMount() {
    await AsyncStorage.getItem('nome').then((value) => {
      this.setState({ nome: value })
    })
  }

  //Toda vez que um state é atualizado, fazer algo
  async componentDidUpdate(_, prevState) {
    const nome = this.state.nome

    if (prevState !== nome) {
      await AsyncStorage.setItem('nome', nome)
    }
  }

  gravaNome() {
    this.setState({
      nome: this.state.input
    });
    alert('Salvo com sucesso');
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.viewInput} >
          <TextInput
            style={styles.input}
            value={this.state.input}
            onChangeText={(text) => this.setState({ input: text })}
            underlineColorAndroid='transparent'
          />

          <TouchableOpacity onPress={this.gravaNome}>
            <Text style={styles.botao}>.</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.nome}>
          {this.state.nome}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  botao: {
    backgroundColor: '#222',
    color: 'white',
    height: 40,
    padding: 15,
    marginRight: 6
  },
  nome: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 15
  },
})

export default App;
