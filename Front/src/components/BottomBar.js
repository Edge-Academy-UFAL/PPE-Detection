import { StyleSheet, View, Text ,Image,TouchableOpacity } from 'react-native';

import homeIcon from './assets/home.png'

export default function BottomBar(){
    return(
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <View>
                    {/* <Image
                        source={homeIcon}
                        style= {styles.imgIcon}
                    /> */}
                    <Text style={styles.textContent}>
                        Home
                    </Text>
                </View>
                <View>
                    <Text style={styles.textContent}>
                        BigBrother
                    </Text>
                </View>
                <View>
                    <Text style={styles.textContent}>
                        Falcão
                    </Text>
                </View>
                <View>
                    <Text style={styles.textContent}>
                        Configurações
                    </Text>
                </View>
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
        marginTop: 40,
        fontSize: 15,
        color: '#fff',
    },
    
})