import { ScrollView, StyleSheet } from 'react-native';
import PomodoroTimer from './components/PomodoroTimer';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <PomodoroTimer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e"
  },
});