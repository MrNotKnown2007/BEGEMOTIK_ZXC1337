// app/(tabs)/games.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHippo } from '@/context/HippoContext';
import { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
// Импорты игр
import BubbleGame from '@/components/mini-games/BubbleGame';
import DiceGuessGame from '@/components/mini-games/DiceGuessGame';
import MemoryGame from '@/components/mini-games/MemoryGame';

export default function GamesScreen() {
  const { hippo, addCoins } = useHippo();
  const [activeGame, setActiveGame] = useState<'bubble' | 'diceGuess' | 'memory' | null>(null);
  const [gameScore, setGameScore] = useState(0);

  // Проверяем, доступны ли игры (например, по энергии)
  const canPlayGame = (hippo?.stats.energy || 0) >= 20;

  const handleGameStart = (gameType: 'bubble' | 'diceGuess' | 'memory') => {
    if (!canPlayGame) {
      Alert.alert('😴 Бегемотик устал!', 'Нужно больше энергии (минимум 20%)');
      return;
    }
    setActiveGame(gameType);
  };

  const handleGameEnd = (score: number) => {
    setGameScore(score);
    setActiveGame(null);

    // Вычисляем награды
    const happinessBonus = Math.min(20, score * 0.5); // +0.5 настроения за очко
    const coinsBonus = Math.floor(score / 10); // +1 монета за каждые 10 очков

    // Разные базовые награды для разных игр
    let baseCoins = 10;
    if (activeGame === 'diceGuess') baseCoins = 15;
    if (activeGame === 'memory') baseCoins = 20;

    // Добавляем монеты за игру
    addCoins(baseCoins + coinsBonus);

    Alert.alert(
      '🎮 Игра окончена!',
      `Вы набрали ${score} очков!\n` +
      `+${Math.round(happinessBonus)} к настроению\n` +
      `+${baseCoins + coinsBonus} монет`,
      [{ text: 'Отлично!', style: 'default' }]
    );
  };

  const handleGameClose = () => {
    setActiveGame(null);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        🎮 Мини-игры
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Играйте с {hippo?.name || 'бегемотиком'} и получайте награды!
      </ThemedText>

      {/* Показатели энергии */}
      <View style={styles.energyContainer}>
        <ThemedText style={styles.energyText}>
          ⚡ Энергия: {Math.round(hippo?.stats.energy || 0)}%
        </ThemedText>
        <ThemedText style={styles.energyTip}>
          {canPlayGame ? '✅ Игры доступны!' : '😴 Нужно больше энергии (минимум 20%)'}
        </ThemedText>
      </View>

      {/* Сетка игр */}
      <View style={styles.gamesGrid}>
        {/* ИГРА 1: Пузыри */}
        <TouchableOpacity
          style={[styles.gameCard, !canPlayGame && styles.disabledCard]}
          onPress={() => handleGameStart('bubble')}
          disabled={!canPlayGame}
        >
          <View style={[styles.gameIcon, { backgroundColor: '#FF6B6B' }]}>
            <ThemedText style={styles.gameEmoji}>🫧</ThemedText>
          </View>
          <ThemedText style={styles.gameTitle}>Лопай пузыри!</ThemedText>
          <ThemedText style={styles.gameDescription}>
            Лопайте пузыри, чтобы заработать очки
          </ThemedText>
          <View style={styles.rewardBadge}>
            <ThemedText style={styles.rewardText}>🎁 Награда: +10 монет</ThemedText>
          </View>
        </TouchableOpacity>

        {/* ИГРА 2: Угадай число на кубике */}
        <TouchableOpacity
          style={[styles.gameCard, !canPlayGame && styles.disabledCard]}
          onPress={() => handleGameStart('diceGuess')}
          disabled={!canPlayGame}
        >
          <View style={[styles.gameIcon, { backgroundColor: '#6D4C41' }]}>
            <ThemedText style={styles.gameEmoji}>🎲</ThemedText>
          </View>
          <ThemedText style={styles.gameTitle}>Угадай число!</ThemedText>
          <ThemedText style={styles.gameDescription}>
            Угадайте, какое число выпадет на кубике
          </ThemedText>
          <View style={styles.rewardBadge}>
            <ThemedText style={styles.rewardText}>🎁 Награда: +15 монет</ThemedText>
          </View>
        </TouchableOpacity>

        {/* ИГРА 3: Память */}
        <TouchableOpacity
          style={[styles.gameCard, !canPlayGame && styles.disabledCard]}
          onPress={() => handleGameStart('memory')}
          disabled={!canPlayGame}
        >
          <View style={[styles.gameIcon, { backgroundColor: '#9C27B0' }]}>
            <ThemedText style={styles.gameEmoji}>🧠</ThemedText>
          </View>
          <ThemedText style={styles.gameTitle}>Игра на память</ThemedText>
          <ThemedText style={styles.gameDescription}>
            Запоминайте и находите пары карточек
          </ThemedText>
          <View style={styles.rewardBadge}>
            <ThemedText style={styles.rewardText}>🎁 Награда: +20 монет</ThemedText>
          </View>
        </TouchableOpacity>

        {/* Место для 4-й игры */}
        <TouchableOpacity
          style={[styles.gameCard, styles.comingSoonCard]}
          disabled={true}
        >
          <View style={[styles.gameIcon, { backgroundColor: '#2196F3' }]}>
            <ThemedText style={styles.gameEmoji}>🎯</ThemedText>
          </View>
          <ThemedText style={styles.gameTitle}>Новая игра</ThemedText>
          <ThemedText style={styles.gameDescription}>
            Следите за обновлениями!
          </ThemedText>
          <View style={styles.comingSoonBadge}>
            <ThemedText style={styles.comingSoonText}>🔜 Скоро</ThemedText>
          </View>
        </TouchableOpacity>
      </View>

      {/* Правила игр */}
      <View style={styles.rulesContainer}>
        <ThemedText style={styles.rulesTitle}>📝 Правила игр:</ThemedText>
        <ThemedText style={styles.rule}>• Каждая игра стоит 20% энергии</ThemedText>
        <ThemedText style={styles.rule}>• Чем больше очков, тем больше награда</ThemedText>
        <ThemedText style={styles.rule}>• Играйте регулярно, чтобы поднимать настроение бегемотика</ThemedText>
        <ThemedText style={styles.rule}>• Получайте бонусные монеты за рекорды</ThemedText>
        <ThemedText style={styles.rule}>• Игра на память: найдите все 10 пар за 2 минуты</ThemedText>
      </View>

      {/* Модальные окна игр */}
      <Modal
        visible={activeGame === 'bubble'}
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        onRequestClose={handleGameClose}
      >
        <BubbleGame
          onGameEnd={handleGameEnd}
          onClose={handleGameClose}
        />
      </Modal>

      {/* Модальное окно для игры "Угадай число" */}
      <Modal
        visible={activeGame === 'diceGuess'}
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        onRequestClose={handleGameClose}
      >
        <DiceGuessGame
          onGameEnd={handleGameEnd}
          onClose={handleGameClose}
        />
      </Modal>

      {/* Модальное окно для игры на память */}
      <Modal
        visible={activeGame === 'memory'}
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        onRequestClose={handleGameClose}
      >
        <MemoryGame
          onGameEnd={handleGameEnd}
          onClose={handleGameClose}
        />
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
    textAlign: 'center',
  },
  energyContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.2)',
  },
  energyText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#FF9800',
  },
  energyTip: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  gameCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  disabledCard: {
    opacity: 0.5,
  },
  comingSoonCard: {
    opacity: 0.7,
  },
  gameIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gameEmoji: {
    fontSize: 40,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  gameDescription: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 10,
    flex: 1,
  },
  rewardBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  rewardText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50',
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(158, 158, 158, 0.2)',
  },
  comingSoonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9E9E9E',
  },
  rulesContainer: {
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.1)',
  },
  rulesTitle: {
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 16,
    color: '#2196F3',
  },
  rule: {
    marginLeft: 8,
    marginBottom: 6,
    fontSize: 13,
    opacity: 0.8,
  },
});