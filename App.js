import React , {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {observer} from 'mobx-react';
import MyDrawer from './components/MyDrawer';
import Login from './screens/Login';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

@observer
export default class App extends Component 
{
  state = {
  }
  render() {
      return (
        <NavigationContainer >
          <Stack.Navigator initialRouteName="AuthScreen" headerMode="none">
            <Stack.Screen name="AuthScreen" component={AuthLoadingScreen} />
            <Stack.Screen name="LoginScreen" component={Login}/>
            <Stack.Screen name="HomeScreen" component={MyDrawer}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
  }
}