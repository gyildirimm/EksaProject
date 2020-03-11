
import React, { Component } from 'react'
import { Text, StyleSheet, View , SafeAreaView   , TouchableOpacity , TextInput } from 'react-native'

class AlternatifLogin extends Component 
{
  render() {
    return (
      <SafeAreaView style={styles.aComp}>  


      <View style={{flex: 1.5,marginTop:50,backgroundColor:'',justifyContent:'center'}}>
        <Text style={styles.baslik}>EVA Sağlık</Text>
        <Text style={styles.baslik}>   Asistanı</Text>
      </View>

      <View style={styles.inSty}>
        <TextInput style={styles.txtGirdi} placeholder="Email.." placeholderTextColor='rgb(200,200,200)'/>
        <TextInput style={styles.txtGirdi} placeholder="Password.." secureTextEntry={true} placeholderTextColor='rgb(200,200,200)'/>
      </View>

      <View style={styles.btnVie}>
        <TouchableOpacity style={styles.btnLogin}>
        <Text style={{fontSize:26 , color:'white'}}>Giriş Yap</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity>
          <Text style={styles.altYaz}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.altYaz,{marginLeft:110}]}>Şifreni mi unuttun?</Text>
        </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  aComp:
  {
    flex:1,
    backgroundColor: '#003f5c',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  baslik:
  {
      fontSize:35,
      fontFamily:'cursive',
      color:'#fff'
  },
  inSty:
  {
      flex: 2,
      justifyContent:'flex-start'
  },
  txtGirdi:
  {

      height:55,
      width:300,
      marginTop:70,
      borderRadius:40,
      backgroundColor:'#465881',
      paddingLeft:20,
      color:'rgb(200,200,200)',
      fontSize:18

  },
  btnVie:
  {
    flex: 1,
    width:'80%',
  },
  altYaz:
  {
      color:'white',
      fontSize:19,
      marginLeft:15,
      marginTop:25
  },
  btnLogin:
  {
      width:'50%',
      height:'30%',
      backgroundColor: 'rgb(120,20,40)',
      borderRadius:25,
      fontSize:25,
      marginLeft:'25%',
      alignItems:'center',
      justifyContent:'center',
  },
})
export default AlternatifLogin;
