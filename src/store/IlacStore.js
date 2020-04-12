import { observable , action ,configure ,autorun ,runInAction} from 'mobx';
import DataIlac from '../../data/DataIlac';
configure({enforceActions:"observed"});
class IlacStore{
    @observable aranan = '';
    @observable data = DataIlac;
    @observable allData = DataIlac;
    @observable allTodayData = DataIlac;
    @observable allPastData = '';
    @observable time = '00:00';
    constructor()
    {
        autorun( () => {
           this.aktar();
        }); 
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
    @action searchFilter = () =>
    {
      this.data = this.allData;
        const newData  = this.allData.filter( item => {
            const listItem = item.ilac_ad.toLowerCase();  
            return listItem.indexOf(this.aranan.toLowerCase())  > -1;
        });
        this.data = '';
        this.data = newData;   
        this.allData = DataIlac;
    }
    @action sifirla = () =>
    {
      this.data = this.allTodayData;
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
      zaman = () => 
      {
          var today = new Date();
          var date = '';
          if(today.getDate()<10)  { date += '0' + today.getDate();}else{  date += today.getDate();}
          if((today.getMonth()+1)<10)  { date += '.0' + (today.getMonth()+1);}else{  date += (today.getMonth()+1);}
          date += '.' + today.getFullYear();
          return(date);
      }
    //#endregion

    //#region Bugün 
      bugunData = () =>
      {
          var g , d , e;
        
          var da = [];
          this.data.forEach(item => {
              g = item.tarih;
              d = g.split('.')
              e  = this.kontrol(d);
              if(e)
              {
                  da.push(item);
              }

          });
          return da;
      }

      kontrol = (d) =>
      {
          var z = this.zaman();
          var sp2 = z.split('.');
          if( (d[0] == sp2[0]) &&  (d[1] == sp2[1]) &&  (d[2] == sp2[2]) )
          {
              return true;
          }
          else
          {
              return false;
          }
          
      }
    //#endregion
    
    //#region Geçmiş
      GecmisData = () =>
      {
          var g , d , e;
        
          var da = [];
          this.allData.forEach(item => {
              g = item.tarih;
              d = g.split('.')
              e  = this.gecmisKontrol(d);
              if(e)
              {
                  da.push(item);
              }

          });
          return da;
      }
      gecmisKontrol = (d) =>
      {
          var z = this.zaman();
          var sp2 = z.split('.');
          if (parseInt(sp2[2]) > parseInt(d[2]) )
          {       
              return true;
          }else
          {
              if ( parseInt(sp2[1]) > parseInt(d[1]))
              {
                  return true;
              }else
              {
                  if( parseInt(sp2[0]) > parseInt(d[0]) ) 
                  {
                      return true;
                  }else
                  {
                      return false;
                  }
              }
          }    
      }
    //#endregion 
}
export default new IlacStore()