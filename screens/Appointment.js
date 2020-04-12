import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Card from "../components/Card";
import DatePicker from 'react-native-datepicker';
import { SwipeListView } from '@nvthai/react-native-swipe-list-view';
import { ActivityIndicator,Colors  } from 'react-native-paper';

import RNPicker from "rn-modal-picker";

export class MyCarousel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSourceHospital: [
        {
          id: 1,
          name: "Lütfi Kıdar Eğitim Araştırma Hastanesi"
        },
        {
          id: 2,
          name: "Lütfi Kıdar Eğitim Araştırma Hastanesi"
        },
        {
          id: 3,
          name: "İstanbul Şehir Hastanesi"
        },
        {
          id: 4,
          name: "Lütfi Kıdar Eğitim Araştırma Hastanesi"
        },
        {
          id: 5,
          name: "Lütfi Kıdar Eğitim Araştırma Hastanesi"
        },
        {
          id: 6,
          name: "İstanbul Şehir Hastanesi"
        }],
      dataSourceAppointment: [
        {
          id: 1,
          hastane: "Lütfi Kıdar Eğitim Araştırma Hastanesi",
          bölüm: "Dahiliye",
          doktor: "Mehmet Uğur Atmaca",
          şikayet: "Eklem Ağrısı",
          tarih: "16.07.2019"
        },
        {
          id: 2,
          hastane: "İstanbul Şehir Hastanesi",
          bölüm: "Dahiliye",
          doktor: "Mehmet Uğur Atmaca",
          şikayet: "Eklem Ağrısı",
          tarih: "18.03.2019"
        },
        {
          id: 3,
          hastane: "Bursa Şehir Hastanesi",
          bölüm: "Dahiliye",
          doktor: "Mehmet Uğur Atmaca",
          şikayet: "Eklem Ağrısı",
          tarih: "16.09.2019"
        },
        {
          id: 4,
          hastane: "Lütfi Kıdar Eğitim Araştırma Hastanesi",
          bölüm: "Dahiliye",
          doktor: "Mehmet Uğur Atmaca",
          şikayet: "Eklem Ağrısı",
          tarih: "11.03.2019"
        },
        {
          id: 5,
          hastane: "Lütfi Kıdar Eğitim Araştırma Hastanesi",
          bölüm: "Dahiliye",
          doktor: "Mehmet Uğur Atmaca",
          şikayet: "Eklem Ağrısı",
          tarih: "16.07.2020"
        },
        {
          id: 6,
          hastane: "İstanbul Şehir Hastanesi",
          bölüm: "Dahiliye",
          doktor: "Mehmet Uğur Atmaca",
          şikayet: "Eklem Ağrısı",
          tarih: "16.07.2015"
        }],
      dataSourceCategory: [
        {
          id: 1,
          name: "Dahiliye"
        },
        {
          id: 2,
          name: "Beyin Cerrahi"
        }],
      category: null,
      hospital: null,
      date: null
    }
  }

  _selectedValueHospital(index, item) {
    this.setState({ hospital: item.name });
  }

  _selectedValueCategory(index, item) {
    this.setState({ category: item.name });
  }

  _swipeValue(e)
  {
      if(e.value == 95 || e.value == -95 )
      {
        if(e.direction == 'right')
        {
          alert('Randevu Tekrarlanacak !');
        }
        else
        {
          alert('Randevu Bilgilerini Göster !')
        }
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <ProgressSteps>
          {/* ------------------------------------------FIRST------------------------------------------------------------ */}
          <ProgressStep label="İlk Adım" previousBtnDisabled={'disable'}   >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Tarih Seçimi Yap !</Text>

              <DatePicker
                style={{
                  width: '100%',
                  color: 'white',
                  fontSize: 50,
                  marginBottom: 30
                }}
                date={this.state.date}
                mode="date"
                placeholder="Gidiş Tarihi"
                format="YYYY-MM-DD"
                minDate={this.state.localTime}
                maxDate="2020-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 3,
                  },
                  dateInput: {
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 10,
                    marginLeft: 45,
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
                }}
              />
              <Text style={{ fontSize: 20 }}>Hastane Seçimi Yap !</Text>
              <RNPicker
                dataSource={this.state.dataSourceHospital}
                dummyDataSource={this.state.dataSourceHospital}
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
                selectedLabel={this.state.hospital}
                placeHolderLabel={"Hastane Seçiniz !"}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={{ uri: 'https://img.icons8.com/dotty/80/000000/category.png' }}
                selectedValue={(index, item) => this._selectedValueHospital(index, item)}
              />
              <Text style={{ fontSize: 20, marginTop: '10%' }}>Bölüm Seçimi Yap !</Text>
              <RNPicker
                dataSource={this.state.dataSourceCategory}
                dummyDataSource={this.state.dataSourceCategory}
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
                selectedLabel={this.state.category}
                placeHolderLabel={"Bölüm Seçiniz !"}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={{ uri: 'https://img.icons8.com/dotty/80/000000/category.png' }}
                selectedValue={(index, item) => this._selectedValueCategory(index, item)}
              />
            </View>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 50, fontWeight: 'bold', fontStyle: 'italic' }}>Geçmiş Randevularım</Text>
            <Text style={{ fontSize: 10, marginLeft: 10, fontWeight: 'bold', color: 'gray', marginTop: 10 }}>geçmiş randevunuzu tekrar almak için sağa kaydırınız *</Text>
            <Text style={{ fontSize: 10, marginLeft: 10, fontWeight: 'bold', color: 'gray' }}>randevu hakkında bilgi almak için sola kaydırınız *</Text>
            <SwipeListView
              style={{ marginTop: 10 }}
              useFlatList
              data={this.state.dataSourceAppointment}
              onSwipeValueChange={(e)=>{e.isOpen == true ? this._swipeValue(e) : null }}
              leftOpenValue={15}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.rowFront}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Tarih : </Text>{item.tarih}</Text>
                  </View>
                  <View style={styles.footer2}>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Hastane : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.hastane}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Bölüm : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.bölüm}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Doktor : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.doktor}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.footerBalance}>
                      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Şikayet : </Text>
                      <View style={styles.balanceContainer}>
                        <Text>
                          <Text style={styles.currencyValue}>{item.şikayet}</Text>
                        </Text>
                      </View>
                    </View>

                  </View>
                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity><Text>Randevu Al </Text></TouchableOpacity>
                  <TouchableOpacity><Text> Randevu Bilgi  </Text></TouchableOpacity>
                </View>
              )}
              leftOpenValue={95}
              rightOpenValue={-95}
              stopLeftSwipe={95} stopRightSwipe={-95}
            />

          </ProgressStep>
          {/* ------------------------------------------SECOND------------------------------------------------------------ */}
          <ProgressStep label="İkinci Adım">
            <View style={{ alignItems: 'center' }}>
              <Text>Doktor Seçimi Yap Ve İlerle !</Text>
              <View style={styles.content}>
                <ScrollView horizontal style={styles.scroll} contentContainerStyle={styles.innerScroll}>
                  <View style={styles.spacing}>
                    <Card />
                  </View>
                  <View style={styles.spacing}>
                    <Card />
                  </View>
                  <View style={styles.spacing}>
                    <Card />
                  </View>
                </ScrollView>
              </View>
              <View style={styles.footer}>
                <View style={styles.footerBalance}>
                  <Text style={styles.myBalance}>Randevu Ücreti</Text>
                </View>
                <FlatList
                  data={this.state.dataSourceHospital}
                  renderItem={({ item }) => (
                    <View style={styles.buttonRow} data-id={1}>
                      <TouchableOpacity style={styles.footerButton}>
                        <MaterialCommunityIcons name="clock" size={16} color="#FFF" />
                        <Text style={styles.footerButtonText}>09:00</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.footerButton}>
                        <MaterialCommunityIcons name="clock" size={16} color="#FFF" />
                        <Text style={styles.footerButtonText}>09:00</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </ProgressStep>
          {/* ------------------------------------------THIRD------------------------------------------------------------ */}
          <ProgressStep label="Üçüncü Adım" onSubmit={()=>{this.props.navigation.navigate('Feed')}}>
            <View style={{ alignItems: 'center' }}>
              <Text>Randevu Detay</Text>
              <ActivityIndicator animating={true} color={Colors.green400} />
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
  spacing: {
    marginRight: 20,
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
    elevation: 9,
    borderRadius: 24
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
  },
  buttonRow: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  footerButton: {
    width: "45%",
    margin: 5,
    flexDirection: "row",
    backgroundColor: "#6248f2",
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
    fontWeight: "800",
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
export default MyCarousel;
