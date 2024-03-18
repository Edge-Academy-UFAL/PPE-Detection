import React, { useEffect } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import inicial from '../assets/inicial.png';

export default function Inicial() {
  const navigator = useNavigation();

  useEffect(() => {
    async function checkLogin() {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        navigator.replace('Home');
      }
    }

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={inicial}
        style={styles.imageBackground}
      >
        <View style={styles.inicial}>
          <Text style={styles.text}>Sua segurança é o que importa para nós!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigator.navigate('Register');
            }}
          >
            <Text style={styles.buttonText}>Vamos começar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicial: {
    width: '88.8%',
  },
  text: {
    color: '#1B2956',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 0.32,
    textAlign: 'auto',
    paddingTop: '120%',
  },
  button: {
    backgroundColor: '#1B2956',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginTop: 45,
    gap: 10,
    justifyContent: 'center',
    width: '100%',
    height: 55,
  },
  buttonText: {
    color: '#fff',
    lineHeight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
