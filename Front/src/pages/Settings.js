import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { API_URL } from '@env';
import BottomBar from '../components/BottomBar';

import back from '../assets/back.png';
import img from '../assets/icon.png';
import hat2 from '../assets/hat.png';
import boot2 from '../assets/boot.png';
import glove2 from '../assets/glove.png';
import mask2 from '../assets/mask.png';
import glasses2 from '../assets/glass.png';
import vest2 from '../assets/vest.png';

export default function Settings() {
  navigator = useNavigation();
  const [userName, setUserName] = useState('');
  const [hat, setHat] = useState(false);
  const [boot, setBoot] = useState(false);
  const [glove, setGlove] = useState(false);
  const [mask, setMask] = useState(false);
  const [glasses, setGlasses] = useState(false);
  const [vest, setVest] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('token');

        const hatValue = (await AsyncStorage.getItem('Hat')) === 'true';
        const bootValue = (await AsyncStorage.getItem('Boot')) === 'true';
        const gloveValue = (await AsyncStorage.getItem('Gloves')) === 'true';
        const maskValue = (await AsyncStorage.getItem('Mask')) === 'true';
        const glassesValue = (await AsyncStorage.getItem('Glass')) === 'true';
        const vestValue = (await AsyncStorage.getItem('Vest')) === 'true';

        setHat(hatValue);
        setBoot(bootValue);
        setGlove(gloveValue);
        setMask(maskValue);
        setGlasses(glassesValue);
        setVest(vestValue);

        const response = await axios.get(`${API_URL}:3000/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await AsyncStorage.setItem('userName', response.data.name);
        const name = await AsyncStorage.getItem('userName');
        setUserName(name);
      } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 401) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userName');

          navigator.replace('Login');

          Alert.alert('Sessão expirada, faça login novamente.');
        }
      }
    }

    fetchData();
  }, []);

  const backNavigation = () => {
    navigator.replace('Home');
  };

  const toggleSave = async () => {
    try {
      await AsyncStorage.setItem('Hat', JSON.stringify(hat));
      await AsyncStorage.setItem('Boot', JSON.stringify(boot));
      await AsyncStorage.setItem('Gloves', JSON.stringify(glove));
      await AsyncStorage.setItem('Mask', JSON.stringify(mask));
      await AsyncStorage.setItem('Glass', JSON.stringify(glasses));
      await AsyncStorage.setItem('Vest', JSON.stringify(vest));

      Alert.alert('Alterações salvas com sucesso!');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao salvar as alterações. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.imageContainer, { position: 'relative' }]}>
          <TouchableOpacity onPress={backNavigation}>
            <Image
              source={back}
              style={{ width: 30, height: 30, position: 'absolute', right: 80, top: 0 }}
            />
          </TouchableOpacity>
          <Image
            source={img}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>EPIs detectáveis</Text>
        <View style={styles.viewSection}>
          <View style={styles.textSection}>
            <Image
              source={hat2}
              style={styles.imgContent}
            />
            <Text style={styles.text}>Capacete</Text>
            <Checkbox
              style={{ marginTop: 30 }}
              value={hat}
              onValueChange={setHat}
            />
          </View>
          <View style={styles.textSection}>
            <Image
              source={vest2}
              style={styles.imgContent}
            />
            <Text style={styles.text}>Colete de segurança</Text>
            <Checkbox
              style={{ marginTop: 30 }}
              value={vest}
              onValueChange={setVest}
            />
          </View>
          <View style={styles.textSection}>
            <Image
              source={glove2}
              style={styles.imgContent}
            />
            <Text style={styles.text}>Luva</Text>
            <Checkbox
              style={{ marginTop: 30 }}
              value={glove}
              onValueChange={setGlove}
            />
          </View>
          <View style={styles.textSection}>
            <Image
              source={mask2}
              style={styles.imgContent}
            />
            <Text style={styles.text}>Máscara</Text>
            <Checkbox
              style={{ marginTop: 30 }}
              value={mask}
              onValueChange={setMask}
            />
          </View>
          <View style={styles.textSection}>
            <Image
              source={glasses2}
              style={styles.imgContent}
            />
            <Text style={styles.text}>Óculos</Text>
            <Checkbox
              style={{ marginTop: 30 }}
              value={glasses}
              onValueChange={setGlasses}
            />
          </View>
          <View style={styles.textSection}>
            <Image
              source={boot2}
              style={styles.imgContent}
            />
            <Text style={styles.text}>Sapato</Text>
            <Checkbox
              style={{ marginTop: 30 }}
              value={boot}
              onValueChange={setBoot}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonSend}
            onPress={toggleSave}
          >
            <Text style={styles.textButton}>Salvar Mudanças</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBar currentRoute="Settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    marginTop: 28,
    fontSize: 18,
    marginLeft: 26,
    fontFamily: 'Roboto',
    fontWeight: '700',
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
    marginLeft: 20,
    fontWeight: '700',
  },
  viewSection: {
    backgroundColor: '#1B2946',
    width: '90%',
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 11,
    height: 380,
    marginLeft: 20,
  },
  imgContent: {
    width: 30,
    height: 30,
    marginTop: 25,
    marginLeft: 30,
  },
  textSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingRight: 20,
  },
  buttonSend: {
    width: '90%',
    height: 51,
    backgroundColor: '#1B2946',
    borderRadius: 10,
    marginTop: 15,
    flex: 1,
    maxHeight: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
