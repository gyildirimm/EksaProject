import * as React from 'react';
import {Component} from 'react';
import { View, Text , SafeAreaProvider} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login.js';
import MyCarousel from './screens/Appointment.js';
import Hatırlat from './screens/HatırlatScreen.js';
import Kitle from './screens/KitleEndeksi';
import Profil from './screens/Profile'
import  SafeAreaView  from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/FontAwesome';
import {observer} from 'mobx-react';
import LoginStore from './src/store/LoginStore';

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName={LoginStore.login ? "Feed" : "Login"}
    drawerType="back" drawerContentOptions={ 
      {contentContainerStyle:{backgroundColor:'#ebedf7' ,flex:1} ,labelStyle:{fontSize:18}, activeBackgroundColor:'#246685',activeTintColor:'rgb(200,200,200)',userName:'Deneme Doc',tittle:'Doctor'}}>
      
      
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{ drawerLabel: 'Home' , drawerIcon:()=> (<Icon name="home" size={25}/>)}}
      />  
      <Drawer.Screen
        name="Profil"
        component={Profil}
        options={{ drawerLabel: 'Profil' , drawerIcon:() => (<Icon name="user" size={25}/>) }}
      />
      <Drawer.Screen
        name="Profile"
        component={MyCarousel}
        options={{ drawerLabel: 'Randevu' ,drawerIcon:() => (<Icon name="calendar" size={25}/>)}}
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
        name="Login"
        component={Login}
        options={{ drawerLabel: 'Giriş Yap' , drawerIcon:() => (<Icon name="sign-in" size={25}/>) }}
      />
    </Drawer.Navigator>
  );
}


@observer
export default class App extends Component {
  render() {
      return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
      )
  }
}