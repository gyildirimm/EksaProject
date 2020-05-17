import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Avatar, IconButton, Title, Caption } from 'react-native-paper';

import LoginStore from '../src/store/LoginStore'


class Header extends Component {

    componentWillMount() {
        console.log(this.props);
    }


    render() {
        return (
            <View style={styles.lastAppoinment}>
                <View style={{margin:'8%',marginTop:'13%',flexDirection: 'row'}}>
                    {
                        LoginStore.kisi.userIdentityNumber != '' ? (                   
                             <Avatar.Image size={50} source={{uri:`https://www.matmaca.com/images/${LoginStore.kisi.userIdentityNumber}.jpg`}} />
                        ) : (
                            <Avatar.Image size={50} source={require('../assets/person.png')} />
                        )
                    }
                    <Caption style={styles.headerText}>Merhaba, <Title style={{ fontSize: 21, fontWeight: "400" }}>{this.props.username}</Title> </Caption>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    lastAppoinment: {
        opacity: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    headerText: {
        marginTop: '5%',
        marginLeft: '10%',
        fontSize: 17
    }
});
export default Header;