import { StyleSheet, View, Text ,Image,TouchableOpacity } from 'react-native';

import homeIcon from './assets/home.png'
import bigBrotherIcon from './assets/bigbrother.png'
import configIcon from './assets/config.png'
import falcaoIcon from './assets/falcao.png'

export default function BottomBar(){
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
                <TouchableOpacity style={styles.buttonTouch}>
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
        marginTop:30,
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
        width: 25,
        height: 24,
        marginBottom: 8
    },
    buttonTouch: {
        alignItems: 'center',
    },
    imgIconFalcao: {
        width: 29,
        height: 20,
        marginBottom: 8
    },
    imgIconBigBrother: {
        width: 27,
        height: 24.5,
        marginBottom: 8
    }
    
})