import React from 'react';
import { StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';

import img from '../assets/icon.png';
import user from '../assets/user.png';
import phone from '../assets/cellphone.png';
import eye from '../assets/eye.png';
import email from '../assets/email.png';
import password from '../assets/password.png';

export default function Register() {
  return (
    <View style={styles.full}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.init}>
          <Image
            source={img}
            style={styles.image}
          />
          <Text style={styles.text}>Cadastre-se</Text>
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

          <View style={styles.inputContainer}>
            <Image
              source={phone}
              style={[styles.icon, { tintColor: '#B5B2B2' }]}
            />
            <TextInput
              style={styles.input}
              placeholder="Celular"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={email}
              style={[styles.icon, { tintColor: '#B5B2B2' }]}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={password}
              style={[styles.icon, { tintColor: '#B5B2B2' }]}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              keyboardType="password"
            />
            <Image
              source={eye}
              style={styles.icon}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={password}
              style={[styles.icon, { tintColor: '#B5B2B2' }]}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
            />
            <Image
              source={eye}
              style={styles.icon}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('Register');
            }}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          <View style={styles.end}>
            <Text>
              Já possui uma conta?{' '}
              <Text
                style={{
                  color: '#1B2946',
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}
              >
                Entrar
              </Text>
            </Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
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
    width: 100,
    height: 100,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 5,
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
    height: 55,
    marginVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  text: {
    color: '#1B2956',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 0.32,
    textAlign: 'auto',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#1B2956',
    borderRadius: 4,
    marginTop: 35,
    gap: 10,
    justifyContent: 'center',
    width: '88.8%',
    height: 55,
  },
  buttonText: {
    color: '#fff',
    lineHeight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  end: {
    marginTop: 15,
  },
});
