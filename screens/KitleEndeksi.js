import React, { Component } from 'react'
import { Text, StyleSheet, View , Dimensions} from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
const {width : WIDTH} = Dimensions.get('window');
const {height : HEIGHT} = Dimensions.get('window');
export default class KitleEndeksi extends Component {
    state = 
    {
        boy : '',
        kilo : '',
        modalVisible:false,
        endeks : '',
        durum: '',
        ideal : '',
    }
    btnAktif = () =>
    {
        if(this.state.boy != '' && this.state.kilo != '')
        {
            this.hesapla();
            this.toggleModal();
        }else
        {
            alert('Alanlar Boş Geçilemez...');
        }   
    }
    toggleModal = () =>
    {
        this.setState({modalVisible:!this.state.modalVisible});
    }
    hesapla = () =>
    {
        let oran = this.state.kilo / (this.state.boy * this.state.boy);
        oran = oran * 10000;
        oran = oran.toFixed(1);
        let durum = '' , ideal = 0;
        if( oran <= 18.5)
        {
            durum = 'Düşük Kilolu';
        }
        else if(oran <= 24.9)
        {
            durum = 'İdeal Kilolu';
        }
        else if(oran <= 29.9)
        {
            durum = 'İdeal Kilolunun Üzeri';
        }
        else if(oran < 40)
        {
            durum = 'Obez';
        }else if(oran >= 40)
        {
            durum = 'Aşırı Obez';
        }
        ideal = 22 / (this.state.boy * this.state.boy);
        ideal = ideal * 100000;
        ideal = ideal.toFixed(1);
        this.setState({endeks : oran , durum , ideal});

    }
    render() {
        return (
            <View style={styles.aComp}>  
                <View style={styles.baslik}>
               <Text style={styles.basTxt}>Kitle Endeksi</Text>
            </View>
            <View style={styles.icerik}>
                <TextInput
                        mode="flat"
                        style={styles.Inp}
                        label="Boy (cm)"
                        value={this.state.boy}
                        onChangeText={text =>this.setState({ boy: text})}
                        selectionColor="white"
                        underlineColor={'white'}
                        keyboardType="number-pad"
                        theme={{
                            colors: {
                            placeholder: 'white',
                            primary: 'white',
                            },
                        }}
                />
                <TextInput
                        mode="flat"
                        style={styles.Inp}
                        label="Kilo (kg)"
                        value={this.state.kilo}
                        onChangeText={text =>this.setState({ kilo: text})}
                        selectionColor="white"
                        underlineColor={'white'}
                        keyboardType="number-pad"
                        theme={{
                            colors: {
                            placeholder: 'white',
                            primary: 'white',
                            
                            },
                        }}
                />
                <Button
                    uppercase={false}
                    mode="outlined"
                    loading={this.state.loginLoading}
                    onPress={this.btnAktif}
                    color={'black'}
                    style={styles.btnStyle} 
                    labelStyle={{fontSize:17,alignItems:'center',alignContent:'center'}}>
                    
                    Hesapla
                </Button>
            </View>
            
                <Modal isVisible={this.state.modalVisible} style={styles.modalSty}>
                    <View style={styles.modalVie}>
                        <Text style = {[styles.yazi , {fontSize:20,fontWeight:'bold'}]}>Kitle Endeksi Reçetesi</Text>
                        <Text style = {styles.yazi}>{'Endeks : ' + this.state.endeks}</Text>
                        <Text style = {styles.yazi}>{'Durum : ' + this.state.durum}</Text>
                        <Text style = {styles.yazi}>{'İdeal Kilonuz : ' + this.state.ideal}</Text>
                        <Button style={styles.btnStyle} title="Saklan" onPress={this.toggleModal} 
                        labelStyle={{fontSize:17,alignItems:'center',alignContent:'center'}}>
                        Kapat</Button> 
                    </View>
                </Modal>
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
    modalSty:
    {
        flex : 1,
        justifyContent:'flex-end',
    },
    modalVie:
    {
        backgroundColor:'white',
        flex : 0.40,
        marginBottom:100,
        alignContent:'center',
        alignItems:'center',
    },
    yazi:
    {
        fontSize:16,
        paddingHorizontal:15,
        paddingVertical:5
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
    icerik:
    {
        flex:5,
        width:'100%',
        position:'relative',
        height:'100%',
        alignItems:'center',
        paddingTop:25,
    },
    Inp:
    {
        backgroundColor: 'transparent',
        marginTop: 10,
        color: 'white',
        width:WIDTH * 0.75,   
    },
    btnStyle:
    {
        marginTop: 50,
        backgroundColor: 'rgb(220,220,220)',
        marginLeft: '5%',
        paddingHorizontal:55,
        justifyContent:'center',
        color: 'black',
        borderRadius:20,
        paddingVertical:5
    },
})
