import { useState, useEffect } from 'react';
import { StyleSheet, View, Text ,Image,TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomBar from '../components/BottomBar';

import img from '../assets/icon.png';
import iconZoneImage from '../assets/iconZoneImage.png'

import * as ImagePicker from 'expo-image-picker'


export default function SendPhoto(){

    const [modalVisible, setModalVisible] = useState(false)

    const [isImage, setIsImage] = useState(false)

    const [image, setImage] = useState()

    const [imagemProcessada, setImagemProcessada] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        
    };

    const selectImage = () => {
        setIsImage(!isImage)
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        async function checkLogin() {
            const userId = await AsyncStorage.getItem("userId");

            if (!userId) {
                navigator.replace("Login");
            }
        }

        checkLogin();
    });

    const uploadImage = async (mode) => {
        
        try {
            let result = {}

            if (mode === "gallery") {
                setModalVisible(false)
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 1
                })
            }else {
                setModalVisible(false)
                await ImagePicker.requestCameraPermissionsAsync()
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 1
                })

            }

            if(!result.canceled) {
                //save image
                await saveImage(result.assets[0].uri)
            }


        }catch (erro) {
            alert("ERRO uploadind Image: " + erro.message)
            setModalVisible(false)
        }

    }

    const saveImage = async (image) => {
        try {
            setImage(image)
            setIsImage(true)
        }catch (error) {
            throw error
        }
    }

    const analisarImagem = async () => {
        setImagemProcessada(!imagemProcessada)
    }


    return(
        <View style={styles.container}>

            <Modal 
                animationType='none'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                >

                    <View style={styles.containerModal}>
                        <View style={styles.containerButtonModal}> 
                            <TouchableOpacity style={[styles.buttonModal, styles.firstButtonModal]} activeOpacity={0.8} onPress={() => uploadImage('gallery')}>
                                <Text style={styles.textButtonModal}>Galeria</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonModal, styles.secondyButtonModal]} activeOpacity={0.8}  onPress = {() => uploadImage()}>
                                <Text style={styles.textButtonModal}>Câmera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonModal, styles.containerCancelButtonModal]} activeOpacity={0.8} onPress={toggleModal}>
                                <Text style={[styles.textButton, styles.textCancelButtonModal]}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
            </Modal>  
            

            <View style={styles.imageContainer}>
                <Image
                    source={img}
                    style={styles.image}
                />
            </View>
            <View style={styles.containerZoneImage}>
              
                <TouchableOpacity style={styles.zoneImage} activeOpacity={1}>
                    {!isImage? 
                    <View style={styles.containerContentZoneImage}>
                        <Image
                            source={iconZoneImage}
                            style={styles.iconImageZone}
                        />
                        <View>
                            <Text style={styles.textZoneImageFirst}>
                                <Text style={styles.colorInTextZoneImageFirst}>Escolha</Text> a imagem que será enviada
                            </Text>
                            <Text style={styles.textZoneImageSecond}>
                                Selecione .jpeg, .png ou .gif
                            </Text>
                        </View>
                    </View>
                    :
                    <Image
                    source={{ uri: image }}
                    style={styles.imageZone}
                    />
                    }
                </TouchableOpacity>
                {imagemProcessada ? 
                    <View>
                        <TouchableOpacity style={styles.buttonSend} >
                                <Text style={styles.textButton}>Baixar imagem</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonSend}>
                                <Text style={styles.textButton}>Baixar relatório</Text>
                            </TouchableOpacity>
                    </View>
                        :
                    image ? (
                        <View>
                             <TouchableOpacity style={styles.buttonSend} onPress={toggleModal}>
                                <Text style={styles.textButton}>Escoher outra imagem</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonSend} onPress={() => analisarImagem()}>
                                <Text style={styles.textButton}>Analisar Imagem</Text>
                            </TouchableOpacity>
                        </View>
                        ) : (
                            <TouchableOpacity style={styles.buttonSend} onPress={toggleModal}>
                                <Text style={styles.textButton}>Enviar Imagem</Text>
                            </TouchableOpacity>
                            )
                        }
 
            </View>
            <BottomBar currentRoute={'SendPhoto'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageContainer : {
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 35
    },
    containerZoneImage: {
        flex: 1,
        alignItems: 'center'
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
        justifyContent: 'center'
    },
    iconImageZone: {
        width: 32,
        height: 32
    },
    textZoneImageFirst: {
        fontWeight: '700',
        fontSize: 16,
        marginTop: 10,
    },
    colorInTextZoneImageFirst: {
        color: '#156CF7'
    },
    textZoneImageSecond: {
        fontWeight: '400',
        marginLeft: 40,
        color: '#515978',
        marginTop: 6
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
        justifyContent: 'center'
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },

    containerModal: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(64, 64, 64, 0.69)',
        justifyContent: 'flex-end'
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
        marginBottom: 20
    },

    textCancelButtonModal: {
        fontWeight: '700',
        color: 'black',
        fontSize: 20
    },

    containerCancelButtonModal: {
        marginTop: 10,
        borderRadius: 10
    },

    imageZone: {
        width: 343,
        height: 342,
    }
})