import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

import img from '../assets/icon.png';
import user from '../assets/user.png';

export default function Register() {
  return (
    <>
      <View style={styles.init}>
        <Image
          source={img}
          style={styles.image}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            source={user}
            style={[styles.icon, { tintColor: '#B5B2B2' }]}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  init: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 95,
    height: 100,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#A8A8A9',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '88.8%',
    height: 65,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
