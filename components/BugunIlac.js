import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import DataIlac from '../data/DataIlac';
import IlacComp from './IlacComp'
import Icon  from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
export default class BgnIlac extends Component {
    state = 
    {
        Data : '',
    
    }
    zaman = () => 
    {
        var today = new Date();
        var date = '';
        if(today.getDate()<10)  { date += '0' + today.getDate();}else{  date += today.getDate();}
        if((today.getMonth()+1)<10)  { date += '.0' + (today.getMonth()+1);}else{  date += (today.getMonth()+1);}
        date += '.' + today.getFullYear();
        return(date);
    }
    aktar = () =>
    {
       var bugunEleman = this.bugunData();
       this.setState({Data:bugunEleman});
    }
    bugunData = () =>
    {
        var g , d , e;
       
        var da = [];
        DataIlac.forEach(item => {
            g = item.tarih;
            d = g.split('.')
            e  = this.kontrol(d);
            if(e)
            {
                da.push(item);
            }

        });
        return da;
    }
    kontrol = (d) =>
    {
        var z = this.zaman();
        var sp2 = z.split('.');
        if( (d[0] == sp2[0]) &&  (d[1] == sp2[1]) &&  (d[2] == sp2[2]) )
        {
            return true;
        }
        else
        {
            return false;
        }
        
    }
    componentDidMount()
    {
        this.aktar();  
    }
    render() {
        return (
            <View>
            <FlatList style={styles.flt}
                data={this.state.Data}
                keyExtractor={item => item.ilac_id}
                renderItem={({item}) => <IlacComp ad={item.ilac_ad} tarih={item.tarih} kullanım={item.Kullanim} saat={item.saat} />}
                />
                 <Button buttonStyle={styles.plsBtn} icon={<Icon name="plus" size={45}/>} onPress={this.zaman} iconContainerStyle={{width:50,backgroundColor:'white'}}/>
                 
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
