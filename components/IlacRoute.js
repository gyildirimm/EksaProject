import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import BgnIlac from './BugunIlac';
import GcmIlac from './GecmisIlac';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
export default class IlacRoute extends Component {


   /* componentDidUpdate({ navigation: { navigate } })
    {
        let ara = this.props.ara;
        alert(ara);
        //navigate('Bugün' , {n : ara});
    } */
    render() {
        return (

                <Tab.Navigator  >
                    <Tab.Screen name="Bugün" component={BgnIlac} />
                    <Tab.Screen name="Geçmiş" component={GcmIlac} />
                </Tab.Navigator>

        )
    }
}

const styles = StyleSheet.create({})