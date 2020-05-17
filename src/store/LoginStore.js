import {observable , configure, action, runInAction , autorun} from 'mobx';
import axios from 'axios';
import {AsyncStorage} from 'react-native'
import { observer } from 'mobx-react';
import User from '../../models/User';
import DoctorProfile from '../../models/DoctorProfile';

configure({enforceActions:"observed"});
class LoginStore
{
    @observable login = false;
    @observable navigation;
    @observable yazi;
    @observable sayfa = 'Login';
    @observable kisi  = new User('' , '' , '' , '' , '' , '' , '' , '' , '' , 1 );
    @observable doctorProfile  = new DoctorProfile('' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'');
    @observable isim = '';
    @observable rol = 1;
    constructor()
    {    
    }
    @action reset = () =>
    {
        runInAction( () => {
            let model = new User('' , '' , '' , '' , '' , '' , '' , '' , '' , 1 );
            let doctor =  new DoctorProfile('' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'');
            this.login = false;
            this.navigation = '';
            this.yazi = '';
            this.sayfa = 'Login';
            this.kisi = model;
            this.isim = '';
            this.rol = 1;
        });
    }
    @action _fillUser = async () =>
    {
        let token = await AsyncStorage.getItem('@token');

        axios.get(`http://192.168.1.4:8088/api/Home/getUser?token=${token}`)
        .then(res => res.data[0])
        .then( res => {
            if(res.id != 0)
            {
               
               console.log(res); //constructor( id ,isActivity , userBirthDate , userEmail , userIdentityNumber , userImageSource , userPersonalName , userPersonalSurname , userPhoneNumber , userRol)
                runInAction( () => { this.kisi = new User(res.id , res.isActivity , res.userBirthDate , res.userEmail , res.userIdentityNumber , res.userImageSource , res.userPersonalName , res.userPersonalSurname , res.userPhoneNumber , res.userRol );});
                console.log("observable kişi =>");
                console.log(this.kisi.getfullName());
            }
        },err=>{
            alert("Oops bir şeyler ters gitti")
        })
    }


    
}
export default new LoginStore()