import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { API_URL } from '@env';

import img from '../assets/icon.png';
import EyeIcon from '../assets/bigEye.png';
import cam from '../assets/cam.png';
import logoutIcon from '../assets/logout.png';
import back from '../assets/back.png';
import setaButton from '../assets/setaButton.png';

import BottomBar from '../components/BottomBar';

export default function Home() {
  navigator = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getUser() {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await axios.get(`${API_URL}:3000/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await AsyncStorage.setItem('userName', response.data.name);
        let name = await AsyncStorage.getItem('userName');
        setUserName(name);
      } catch (error) {
        console.log(error);

        if (error.response.status === 401) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userName');

          navigator.replace('Login');

          Alert.alert('Sessão expirada, faça login novamente.');
        }
      }
    }

    getUser();
  });

  const handleFalcao = () => {
    navigator.navigate('SendPhoto');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userName');

    navigator.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { position: 'relative' }]}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={back}
            // make it look disabled
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              right: 80,
              top: 0,
              opacity: 0.4,
            }}
          />
        </TouchableOpacity>

        <Image
          source={img}
          style={styles.image}
        />

        <TouchableOpacity onPress={logout}>
          <Image
            source={logoutIcon}
            style={{ width: 40, height: 40, position: 'absolute', left: 60, top: 0 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Seja bem-vindo,</Text>
      <Text style={styles.userName}>{userName}</Text>

      <View style={styles.viewSection}>
        <View style={styles.contentSection}>
          <Image
            source={EyeIcon}
            style={styles.imgContent}
          />
          <Text style={styles.textContent}>Projeto Falcão</Text>
        </View>
        <View style={styles.containerTextContentSection}>
          <Text style={styles.textContentSection}>
            Ferramenta utiliza inteligência artificial para analisar imagens e reconhecer
            o uso de Equipamentos de Proteção Individual (EPIs).
          </Text>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleFalcao}
            >
              <Text style={styles.buttonText}>Experimente agora</Text>
              <Image
                source={setaButton}
                style={[styles.setaButton, { marginLeft: 8 }]}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.viewSection, { backgroundColor: '#414a5a' }]}>
        <View style={styles.contentSection}>
          <Image
            source={cam}
            style={styles.imgBigBrotherIcon}
          />
          <Text style={styles.textContent}>Projeto BigBrother</Text>
        </View>
        <View style={styles.containerTextContentSection}>
          <Text style={styles.textContentSection}>
            Ferramenta utiliza inteligência artificial para analisar live streams e
            reconhecer o uso de Equipamentos de Proteção Individual (EPIs).
          </Text>
          <View style={styles.buttonSection}>
            <View style={styles.button}>
              <Text style={[styles.buttonText, { marginLeft: 23 }]}>Em construção</Text>
              <Image
                source={setaButton}
                style={[styles.setaButton, { marginLeft: 8 }]}
              ></Image>
            </View>
          </View>
        </View>
      </View>
      <BottomBar currentRoute={'Home'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 35,
  },
  title: {
    fontSize: 26,
    // fontFamily: "Popins",
    marginLeft: 20,
    fontWeight: '700',
    marginTop: 30,
  },
  userName: {
    fontSize: 20,
    color: '#E6830C',
    // fontFamily: "Popins",
    marginLeft: 20,
    marginTop: 5,
  },
  viewSection: {
    backgroundColor: '#1B2946',
    width: '100%',
    height: 180,
    paddingBottom: 20,
    marginTop: 30,
    borderRadius: 23,
    marginLeft: 20,

    elevation: 10, // Ajuste este valor
    shadowColor: 'rgba(0, 0, 0, 10)', // Cor da sombra
    shadowOffset: { width: 0, height: 4 }, // Ajuste este valor
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 6,
  },
  contentSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imgContent: {
    width: 51,
    height: 35,
    marginTop: 25,
    marginLeft: 30,
  },
  textContent: {
    color: '#fff',
    marginTop: 25,
    fontSize: 21,
    marginLeft: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  textContentSection: {
    color: '#fff',
    marginLeft: 30,
    // marginBottom: 50,
    fontSize: 11,
  },
  containerTextContentSection: {
    flex: 1,
    maxWidth: 350,
  },
  buttonSection: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 100,
  },
  button: {
    backgroundColor: 'rgba(100, 50, 0, 0.5)',
    borderRadius: 5,
    borderRadius: 20,
    width: 125,
    marginTop: 17,
    height: 23,
    flex: 1,
    maxHeight: 23,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 10,
    color: '#E6830C',
    alignItems: 'center',
    marginTop: 3,
    marginLeft: 15,
  },
  setaButton: {
    width: 5.2,
    height: 10,
    marginTop: 6,
    marginLeft: 5,
  },
  imgBigBrotherIcon: {
    width: 50,
    height: 45,
    marginTop: 25,
    marginLeft: 30,
  },
});
