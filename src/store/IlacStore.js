import {observable , configure, action, runInAction , autorun, toJS, isObservableMap} from 'mobx';
import axios from 'axios';
import {AsyncStorage} from 'react-native'
//import { toJS } from 'mobx';
import appStore from './AppointmentStore';
import DataIlac from '../../data/DataIlac';
configure({enforceActions:"observed"});

class IlacStore{
    @observable aranan = '';
    @observable data = DataIlac;
    @observable allData = DataIlac;
    @observable allTodayData = DataIlac;
    @observable allPastData = '';
    @observable time = '00:00';

    @observable Ilaclar = [];
    @observable.shallow secondData = [];
    @observable selectedIlac = null;
    @observable selectedDate = null;
    @observable.shallow bugunData = [];
    @observable.shallow gecmisData = [];

    @observable.shallow gecici = [];
    constructor()
    {
        autorun( () => {
           //this.aktar();
           this.yukle();
        }); 
    }

    @action getToday = () => 
      {
          var today = new Date();
          var date = '';
          date += today.getFullYear() + '-';
          if((today.getMonth()+1)<10)  { date += '0' + (today.getMonth()+1);}else{  date += (today.getMonth()+1);}
          if(today.getDate()<10)  {date += '-0' + today.getDate();}else{  date += '-' + today.getDate();}
          runInAction(() => {this.selectedDate = date});
      }
     @action changeDate = (date) =>
      {
          runInAction(() => {this.selectedDate = date});
      }
      @action addReminder = ( identity , ilac , day , reuse , date , time) =>
      {
          //console.log(`http://matmaca.com/api/Home/addReminder?identity=${identity}&name=${ilac}&start=${date}&day=${day}&clock=${time} &reuse=${reuse}`);
            axios.get(`http://matmaca.com/api/Home/addReminder?identity=${identity}&name=${ilac}&start=${date}&day=${day}&clock=${time} &reuse=${reuse}`)
            .then()
            .catch(err => alert("Kayıt Edilemedi.."))
      }

      @action fillToday = () =>
      {
        //runInAction(() => {this.bugunData = []});
        let bugun = toJS(this.secondData);
        console.log(bugun);
        let liste =  [];
        bugun.map((item => {
            if(item.id != 0)
            {
                let gun = item.start.split('T');
                let today = this.zaman();
                item.start = gun[0];
                if(gun[0] == today)
                {
                    //this.setState({data : [...this.state.data,item]})
                    liste.push(item);
                }
            }
            
        }))
        runInAction(() => {this.bugunData = liste; this.gecici = liste});
      }
      @action fillPast = () =>
      {
        //runInAction(() => {this.gecmisData = []});
        let g , d , e , tut;
        let data = toJS(this.secondData);
        let da = [];
        data.forEach(item => {
            tut = item.start.split('T');
            item.start = tut[0];
            g = item.start;
            d = g.split('-')
            e  = this.gecmisKontrol(d);
            if(e)
            {
                da.push(item);
            }

        });
        runInAction(()=> {this.gecmisData = da});
      }
      gecmisKontrol = (d) =>
      {
          var z = this.zaman();
          var sp2 = z.split('-');
          if (parseInt(sp2[0]) > parseInt(d[0]) )
          {       
              return true;
          }else
          {
              if ( parseInt(sp2[1]) > parseInt(d[1]))
              {
                  return true;
              }else
              {
                  if( parseInt(sp2[2]) > parseInt(d[2]) ) 
                  {
                      return true;
                  }else
                  {
                      return false;
                  }
              }
          }    
      }
      zaman = () => 
      {
          var today = new Date();
          var date = '';
          date += today.getFullYear() + '-';
          if((today.getMonth()+1)<10)  { date += '0' + (today.getMonth()+1);}else{  date += (today.getMonth()+1);}
          if(today.getDate()<10)  {date += '-0' + today.getDate();}else{  date += '-' + today.getDate();}
          return(date);
      }
      @action searchFilter = () =>
      {
     /*  this.gecici = this.secondData;
      let tut = toJS(this.secondData);
      console.log(this.secondData);
        const newData  = tut.filter( item => {
            const listItem = item.Ilac.toLowerCase();  
            console.log(listItem);
            return listItem.indexOf(this.aranan.toLowerCase())  > -1;
        });
        this.secondData = [];
        this.secondData = newData;  
        */ 
      }

      _fillIlac = async (identity) => 
      {
        //this.temizle();
        try {
            let response = await fetch(`https://www.matmaca.com/api/Home/getIlac?identity=${identity}`);
            let json = await response.json();
            
            this.changeSecondData(json);
           
        } catch (error) {
            console.error(error);
        }
    }
    @action temizle = () => 
    {
        runInAction(() => { this.secondData= []; this.bugunData=[] ; this.gecmisData = [];})
    }
    @action changeSecondData = (data) => {
        
        runInAction(() => { this.secondData = data; });
        this.fillToday();
        this.fillPast();
    }

  
    @action yukle = async () =>
    {
        try {
            let response = await fetch("https://matmaca.com/api/Home/getAllIlac");
            let json = await response.json();
            runInAction(() => {this.Ilaclar = json});
 
        } catch (error) {
            console.error(error);
        }
        this.getToday(); 
    }

    @action getAra = () =>
    {
      return this.aranan;
    }
    @action getTime = () =>
    {
      return this.time;
    }
    @action setAra = (ara) =>
    {
       this.aranan = ara;
    }
    @action setTime = (e) =>
    {
        IlacStore.time = e;
    }
    
    @action sifirla = () =>
    {
      this.bugunData = this.gecici;
    }


    //#region Ortak Zaman
      @action aktar = () =>
      {
        var bugunEleman = this.bugunData();
        this.data = '';
        this.data = bugunEleman;
        this.allTodayData = '';
        this.allTodayData = bugunEleman;
        var gecmisEleman = this.GecmisData();
        this.allPastData = gecmisEleman;
      }
    //#endregion

    //#region Bugün 

    //#endregion
    
    //#region Geçmiş
  
    //#endregion 
}
export default new IlacStore()