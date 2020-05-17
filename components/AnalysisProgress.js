import * as React from 'react';
import { StyleSheet, View, Text,FlatList } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { Subheading, Caption } from 'react-native-paper';

class AnalysisProgress extends React.Component {


    onColorChange = (Value,MaxValue,MinValue)=>{
        if (Value > MaxValue) {
            return 'red'
        } else if (Value < MaxValue && Value > MinValue){
            return 'green'
        }
        else
        {
            return '#407294'
        }
    }

    render() {
        const { data } = this.props;
        return (
            <View>
                <FlatList
                    numColumns={1}
                    data={data == [] ? null : data}
                    renderItem={({ item }) => (

                        <View style={{ backgroundColor: 'white', borderColor: this.onColorChange(item.Value,item.MaxValue,item.MinValue), borderWidth: 1, margin: 10, borderRadius: 20, padding: 10, flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <ProgressCircle
                                    percent={item.Value > item.MaxValue ? 100 : item.MaxValue}
                                    radius={40}
                                    borderWidth={8}
                                    color={this.onColorChange(item.Value,item.MaxValue,item.MinValue)}
                                    shadowColor="#dfdfdf"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 18 }}>{item.Value}</Text>
                                </ProgressCircle>
                            </View>
                            <View style={{ justifyContent: 'center', padding: 5, width: '70%', marginLeft: 10 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Subheading style={{ color: this.onColorChange(item.Value,item.MaxValue,item.MinValue) }}>{item.Name} - {item.Result}</Subheading><Caption>{item.MinValue} - {item.MaxValue} {item.Type}</Caption>
                                    <Text>{item.Description}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', marginTop: 10 }}>
                                    <Subheading style={{ color: '#f5ab60' }}>İdeal Değer İçin </Subheading><Caption>Yapılması Gerekenler</Caption>
                                    <Text>{item.Advice}</Text>
                                </View>
                            </View>
                        </View>

                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    search: {
        marginLeft: '3%',
        marginRight: '3%'
    }
});
export default AnalysisProgress;