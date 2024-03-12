import { StyleSheet, View, Text ,Image,TouchableOpacity } from 'react-native';


import img from '../assets/icon.png';
import EyeIcon from '../assets/bigEye.png'
import cam from '../assets/cam.png'
import setaButton from '../assets/setaButton.png'

import BottomBar from '../components/BottomBar';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
       <Image
        source={img}
        style={styles.image}
      />
      </View>
      <Text style={styles.title}>
        Seja bem-vindo,
      </Text>
      <Text style={styles.userName}>
        Raul Duarte
      </Text>

      <View style={styles.viewSection}>
        <View style={styles.contentSection}>
          <Image
            source={EyeIcon}
            style={styles.imgContent}
          />
          <Text style={styles.textContent}>
            Projeto Falcão
          </Text>
        </View>
        <View style={styles.containerTextContentSection}>
          <Text style={styles.textContentSection}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ipsum perferendis esse voluptate excepturidolores! esse voluptate
          </Text>
          <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Experimento agora
                </Text>
                <Image
                  source={setaButton}
                  style={styles.setaButton}
                ></Image>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.viewSection}>
      <View style={styles.contentSection}>
          <Image
            source={cam}
            style={styles.imgContent}
          />
          <Text style={styles.textContent}>
            Projeto BigBrother
          </Text>
        </View>
        <View style={styles.containerTextContentSection}>
          <Text style={styles.textContentSection}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ipsum perferendis esse voluptate excepturidolores! esse voluptate
          </Text>
          <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Experimento agora
                </Text>
                <Image
                  source={setaButton}
                  style={styles.setaButton}
                ></Image>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomBar/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer : {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 35
  },
  title: {
    fontSize: 26,
    // fontFamily: "Popins",
    marginLeft: 20,
    fontWeight: '700',
    marginTop: 30
  },
  userName: {
    fontSize: 20,
    color: '#E6830C',
    // fontFamily: "Popins",
    marginLeft: 20,
    marginTop: 5
  },
  viewSection: {
    backgroundColor: '#1B2946',
    width: '100%',
    height: 170,
    marginTop: 30,
    borderRadius: 23,
    marginLeft: 20
  },
  contentSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  imgContent : {
    width: 49,
    height: 35,
    marginTop: 25,
    marginLeft: 30
  },
  textContent: {
    color: '#fff',
    marginTop: 25,
    fontSize: 21,
    marginLeft: 20,
    fontFamily: 'Roboto',
    fontWeight: '700'
  },
  textContentSection: {
    color: '#fff',
    marginLeft: 30,
    // marginBottom: 50,
    fontSize: 11
  },
  containerTextContentSection: {
    flex: 1,
    maxWidth: 350,
  },
  buttonSection: {
    flex: 1,
    alignItems: 'flex-end' 
  },
  button: {
    backgroundColor: 'rgba(100, 50, 0, 0.5)',
    borderRadius: 5,
    borderRadius: 20,
    width: 125,
    marginTop: 17,
    height: 23,
    flex: 1,
    maxHeight: 23,
    flexDirection: 'row' 
  },
  buttonText: {
    fontSize: 10,
    color: '#E6830C',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 10
  },
  setaButton: {
    width: 5.2,
    height: 10,
    marginTop: 7,
    marginLeft: 15
  }
});
