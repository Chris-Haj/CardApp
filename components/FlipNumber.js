// components/FlipNumber.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const FlipNumber = ({ number, textStyle, containerStyle }) => {
  const [currentNumber, setCurrentNumber] = useState(number);
  const [nextNumber, setNextNumber] = useState(number);
  const flipAnim = new Animated.Value(0);

  useEffect(() => {
    if (number !== currentNumber) {
      setNextNumber(number);

      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentNumber(number);
        flipAnim.setValue(0);
      });
    }
  }, [number]);

  const topTransform = {
    transform: [
      {
        rotateX: flipAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ["0deg", "-90deg", "-90deg"],
        }),
      },
    ],
  };

  const bottomTransform = {
    transform: [
      {
        rotateX: flipAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ["90deg", "90deg", "0deg"],
        }),
      },
    ],
  };

  const topOpacity = {
    opacity: flipAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 0],
    }),
  };

  const bottomOpacity = {
    opacity: flipAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Current number (top half) */}
      <Animated.View
        style={[styles.half, styles.topHalf, topTransform, topOpacity]}>
        <Text style={[styles.number, textStyle]}>{currentNumber}</Text>
      </Animated.View>

      {/* Next number (bottom half) */}
      <Animated.View
        style={[
          styles.half,
          styles.bottomHalf,
          bottomTransform,
          bottomOpacity,
        ]}>
        <Text style={[styles.number, textStyle]}>{nextNumber}</Text>
      </Animated.View>

      {/* Static background for sizing */}
      <View style={styles.background}>
        <Text style={[styles.number, textStyle, { opacity: 0 }]}>
          {currentNumber}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  background: {
    justifyContent: "center",
    alignItems: "center",
  },
  half: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topHalf: {
    bottom: "50%",
  },
  bottomHalf: {
    top: "50%",
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default FlipNumber;
