

import * as React from 'react';
import { Banner } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Chip,Badge } from 'react-native-paper'

class Chips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    componentWillMount()
    {
        console.log(this.props);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',marginTop:'5%' }}>
                <Chip icon="timer-sand" style={styles.chip} mode="outlined" onPress={() => console.log('Pressed')}> Randevu Al </Chip>
                <Chip icon="alarm" style={styles.chip} mode="outlined" onPress={() => console.log('Pressed')}>İlaç Hatırlatıcı</Chip>
                <Chip icon="barcode-scan" style={styles.chip} mode="outlined" onPress={() => console.log('Pressed')}>Tahlil Yükle</Chip>
                <Chip icon="doctor" style={styles.chip} mode="outlined" onPress={() => console.log('Pressed')}>Tahlil</Chip>
                <Chip icon="cogs" style={styles.chip} mode="outlined" onPress={() => console.log('Pressed')}>Ayarlar</Chip>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    chip: {
        margin: '1%',
    }
});
export default Chips;