import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import TimerHeader from "./TimerHeader";
import * as ScreenOrientation from "expo-screen-orientation";

const Timer = ({ workPeriod = 25, breakPeriod = 5, setWorkPeriod, setBreakPeriod }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(workPeriod * 60);
  const [isBreak, setIsBreak] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  useEffect(() => {
    if (!started) {
      setTime(workPeriod * 60);
    }
  }, [workPeriod]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsBreak((prevIsBreak) => {
              const nextIsBreak = !prevIsBreak;
              setTimeout(() => {
                setTime(nextIsBreak ? breakPeriod * 60 : workPeriod * 60);
                setIsRunning(true);
              }, 0);
              return nextIsBreak;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStart = () => {
    if (!started) {
      setTime(workPeriod * 60);
      setIsBreak(false);
      setStarted(true);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setStarted(false);
    setTime(workPeriod * 60);
  };

  return (
    <View style={styles.container}>

      {/* Name */}
      <Text style={styles.graffitiName}>Avish</Text>

      {/* Inputs — hidden once timer starts */}
      {!started && (
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Work (min)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(workPeriod)}
              onChangeText={(val) => setWorkPeriod(Number(val) || 0)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Break (min)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(breakPeriod)}
              onChangeText={(val) => setBreakPeriod(Number(val) || 0)}
            />
          </View>
        </View>
      )}

      {/* Header */}
      <TimerHeader
        running={isRunning}
        intervalType={isBreak ? "Break" : "Work"}
      />

      {/* Timer display */}
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {!isRunning ? (
          <TouchableOpacity style={styles.btnStart} onPress={handleStart}>
            <Text style={styles.btnText}>▶ Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnPause} onPress={handlePause}>
            <Text style={styles.btnText}>⏸ Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
          <Text style={styles.btnText}>↺ Reset</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  graffitiName: {
    fontSize: 52,
    fontWeight: "900",
    color: "#00F5D4",
    textShadowColor: "#008B8B",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 6,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 24,
  },
  inputGroup: {
    alignItems: "center",
  },
  inputLabel: {
    color: "#00F5D4",
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#16213E",
    color: "white",
    borderColor: "#00F5D4",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 20,
    width: 90,
    textAlign: "center",
  },
  timerBox: {
    borderWidth: 5,
    borderColor: "#00F5D4",
    borderRadius: 80,
    backgroundColor: "#008B8B",
    paddingVertical: 50,
    paddingHorizontal: 60,
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  btnStart: {
    backgroundColor: "#00F5D4",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  btnPause: {
    backgroundColor: "#F4A261",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  btnReset: {
    backgroundColor: "#E63946",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Timer;