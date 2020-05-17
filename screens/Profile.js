import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import LoginStore from '../src/store/LoginStore';
import {observer} from 'mobx-react';

@observer
class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        {LoginStore.kisi.userIdentityNumber != '' ? (                  
          <Image style={styles.avatar} source={{uri: `https://www.matmaca.com/images/${LoginStore.kisi.userIdentityNumber}.jpg`}}/> 
                            
                        ) : (
                          <Image style={styles.avatar} source={require('../assets/person.png')}/>
                          
                        )
      }

             {
               LoginStore.kisi.getuserRol() == 1 ? (
                <View style={styles.body}>
                  <Text style={styles.name}>{LoginStore.kisi.getfullName()}</Text>
                  <Text style={styles.info}>Hasta</Text>
                  <View style={styles.userListContainer}>
                      <View style={styles.satir}>
                        <Text style={styles.baslik}>Kimlik Numarası : </Text>
                        <Text style={styles.icerik}>{LoginStore.kisi.userIdentityNumber}</Text>
                      </View>

                      <View style={styles.satir}>
                        <Text style={styles.baslik}>Telefon Numarası : </Text>
                        <Text style={styles.icerik}>{LoginStore.kisi.userPhoneNumber}</Text>
                      </View>

                      <View style={styles.satir}>
                        <Text style={styles.baslik}>E-mail : </Text>
                        <Text style={styles.icerik}>{LoginStore.kisi.userEmail}</Text>
                      </View>

                      <View style={styles.satir}>
                        <Text style={styles.baslik}>Doğum Tarihi : </Text>
                        <Text style={styles.icerik}>{LoginStore.kisi.userBirthDate}</Text>
                      </View>
                  </View>
                  
                </View>
              ) : (
                <View style={styles.body}>
                  <Text style={styles.name}>{LoginStore.kisi.getfullName()}</Text>
                  <Text style={styles.info}>{LoginStore.doctorProfile.title}</Text>

                  <View style={styles.userListContainer}>
                      <View style={styles.satir}>
                        <Text style={styles.baslik}>Kimlik Numarası : </Text>
                        <Text style={styles.icerik}>{LoginStore.kisi.userIdentityNumber}</Text>
                      </View>

                      <View style={styles.satir}>
                        <Text style={styles.baslik}>Telefon Numarası : </Text>
                        <Text style={styles.icerik}>{LoginStore.kisi.userPhoneNumber}</Text>
                      </View>

                      <View style={styles.satir}>
                        <Text style={styles.baslik}>E-mail : </Text>
                        <Text style={styles.icerik}>{LoginStore.kisi.userEmail}</Text>
                      </View>

                      <View style={styles.satir}>
                        <Text style={styles.baslik}>Hastane : </Text>
                        <Text style={styles.icerik}>{LoginStore.doctorProfile.hospital}</Text>
                      </View>


                      <View style={styles.satir}>
                        <Text style={styles.baslik}>Hastane Adresi : </Text>
                        <Text style={styles.icerik}>{LoginStore.doctorProfile.adresse + " İlçe : " + LoginStore.doctorProfile.district + " İl : "+LoginStore.doctorProfile.province}</Text>
                      </View>

                      
                  </View>

                </View>
              )
             }
            
            
            
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:
  {
    height:'100%',
  },
  header:{
    backgroundColor: '#246685',
    height:'22%',
  },
  userListContainer:
  {
    alignItems:'flex-start',
    alignContent:'flex-start',
    width:'100%'
  },

  satir:
  {
    flexDirection:'row',
    marginLeft:'5%',
    marginTop:'3%',
    flexWrap:'wrap',
  },
  baslik:
  {
    fontSize:20,
    color:'grey'
  },
  icerik:
  {
    fontSize:20,
    flexWrap:'wrap',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:120
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:'22%',
    alignItems:'center',
    
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
export default Profile;