import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import img from '../assets/icon.png';
import user from '../assets/user.png';
import phone from '../assets/cellphone.png';
import eye from '../assets/eye.png';
import closedEye from '../assets/closed-eye.png';
import email from '../assets/email.png';
import password from '../assets/password.png';

export default function Register() {
  const navigator = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isMatchingPasswords, setIsMatchingPasswords] = useState(true);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    async function checkLogin() {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        navigator.replace('Home');
      }
    }

    checkLogin();
  }, []);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailValue));
  };

  const validatePasswords = () => {
    setIsMatchingPasswords(passwordValue === confirmPasswordValue);
  };

  const maskPhone = (text) => {
    if (text.length < phoneValue.length) {
      setPhoneValue(text);
      return;
    }
    if (text.length === 2) setPhoneValue(`(${text}) `);
    else if (text.length === 10) setPhoneValue(`${text}-`);
    else setPhoneValue(text);
  };

  const handleRegister = async () => {
    setIsLoading(true);

    if (
      !nameValue ||
      !phoneValue ||
      !emailValue ||
      !passwordValue ||
      !confirmPasswordValue
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return setIsLoading(false);
    }

    if (!isValidEmail) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return setIsLoading(false);
    }

    if (!isMatchingPasswords) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return setIsLoading(false);
    }

    try {
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, {

      const response = await axios.post(`http://192.168.1.107:3000/users`, {
        email: emailValue,
        name: nameValue,
        phone: phoneValue,
        password: passwordValue,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigator.navigate('Login');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao cadastrar usuário. Tente novamente.');
    }

    setIsLoading(false);
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
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
              onChangeText={(text) => setNameValue(text)}
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
              inputMode="tel"
              maxLength={15}
              value={phoneValue}
              onChangeText={(text) => maskPhone(text)}
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
              inputMode="email"
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
              onChangeText={(text) => setPasswordValue(text)}
            />
            <TouchableOpacity onPress={() => toggleShowPassword('password')}>
              <Image
                source={showPassword.password ? closedEye : eye}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={password}
              style={[styles.icon, { tintColor: '#B5B2B2' }]}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              secureTextEntry={!showPassword.confirmPassword}
              onChangeText={(text) => setConfirmPasswordValue(text)}
              onBlur={validatePasswords}
            />
            <TouchableOpacity onPress={() => toggleShowPassword('confirmPassword')}>
              <Image
                source={showPassword.confirmPassword ? closedEye : eye}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {!isMatchingPasswords && (
            <Text style={styles.errorText}>As senhas não coincidem.</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={styles.buttonText}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {!isLoading && 'Cadastrar'}
                {isLoading && <ActivityIndicator color="white" />}
              </Text>
            </View>
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
                onPress={() => {
                  navigator.navigate('Login');
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
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
