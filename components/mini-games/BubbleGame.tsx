import React, { useCallback, useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const bubblesBg = require('@/screens/games/bubbles.png');

// Импорты пузырей
const bubbleImages = [
    require('@/models/icons/games/bubbles/bubble1.png'),
    require('@/models/icons/games/bubbles/bubble2.png'),
    require('@/models/icons/games/bubbles/bubble3.png'),
    require('@/models/icons/games/bubbles/bubble4.png'),
    require('@/models/icons/games/bubbles/bubble5.png'),
    require('@/models/icons/games/bubbles/bubble6.png'),
];

interface Bubble {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    imageIndex: number;
}

interface BubbleGameProps {
    onGameEnd: (score: number) => void;
    onClose: () => void;
}

export default function BubbleGame({ onGameEnd, onClose }: BubbleGameProps) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [lives, setLives] = useState(3);
    const [gameActive, setGameActive] = useState(true);
    const [gameFinished, setGameFinished] = useState(false);
    const [popAnimation] = useState(new Animated.Value(0));

    const createBubble = useCallback((id: number): Bubble => {
        const size = Math.random() * 50 + 30; // 30-80px
        const speed = size < 50 ? 4 + Math.random() * 2 : 2.5 + Math.random() * 1.5; // Маленькие быстрее
        
        return {
            id,
            x: Math.random() * (width - size),
            y: height + 50,
            size,
            speed,
            imageIndex: Math.floor(Math.random() * bubbleImages.length),
        };
    }, []);

    useEffect(() => {
        const initialBubbles = Array.from({ length: 8 }, (_, i) => createBubble(i));
        setBubbles(initialBubbles);

        const gameTimer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(gameTimer);
                    handleGameFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const bubbleInterval = setInterval(() => {
            if (gameActive) {
                setBubbles((prev) => {
                    const newId = prev.length > 0 ? Math.max(...prev.map(b => b.id)) + 1 : 0;
                    return [...prev, createBubble(newId)];
                });
            }
        }, Math.random() * 1500 + 800);

        return () => {
            clearInterval(gameTimer);
            clearInterval(bubbleInterval);
        };
    }, [createBubble, gameActive]);

    useEffect(() => {
        if (!gameActive) return;

        const moveBubbles = setInterval(() => {
            setBubbles((prev) =>
                prev
                    .map((bubble) => ({
                        ...bubble,
                        y: bubble.y - bubble.speed,
                    }))
                    .filter((bubble) => {
                        if (bubble.y < -100) {
                            // Пузырь улетел вверх - минус жизнь
                            if (gameActive) {
                                setLives((l) => {
                                    const newLives = l - 1;
                                    if (newLives <= 0) {
                                        handleGameFinish();
                                    }
                                    return newLives;
                                });
                            }
                            return false;
                        }
                        return true;
                    })
            );
        }, 50);

        return () => clearInterval(moveBubbles);
    }, [gameActive]);

    const handleBubblePress = (id: number) => {
        if (!gameActive || gameFinished) return;

        setScore((prev) => prev + 1);
        setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));

        // Добавляем новый пузырь
        const newId = bubbles.length > 0 ? Math.max(...bubbles.map(b => b.id)) + 1 : 0;
        setBubbles((prev) => [...prev, createBubble(newId)]);

        // Анимация попадания
        Animated.sequence([
            Animated.timing(popAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(popAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleGameFinish = () => {
        setGameActive(false);
        setGameFinished(true);
    };

    const handleClose = () => {
        if (gameFinished) {
            onGameEnd(score);
        } else {
            onClose();
        }
    };

    return (
        <ImageBackground
            source={bubblesBg}
            style={styles.container}
            resizeMode="cover"
        >
            {/* HEADER */}
            <View style={styles.header}>
                {/* ЖИЗНИ СЛЕВА */}
                <View style={styles.livesContainer}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Text
                            key={i}
                            style={[
                                styles.heart,
                                i >= lives && styles.heartEmpty,
                            ]}
                        >
                            ❤️
                        </Text>
                    ))}
                </View>

                {/* ТАЙМЕР В ЦЕНТРЕ */}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{timeLeft}</Text>
                    <Text style={styles.timerLabel}>сек</Text>
                </View>

                {/* СЧЁТ СПРАВА */}
                <View style={styles.scoreContainer}>
                    <Animated.Text
                        style={[
                            styles.scoreText,
                            {
                                transform: [
                                    {
                                        scale: popAnimation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 1.2],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        {score}
                    </Animated.Text>
                    <Text style={styles.scoreLabel}>очков</Text>
                </View>

                {/* КНОПКА ЗАКРЫТИЯ */}
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
            </View>

            {/* GAME AREA */}
            <View style={styles.gameArea}>
                {bubbles.map((bubble) => (
                    <TouchableOpacity
                        key={bubble.id}
                        style={[
                            styles.bubble,
                            {
                                left: bubble.x,
                                top: bubble.y,
                                width: bubble.size,
                                height: bubble.size,
                            },
                        ]}
                        onPress={() => handleBubblePress(bubble.id)}
                        activeOpacity={0.9}
                    >
                        <Image
                            source={bubbleImages[bubble.imageIndex]}
                            style={styles.bubbleImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* GAME OVER SCREEN */}
            {gameFinished && (
                <View style={styles.gameOverOverlay}>
                    <View style={styles.gameOverContainer}>
                        <Text style={styles.gameOverTitle}>🎉 Отлично!</Text>
                        <Text style={styles.finalScoreText}>{score}</Text>
                        <Text style={styles.scoreLabel}>очков</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.repeatButton}
                                onPress={() => {
                                    setScore(0);
                                    setTimeLeft(30);
                                    setLives(3);
                                    setGameActive(true);
                                    setGameFinished(false);
                                    const initialBubbles = Array.from({ length: 8 }, (_, i) => createBubble(i));
                                    setBubbles(initialBubbles);
                                }}
                            >
                                <Text style={styles.buttonText}>🔁 Повторить</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuButton}
                                onPress={() => onGameEnd(score)}
                            >
                                <Text style={styles.buttonText}>🏠 В меню</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    livesContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    heart: {
        fontSize: 24,
    },
    heartEmpty: {
        opacity: 0.3,
    },
    timerContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    timerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    timerLabel: {
        fontSize: 12,
        color: '#fff',
        marginTop: 2,
    },
    scoreContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    scoreText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    scoreLabel: {
        fontSize: 12,
        color: '#fff',
        marginTop: 2,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    gameArea: {
        flex: 1,
        position: 'relative',
    },
    bubble: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbleImage: {
        width: '100%',
        height: '100%',
    },
    gameOverOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
        width: '85%',
    },
    gameOverTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4A90E2',
    },
    finalScoreText: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
        width: '100%',
    },
    repeatButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    menuButton: {
        flex: 1,
        backgroundColor: '#4A90E2',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
