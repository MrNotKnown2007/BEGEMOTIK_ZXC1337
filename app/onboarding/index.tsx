// app/onboarding/index.tsx - ЗАМЕНИТЕ СОДЕРЖИМОЕ НА ЭТО:
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Hippo Tamagotchi! 🦛</Text>
      <Text style={styles.subtitle}>
        Your journey with a virtual hippo begins here!
      </Text>
      <Text style={styles.description}>
        Feed, clean, play with, and care for your hippo to keep it happy and healthy.
      </Text>
      <Link href="/onboarding/name" style={styles.link}>
        <Text style={styles.linkText}>Get Started →</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#E6F4FE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1D3D47',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    color: '#4A5568',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#718096',
    lineHeight: 22,
  },
  link: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  linkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});