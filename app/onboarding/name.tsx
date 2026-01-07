import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NameScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name Your Hippo</Text>
      <Link href="/(tabs)">
        <Text style={styles.link}>Continue to App</Text>
      </Link>
      <Link href="/onboarding">
        <Text style={styles.link}>Back</Text>
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