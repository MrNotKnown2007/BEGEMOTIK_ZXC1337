// app/onboarding/name.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function NameHippoScreen() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please give your hippo a name!');
      return;
    }

    if (name.length > 20) {
      Alert.alert('Error', 'Name is too long! Max 20 characters.');
      return;
    }

    // Сохраняем имя в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('hippoName', name.trim());
    }

    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name Your Hippo 🦛</Text>
      <Text style={styles.subtitle}>
        Give your hippo a special name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter hippo name"
        value={name}
        onChangeText={setName}
        maxLength={20}
        autoFocus
      />

      <Text style={styles.hint}>
        Example: Bubbles, Moto, River, Happy
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!name.trim()}
          color="#4A90E2"
        />
      </View>

      <Link href="/(tabs)" style={styles.skipLink}>
        <Text style={styles.skipText}>Skip for now →</Text>
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
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1D3D47',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4A5568',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  hint: {
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    color: '#718096',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
  skipLink: {
    marginTop: 20,
  },
  skipText: {
    color: '#4A5568',
    fontSize: 16,
    fontWeight: '500',
  },
});