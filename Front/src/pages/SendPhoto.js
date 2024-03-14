import { StyleSheet, View, Text ,Image,TouchableOpacity } from 'react-native';
import BottomBar from '../components/BottomBar';

import img from '../assets/icon.png';

export default function SendPhoto(){
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={img}
                    style={styles.image}
                />
            </View>
            
            
            {/* <BottomBar/> */}
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
})