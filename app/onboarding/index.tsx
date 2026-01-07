import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Link href="/onboarding/name">
        <Text style={styles.link}>Go to Name Screen</Text>
      </Link>
      <Link href="/(tabs)">
        <Text style={styles.link}>Skip to App</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    fontSize: 18,
    marginVertical: 10,
  },
});