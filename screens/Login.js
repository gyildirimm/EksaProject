import {
    Platform,
    StyleSheet,
    Animated,
    Image,
    TouchableHighlight,
    Alert,
    Dimensions,
    BackHandler,
    WebView,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    View,
    Text,
    AsyncStorage
  } from 'react-native';
  import React from 'react';
  import { Button, TextInput } from 'react-native-paper';
  import IIcon from 'react-native-vector-icons/FontAwesome';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
 
  class Account extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        kullaniciAdi: '',
        sifre: '',
        loginLoading: false,
        kayitDisplay: 'none',
        loginDisplay: 'flex',
        errorPlaceholder: 'white',
        newUsername:'',
        newPassword:'',
        newMailAdress:'',
        newTelephoneNumber:'',
        newPersonalName:'',
        newPersonalSurname:'',
        backgroundDisplay:355
      };
    }
 
    fetchData3 = () => {
      this.setState({ loginLoading: true });
      fetch(
        'https://www.matmaca.com/api/Users/GetUser?username=' +
          this.state.kullaniciAdi +
          '&password=' +
          this.state.sifre +
          ''
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            loginLoading: false,
          });
          console.log(this.state.kullaniciAdi+this.state.sifre)
          if (responseJson.length > 0) {
            this.props.navigation.navigate('Reservation', {
              username: this.state.kullaniciAdi,
              password: this.state.sifre,
            });
            AsyncStorage.setItem('username',this.state.kullaniciAdi);
 
          } else {
            this.setState({ errorPlaceholder: 'red' });
          }
        })
        .catch(error => console.log(error));
    };
 
    validateEmail = () => {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,}$/;
      if(!re.test(this.state.newPassword))
      {
          alert('En Az Bir Sayı,Karekter İçermeli Ve Uzunluğu En Az 8 Karakter Olmalıdır');
          this.setState({newPassword:''})
      }
  };
 
   fetchData4 = (text) => {
     this.setState({ loginLoading: true });
     if(this.state.newPersonalName != "" && this.state.newPersonalSurname != "")
     {
      fetch(
        'https://www.matmaca.com/api/Users/PostUser?userName=' +
          this.state.newUsername +
          '&userPassword=' +
          this.state.newPassword +
          '&userMailAdress=' +
          this.state.newMailAdress +
          '&userPhoneNumber=' +
          this.state.newTelephoneNumber +
           '&userMailAdress=' +
          this.state.newMailAdress +
           '&userPersonalName=' +
          this.state.newPersonalName +
           '&userPersonalSurname=' +
          this.state.newPersonalSurname +''
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            kullaniciAdi: this.state.newUsername,
            sifre:this.state.newPassword,
            newMailAdress:'',
            newPassword:'',
            newPersonalName:'',
            newPersonalSurname:'',
            newTelephoneNumber:'',
            newUsername:'',
            kayitDisplay:'none',
            loginDisplay:'flex',
            loginLoading:false
          });
        this.props.navigation.navigate('Reservation', {
              username: this.state.kullaniciAdi,
              password: this.state.sifre
            });
            AsyncStorage.setItem('username',this.state.kullaniciAdi);
        })
        .catch(error => console.log(error));
      }
      else
      {
          alert('Alanlar Boş Geçilemez !');
          this.setState({ loginLoading: false });
      }
  }
 
    render() {
      return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor:'#266390',
              }}
              
            />
             <IIcon name="stethoscope" size = {this.state.backgroundDisplay} color="rgb(200,200,200)"
              style={{
                width: '90%',
                height: '50%',
                marginLeft:'18%',
                marginTop:'5%',
                position:'absolute',
              }}
              resizeMethod={'scale'}
              source={require('../assets/icons8-stethoscope-64.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: '60%',
              marginTop: '95%',
              display: this.state.loginDisplay,
            }}>
            <TextInput
              label="Kullanıcı Adı"
              mode="flat"
              style={{ backgroundColor: 'transparent' }}
              selectionColor="white"
              underlineColor={this.state.errorPlaceholder}
              value={this.state.kullaniciAdi}
              onChangeText={text =>
                this.setState({ kullaniciAdi: text, errorPlaceholder: 'white' })
              }
              theme={{
                colors: {
                  text: this.state.errorPlaceholder,
                  placeholder: 'white',
                  primary: 'white',
                },
              }}
            />
            <TextInput
              mode="flat"
              style={{
                backgroundColor: 'transparent',
                marginTop: 10,
                color: 'white',
              }}
              label="Şifre"
              value={this.state.sifre}
              onChangeText={text =>
                this.setState({ sifre: text, errorPlaceholder: 'white' })
              }
              selectionColor="white"
              underlineColor={this.state.errorPlaceholder}
              secureTextEntry={true}
              theme={{
                colors: {
                  text: this.state.errorPlaceholder,
                  placeholder: 'white',
                  primary: 'white',
                },
              }}
            />
            <Button
              icon="account-circle-outline"
              uppercase={false}
              mode="outlined"
              loading={this.state.loginLoading}
              onPress={() => console.log('Giriş')}
              color={'black'}
              style={{
                marginTop: 50,
                backgroundColor: 'white',
                marginLeft: '5%',
                width: '90%',
                color: 'black',
              }}>
              Giriş Yap
            </Button>
            <Button
              icon="lock"
              mode="outlined"
              uppercase={false}
              onPress={() =>
                this.setState({ kayitDisplay: 'flex', loginDisplay: 'none',backgroundDisplay:0 })
              }
              color={'black'}
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                color: 'black',
                marginLeft: '5%',
                width: '90%',
              }}>
              Kayıt Ol
            </Button>
          </View>
          <View
            style={{
              width: '100%',
              height: '100%',
              marginBottom: '60%',
              marginTop: '3%',
              display: this.state.kayitDisplay,
              paddingLeft:20,
              opacity:10
            }}>
            <TextInput
              label="Username"
              mode="flat"
              style={{ backgroundColor: 'transparent',borderRadius:15,opacity:5,marginTop:10 }}
              selectionColor="white"
              underlineColor="white"
              value={this.state.newUsername}
              onChangeText={text => this.setState({ newUsername: text })}
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:15,opacity:5 }}
              label="Password"
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={text => this.setState({ newPassword: text })}
              onBlur={() => {
                this.validateEmail();
              }}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <TextInput
              label="E-Mail"
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:15,opacity:5 }}
              selectionColor="white"
              underlineColor="white"
              value={this.state.newMailAdress}
              onChangeText={text => this.setState({ newMailAdress: text })}
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:15,opacity:5 }}
              label="Phone Number"
              value={this.state.newTelephoneNumber}
              onChangeText={text => this.setState({ newTelephoneNumber: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
              <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:15,opacity:5 }}
              label="Personal Name"
              value={this.state.newPersonalName}
              onChangeText={text => this.setState({ newPersonalName: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
             <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:15,opacity:5 }}
              label="Personal Surname"
              value={this.state.newPersonalSurname}
              onChangeText={text => this.setState({ newPersonalSurname: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <Button
              icon={{
                uri:
                  'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
              }}
              loading={this.state.loginLoading}
              mode="outlined"
              onPress={() => this.fetchData4('')}
              color={'black'}
              style={{
                marginTop: 50,
                backgroundColor: 'white',
                color: 'black',
                marginRight:'5%'
              }}>
              Kayit Ol
            </Button>
             <Button
              color={'black'}
              icon={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_202009.png' }}
              mode="outlined"
              onPress={() =>
                this.setState({ kayitDisplay: 'flex', loginDisplay: 'flex',loading:true,backgroundDisplay:355 })
              }
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                color: 'black',
                marginRight:'5%'
              }}>
              Giris Yap
            </Button>
          </View>
        </View>
      );
    }
  }
 
  export default Account;
