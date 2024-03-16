import { StyleSheet, View, Text ,Image,TouchableOpacity } from 'react-native';

import homeIcon from './assets/home.png'
import bigBrotherIcon from './assets/bigbrother.png'
import configIcon from './assets/config.png'
import falcaoIcon from './assets/falcao.png'

import { useNavigation } from '@react-navigation/native';

export default function BottomBar(){

    navigator = useNavigation();

    const routeName = useNavigation().getState().routes[useNavigation().getState().index].name;

    const handleFalcao = () => {
        navigator.navigate('SendPhoto');
      }
    return(
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.buttonTouch}>
                    <Image
                        source={homeIcon}
                        style= {styles.imgIcon}
                    />
                    <Text style={styles.textContent}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTouch}>
                    <Image
                        source={bigBrotherIcon}
                        style= {styles.imgIconBigBrother}
                    />
                    <Text style={styles.textContent}>
                        BigBrother
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTouch} onPress={handleFalcao}>
                    <Image
                        source={falcaoIcon}
                        style= {styles.imgIconFalcao}
                    />
                    <Text style={styles.textContent}>
                        Falcão
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTouch}>
                    <Image
                        source={configIcon}
                        style= {styles.imgIcon}
                    />
                    <Text style={styles.textContent}>
                        Configurações
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1B2946",
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 100,
        borderTopLeftRadius: 16, // Raio para o canto superior esquerdo
        borderTopRightRadius: 16, // Raio para o canto superior direito
        borderBottomLeftRadius: 0, // Sem raio para o canto inferior esquerdo
        borderBottomRightRadius: 0,
        
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textContent:{
        fontSize: 15,
        color: '#fff',
    },
    imgIcon: {
        width: 22,
        height: 22.5,
        marginBottom: 8
    },
    buttonTouch: {
        alignItems: 'center',
    },
    imgIconFalcao: {
        width: 28,
        height: 19,
        marginBottom: 8
    },
    imgIconBigBrother: {
        width: 26,
        height: 22.5,
        marginBottom: 8,
    }
    
})