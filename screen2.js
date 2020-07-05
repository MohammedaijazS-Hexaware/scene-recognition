import React from 'react';
import { StyleSheet, Text,View,ActivityIndicator,Image,ScrollView, processColor} from 'react-native';
import Clarifai from 'clarifai';
import Icon from "react-native-vector-icons/EvilIcons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class myclass extends React.Component{
  constructor(props){
    super(props)
    this.state={
        isLoading: true,
        dataSource: null
    }
  }
  componentDidMount(){
    let app=new Clarifai.App({
      apiKey: 'Keep your API Key Here'
    })

    app.models.predict(Clarifai.GENERAL_MODEL,{base64:this.props.navigation.state.params.P1})
      .then((response) => {
              this.setState({
                isLoading: false,
                dataSource: response['outputs'][0]['data']['concepts']
              })
      })
  }

render(){
    let end=this.props.navigation.state.params.P1
    if(this.state.isLoading){
        return(
            <View style={{justifyContent:"center",alignContent:"center",alignItems:"center",flex:1}}>
                <ActivityIndicator />
            </View>
        )
    }
    else{
    let fixt=this.state.dataSource.map((val,key) => {
        return(
          <View key={key}>
            <Text style={styles.uploadFromDevice}>{val.name}</Text>
        </View>
        )
    });
    return(
        <View style={styles.container}>
              <Icon name="arrow-left" style={styles.icon} onPress={() =>{this.props.navigation.navigate('Scene_Analyzer')}}></Icon>
              <Image source={{uri:'data:image/png;base64,'+end}} resizeMode="cover" style={styles.image} />
              <View style={styles.finalRect}>
                {fixt}
              </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection:"row"
  },
  sceneAnalyzer: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginTop: 57
  },
  image: {
    width: wp('90%'),
    height: hp('50%'),
    borderRadius: 29,
    //marginTop: -420,
    position:"absolute",
    alignSelf: "center",
    paddingBottom:0,
    top:70,
    //flex:0.5
  },
  rect: {
    width: 303,
    height: 169,
    backgroundColor: "#E6E6E6",
    borderRadius: 26,
    marginTop: 14,
    marginLeft: 28
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: wp('15%'),
    //marginTop: 37,
    //marginLeft: 18,
    justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      top: 25,
      //flex:0.11
  },
  rect2: {
    height: hp('4%'),
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 17,
    //marginTop: 380,
    marginLeft: 22,
    marginBottom:20,
    top:380,
    //flexDirection: "row"
    alignSelf:"center",
    //marginRight:22
    //flex:1
  },
  uploadFromDevice: {
    color: "rgba(255,255,255,1)",
    fontSize: wp('5%'),
    marginTop: 0,
    //marginLeft: 71,
    alignSelf:"center",
    marginRight:22,
    //marginLeft:22
  },
  finalRect:{
    width:wp('90%'),
    height:hp('35%'),
    top:380,
    borderRadius: 29,
    flexWrap:"wrap",
    alignSelf:"center",
    backgroundColor: "rgba(74,144,226,1)",
    //position:"absolute",
    bottom:0,
    //marginTop:380
  }
});