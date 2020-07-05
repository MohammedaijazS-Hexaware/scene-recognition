import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text ,Dimensions} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/Feather";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ImagePickerExample({navigation}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    navigation.navigate('Analysis',{P1:result.base64})
  };

  const takePicture = async () => {
    let result1 = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        base64: true
      });

      const manipResult=await ImageManipulator.manipulateAsync(result1.uri,[],{compress:0.4,base64:true});
    setImage(manipResult.uri);

    navigation.navigate('Analysis',{P1:manipResult.base64})
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 73.73 71.11" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(85,160,249,1)"
              cx={37}
              cy={36}
              rx={37}
              ry={36}
            ></Ellipse>
          </Svg>
          <Icon name="camera" style={styles.icon}></Icon>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1}>
        <View style={styles.ellipseStack1}>
          <Svg viewBox="0 0 74.46 71.45" style={styles.ellipse1}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(74,144,226,1)"
              cx={37}
              cy={36}
              rx={37}
              ry={36}
            ></Ellipse>
          </Svg>
          <Icon1 name="upload" style={styles.icon1} onPress={pickImage}></Icon1>
        </View>
      </TouchableOpacity>
      <Image
        source={require("./assets/cookie-the-pom-gySMaocSdqs-unsplash.jpg")}
        resizeMode="cover"
        style={styles.image}
      ></Image>
      <Text style={styles.smartLens}>Smart{"\n"}Lens</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    button: {
      width: 74,
      height: 71,
      marginTop: 407,
      marginLeft: 50,
      //alignSelf: "center",
      bottom:10,
      position: "absolute",
    },
    ellipse: {
      top: 0,
      width: 74,
      height: 71,
      position: "absolute",
      left: 0
    },
    icon: {
      top: 18,
      position: "absolute",
      color: "rgba(255,255,255,1)",
      fontSize: 35,
      left: 18
    },
    ellipseStack: {
      width: 74,
      height: 71
    },
    image: {
      width: wp('90%'),
      height: hp('60%'),
      borderRadius: 29,
      //marginTop: -420,
      position:"absolute",
      alignSelf: "center",
      paddingBottom:0,
      top:140
    },
    smartLens: {
      color: "#121212",
      fontSize: 35,
      //marginTop: -450,
      //marginLeft: 22,
      width: wp('70%'),
      height: hp('20%'),
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      top: 30
    },
    group: {
      width: wp('90%'),
      height: hp('10%'),
      //marginTop: 430,
      //marginLeft: 4,
      alignSelf: "center",
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
    button2: {
      width: wp('90%'),
      height: hp('8%'),
      backgroundColor: "rgba(74,144,226,1)",
      borderRadius: 27,
      bottom:0,
    },
    uploadFromDevice: {
      color: "rgba(255,255,255,1)",
      fontSize: 19,
      marginTop: 12,
      //marginLeft: 71,
      alignSelf:"center"
    },
    button1: {
      width: 74,
      height: 71,
      //marginTop: 407,
      marginLeft: 180,
      //alignSelf: "center",
      bottom:10,
      position: "absolute",
    },
    ellipse1: {
      top: 0,
      left: 0,
      width: 74,
      height: 71,
      position: "absolute"
    },
    icon1: {
      top: 16,
      left: 17,
      position: "absolute",
      color: "rgba(255,255,255,1)",
      fontSize: 40
    },
    ellipseStack1: {
      width: 74,
      height: 71
    }
  });