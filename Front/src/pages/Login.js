import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import img from '../assets/icon.png';
import user from '../assets/user.png';
import phone from '../assets/cellphone.png';
import eye from '../assets/eye.png';
import closedEye from '../assets/closed-eye.png';
import email from '../assets/email.png';
import password from '../assets/password.png';

export default function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  navigator = useNavigation();

  const handleLogin = () => {
    navigator.navigate('Home');
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailValue));
  };

  return (
    <View style={styles.full}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.init}>
          <Image
            source={img}
            style={styles.image}
          />
          <Text style={styles.text}>EPI Check</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image
              source={email}
              style={[styles.icon, { tintColor: '#B5B2B2' }]}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmailValue(text)}
              onBlur={validateEmail}
            />
          </View>
          {!isValidEmail && (
            <Text style={styles.errorText}>Por favor, insira um email válido.</Text>
          )}

          <View style={styles.inputContainer}>
            <Image
              source={password}
              style={[styles.icon, { tintColor: '#B5B2B2' }]}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={!showPassword.password}
            />
            <TouchableOpacity onPress={() => toggleShowPassword('password')}>
              <Image
                source={showPassword.password ? closedEye : eye}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <View style={styles.end}>
            <Text>
              Novo por aqui?{' '}
              <Text
                style={{
                  color: '#1B2946',
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  navigator.navigate('Register');
                }}
              >
                Cadastre-se
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
    paddingTop: 90,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    width: 145,
    height: 145,
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
