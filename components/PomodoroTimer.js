import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Timer from './Timer';

export default function PomodoroTimer() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  return (
    <View style={styles.wrapper}>
      <Timer
        workPeriod={workTime}
        breakPeriod={breakTime}
        setWorkPeriod={setWorkTime}
        setBreakPeriod={setBreakTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});