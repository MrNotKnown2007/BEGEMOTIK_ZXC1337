// app/(tabs)/care.tsx
import { StyleSheet, View, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ActionButton from '@/components/ActionButton';
import { useHippo } from '@/context/HippoContext';

export default function CareScreen() {
  const { hippo, feed, clean, play, sleep } = useHippo();

  const handleFeed = () => {
    feed();
    Alert.alert('🍎 Fed!', 'Your hippo enjoyed the meal!');
  };

  const handleClean = () => {
    clean();
    Alert.alert('🛁 Cleaned!', 'Your hippo is now fresh and clean!');
  };

  const handlePlay = () => {
    if ((hippo?.stats.energy || 0) < 20) {
      Alert.alert('😴 Too Tired', 'Your hippo needs to sleep first!');
      return;
    }
    play();
    Alert.alert('🎮 Played!', 'Your hippo had fun playing!');
  };

  const handleSleep = () => {
    sleep();
    Alert.alert('😴 Slept!', 'Your hippo is resting and gaining energy!');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Care for Your Hippo</ThemedText>
      <ThemedText style={styles.subtitle}>
        Keep {hippo?.name || 'your hippo'} happy and healthy
      </ThemedText>

      <View style={styles.statsPreview}>
        <ThemedText style={styles.statsTitle}>Current Stats:</ThemedText>
        {hippo && (
          <View style={styles.statsRow}>
            <ThemedText>🍖 Hunger: {Math.round(hippo.stats.hunger)}%</ThemedText>
            <ThemedText>⚡ Energy: {Math.round(hippo.stats.energy)}%</ThemedText>
            <ThemedText>✨ Clean: {Math.round(hippo.stats.cleanliness)}%</ThemedText>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <ActionButton
          title="Feed"
          icon="fork.knife"
          onPress={handleFeed}
        />
        <ActionButton
          title="Clean"
          icon="drop.fill"
          onPress={handleClean}
        />
        <ActionButton
          title="Play"
          icon="gamecontroller.fill"
          onPress={handlePlay}
          disabled={(hippo?.stats.energy || 0) < 20}
        />
        <ActionButton
          title="Sleep"
          icon="moon.zzz.fill"
          onPress={handleSleep}
        />
      </View>

      <View style={styles.tips}>
        <ThemedText style={styles.tipTitle}>Tips:</ThemedText>
        <ThemedText style={styles.tip}>• Feed when hunger is above 60%</ThemedText>
        <ThemedText style={styles.tip}>• Clean when cleanliness is below 40%</ThemedText>
        <ThemedText style={styles.tip}>• Play when energy is above 20%</ThemedText>
        <ThemedText style={styles.tip}>• Sleep when energy is below 30%</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 25,
    opacity: 0.8,
  },
  statsPreview: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 25,
  },
  statsTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  statsRow: {
    gap: 10,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  tips: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
    padding: 15,
  },
  tipTitle: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  tip: {
    marginLeft: 10,
    marginBottom: 4,
    fontSize: 14,
  },
});