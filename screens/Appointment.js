import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Card from "../components/Card";
import DatePicker from 'react-native-datepicker';
import { SwipeListView } from '@nvthai/react-native-swipe-list-view';

import RNPicker from "rn-modal-picker";

export  class MyCarousel extends React.Component {

constructor(props)
{
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
    dataSourceCategory: [
        {
          id: 1,
          name: "Dahiliye"
        },
        {
          id: 2,
          name: "Beyin Cerrahi"
        }],
      category:null,
      hospital:null,
      date:null
  }
}

_selectedValueHospital(index, item) {
  this.setState({ hospital: item.name });
}

_selectedValueCategory(index, item) {
  this.setState({ category: item.name });
}

    render()
    {
  return (
    <View style={styles.container}>
        <ProgressSteps previousBtnStyle={{display:'none'}} nextBtnTextStyle={{color:'red'}}>
          {/* ------------------------------------------FIRST------------------------------------------------------------ */}
        <ProgressStep label="İlk Adım" previousBtnDisabled={'disable'}>
        <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize:20}}>Tarih Seçimi Yap !</Text>

                    <DatePicker
                        style={{
                          width: '100%',
                          color: 'white',
                          fontSize: 50,
                          marginBottom:50
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
                            margin:10
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
                       <Text style={{fontSize:20}}>Hastane Seçimi Yap !</Text>
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
              dropDownImage={{uri:'https://img.icons8.com/dotty/80/000000/category.png'}}
              selectedValue={(index, item) => this._selectedValueHospital(index, item)}
            />
            <Text style={{fontSize:20,marginTop:'10%'}}>Bölüm Seçimi Yap !</Text>
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
              dropDownImage={{uri:'https://img.icons8.com/dotty/80/000000/category.png'}}
              selectedValue={(index, item) => this._selectedValueCategory(index, item)}
            />
          </View>
          <SwipeListView
            style={{marginTop:30}}
            useFlatList
            data={this.state.dataSourceHospital}
            renderItem={ (data) => (
                <View style={styles.rowFront}>
                    <Text>I am {data.id} in a SwipeListView</Text>
                </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
            leftOpenValue={50}
            rightOpenValue={-50}
        />
        
        </ProgressStep>
        {/* ------------------------------------------SECOND------------------------------------------------------------ */}
        <ProgressStep label="Second Step">
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
            <View style={styles.balanceContainer}>
                <Text style={styles.libraValue}>~163.20</Text>
                <Text>
                <Text style={styles.currency}>USD </Text>
                <Text style={styles.currencyValue}>166.00</Text>
                </Text>
            </View>
            </View>
            <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.footerButton}>
                <MaterialCommunityIcons name="clock" size={16} color="#FFF" />
                <Text style={styles.footerButtonText}>Randevu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerButton}>
                <FontAwesome name="heartbeat" size={16} color="#FFF" />
                <Text style={styles.footerButtonText}>Muayene</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
        </ProgressStep>
         {/* ------------------------------------------THIRD------------------------------------------------------------ */}
        <ProgressStep label="Third Step">
            <View style={{ alignItems: 'center' }}>
                <Text>Randevu Detay</Text>
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
    display:'flex',
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
  backTextWhite: {
    color: '#FFF',
},
rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
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
    paddingLeft: 15,
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