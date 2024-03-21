import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import homeIcon from './assets/homeDeactive.png';
import homeIconActive from './assets/homeAcitive.png'
import bigBrotherIcon from './assets/bigbrother.png';
import configIcon from './assets/config.png';
import falcaoIcon from './assets/falcaoDeactive.png';
import falcaoIconActive from './assets/falcaoActive.png'

import { useNavigation } from '@react-navigation/native';

export default function BottomBar({ currentRoute }) {
    const navigator = useNavigation();
    const [activeButton, setActiveButton] = useState('Home');

    const handleNavigate = (destino) => {
        navigator.navigate(destino);
    };

    useEffect(() => {
        setActiveButton(currentRoute);
        
    }, [currentRoute]);


    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={[styles.buttonTouch, activeButton === 'Home' && styles.activeButton]}
                    onPress={() => handleNavigate('Home')}
                >
                    <Image source={activeButton == 'Home' ? homeIconActive: homeIcon} style={styles.imgIcon} />
                    <Text style={[styles.textContent, activeButton === 'Home' && styles.activeText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonTouch, activeButton === 'BigBrother' && styles.activeButton]}
                   
                >
                    <Image source={bigBrotherIcon} style={styles.imgIconBigBrother} />
                    <Text style={[styles.textContent, activeButton === 'BigBrother' && styles.activeText]}>BigBrother</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonTouch, activeButton === 'SendPhoto' && styles.activeButton]}
                    onPress={() => handleNavigate('SendPhoto')}
                >
                    <Image source={activeButton == 'SendPhoto' ? falcaoIconActive: falcaoIcon} style={styles.imgIconFalcao} />
                    <Text style={[styles.textContent, activeButton === 'SendPhoto' && styles.activeText]}>Falcão</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonTouch, activeButton === 'Config' && styles.activeButton]}
                >
                    <Image source={configIcon} style={styles.imgIcon} />
                    <Text style={[styles.textContent, activeButton === 'Config' && styles.activeText]}>Configurações</Text>
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textContent: {
        fontSize: 15,
        color: '#fff',
    },
    imgIcon: {
        width: 22,
        height: 22.5,
        marginBottom: 8,
    },
    buttonTouch: {
        alignItems: 'center',
    },
    imgIconFalcao: {
        width: 28,
        height: 19,
        marginBottom: 8,
    },
    imgIconBigBrother: {
        width: 26,
        height: 22.5,
        marginBottom: 8,
    },
    activeButton: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },
    activeText: {
        color: 'white',
    },
});
