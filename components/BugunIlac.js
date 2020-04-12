import React, { Component } from 'react'
import { FlatList, StyleSheet, View , Text} from 'react-native'
import DataIlac from '../data/DataIlac';
import IlacComp from './IlacComp'
import Icon  from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import IlacStore from '../src/store/IlacStore';
import {observer} from 'mobx-react';

@observer
export default class BgnIlac extends Component {
    state = 
    {
        //Data : IlacStore.data, 
        //allData : DataIlac,
        aranacak : ''
    }

    render() {
        /*let{navigaiton , route} = this.props;
            if(route.params.n[0] != null || route.params.n[0] != '' )
            {alert(route.params.n[0]);} */
        let {navigation} = this.props;
        return (
            <View>
            <FlatList style={styles.flt}
                data={IlacStore.data}
                keyExtractor={item => item.ilac_id}
                renderItem={({item}) => <IlacComp ad={item.ilac_ad} tarih={item.tarih} kullanım={item.Kullanim} saat={item.saat} />}
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
