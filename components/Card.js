import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Avatar from "../assets/me.jpg";

export default class Card extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.colorHeader} />
        <View style={styles.card}>
          <View>
            <View>
              <View style={styles.imageWrap}>
                <Image source={Avatar} style={styles.avatar} />
              </View>
            </View>
            <View>
              <Text style={styles.message}>Doctor</Text>
              <Text style={styles.libraCount}>Eksa</Text>
              <Text style={styles.actualValue}>
                <Text style={styles.currency}>Mevcut Hastası : </Text>
                <Text style={styles.currencyValue}>166</Text>
              </Text>
              <Text style={styles.actualValue}>
                <Text style={styles.currency}>Güncelleme :</Text>
                <Text style={styles.currencyValue}> Dün</Text>
              </Text>
             
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewText}>Kontrol Et !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: 250,
    paddingTop: 20,
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
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
  colorHeader: {
    width: "90%",
    height: 40,
    backgroundColor: "limegreen",
    borderRadius: 10,
    position: "absolute",
    top: 10,
    left: 10,
  },
  imageWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 20,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  message: {
    color: "#000",
    fontWeight: "bold",
  },
  libraCount: {
    color: "green",
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 20,
  },
  actualValue: {
    marginBottom: 5,
  },
  currency: {
    color: "#c1c2c6",
  },
  currencyValue: {
    color: "#000",
    fontWeight: "bold",
  },
  date: {
    color: "#c1c2c6",
    fontWeight: "500",
  },
  viewButton: {
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  viewText: {
    fontWeight: "bold",
  },
});