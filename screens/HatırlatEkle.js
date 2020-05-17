import React, { Component } from 'react'
import { StyleSheet ,SafeAreaView, TouchableOpacity,Text, View , Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input , Button } from 'react-native-elements';
import TimePicker from "react-native-24h-timepicker";
import RNPicker from "rn-modal-picker";
import { observer } from 'mobx-react';
import IlacStore from '../src/store/IlacStore';
import LoginStore from '../src/store/LoginStore';
import { runInAction } from 'mobx';
import DatePicker from 'react-native-datepicker';


const {width : WIDTH} = Dimensions.get('window');


@observer
export default class HatırlatEkle extends Component {
    state = 
    {
        time : '00:00',
        day : 0,
        reuse:0,
    }
    onCancel() 
    {
        this.TimePicker.close();
    }
    onConfirm(hour, minute) 
    {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }

    _selectedIlac(index, item) {

        runInAction(() => {IlacStore.selectedIlac = item.name})
      }
      addReminder = () =>
      {
        
        if( LoginStore.kisi.userIdentityNumber != '' && IlacStore.selectedIlac != null && this.state.day != 0 && this.state.reuse != 0 && IlacStore.selectedDate != null)
        {
            IlacStore.addReminder( LoginStore.kisi.userIdentityNumber, IlacStore.selectedIlac , this.state.day , this.state.reuse , IlacStore.selectedDate , this.state.time);
            
            setTimeout( () => {
              IlacStore._fillIlac(LoginStore.kisi.userIdentityNumber);
            } , 4000);
            //runInAction(() => {IlacStore.bugunData = IlacStore.gecici});
            this.props.navigation.goBack();
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
      componentDidMount()
      {
          runInAction(() => {IlacStore.selectedDate = this.zaman()});
      }
    render() 
    {
        let {navigation} = this.props;
        return (
            <SafeAreaView style={styles.aComp}>  
                <RNPicker
                dataSource={IlacStore.Ilaclar}
                dummyDataSource={IlacStore.Ilaclar}

                defaultValue={false}
                pickerTitle={"İlaç"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"fade"}
                searchBarPlaceHolder={"Arama"}
                showPickerTitle={true}
                selectedLabel={IlacStore.selectedIlac}
                placeHolderLabel={"İlaç Seçiniz !"}
                
                selectedValue={(index, item) => this._selectedIlac(index, item)}
              />

             <DatePicker
                style={{
                  width: '80%',
                  color: 'white',
                  fontSize: 50,
                  marginBottom: 30,
                  marginTop:15

                }}
                date={IlacStore.selectedDate}
                mode="date"
                placeholder={IlacStore.selectedDate}
                format="YYYY-MM-DD"
                minDate={this.zaman()}
                maxDate="2025-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    right: 0,
                    top: 4,
                    marginLeft: 3,
                  },
                  dateInput: {
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 10,
                    marginLeft: 5,
                    marginRight: 40,
                    color: 'black',
                    margin: 10,
                    backgroundColor:'white'
                  },
                  placeholderText: {
                    color: 'black',
                  },
                  dateText: {
                    color: 'black',
                    justifyContent: 'flex-start',
                  },
                }}
                onDateChange={date => {
                  IlacStore.changeDate(date);
                }}
              />
                <Input inputStyle={styles.InpSty} inputContainerStyle={styles.cntInt} value={this.state.day} onChangeText={(text) => {this.setState({day:text})}} placeholder="Kaç gün" placeholderTextColor="white"/>
                <Input inputStyle={styles.InpSty} inputContainerStyle={styles.cntInt} value={this.state.reuse} onChangeText={(text) => {this.setState({reuse:text})}} placeholder="Kaç Saatte Kullanılacak" placeholderTextColor="white"/>
                <View style={{flexDirection:'row' , justifyContent:'space-around' ,backgroundColor:'#708DFF', borderRadius:50, paddingTop:'2%' , height:'7%',paddingHorizontal:5}}>
                    <Text style={styles.saatYazi}>Saat Seçiniz  => </Text>
                    <TouchableOpacity
                        onPress={() => this.TimePicker.open()}
                        style={styles.button}
                        >
                        <Text style={styles.buttonText}>{this.state.time}</Text>
                    </TouchableOpacity>
                </View>
                
                <TimePicker ref={ref => {this.TimePicker = ref;}} onCancel={() => this.onCancel()}
                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}/>
                <Button
                icon={
                    <Icon
                    name="plus-circle"
                    size={22}
                    color="white"
                    />
                }
                onPress ={() => {this.addReminder()}} 
                buttonStyle={styles.btnSty}
                containerStyle={styles.btnCont}
                iconContainerStyle={styles.IcnCon}
                title="Kaydet"
                />
                

            </SafeAreaView>


        )
    }
}

const styles = StyleSheet.create({
    aComp:
    {
      flex:1,
      backgroundColor: '#406080',
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'center',
      position: 'relative',
    },
    InpSty:
    {
        color:'rgb(200,200,200)',
        marginVertical:'2%'
    },
    cntInt:
    {
        marginHorizontal:'8%',
        marginBottom:'7%'
    },
    btnSty:
    {
        justifyContent:"space-around",
        borderRadius:20,
        paddingVertical:10,
        backgroundColor:'#708DFF'
    },
    btnCont:
    {
        width:'30%',
        paddingTop:20,
    },
    IcnCon:
    {
       left:5
    },
    buttonText:
    {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "600"
    },
    saatYazi:
    {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "600",

        paddingRight:10
    },


})
