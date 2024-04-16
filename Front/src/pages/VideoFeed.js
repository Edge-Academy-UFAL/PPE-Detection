import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';
import axios from 'axios';

import { API_URL } from '@env';

export default function VideoFeed() {
  const [missingEpi, setMissingEpi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}:5000/missing_epi`);
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
        source={{ uri: 'http://192.168.1.113:5000/video_feed' }}
        style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'black' }}
      />
      {missingEpi.length > 0 && (
        <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: 'rgba(255, 0, 0, 0.7)', padding: 10, borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>EPIs ausentes: {missingEpi.join(', ')}</Text>
        </View>
      )}
    </View>
  );
}
