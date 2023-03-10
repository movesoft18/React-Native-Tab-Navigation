/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import {View, Text, Button, TextInput, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


function MainScreen({navigation, route}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Главная страница</Text>
      <View style={{margin:20, }}>
        <Button
        title="Перейти к подробностям"
        onPress={() => navigation.navigate('Подробные сведения')}
        />
      </View>
      <View style={{margin:20, }}>
        <Button
          title="О навигации"
          onPress={() => navigation.navigate('About', {info1:"мы учимся переходить между экранами", num: 2})}
        />
      </View>
      <View style={{margin:20, }}>
        <Button
          title="К сообщениям"
          onPress={() => navigation.navigate('Message')}
        />
      </View>

      <View style={{margin:20, }}>
        <Button
          title="К сообщениям по умолчанию"
          onPress={() => navigation.navigate('MessageDefs')}
        />
      </View>

      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function AboutScreen({navigation, route}) {
  //const {info1, num} = route.params;
  const info1 = 'Text';
  const num = 3;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Информация о навигации StacknaNigation</Text>
      <Text>{info1}</Text>
      <Text>Экран номер {num}</Text>
      <Button
        title="Назад"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function MessageScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <TextInput
        multiline
        placeholder="Введите сообщение здесь"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Завершить"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Главная',
            params: { post: postText },

          });
        }}
      />
    </View>
  );
}

function MessageScreenWithDefaults({navigation, route}) {
  const [postText, setPostText] = React.useState(route.params.message);
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <TextInput
        multiline
        placeholder="Введите сообщение здесь"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Завершить"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Главная',
            params: { post: postText },

          });
        }}
      />
    </View>
  );
}

function DetailScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Подробности...</Text>
      <View style={{margin:20, }}>
        <Button
          title="Перейти к подробностям снова"
          onPress={() => navigation.navigate('Подробные сведения')}
        />
      </View>
      <View style={{margin:20, }}>
        <Button
          title="На главный по имени маршрута"
          onPress={() => navigation.navigate('Главная')}
        />
      </View>

      <View style={{margin:20, }}>
        <Button
          title="На главный (наверх)"
          onPress={() => navigation.navigate('Главная')}
        />
      </View>

      <View style={{margin:20, }}>
        <Button
          title="Назад"
          onPress={() => navigation.goBack()}
        />
      </View>

    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Example() {
  return (
    <NavigationContainer>
      <Tab.Navigator>

      <Tab.Screen
        name="Главная"
        component={MainScreen} 
        options ={{
          tabBarIcon: ({ focused, color, size })=> {
            
            return(
              <Image 
                source={require('./src/assets/icons/main.png')}
                style={{width:size, height: size}}
                />
            );
          }
        }}
        />

      <Tab.Screen
        name="Подробные сведения"
        component={DetailScreen}
        options={{
          title: 'Подробно',
          tabBarIcon: ({ focused, color, size })=>{
            return(
              <Ionicons name={"search-circle-outline"} size={size} color={color}/>
            );
          }
        }}
        />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "Справка",
          tabBarIcon: ({ focused, color, size })=>{
            return(
              <Ionicons name={"information-circle-outline"} size={size} color={color}/>
            );
          }
        }}
         />

      <Tab.Screen
        name="Message"
        component={MessageScreen} 
        options={{
          title: "Сообщение",
          tabBarIcon: ({ focused, color, size })=>{
            return(
              <Ionicons name={"pencil-outline"} size={size} color={color}/>
            );
          }
        }}
        />

      <Tab.Screen
        name="MessageDefs"
        initialParams={{ message: 'default text' }}
        component={MessageScreenWithDefaults}
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused, color, size })=>{
            return(
              <Ionicons name={"people-outline"} size={size} color={color}/>
            );
          }
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
