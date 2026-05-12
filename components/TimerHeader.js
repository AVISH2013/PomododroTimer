import React from 'react';
import { StyleSheet, Text } from 'react-native';

class TimerHeader extends React.Component {
  handleDisplay = () => {
    if (this.props.intervalType === "Work") {
      return "💪 Work Time";
    } else {
      return "😌 Relax :)";
    }
  }

  render() {
    return (
      <Text style={styles.textStyle}>{this.handleDisplay()}</Text>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 2,
    marginTop: 40,
    padding: 10,
    textAlign: "center",
    alignSelf: "center",
    width: 260,
    height: 55,
    color: "white",
    backgroundColor: '#008B8B',
    borderRadius: 12,
  }
});

export default TimerHeader;