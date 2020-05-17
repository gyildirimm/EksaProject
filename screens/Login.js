import {
    View,
    AsyncStorage,
    Image,
    ScrollView
  } from 'react-native';
  import React,{Component} from 'react';
  import { Button, TextInput } from 'react-native-paper';
  import IIcon from 'react-native-vector-icons/FontAwesome';
  import LoginStore from '../src/store/LoginStore';
  import IlacStore from '../src/store/IlacStore';
  import axios from 'axios';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import Toast, {DURATION} from 'react-native-easy-toast';
import User from '../models/User';
import DoctorProfile from '../models/DoctorProfile';
import { CommonActions} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



@observer
export default class Login extends Component 
  {
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
        newIdentity:'',
        newBirthDate:'',
        newPhoto:'',
        backgroundDisplay:355,
        image : null,
        imgIdentity : ''
      };
    }
    onPressGiris = ({navigation}) =>
    {
      //LoginStore.Login(this.state.kullaniciAdi,this.state.sifre , {navigation});
      //navigation.navigate("HomeScreen");
      this.Login();
    }
    Login =  () => 
    {
      let identity = this.state.kullaniciAdi;
      let pass = this.state.sifre;
      //console.log(`http://eksa.ml/api/Home/Login?identity=${identity}&pass=${pass}`);
      
      axios.get(`http://matmaca.com/api/Home/Login?identity=${identity}&pass=${pass}`)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        if(data != null && data != "")
        {
          console.log("data => " + data)
           this._loadData(data);
           AsyncStorage.setItem('@isLoggin' , '1');
           AsyncStorage.setItem('@token' , data);

          runInAction(() => {LoginStore.login = true});
          IlacStore._fillIlac(identity);
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'HomeScreen' },
              ],
            })
          );
          //this.props.navigation.navigate("HomeScreen");
        }else
        {
          this.refs.toast.show('Girilen bilgiler geçersiz..');
        }
      } ,err => {
        alert("Oops bir hata ile karşılaşıldı..." + err);
      })

    }
    _loadData = (data) =>  
    {
        //let token = await AsyncStorage.getItem('@token');
        axios.get(`http://matmaca.com/api/Home/getUser?token=${data}`)
        .then(res => res.data[0])
        .then( res => {
            if(res.id != 0)
            {
                let model = new User(res.id , res.isActivity , res.userBirthDate , res.userEmail , res.userIdentityNumber , res.userImageSource , res.userPersonalName , res.userPersonalSurname , res.userPhoneNumber , res.userRol );
                runInAction( () => { LoginStore.kisi = model; LoginStore.isim = model.getfullName(); LoginStore.rol = model.userRol == 2 ? 'Doktor':'Hasta'; });
                if(model.userRol == 2)
                {
                  this._loadDoctor(model.userIdentityNumber);
                }
            }
        },err=>{
            alert("Oops bir şeyler ters gitti..")
        })
    }
    _loadDoctor = (identity) =>
    {
      console.log("Load Doctor");
      axios.get(`http://matmaca.com/api/Home/getDoctorP?identity=${identity}`)
      .then(res => res.data[0])
      .then( res=>{
        //constructor( identityNumber ,name , surname , title , section , hospital , adresse , district , province)
        let model = new DoctorProfile(identity , res.name , res.surname , res.title , res.section , res.hospital , res.adresse , res.district , res.province);
        runInAction( () => {LoginStore.doctorProfile = model});
      },err=>{
        alert("Oops bir şeyler ters gitti..")
      })
    }
    setStorage = async (data) =>
    {
      await AsyncStorage.setItem('@isLoggin' , JSON.stringify('1'));
      await AsyncStorage.setItem('@token' , JSON.stringify(data));

      console.log("Login içerisinde");
      console.log(AsyncStorage.getItem('@token'));
      console.log(AsyncStorage.getItem('@isLoggin'));
    }

    validateEmail = () => {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,}$/;
      if(!re.test(this.state.newPassword))
      {
          alert('En Az Bir Sayı,Karekter İçermeli Ve Uzunluğu En Az 8 Karakter Olmalıdır');
          this.setState({newPassword:''})
      }
  };
 

   signIn = () => 
   {
     this.setState({ loginLoading: true });
     let gidecekImgname;
     if(this.state.image != null)
     {
       gidecekImgname= this.state.newIdentity.toString() + ".jpg";
     }else{
      gidecekImgname = "person.png"
     }
     console.log(`http://matmaca.com/api/Home/addUser?userIdentityNumber=${this.state.newIdentity}&userPersonalName=${this.state.newPersonalName}&userPersonalSurname=${this.state.newPersonalSurname}&userPhoneNumber=${this.state.newTelephoneNumber}&userEmail=${this.state.newMailAdress}&userBirthDate=${this.state.newBirthDate}&userPassword=${this.state.newPassword}&userImageSource=${gidecekImgname}`)
      axios.get(`http://matmaca.com/api/Home/addUser?userIdentityNumber=${this.state.newIdentity}&userPersonalName=${this.state.newPersonalName}&userPersonalSurname=${this.state.newPersonalSurname}&userPhoneNumber=${this.state.newTelephoneNumber}&userEmail=${this.state.newMailAdress}&userBirthDate=${this.state.newBirthDate}&userPassword=${this.state.newPassword}&userImageSource=${gidecekImgname}`)
      .then(res => res.data)
      .then(res => {
        if(res)
        {
          this.refs.toast.show('Kayıt Başarılı');
          this.setState({
            kullaniciAdi: '',
            sifre:'',
            imgIdentity:this.state.newIdentity,
            newMailAdress:'',
            newPassword:'',
            newPersonalName:'',
            newPersonalSurname:'',
            newTelephoneNumber:'',
            newIdentity:'',
            newBirthDate:'',
            newPhoto:'',
            kayitDisplay:'none',
            loginDisplay:'flex',
            loginLoading:false,
            backgroundDisplay:355
          });
          if(this.state.image != null)
          {
            console.log("girdi")
            this.uploadImage(this.state.image);
            
          }
         
        }else
        {
          this.refs.toast.show('Kayıt Başarısız.Kimlik Numaranızı kontrol ediniz...');
        }

        
      }, err => {
        alert("Oops bir hata ile karşılaşıldı..." + err);
      })
   }
   uploadImage = (image_uri) => {


    try {
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------984885506527086886394027");


        var formdata = new FormData();
        //let imgname= LoginStore.kisi.userIdentityNumber + ".jpg"
        let imgname = this.state.imgIdentity.toString() + ".jpg"
        formdata.append('Files', { type: 'image/jpg', uri: image_uri, name: imgname })

        var requestOptions = {
            method: 'POST',
            // headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        this.setState({loading:true})

        fetch("https://www.matmaca.com/api/home/upload", requestOptions)
            .then(response => {
                this.setState({loading:false})
                if (response.text() == "false") {
                    alert('Başarısız !');
                }
                else if(response.text() == "true") {
                    alert('Başarılı !');
                }
                else
                {
                    console.log(response.text());
                }
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    } catch (error) {
        console.log(error);
    }
}
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

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }else
      {
        this._pickImage();
      }
    }else{
      this._pickImage();
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

    render() {
      let {navigation} = this.props;
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
              onPress={() => { this.onPressGiris({navigation});}}
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
             
              marginTop: '3%',
              display: this.state.kayitDisplay,
              paddingLeft:20,
              paddingRight:20,
              opacity:10,
           
            }}>
              <ScrollView style={{flex:1}}>
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Adınız"
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
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Soyadınız"
              value={this.state.newPersonalSurname}
              onChangeText={text => this.setState({ newPersonalSurname: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            
            <TextInput
              label="Kimlik Numaranız"
              mode="flat"
              style={{ backgroundColor: 'transparent',borderRadius:15,opacity:5,marginTop:10 }}
              selectionColor="white"
              underlineColor="white"
              value={this.state.newIdentity}
              onChangeText={text => this.setState({ newIdentity: text })}
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
               
            <TextInput
              label="E-Mail"
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
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
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Telefon Numarası"
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
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Doğum Tarihi"
              value={this.state.newBirthDate}
              onChangeText={text => this.setState({ newBirthDate: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
              <Button
              icon="folder-account"
              mode="outlined"
              onPress={this._pickImage}
              color={'black'}
              style={{
                marginTop: 50,
                backgroundColor: 'white',
                color: 'black',
                marginRight:'5%'
              }}>
              Fotoğraf Seç
            </Button>
            {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 100, height: 100  , marginLeft:'35%' , marginTop:'2%'}} />}
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Şifre"
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={text => this.setState({ newPassword: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            
              
            <Button
              icon="lock"
              loading={this.state.loginLoading}
              mode="outlined"
              onPress={() => {this.signIn()}}
              color={'black'}
              style={{
                marginTop: 50,
                backgroundColor: 'white',
                color: 'black',
                marginRight:'5%'
              }}>
              Kayıt Ol
            </Button>
             <Button
              color={'black'}
              icon="account-circle-outline"
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
              Giriş Yap
            </Button>
            </ScrollView>
          </View>
          <Toast ref="toast"/>
        </View>
      );
    }
  }
 
