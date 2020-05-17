import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Button, ActivityIndicator, Colors, Avatar, Snackbar } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: true,
            scanned: true,
            loading: false,
            visible: false,
            errText:null,
            color:'red'
        };
    }

    _onToggleSnackBar = () => this.setState(state => ({ visible: !state.visible }));

    _onDismissSnackBar = () => this.setState({ visible: false });

    async componentDidMount() {
        this.checkMultiPermissions();
    }

    async checkMultiPermissions() {
        const { status, expires, permissions } = await Permissions.getAsync(
            Permissions.CAMERA
        );
        if (status !== 'granted') {
            alert('Hey! You have not enabled selected permissions');
            this.setState({ hasPermission: false });
        } else {
            this.setState({ hasPermission: true });
        }
    }
    async updateControlOne(data) {
        fetch("https://www.matmaca.com/api/ocr/OcrControlUpdateOne?sessionId=" + data)
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log('error', error));
    }

    async updateControlZero(data) {
        fetch("https://www.matmaca.com/api/ocr/OcrControlUpdateZero?sessionId=" + data)
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => 
              this.setState({errText:error,visible:true,color:'red'})   );
    }

    async getValues(data) {
        fetch("https://www.matmaca.com/api/ocr/control?sessionId=" + data)
            .then(response => response.json())
            .then(response => {
                this.setState({ loading: false })
                if(response == 'Success')
                {
                    this.updateControlOne(data);
                    this.setState({errText:response,visible:true,color:'green'});   
                }
                else{
                    this.setState({errText:response,visible:true,color:'red'});   
                }
            })
            .catch(error => 
                this.setState({errText:error,visible:true,color:'red'})   
                );
    }

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return (
                <View
                    style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                    <Text style={{ marginTop: '60%', marginBottom: 10 }}>
                        No access to camera
          </Text>
                </View>
            );
        }
        if (hasCameraPermission === false) {
            return (
                <View
                    style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                    <Text style={{ marginTop: '60%', marginBottom: 10 }}>
                        No access to camera
          </Text>
                </View>
            );
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <ActivityIndicator
                    size='large'
                    animating={this.state.loading}
                    color={Colors.white}
                    style={{ bottom: '50%' }}
                />
                <Snackbar
                    visible={this.state.visible}
                    style={{backgroundColor: this.state.color}}
                    onDismiss={this._onDismissSnackBar}
                >
                    {this.state.errText}
        </Snackbar>
                <Button
                    icon="camera"
                    color="black"
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: '10%',
                    }}
                    onPress={() => {
                        this.setState({ scanned: false, loading: true });
                    }}>
                    <Text>Take !</Text>
                </Button>
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(data);
        this.getValues(data);
    };
}
