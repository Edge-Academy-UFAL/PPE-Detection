import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';

import { API_URL } from '@env';

export default function VideoFeed() {
  const [missingEpi, setMissingEpi] = useState([]);
  const [classNamesArray, setClassNamesArray] = useState([]);

  useEffect(() => {
    const getClassNames = async () => {
      try {
        // Objeto com os nomes dos itens e seus correspondentes classNames
        const itemClassNames = {
          Hat: 'capacete',
          Vest: 'colete-de-seguranca',
          Gloves: 'luva',
          Mask: 'mascara',
          Glass: 'oculos',
          Boot: 'sapato',
        };

        // Array para armazenar os classNames
        let classNames = [];

        // Loop através do objeto itemClassNames
        for (const [item, className] of Object.entries(itemClassNames)) {
          // Verifica se o item está presente no AsyncStorage
          const value = await AsyncStorage.getItem(item);
          if (value === 'true') {
            // Adiciona o className e seu oposto ao array de classNames
            classNames.push(className);
            classNames.push(`sem_${className}`);
          }
        }

        // Define o array de classNames no state
        setClassNamesArray(classNames);
        sendClassNames(classNames);
      } catch (error) {
        console.error('Erro ao buscar os classNames:', error);
      }
    };

    // Chamada da função para buscar os classNames
    getClassNames();
    
  }, []);

  const sendClassNames = async (classNames) => {
    try {
      await axios.post('http://192.168.0.103:5001/receiveParams', { classNames });

      for (let i = 0; i < classNames.length; i++) {
        console.log(classNames[i]);
      }
      
      console.log('Enviado!!')
    } catch (error) {
      console.error('Erro ao enviar classNames para o servidor:', error);
    }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.103:5001/missing_epi`);
        const data = response.data;
        if (data.missing_epi) {
          setMissingEpi(data.missing_epi);
        } else {
          setMissingEpi([]);
        }
      } catch (error) {
        console.error('Erro ao obter EPIs ausentes:', error);
      }
    };

    const interval = setInterval(fetchData, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: `http://192.168.0.103:5001/camera_feed` }}
        style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'black' }}
      />
      {missingEpi.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white' }}>EPIs ausentes: {missingEpi.join(', ')}</Text>
        </View>
      )}
    </View>
  );
}
