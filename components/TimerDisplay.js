import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerDisplay = ({ time = 1500 }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "7%",
    marginBottom: "10%",
    marginLeft: "7%",
    marginRight: "7%",
    padding: 100,
    borderColor: "#00F5D4",
    borderRadius: 80,
    borderWidth: 5,
    alignItems: "center",
    backgroundColor: "#008B8B",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
  },
  timerBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    color: "white",
    fontSize: 50,
    fontWeight: "400",
  },
});

export default TimerDisplay;