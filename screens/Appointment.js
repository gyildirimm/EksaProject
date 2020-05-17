import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Card from "../components/Card";
import DatePicker from 'react-native-datepicker';
import { SwipeListView } from '@nvthai/react-native-swipe-list-view';
import { ActivityIndicator, Colors, List } from 'react-native-paper';
import RNPicker from "rn-modal-picker";
import { NavigationEvents } from '@react-navigation/drawer';

import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import AppointmentStore from '../src/store/AppointmentStore';


@observer
export class Appointment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: null,
      hospital: null,
      date: null,
      localTime: null,
      selected: null
    }
  }

  _selectedValueHospital(index, item) {
    AppointmentStore.changeHospitalName(item.name, item.id);
    AppointmentStore.controlNextStep();
  }

  _selectedValueCategory(index, item) {
    AppointmentStore.changeSectionName(item.name, item.id);
    AppointmentStore.controlNextStep();
  }

  _swipeValue(e) {
    // console.log(e);
    if (!AppointmentStore.swipeAppoinment) {
      if (e.value == 95 || e.value == -95) {
        if (e.direction == 'right') {
          alert('Randevu Tekrarlanacak !');
          AppointmentStore.changeHospitalName(e.key.Hname, e.key.HastaneId);
          AppointmentStore.changeDate(e.key.date);
          AppointmentStore.changeSectionName(e.key.Sname, e.key.SectionId);
          AppointmentStore.changeDoctorId(e.key.DoctorId, e.key.Dname);
          AppointmentStore.changeSwipeAppointment();

          AppointmentStore.getSwipeAppointment();
          this.props.navigation.navigate('Home');
        }
        else {
          alert('Randevu Bilgilerini Göster !')
        }
      }
    }
    else{
      console.log('Zaten Swipe')
    }
  }

  _getStyles(id, status) {
    if (this.state.selected == id && status != false) {
      return styles.footerButton3
    }
    else if (status != false) {
      return styles.footerButton
    }
    else {
      return styles.footerButton2
    }
  }



  render() {
    if (AppointmentStore.dataState) {
      return (
        <ActivityIndicator
          size='large'
          animating={AppointmentStore.dataState}
          color={Colors.black}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      )
    }
    return (
      <View style={styles.container}>
        <ProgressSteps>
          {/* ------------------------------------------FIRST------------------------------------------------------------ */}
          <ProgressStep label="İlk Adım" previousBtnDisabled={'disable'} nextBtnDisabled={AppointmentStore.nextStepValue} >
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 17, marginLeft: 10, color: '#353232' }}>  Tarih Seçimi Yap !</Text>

              <DatePicker
                style={{
                  width: '100%',
                  color: 'white',
                  fontSize: 50,
                  marginBottom: 30
                }}
                date={AppointmentStore.selectedDate}
                mode="date"
                placeholder={AppointmentStore.selectedDate}
                format="YYYY-MM-DD"
                minDate={AppointmentStore.selectedDate}
                maxDate="2020-06-01"
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
                    margin: 10
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
                  this.setState({ date: date });
                  AppointmentStore.changeDate(date);
                }}
              />
              <Text style={{ fontSize: 17, marginLeft: 10, color: '#353232' }}>  Hastane Seçimi Yap !</Text>
              <RNPicker
                dataSource={AppointmentStore.hospitalsData}
                dummyDataSource={AppointmentStore.hospitalsData}
                defaultValue={false}
                pickerTitle={"Hastane"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"fade"}
                searchBarPlaceHolder={"Arama"}
                showPickerTitle={true}
                searchBarContainerStyle={styles.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={AppointmentStore.selectedHospital}
                placeHolderLabel={"Hastane Seçiniz !"}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                selectedValue={(index, item) => this._selectedValueHospital(index, item)}
              />
              <Text style={{ fontSize: 17, marginLeft: 10, marginTop: '10%', color: '#353232' }}>  Bölüm Seçimi Yap !</Text>
              <RNPicker
                dataSource={AppointmentStore.sectionsData}
                dummyDataSource={AppointmentStore.sectionsData}
                defaultValue={false}
                pickerTitle={"Bölüm"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"fade"}
                searchBarPlaceHolder={"Arama"}
                showPickerTitle={true}
                searchBarContainerStyle={styles.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={AppointmentStore.selectedSection}
                placeHolderLabel={"Bölüm Seçiniz !"}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                selectedValue={(index, item) => this._selectedValueCategory(index, item)}
              />
            </View>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 50, fontWeight: 'bold', fontStyle: 'italic' }}>Geçmiş Randevularım</Text>
            <Text style={{ fontSize: 10, marginLeft: 10, fontWeight: 'bold', color: 'gray', marginTop: 10 }}>geçmiş randevunuzu tekrar almak için sağa kaydırınız *</Text>
            <Text style={{ fontSize: 10, marginLeft: 10, fontWeight: 'bold', color: 'gray' }}>randevu hakkında bilgi almak için sola kaydırınız *</Text>
            <SwipeListView
              style={{ marginTop: 10 }}
              useFlatList
              data={AppointmentStore.historyData}
              onSwipeValueChange={(e) => { e.isOpen == true ? this._swipeValue(e) : null }}
              leftOpenValue={15}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.rowFront}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Tarih : </Text>{item.date}</Text>
                  </View>
                  <View style={styles.footer2}>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Hastane : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.Hname}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Bölüm : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.Sname}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Doktor : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.Dname}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Şikayet : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.complaint}</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item}
              renderHiddenItem={(item) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity onPress={() => { this._randevuAl(item) }}><Text>Randevu Al </Text></TouchableOpacity>
                  <TouchableOpacity><Text> Randevu Bilgi </Text></TouchableOpacity>
                </View>
              )}
              leftOpenValue={95}
              rightOpenValue={-95}
              stopLeftSwipe={95} stopRightSwipe={-95}
            />
          </ProgressStep>
          {/* ------------------------------------------SECOND------------------------------------------------------------ */}
          <ProgressStep label="İkinci Adım" nextBtnDisabled={AppointmentStore.nextStepValueTwo}>
            <View style={{ alignItems: 'center' }}>
              <Text>Doktor Seçimi Yap Ve İlerle !</Text>
              <View style={styles.content}>
                
                <FlatList
                  horizontal style={styles.scroll} contentContainerStyle={styles.innerScroll}
                  data={AppointmentStore.doctorData}
                  renderItem={({ item }) =>
                    <Card name={item.name} title={item.title} surname={item.surname} id={item.id} />
                  }
                  keyExtractor={item => item.id}
                />

              </View>
              <View style={styles.footer}>
                <View style={styles.footerBalance}>
                  <Text style={styles.myBalance}>Randevu Saatleri</Text>
                </View>
                <FlatList
                  numColumns={2}
                  data={AppointmentStore.loadingData ? null : AppointmentStore.appointmentTimes}
                  renderItem={({ item }) => (

                    <TouchableOpacity onPress={() => { item.status ? (this.setState({ selected: item.id }), AppointmentStore.changeSelectedDoctorTimes(item.id, item.startTime)) : alert('Dolu !') }} style={this._getStyles(item.id, item.status)}>
                      <MaterialCommunityIcons name={item.status ? 'clock' : 'cancel'} size={16} color="#FFF" />
                      <Text style={styles.footerButtonText}>{item.startTime}</Text>
                    </TouchableOpacity>

                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </ProgressStep>
          {/* ------------------------------------------THIRD------------------------------------------------------------ */}
          <ProgressStep label="Üçüncü Adım" onSubmit={() => { AppointmentStore.getSwipeAppointment(); this.props.navigation.navigate('Home') }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ width: '100%' }}>
                <List.Section title="Randevu Özeti">
                  <List.Accordion
                    expanded
                    title="Tarih"
                    left={props => <List.Icon {...props} icon="calendar-check-outline" />}
                  >
                    <View>
                      <List.Item
                        title={AppointmentStore.selectedDate}
                        description="Tarih"
                        left={props => <List.Icon {...props} icon="calendar-range" />}
                      />
                      <List.Item
                        title={AppointmentStore.selectedHourStirng}
                        description="Saat"
                        left={props => <List.Icon {...props} icon="alarm" />}
                      />
                    </View>
                  </List.Accordion>

                  <List.Accordion
                    title="Hastane - Bölüm"
                    left={props => <List.Icon {...props} icon="home-city" />}
                  >
                    <View style={{ marginLeft: 3 }}>
                      <List.Item
                        title={AppointmentStore.selectedHospital}
                        description="Hastane"
                        left={props => <List.Icon {...props} icon="home" />}
                      />
                      <List.Item
                        title={AppointmentStore.selectedSection}
                        description="Bölüm"
                        left={props => <List.Icon {...props} icon="store-24-hour" />}
                      />
                    </View>
                  </List.Accordion>
                  <List.Accordion
                    title="Doktor"
                    left={props => <List.Icon {...props} icon="account-check" />}
                  >
                    <View style={{ marginLeft: 3 }}>
                      <List.Item
                        title={AppointmentStore.selectedDoctorName}
                        description="Doktor"
                        left={props => <List.Icon {...props} icon="account-circle" />}
                      />
                    </View>
                  </List.Accordion>
                </List.Section>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>

      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6fc",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerButton: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  scroll: {
    flex: 1,
  },
  innerScroll: {
    paddingLeft: 40,
    paddingVertical: 20,
    alignItems: "center",
  },
  headerButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  footer: {
    display: 'flex',
    padding:20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
    borderRadius: 24,
    minWidth:'90%'
  },
  footer2: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#e3fbcd',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  trash: {
    height: 25,
    width: 25,
  },
  footerBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    textAlign: 'center'
  },
  footerButton: {
    width: "45%",
    margin: 5,
    backgroundColor: "gray",
    flexDirection: "row",
    borderRadius: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButton2: {
    width: "45%",
    margin: 5,
    flexDirection: "row",
    backgroundColor: "red",
    borderRadius: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButton3: {
    width: "45%",
    margin: 5,
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 15,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonText: {
    marginLeft: 8,
    color: "#FFF",
  },
  balanceContainer: { alignItems: "flex-end" },
  myBalance: {
    fontSize: 20,
    color: "#000",
    fontWeight: "400",
    textAlign: 'center'
  },
  libraValue: {
    fontSize: 30,
    color: "#000",
    fontWeight: "800",
  },
  currency: {
    color: "#c1c2c6",
  },
  currencyValue: {
    color: "#000",
    fontWeight: "bold",
  },
});
export default Appointment;
