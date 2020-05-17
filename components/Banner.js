import * as React from 'react';
import { Banner } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

class BannerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

  render() {
    return (
        <Banner
        style={{borderRadius:20,margin:'3%',marginTop:'5%'}}
        visible={this.state.visible}
        actions={[
            {
                label: 'Evet Biliyorum !',
                onPress: () => this.setState({ visible: false }),
            }
        ]}
        icon={({ size }) =>
            <Image
                source={require('../assets/water.gif')}
                style={{
                    width: size,
                    height: size,
                }}
            />
        }
    >
        Günde en az 2 litre su içmenin toksinlerin vücuttan atılmasında büyük rol oynamaktadır.
    </Banner>
    );
  }
}
const styles = StyleSheet.create({
    search:{
        marginLeft:'2%',
        marginRight:'2%'
    }
});
export default BannerScreen;