import React , {Component} from 'react';
import { AsyncStorage , ActivityIndicator , StatusBar , StyleSheet, View , PermissionsAndroid} from 'react-native';
import { runInAction } from 'mobx';
import {observer} from 'mobx-react';
import LoginStore from '../src/store/LoginStore';
import IlacStore from '../src/store/IlacStore';
import axios from 'axios';
import User from '../models/User';
import DoctorProfile from '../models/DoctorProfile';
import { CommonActions} from '@react-navigation/native'

@observer
export default class AuthLoadingScreen extends Component
{
  constructor(props)
  {
    super(props);
    this._loadData();
  }
  _loadData = async () =>  
  {
    let isLoggin = await AsyncStorage.getItem('@isLoggin');
    let token = await AsyncStorage.getItem('@token');
    if(isLoggin == '1')
    {
      if(token != '' && token != null)
      {
            axios.get(`http://matmaca.com/api/Home/getUser?token=${token}`)
            .then(res => res.data[0])
            .then( res => {
                if(res.id != 0)
                {
                    let model = new User(res.id , res.isActivity , res.userBirthDate , res.userEmail , res.userIdentityNumber , res.userImageSource , res.userPersonalName , res.userPersonalSurname , res.userPhoneNumber , res.userRol );
                    runInAction( () => { LoginStore.kisi = model; LoginStore.isim = model.getfullName(); LoginStore.rol = model.userRol == 2 ? 'Doktor':'Hasta'; });
                    if(model.userRol == 2)
                    {
                      this._loadDoctor(model.userIdentityNumber);
                    }
                    IlacStore._fillIlac(model.userIdentityNumber);
                }
            },err=>{
                alert("Oops bir şeyler ters gitti")
            })
            runInAction(() => { LoginStore.login = true});
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'HomeScreen' },
                ],
              })
            );
            //this.props.navigation.navigate('HomeScreen');
      }else
      {
            AsyncStorage.setItem('@isLoggin' , '0');
            AsyncStorage.setItem('@token' , '');
            runInAction(() => { LoginStore.login = false});
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'LoginScreen' },
                ],
              })
            );
            //this.props.navigation.navigate('LoginScreen');
      }
    }else
    {
      runInAction(() => { LoginStore.login = false});
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'LoginScreen' },
          ],
        })
      );
      //this.props.navigation.navigate('LoginScreen');
    }
    
  }

  _loadDoctor = (identity) =>
    {
      axios.get(`http://matmaca.com/api/Home/getDoctorP?identity=${identity}`)
      .then(res => res.data[0])
      .then( res=>{
        let model = new DoctorProfile(identity , res.name , res.surname , res.title , res.section , res.hospital , res.adresse , res.district , res.province);
        runInAction( () => {LoginStore.doctorProfile = model});
      },err=>{
        alert("Oops bir şeyler ters gitti..")
      })
    }
  _controlToken = (token) => 
  {
    axios.get(`http://matmaca.com/api/Home/controlLogin?token=${token}`)
    .then(res => console.log(res.data))
    .then( res => {
      return res;
    } , err => {
      return false;
    })
  }
  componentDidMount()
  {
    this._loadData();
  }
  render(){
    return (
          <View style={styles.aComp} >
            <ActivityIndicator />
            <StatusBar barStyle="default" /> 
          </View>
          )
      }
}

const styles = StyleSheet.create({
  aComp:
  {
    flex:1,
    backgroundColor: '#406080',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:25,
  },
})