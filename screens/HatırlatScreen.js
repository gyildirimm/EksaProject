import React, { Component } from 'react'
import { Text, StyleSheet, View  , SafeAreaView , TextInput , TouchableOpacity } from 'react-native'
import DataIlac from '../data/DataIlac';
import IlacRoute from '../components/IlacRoute';

export default class HatırlatScreen extends Component {
    state = 
    {
        Data : DataIlac,
        allData : DataIlac,
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
    btnAktif = (text) =>
    {
        this.setState({ara:text}); 

    }
    render() {
        return (
            <SafeAreaView style={styles.aComp}>  
            <View style={styles.baslik}>
               <Text style={styles.basTxt}>İlaç Hatırlatıcı</Text>
            </View>
            <View style={styles.header}>
                <TextInput style={styles.txtInp} placeholder="İlaç ismi =>" value={this.state.text} onChangeText={ text => { this.setState({ text:text});} }  placeholderTextColor='rgb(200,200,200)'/>
                <TouchableOpacity style={styles.btnAra} onPress={ () => this.btnAktif(this.state.text)}>
                    <Text style={styles.btnTxt}>Ara</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.icerik}>
            <IlacRoute ara={this.state.ara}/>
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
        fontSize:35,
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
        paddingLeft:15,
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
