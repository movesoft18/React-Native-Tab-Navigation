/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { Animated, Button, StyleSheet, View, Easing } from 'react-native';

const ItemAnimate = ({ index }: { index: string }) => {

  const [expanded, setExpanded] = useState(false);
  const value = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  const startAnimate = () => {
    Animated.timing(value, { toValue: expanded ? 0 : 1, useNativeDriver: false, duration: 4000, easing: Easing.bounce }).start((done)=>{
      setExpanded(!expanded);
    })
  }
  //const inputRange = Object.values(animate_state)
  let height = value.interpolate({ inputRange:[0,1], outputRange: [50, 150] });
  const backgroundColor = value.interpolate({ inputRange:[0,1], outputRange: ['#4649ad', '#d0f0fd'] })

  return <Animated.View style={{ height: height, width: '100%', justifyContent: 'center', backgroundColor }}  >
    <Button title={`start animate ${index}`} onPress={()=>{
      value.stopAnimation();
      /*if (!expanded){
        height = value.interpolate({ inputRange, outputRange: [50, 150] });
      } else {
        height = value.interpolate({ inputRange, outputRange: [150, 50] });
      }*/
      startAnimate();} }/>
  </Animated.View>
}

const App = () => {
  const data = new Array(10).fill(1)

  return <View>
    {data.map((_, key) => {
      return <ItemAnimate index={String(key)} key={key} />
    })}
  </View>
}
export default App;
