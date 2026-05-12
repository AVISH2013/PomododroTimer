import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
const TimerButton = ({ isRunning, onStart, onPause, onReset }) => {
 return (
 <View style={styles.container}>

 {/* Start / Pause Button */}
 <TouchableOpacity
 style={styles.button}
 onPress={isRunning ? onPause : onStart}
 >
 <Text style={styles.text}>
 {isRunning ? "Pause" : "Start"}
 </Text>
 </TouchableOpacity>
 {/* Reset Button */}
 <TouchableOpacity style={styles.button} onPress={onReset}>
 <Text style={styles.text}>Reset</Text>
 </TouchableOpacity>
 </View>
 );
};
export default TimerButton;
const styles = StyleSheet.create({
 container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
},
button: {
    backgroundColor: "#39FF14",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
},
text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
},
});