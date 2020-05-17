import React, { Component } from 'react'
import { Text, StyleSheet, View , Dimensions} from 'react-native'
import { CheckBox } from 'react-native-elements';
const {height : HEIGHT} = Dimensions.get('window');
const {width : WIDTH} = Dimensions.get('window');
import {observer} from 'mobx-react';

@observer
export default class IlacComp extends Component {
    state = {
        checked:false,
        boyut: (this.props.ad.length > 8) ? WIDTH/30 : WIDTH/20,
    }
    changeCheck = () =>
    {
        
        if(this.state.checked)
        {
                this.setState({checked:false});
        }else
        {
            this.setState({checked:true});
        }
    }
    aktar = () =>
    {
        if(this.props.kullanım == 'true')
        {
            this.setState({checked:true});
        }else
        {
            this.setState({checked:false});
        }
    }
    componentDidMount()
    {
        this.aktar();
    }
    render() {
        return (
            <View style={styles.aVie}>
                <Text style={[styles.ilac , {fontSize:this.state.boyut}]}> {this.props.ad} </Text>
                <View>
                    <Text style={styles.tarih}> {this.props.tarih} </Text>
                    <Text style={styles.tarih}> {this.props.saat} </Text>
                </View>
               
                <CheckBox
                center
                title='Kullanım'
                uncheckedIcon='times-circle'
                iconRight
                checkedIcon='check-square'
                checkedColor='green'
                uncheckedColor='red'
                containerStyle={styles.cntChk}
                checked={this.state.checked}
                onPress={this.changeCheck}
                />
            
            </View>
        )
    }
}

const styles = StyleSheet.create({

    aVie:
    {
        backgroundColor:'#96ABFF',
        marginTop:'3%',
        flexDirection:'row',
        paddingVertical:20,
        justifyContent:"space-around",
        alignItems:"center",
        marginHorizontal:5,
        borderRadius:40,
        marginVertical:9,

        paddingLeft:2,
    },
    tarih:
    {
        fontSize:HEIGHT/55,
        textTransform:"capitalize",
        color:'white',
    },
    ilac:
    {
        
        textTransform:"capitalize",
        color:'white',
    },
    cntChk:
    {
        borderRadius:20,
        backgroundColor:'#E3E9FF'
    }

})
