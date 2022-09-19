import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CalculatorScreen({navigation}){
  const [resultText, setResultText] = useState('');
  const [number1, setnomber1] = React.useState('');
  const [number2, setnumber2] = React.useState('');
  const [data, setData] = React.useState([]);

  const addition = ()=>{
    setResultText(parseInt(number1) + parseInt(number2));
    setData([...data,{ key: `${number1} + ${number2} = ${parseInt(number1) + parseInt(number2)}` }]);
    
  }
  const soustraction = ()=>{
    setResultText(parseInt(number1) - parseInt(number2));
    setData([...data,{ key: `${number1} - ${number2} = ${parseInt(number1) - parseInt(number2)}` }]);
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection : 'row', alignItemes: 'center'}}>
        <Text style={{fontSize : 20}}>Result : {resultText}</Text>
      </View>
        <TextInput keyboardType='numeric' style={{width:200,borderColor:'gray',borderWidth:1, fontSize: 20}} value={number1} onChangeText={setnomber1} />
        <TextInput keyboardType='numeric' style={{width:200,borderColor:'gray',borderWidth:1, fontSize: 20}} value={number2} onChangeText={setnumber2} />
      <View style={{width: "50%", height: 60, flexDirection : 'row', alignItemes: 'center', justifyContent: 'space-around', paddingVertical: 12, paddingHorizontal:-200}}>
        <Button title=" + " onPress={addition} />
        <Button title="  -  " onPress={soustraction} />
        <Button title=" history " onPress={()=>navigation.navigate('History',{dataList: data})} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
function HistoryScreen({route, navigation}){
  const {dataList} = route.parms;
  return(
    <View style={styles.container}>
      <Text >History</Text>
        <FlatList style={styles.list}
          data={dataList}
          renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
      />
    </View>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    marginVertical: 50,
    marginTop: 50,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1 
  },
});