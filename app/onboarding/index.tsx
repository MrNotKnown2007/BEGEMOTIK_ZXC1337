// app/onboarding/index.tsx
import { View, Text, StyleSheet, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/onboarding/name');
  };

  const handleSkip = () => {
    // Если пропускаем, все равно создаем гиппопотама с именем по умолчанию
    if (typeof window !== 'undefined') {
      localStorage.setItem('hippoName', 'Hippo');
      localStorage.setItem('hasCreatedHippo', 'true');
    }
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Hippo Tamagotchi! 🦛</Text>
      <Text style={styles.subtitle}>
        Your journey with a virtual hippo begins here!
      </Text>
      <Text style={styles.description}>
        Feed, clean, play with, and care for your hippo to keep it happy and healthy.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started →"
          onPress={handleGetStarted}
          color="#4A90E2"
        />
      </View>

      <Button
        title="Skip for now"
        onPress={handleSkip}
        color="#666"
      />
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
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
});