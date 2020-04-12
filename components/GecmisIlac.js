import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import DataIlac from '../data/DataIlac';
import IlacComp from './IlacComp'
import Icon  from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {observer} from 'mobx-react';
import IlacStore from '../src/store/IlacStore';

@observer
export default class GcmIlac extends Component {
  
    render() {

        let {navigation} = this.props;
        return (
            <View>
            <FlatList style={styles.flt}
                data={IlacStore.allPastData}
                keyExtractor={item => item.ilac_id}
                renderItem={({item}) => <IlacComp ad={item.ilac_ad} tarih={item.tarih} kullanım={item.Kullanim} saat={item.saat} />}
                />
                 <Button buttonStyle={styles.plsBtn} icon={<Icon name="plus" size={45}/>} onPress={() => {navigation.navigate('MyModal')}} iconContainerStyle={{width:50,backgroundColor:'white'}}/>
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
