import React , {Component} from 'react';
import { AsyncStorage , ActivityIndicator , StatusBar , StyleSheet, View} from 'react-native';
import { runInAction } from 'mobx';
import {observer} from 'mobx-react';
import LoginStore from '../src/store/LoginStore';
import User from '../models/User';
import { CommonActions} from '@react-navigation/native'

@observer
export default class DrawerLogout extends Component
{
  constructor(props)
  {
    super(props);
    this._loadData();
  }
  _loadData = () =>  
  {
    AsyncStorage.setItem('@isLoggin' , '0');
    AsyncStorage.setItem('@token' , '');
   
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'AuthScreen' },
          ],
        })
      );
    LoginStore.reset();
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