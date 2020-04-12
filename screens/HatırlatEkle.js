import React, { Component } from 'react'
import { StyleSheet ,SafeAreaView, TouchableOpacity,Text, View , Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input , Button } from 'react-native-elements';
import TimePicker from "react-native-24h-timepicker";
import { observer } from 'mobx-react';
import IlacStore, {} from '../src/store/IlacStore';
//<Input inputStyle={styles.InpSty} inputContainerStyle={styles.cntInt} placeholder="Başlangıç Saati" placeholderTextColor="rgb(200,200,200)"/> 
const {width : WIDTH} = Dimensions.get('window');
@observer
export default class HatırlatEkle extends Component {
    state = 
    {
        time : '00:00',
    }
    onCancel() 
    {
        this.TimePicker.close();
    }
    onConfirm(hour, minute) 
    {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }
    render() 
    {
        let {navigation} = this.props;
        return (
            <SafeAreaView style={styles.aComp}>  
                <Input inputStyle={styles.InpSty} inputContainerStyle={styles.cntInt} placeholder="İlaç Adı" placeholderTextColor="rgb(200,200,200)"/>
                <Input inputStyle={styles.InpSty} inputContainerStyle={styles.cntInt} placeholder="Kaç gün" placeholderTextColor="rgb(200,200,200)"/>
                <Input inputStyle={styles.InpSty} inputContainerStyle={styles.cntInt} placeholder="Kaç Saatte Kullanılacak" placeholderTextColor="rgb(200,200,200)"/>
                <View style={{flexDirection:'row' , justifyContent:'space-around' , paddingRight:15}}>
                    <Text style={styles.saatYazi}>Saat Seçiniz  => </Text>
                    <TouchableOpacity
                        onPress={() => this.TimePicker.open()}
                        style={styles.button}
                        >
                        <Text style={styles.buttonText}>{this.state.time}</Text>
                    </TouchableOpacity>
                </View>
                
                <TimePicker ref={ref => {this.TimePicker = ref;}} onCancel={() => this.onCancel()}
                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}/>
                <Button
                icon={
                    <Icon
                    name="plus-circle"
                    size={22}
                    color="white"
                    />
                }
                onPress ={() => {navigation.goBack();}} 
                buttonStyle={styles.btnSty}
                containerStyle={styles.btnCont}
                iconContainerStyle={styles.IcnCon}
                title="Kaydet"
                />
                

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
      justifyContent:'flex-start',
      alignItems:'center',
      position: 'relative',
    },
    InpSty:
    {
        color:'rgb(200,200,200)',
        marginVertical:'2%'
    },
    cntInt:
    {
        marginHorizontal:'8%',
        marginBottom:'7%'
    },
    btnSty:
    {
        justifyContent:"space-around",
        borderRadius:20,
        paddingVertical:10,
        backgroundColor:'#708DFF'
    },
    btnCont:
    {
        width:'30%',
        paddingTop:20,
    },
    IcnCon:
    {
       left:5
    },
    buttonText:
    {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "600"
    },
    saatYazi:
    {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "600",

        paddingRight:10
    },


})
