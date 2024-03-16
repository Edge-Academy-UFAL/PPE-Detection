import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import img from '../assets/icon.png';
import EyeIcon from '../assets/bigEye.png'
import cam from '../assets/cam.png'
import setaButton from '../assets/setaButton.png'

import BottomBar from '../components/BottomBar';


export default function Home() {
  navigator = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getUser() {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await axios.get(`http://192.168.235.23:3000/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        await AsyncStorage.setItem('userId', response.data.id);
        await AsyncStorage.setItem('userName', response.data.name);
      }
      catch (error) {
        console.log(error);
        navigator.replace('Login');
      }
    }

    async function checkLogin() {
      const userId = await AsyncStorage.getItem('userId');
      const userName = await AsyncStorage.getItem('userName');

      if (!userId) {
        navigator.replace('Login');
      }

      setUserName(userName);
    }

    getUser();
    checkLogin();
  });

  const handleFalcao = () => {
    navigator.navigate('SendPhoto');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
       <Image
        source={img}
        style={styles.image}
      />
      </View>
      <Text style={styles.title}>
        Seja bem-vindo,
      </Text>
      <Text style={styles.userName}>
        {userName}
      </Text>

      <View style={styles.viewSection}>
        <View style={styles.contentSection}>
          <Image
            source={EyeIcon}
            style={styles.imgContent}
          />
          <Text style={styles.textContent}>
            Projeto Falcão
          </Text>
        </View>
        <View style={styles.containerTextContentSection}>
          <Text style={styles.textContentSection}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ipsum perferendis esse voluptate excepturidolores! esse voluptate
          </Text>
          <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.button} onPress={handleFalcao}>
                <Text style={styles.buttonText}>
                  Experimento agora
                </Text>
                <Image
                  source={setaButton}
                  style={styles.setaButton}
                ></Image>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.viewSection}>
          <View style={styles.contentSection}>
            <Image
              source={cam}
              style={styles.imgBigBrotherIcon}
            />
            <Text style={styles.textContent}>
              Projeto BigBrother
            </Text>
          </View>
          <View style={styles.containerTextContentSection}>
            <Text style={styles.textContentSection}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Ipsum perferendis esse voluptate excepturidolores! esse voluptate
            </Text>
            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>
                    Em construção
                  </Text>
                  <Image
                    source={setaButton}
                    style={styles.setaButton}
                  ></Image>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      <BottomBar/>
      
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
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 35
  },
  title: {
    fontSize: 26,
    // fontFamily: "Popins",
    marginLeft: 20,
    fontWeight: '700',
    marginTop: 30
  },
  userName: {
    fontSize: 20,
    color: '#E6830C',
    // fontFamily: "Popins",
    marginLeft: 20,
    marginTop: 5
  },
  viewSection: {
    backgroundColor: '#1B2946',
    width: '100%',
    height: 170,
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
  imgContent : {
    width: 51,
    height: 35,
    marginTop: 25,
    marginLeft: 30
  },
  textContent: {
    color: '#fff',
    marginTop: 25,
    fontSize: 21,
    marginLeft: 20,
    fontFamily: 'Roboto',
    fontWeight: '700'
  },
  textContentSection: {
    color: '#fff',
    marginLeft: 30,
    // marginBottom: 50,
    fontSize: 11
  },
  containerTextContentSection: {
    flex: 1,
    maxWidth: 350,
  },
  buttonSection: {
    flex: 1,
    alignItems: 'flex-end' 
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
    flexDirection: 'row' 
  },
  buttonText: {
    fontSize: 10,
    color: '#E6830C',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 10
  },
  setaButton: {
    width: 5.2,
    height: 10,
    marginTop: 7,
    marginLeft: 15
  },
  imgBigBrotherIcon: {
    width: 50,
    height: 45,
    marginTop: 25,
    marginLeft: 30
  }
});
