import React, { Component } from 'react'
import { FlatList, StyleSheet, View , Text} from 'react-native'
import DataIlac from '../data/DataIlac';
import IlacComp from './IlacComp'
import Icon  from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import IlacStore from '../src/store/IlacStore';
import {observer } from 'mobx-react';
import {toJS} from 'mobx'


@observer
export default class BgnIlac extends Component {
    state = 
    {
        //Data : IlacStore.data, 
        //allData : DataIlac,
        aranacak : '',
        data : [],
    }

    componentDidMount()
    {
        
    }
    
    render() {
        let {navigation} = this.props;
        return (
            <View>
            <FlatList style={styles.flt}
                data={IlacStore.bugunData}
                keyExtractor={item => item.id}
                renderItem={({item}) => <IlacComp ad={item.Ilac} id={item.id} tarih={item.start} kullanım={item.used} saat={item.clock} />}
                />
                
                 <Button buttonStyle={styles.plsBtn}  icon={<Icon name="plus" size={45}/>} onPress={() => {navigation.navigate('MyModal')}} iconContainerStyle={{width:50,backgroundColor:'white'}}/>          
            </View>
        )
    }
}

const styles = StyleSheet.create({
    plsBtn:
    {
        flex:1,
        position:'absolute',
        width:'16%',
        zIndex:999,
        backgroundColor:'white',
        borderRadius:60,
        bottom:20,
        alignItems:"center",
        justifyContent:'center',
        right:'5%'
    },
    flt:
    {
        height:'100%'

    },
})
