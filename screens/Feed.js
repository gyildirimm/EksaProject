import React, { Component } from 'react'
import { Text, StyleSheet, View ,AsyncStorage } from 'react-native'
import { observer } from 'mobx-react';
//import Login from './Login';
import LoginStore from '../src/store/LoginStore';
import { runInAction } from 'mobx';
import User from '../models/User';

@observer
export default class Feed extends Component 
{
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Feed Screen</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({})
