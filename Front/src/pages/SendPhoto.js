import { StyleSheet, View, Text ,Image,TouchableOpacity } from 'react-native';
import BottomBar from '../components/BottomBar';

import img from '../assets/icon.png';
import iconZoneImage from '../assets/iconZoneImage.png'

export default function SendPhoto(){

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={img}
                    style={styles.image}
                />
            </View>
            <View style={styles.containerZoneImage}>
                <TouchableOpacity style={styles.zoneImage} activeOpacity={1} onPress={() => alert('ok')}>
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
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSend}>
                    <Text style={styles.textButton}>Enviar Imagem</Text>
                </TouchableOpacity>
            </View>
            <BottomBar/>
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
    }
})