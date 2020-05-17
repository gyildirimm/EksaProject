import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { observer } from 'mobx-react'
import Icon from '@expo/vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Appointment from '../screens/Appointment.js';
import Hatırlat from '../screens/HatırlatScreen.js';
import Kitle from '../screens/KitleEndeksi';
import Profil from '../screens/Profile';
import Home from '../screens/HomeScreen';
import Camera from '../screens/Camera';

import DrawerLogout from '../components/DrawerLogout';
import LoginStore from '../src/store/LoginStore.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const Drawer = createDrawerNavigator();

@observer
export default class MyDrawer extends Component 
{
    render() {
        return (
            
            <Drawer.Navigator initialRouteName={Home}
            drawerType="back" drawerContentOptions={ 
              {contentContainerStyle:{backgroundColor:'#ebedf7' ,flex:1} ,labelStyle:{fontSize:18}, activeBackgroundColor:'#eeb400',activeTintColor:'black',userName:LoginStore.isim,tittle:LoginStore.rol}}>
              <Drawer.Screen
                name="Home"
                component={Home}
                options={{ drawerLabel: 'Home' , drawerIcon:()=> (<Icon name="home" size={22}/>)}}
              />  
              <Drawer.Screen
                name="Profil"
                component={Profil}
                options={{ drawerLabel: 'Profil' , drawerIcon:() => (<Icon name="user" size={22}/>) }}
              />
              <Drawer.Screen
                name="Profile"
                component={Appointment}
                options={{ drawerLabel: 'Randevu' ,drawerIcon:() => (<Icon name="calendar" size={22}/>)}}
              />
              <Drawer.Screen
                name="IlacEkle"
                component={Hatırlat}
                options={{ drawerLabel: 'İlaç Ekranı' ,drawerIcon:() => (<Icon name="thermometer" size={22}/>) }}
              />
              <Drawer.Screen
                name="Endeks"
                component={Kitle}
                options={{ drawerLabel: 'Kitle Endeksi' ,drawerIcon:() => (<Icon name="calculator" size={22}/>) }}
              />
              <Drawer.Screen 
              name="TahlilYukle"
              component={Camera}
              options={{ drawerLabel: 'Tahlil Yükleme' ,drawerIcon:() => (<Icon name="camera" size={22}/>) }}
              />
              <Drawer.Screen 
              name="Logout"
              component={DrawerLogout}
              options={{ drawerLabel: 'Çıkış Yap' ,drawerIcon:() => (<Icon name="sign-in" size={22}/>) }}
              />
            </Drawer.Navigator>
        )
    }
}
const styles = StyleSheet.create({})
