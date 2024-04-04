import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { API_URL } from '@env';

import BottomBar from '../components/BottomBar';

import img from '../assets/icon.png';
import back from '../assets/back.png';
import iconZoneImage from '../assets/iconZoneImage.png';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function SendPhoto() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState();
  const [imagemProcessada, setImagemProcessada] = useState();
  const [isImagemProcessada, setIsImagemProcessada] = useState(false);
  const [sendingImage, setSendingImage] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const selectImage = () => {
    setIsImage(!isImage);
    setModalVisible(!modalVisible);
  };

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

  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode === 'gallery') {
        setModalVisible(false);
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        setModalVisible(false);
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        //save image
        await saveImage(result.assets[0].uri);
      }
    } catch (erro) {
      alert('ERRO uploadind Image: ' + erro.message);
      setModalVisible(false);
    }
  };

  const saveImage = async (image) => {
    try {
      setImage(image);
      setIsImage(true);
    } catch (error) {
      throw error;
    }
  };

  const downloadImage = async () => {
    const base64Data = imagemProcessada; // Your Base64 encoded image data
    const uri = FileSystem.documentDirectory + 'result.jpg'; // File URI to save the image

    try {
      await FileSystem.writeAsStringAsync(uri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      if (mediaLibraryPermission.status === 'granted') {
        await MediaLibrary.createAssetAsync(uri);
        Alert.alert(
          'Imagem salva com sucesso!',
          'A imagem foi salva na galeria do seu dispositivo.'
        );
      } else {
        Alert.alert(
          'Permissão negada',
          'Você precisa permitir o acesso à galeria para salvar a imagem.'
        );
        Linking.openSettings();
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const donwloadReport = async () => {
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'epi.jpeg', // nome da imagem que será enviada
      type: 'image/jpeg', // tipo da imagem, ajuste conforme necessário
    });

    try {
      const response = await fetch(`${API_URL}:5000/report`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        try {
          const pdfBlob = await response.blob();

          const reader = new FileReader();
          reader.readAsDataURL(pdfBlob);

          reader.onload = async () => {
            const base64Data = reader.result.split(',')[1];

            const pdfUri = FileSystem.cacheDirectory + 'report.pdf';

            await FileSystem.writeAsStringAsync(pdfUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            });

            await Sharing.shareAsync(pdfUri);
          };
        } catch (error) {
          Alert.alert('Erro ao baixar relatório:', error.message);
          console.error('Erro ao baixar relatório:', error.message);
        }
      }
    } catch (error) {
      Alert.alert('Erro ao baixar relatório:', error.message);
      console.error('Erro ao baixar relatório:', error.message);
    }
  };

  const backNavigation = () => {
    console.log('fui clicado');
    if (isImage || isImagemProcessada) {
      setIsImage(false);
      setImage(null);
      setImagemProcessada(null);
      setIsImagemProcessada(false);
    } else {
      navigator.replace('Home');
    }
  };

  const sendImageToServer = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'epi.jpeg', // nome da imagem que será enviada
        type: 'image/jpeg', // tipo da imagem, ajuste conforme necessário
      });

      console.log('Enviando solicitação para o servidor...');

      setSendingImage(true);

      const response = await fetch(`${API_URL}:5000/detect`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSendingImage(false);

      console.log('Solicitação concluída:', response);

      if (response.ok) {
        const blob = await response.blob();

        const reader = new FileReader();

        reader.onload = () => {
          const base64Data = reader.result.split(',')[1];
          setImagemProcessada(base64Data);
          // Sinalizando que a imagem foi processada
          setIsImagemProcessada(true);
        };

        reader.readAsDataURL(blob);
      } else {
        Alert.alert('Erro ao enviar imagem para o servidor:', response.status);
        console.error('Erro ao enviar imagem para o backend:', response.status);
      }
    } catch (error) {
      Alert.alert('Erro ao enviar imagem para o servidor:', error.message);
      console.error('Erro ao enviar imagem para o backend:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.containerButtonModal}>
            <TouchableOpacity
              style={[styles.buttonModal, styles.firstButtonModal]}
              activeOpacity={0.8}
              onPress={() => uploadImage('gallery')}
            >
              <Text style={styles.textButtonModal}>Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonModal, styles.secondyButtonModal]}
              activeOpacity={0.8}
              onPress={() => uploadImage()}
            >
              <Text style={styles.textButtonModal}>Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonModal, styles.containerCancelButtonModal]}
              activeOpacity={0.8}
              onPress={toggleModal}
            >
              <Text style={[styles.textButton, styles.textCancelButtonModal]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
      <View style={styles.containerZoneImage}>
        <TouchableOpacity
          style={styles.zoneImage}
          activeOpacity={1}
          onPress={toggleModal}
        >
          {!isImage ? (
            <View style={styles.containerContentZoneImage}>
              <Image
                source={iconZoneImage}
                style={styles.iconImageZone}
              />
              <View>
                <Text style={styles.textZoneImageFirst}>
                  <Text style={styles.colorInTextZoneImageFirst}>Escolha</Text> a imagem
                  que será enviada
                </Text>
                <Text style={styles.textZoneImageSecond}>
                  Selecione .jpeg, .png ou .gif
                </Text>
              </View>
            </View>
          ) : (
            <>
              {sendingImage && (
                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                  }}
                >
                  <ActivityIndicator
                    color="#fff"
                    size={70}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      marginTop: 30,
                      fontSize: 16,
                      fontWeight: '700',
                    }}
                  >
                    Aguardando a análise...
                  </Text>
                </View>
              )}
              <Image
                source={
                  isImagemProcessada
                    ? { uri: `data:image/jpeg;base64,${imagemProcessada}` }
                    : { uri: image }
                }
                style={styles.imageZone}
              />
            </>
          )}
        </TouchableOpacity>
        {isImagemProcessada ? (
          <View>
            <TouchableOpacity
              style={styles.buttonSend}
              onPress={downloadImage}
            >
              <Text style={styles.textButton}>Baixar imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSend}
              onPress={donwloadReport}
            >
              <Text style={styles.textButton}>Baixar relatório</Text>
            </TouchableOpacity>
          </View>
        ) : image ? (
          <View>
            <TouchableOpacity
              style={styles.buttonSend}
              onPress={toggleModal}
              id="buttonChooseAnotherImage"
              disabled={sendingImage}
            >
              <Text style={styles.textButton}>Escolher outra imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSend}
              onPress={() => sendImageToServer()}
              id="sendImageToServer"
              disabled={sendingImage}
            >
              <Text style={styles.textButton}>Analisar Imagem</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.buttonSend}
            onPress={toggleModal}
          >
            <Text style={styles.textButton}>Enviar Imagem</Text>
          </TouchableOpacity>
        )}
      </View>
      <BottomBar currentRoute={'SendPhoto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  containerZoneImage: {
    flex: 1,
    alignItems: 'center',
  },
  zoneImage: {
    width: 343,
    height: 342,
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginTop: 30,
  },
  containerContentZoneImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImageZone: {
    width: 32,
    height: 32,
  },
  textZoneImageFirst: {
    fontWeight: '700',
    fontSize: 16,
    marginTop: 10,
  },
  colorInTextZoneImageFirst: {
    color: '#156CF7',
  },
  textZoneImageSecond: {
    fontWeight: '400',
    marginLeft: 40,
    color: '#515978',
    marginTop: 6,
  },

  buttonSend: {
    width: 343,
    height: 51,
    backgroundColor: '#1B2946',
    borderRadius: 10,
    marginTop: 15,
    flex: 1,
    maxHeight: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  containerModal: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(64, 64, 64, 0.69)',
    justifyContent: 'flex-end',
  },

  buttonModal: {
    width: 355,
    maxWidth: 355,
    height: 61,
    backgroundColor: '#FFFFFFDD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButtonModal: {
    fontSize: 20,
    fontWeight: '400',
  },

  firstButtonModal: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  secondyButtonModal: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerButtonModal: {
    marginBottom: 20,
  },

  textCancelButtonModal: {
    fontWeight: '700',
    color: 'black',
    fontSize: 20,
  },

  containerCancelButtonModal: {
    marginTop: 10,
    borderRadius: 10,
  },

  imageZone: {
    width: 343,
    height: 342,
  },
});
