import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { CheckBox } from 'react-native-elements';
export default class IlacComp extends Component {
    state = {
        checked:false,
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
                <Text style={styles.ilac}> {this.props.ad} </Text>
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
    },
    tarih:
    {
        fontSize:19,
        textTransform:"capitalize",
        color:'white',
    },
    ilac:
    {
        fontSize:20,
        textTransform:"capitalize",
        color:'white',
    },
    cntChk:
    {
        borderRadius:20,
        backgroundColor:'#E3E9FF'
    }

})
