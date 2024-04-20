import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';

import { API_URL } from '@env';

export default function VideoFeed() {
  const [missingEpi, setMissingEpi] = useState([]);

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
        const response = await axios.get(`${API_URL}:5001/missing_epi`);
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
        source={{ uri: `${API_URL}:5001/camera_feed` }}
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
