// components/FlipClock.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlipNumber from './FlipNumber';

const FlipClock = ({ time, timeStyle, containerStyle }) => {
  // Split time into individual digits
  const timeString = time.replace(/:/g, '');
  const digits = timeString.split('');

  return (
    <View style={[styles.container, containerStyle]}>
      <FlipNumber 
        number={digits[0]} 
        textStyle={timeStyle}
        containerStyle={styles.digit}
      />
      <FlipNumber 
        number={digits[1]} 
        textStyle={timeStyle}
        containerStyle={styles.digit}
      />
      
      <Text style={[styles.colon, timeStyle]}>:</Text>
      
      <FlipNumber 
        number={digits[2]} 
        textStyle={timeStyle}
        containerStyle={styles.digit}
      />
      <FlipNumber 
        number={digits[3]} 
        textStyle={timeStyle}
        containerStyle={styles.digit}
      />
      
      <Text style={[styles.colon, timeStyle]}>:</Text>
      
      <FlipNumber 
        number={digits[4]} 
        textStyle={timeStyle}
        containerStyle={styles.digit}
      />
      <FlipNumber 
        number={digits[5]} 
        textStyle={timeStyle}
        containerStyle={styles.digit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  digit: {
    width: 30,
    height: 40,
    marginHorizontal: 1,
  },
  colon: {
    marginHorizontal: 4,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FlipClock;