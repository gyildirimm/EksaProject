import React, { Component } from 'react'
import { Text, StyleSheet, View  , SafeAreaView , TextInput , TouchableOpacity } from 'react-native'
import IlacRoute from '../components/IlacRoute';
import BgnIlac from '../components/BugunIlac';
import GcmIlac from '../components/GecmisIlac';
import ModalScreen from './HatırlatEkle'
import IlacStore from '../src/store/IlacStore'
import {observer} from 'mobx-react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { observable } from 'mobx';
const Tab = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();
@observer
export default class HatırlatScreen extends Component {
    state = 
    {
        text : '',
        ara : '',
    }
    searchFilter = text =>
    {
        const newData  = this.state.allData.filter( item => {
            const listItem = `${item.ilac_ad.toLowerCase()}`;  
            return listItem.indexOf(text.toLowerCase()) >-1;
        });
        this.setState({
            Data:newData,   
        });
    };
    btnAktif = () =>
    {
        //this.setState({ara:this.state.text});
        IlacStore.setAra(this.state.text);
        IlacStore.searchFilter();
        
    }
    getword = () =>
    {
        return this.state.ara;
    }
    ayarla = () =>
    {
        if(this.state.text.length <= 1 || this.state.text == null )
        {
            IlacStore.aranan = '';
            IlacStore.sifirla();
            
        }
    }
    /* TabStackScreen = () =>  {
        return (
            <Tab.Navigator  >
            { //initialParams={{ n: IlacStore.getAra() }}
            }   
            <Tab.Screen name="Bugün"  component={BgnIlac} />
            <Tab.Screen name="Geçmiş" component={GcmIlac} />
            </Tab.Navigator>
        );
      }*/
    render() {
        return (
            <SafeAreaView style={styles.aComp}>  
                <View style={styles.baslik}>
               <Text style={styles.basTxt}>İlaç Hatırlatıcı</Text>
            </View>
            <View style={styles.header}>
                <TextInput style={styles.txtInp} placeholder="İlaç ismi =>" value={this.state.text} onChangeText={ text => { this.setState({ text:text}); this.ayarla();} }  placeholderTextColor='rgb(200,200,200)'/>
                <TouchableOpacity style={styles.btnAra} onPress={ () => this.btnAktif()}>
                    <Text style={styles.btnTxt}>Ara</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.icerik}>
            <RootStack.Navigator mode="modal" headerMode="none">
                <RootStack.Screen name="Tab" component={IlacRoute} />
                <RootStack.Screen name="MyModal" component={ModalScreen} />
            </RootStack.Navigator>
            </View>
           
            </SafeAreaView>
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
    baslik:
    {
        flex:0.6,
        backgroundColor:'#003f5c',
        width:'100%',
        justifyContent:"center",
        alignItems:'center',
        
    },
    basTxt:
    {
        fontSize:32,
        // fontFamily:'cursive',
        color:'#fff',
    },
    header:
    {
        flex:0.8,
        backgroundColor:'#266390',
        width:'100%',
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center'

        
    },
    txtInp:
    {
        backgroundColor:'#4B5680',
        color:'rgb(200,200,200)',
        borderRadius:40,
        fontSize:18,
        width:'60%',
        paddingVertical:9,
        paddingHorizontal:30
        //paddingLeft:15,
    },
    btnAra:
    {
        backgroundColor:'#263881',
        borderRadius:25,
        marginRight:'3%',
        padding:7,
        width:'20%',   
        alignItems:"center",
        
    },
    btnTxt:
    {
        fontSize:20,
        color:'rgb(200,200,200)',
        
    },
    icerik:
    {
        flex:5,
        backgroundColor: 'rgb(200,200,200)',
        width:'100%',
        position:'relative',
        height:'100%'
    },
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
})
