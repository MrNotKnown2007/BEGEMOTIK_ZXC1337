// app/(tabs)/stats.tsx
import NavigationArrows from '@/components/mini-games/NavigationArrows';
import { ThemedText } from '@/components/themed-text';
import { useHippo } from '@/context/HippoContext';
import { useState } from 'react';
import { Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

const statsBg = require('@/screens/stat/stat_background.png');
const titleImg = require('@/models/icons/stats/title.png');
const frameImg = require('@/models/icons/stats/frame.png');
const smallFrame = require('@/models/icons/stats/small_frame.png');
const bigFrame = require('@/models/icons/stats/big frame.png');
const mediumFrame = require('@/models/icons/stats/medium_frame.png');
const rewardsButtonImg = require('@/models/icons/stats/rewards_button.png');
const hippoImg = require('@/models/icons/stats/hippo.png');

// Иконки
const healthIcon = require('@/models/icons/stats/health.png');
const satietyIcon = require('@/models/icons/stats/hunger.png');
const moodIcon = require('@/models/icons/stats/mood.png');
const cleanIcon = require('@/models/icons/stats/clean.png');
const energyIcon = require('@/models/icons/stats/energy.png');
const knowledgeIcon = require('@/models/icons/stats/knowledge.png');
const feedIcon = require('@/models/icons/stats/feed.png');
const playIcon = require('@/models/icons/stats/play.png');
const sleepIcon = require('@/models/icons/stats/sleep.png');
const maleIcon = require('@/models/icons/stats/male.png');
const femaleIcon = require('@/models/icons/stats/female.png');
const moneyIcon = require('@/models/icons/stats/money.png');

// Иконки игр
const bubbleIcon = require('@/models/icons/games/bubble_icon.png');
const cardIcon = require('@/models/icons/games/cards/back.png');
const diceIcon = require('@/models/icons/games/number icon.png');
const brainIcon = require('@/models/icons/games/brain.png');

// Иконка рекорда
const successIcon = require('@/models/icons/stats/succes.png');

// Иконки для модалей
const homeIcon = require('@/models/icons/games/home.png');

export default function StatsScreen() {
    const { hippo } = useHippo();
    const [rewardsModalVisible, setRewardsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    if (!hippo) {
        return <View style={styles.container} />;
    }

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < 2) setCurrentPage(currentPage + 1);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={statsBg} style={styles.background} resizeMode="stretch">
                {/* TITLE */}
                <Image source={titleImg} style={styles.title} />

                {/* MAIN FRAME */}
                <ImageBackground source={frameImg} style={styles.mainFrame} resizeMode="stretch">
                    <View style={styles.frameContent}>
                        {/* TOP ROW: REWARDS + INFO (только на первой странице) */}
                        {currentPage === 0 && (
                            <View style={styles.topSectionPage0}>
                                <TouchableOpacity style={styles.rewardsBtnContainer} onPress={() => setRewardsModalVisible(true)}>
                                    <Image source={rewardsButtonImg} style={styles.rewardsBtnImage} />
                                </TouchableOpacity>

                                <ImageBackground source={smallFrame} style={styles.infoBoxPage0} resizeMode="stretch">
                                    <View style={styles.infoBoxContentPage0}>
                                        <Image source={hippo.gender === 'male' ? maleIcon : femaleIcon} style={styles.genderIconPage0} />
                                        <ThemedText style={styles.infoTextPage0}>{hippo.name}</ThemedText>
                                        <ThemedText style={styles.infoTextPage0}>{hippo.age === 'child' ? 'Малыш' : 'Взрослый'}</ThemedText>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}

                        {/* MAIN CONTENT - PAGE 0: INDICATORS ONLY */}
                        {currentPage === 0 && (
                            <View style={styles.mainContent}>
                                <View style={styles.fullWidthFrame}>
                                    <ImageBackground source={bigFrame} style={styles.bigFrameBox} resizeMode="stretch">
                                        <View style={styles.bigFrameContent}>
                                            <ThemedText style={styles.sectionTitleHeader}>Показатели</ThemedText>
                                            <View style={styles.statsGrid}>
                                                <StatRow icon={healthIcon} label="Здоровье" value={Math.round(hippo.stats.health)} color="#FF6B6B" />
                                                <StatRow icon={satietyIcon} label="Сытость" value={Math.round(hippo.stats.satiety)} color="#FFB84D" />
                                                <StatRow icon={moodIcon} label="Настроение" value={Math.round(hippo.stats.happiness)} color="#4ECDC4" />
                                                <StatRow icon={cleanIcon} label="Чистота" value={Math.round(hippo.stats.cleanliness)} color="#95E1D3" />
                                                <StatRow icon={energyIcon} label="Энергия" value={Math.round(hippo.stats.energy)} color="#FFD966" />
                                                <StatRow icon={knowledgeIcon} label="Знания" value={Math.round(hippo.stats.thirst)} color="#87CEEB" />
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        )}

                        {/* PAGE 1: ACTIVITY */}
                        {currentPage === 1 && (
                            <View style={styles.mainContent}>
                                <View style={styles.fullWidthFrame}>
                                    <ImageBackground source={mediumFrame} style={styles.mediumFrameBoxPage} resizeMode="stretch">
                                        <View style={styles.mediumFrameContentPage}>
                                            <ThemedText style={styles.sectionTitleHeaderPage1}>Активность</ThemedText>
                                            <View style={styles.activityGridPage}>
                                                <ActivityRowPage icon={feedIcon} label="Покормлен" value={hippo.feedCount || 0} />
                                                <ActivityRowPage icon={playIcon} label="Поиграл" value={hippo.playCount || 0} />
                                                <ActivityRowPage icon={cleanIcon} label="Помыт" value={hippo.cleanCount || 0} />
                                                <ActivityRowPage icon={sleepIcon} label="Поспал" value={hippo.sleepCount || 0} />
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        )}

                        {/* PAGE 2: ACHIEVEMENTS */}
                        {currentPage === 2 && (
                            <View style={styles.mainContent}>
                                <View style={styles.fullWidthFrame}>
                                    <ImageBackground source={bigFrame} style={styles.bigFrameBoxPage} resizeMode="stretch">
                                        <View style={styles.bigFrameContentPage}>
                                            <ThemedText style={styles.sectionTitleHeaderPage2}>Достижения</ThemedText>
                                            <View style={styles.achievementsGridPage}>
                                                <AchievementRowPage icon={bubbleIcon} label="Пузыри" plays={hippo.gameStats.bubbleGamePlays} record={hippo.gameStats.bubbleGameRecord} />
                                                <AchievementRowPage icon={cardIcon} label="Память" plays={hippo.gameStats.memoryGamePlays} />
                                                <AchievementRowPage icon={diceIcon} label="Кубики" plays={hippo.gameStats.thirdGamePlays} />
                                                <AchievementRowPage icon={brainIcon} label="Всего игр" plays={hippo.gameStats.totalGamePlays} />
                                                <AchievementRowPage icon={moneyIcon} label="Заработано" plays={hippo.gameStats.totalCoinsEarned} />
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* HIPPO - FRONT LAYER */}
                    <Image source={hippoImg} style={styles.hippo} />
                </ImageBackground>

                {/* NAVIGATION ARROWS */}
                <NavigationArrows
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    canGoPrevious={currentPage > 0}
                    canGoNext={currentPage < 2}
                />
            </ImageBackground>

            {/* REWARDS MODAL */}
            <Modal visible={rewardsModalVisible} transparent animationType="fade" onRequestClose={() => setRewardsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <ImageBackground source={smallFrame} style={styles.modalFrame} resizeMode="stretch">
                        <View style={styles.modalContent}>
                            <ThemedText style={styles.modalTitle}>Награды</ThemedText>
                            <ThemedText style={styles.modalText}>Наград еще нет(((</ThemedText>
                            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setRewardsModalVisible(false)}>
                                <Image source={homeIcon} style={styles.modalCloseIcon} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
}

function StatRow({ icon, label, value, color }: any) {
    return (
        <View style={styles.statRow}>
            <Image source={icon} style={styles.rowIcon} />
            <View style={styles.rowInfo}>
                <ThemedText style={styles.rowLabel}>{label}</ThemedText>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
                </View>
            </View>
            <ThemedText style={styles.rowValue}>{value}%</ThemedText>
        </View>
    );
}

function ActivityRowPage({ icon, label, value }: any) {
    return (
        <View style={styles.activityRowPage}>
            <Image source={icon} style={styles.actIconPage} />
            <ThemedText style={styles.actLabelPage}>{label}</ThemedText>
            <ThemedText style={styles.actValuePage}>{value}</ThemedText>
        </View>
    );
}

function AchievementRowPage({ icon, label, plays, record }: any) {
    return (
        <View>
            <View style={styles.achievementRowPage}>
                <Image source={icon} style={styles.achievementIconPage} />
                <View style={styles.achievementTextContainer}>
                    <ThemedText style={styles.achievementLabelPage}>{label}</ThemedText>
                </View>
                <ThemedText style={styles.achievementValuePage}>{plays}</ThemedText>
            </View>
            {record !== undefined && (
                <View style={styles.achievementRecordRow}>
                    <Image source={successIcon} style={styles.recordIconPage} />
                    <View style={styles.achievementTextContainer}>
                        <ThemedText style={styles.achievementRecordLabelPage}>Рекорд</ThemedText>
                    </View>
                    <ThemedText style={styles.achievementRecordValuePage}>{record}</ThemedText>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    background: {
        flex: 1,
    },
    title: {
        paddingTop: 100,
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: -120,
        zIndex: 5,
    },
    mainFrame: {
        flex: 1,
        margin: 10,
        marginTop: 0,
    },
    frameContent: {
        flex: 1,
        padding: 50,
    },
    topSectionPage0: {
        flexDirection: 'column',
        gap: 8,
        marginBottom: 10,
        marginTop: 50,
    },
    rewardsBtnContainer: {
        alignSelf: 'flex-start',
    },
    rewardsBtnImage: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
        marginBottom: -40,
        marginLeft: 60,
        marginTop: -40,
    },
    infoBoxPage0: {
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
    },
    infoBoxContentPage0: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        gap: 20,
    },
    genderIconPage0: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    infoTextPage0: {
        color: '#7A4A1F',
        fontSize: 12,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    mainContent: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
    },
    fullWidthFrame: {
        flex: 1,
    },
    bigFrameBox: {
        flex: 1,
        padding: 8,
        marginBottom: 70,
        marginTop: -20,
    },
    bigFrameContent: {
        flex: 1,
        marginBottom: 5,
    },
    sectionTitleHeader: {
        color: '#FFE4A1',
        fontSize: 16,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    statsGrid: {
        flex: 1,
        justifyContent: 'space-around',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    rowIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    rowInfo: {
        flex: 1,
    },
    rowLabel: {
        color: '#7A4A1F',
        fontSize: 9,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    progressBar: {
        height: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: -5,
    },
    progressFill: {
        height: '100%',
    },
    rowValue: {
        color: '#1a1a1a',
        fontSize: 9,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        minWidth: 28,
        textAlign: 'right',
        marginLeft: 10,
        marginRight: 10,
    },
    //second page
    mediumFrameBoxPage: {
        flex: 1,
        padding: 12,
        marginBottom: 70,
        marginTop: 60,
    },
    mediumFrameContentPage: {
        flex: 1,
    },
    sectionTitleHeaderPage1: {
        color: '#FFE4A1',
        fontSize: 24,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 20,
        textAlign: 'center',
    },
    activityGridPage: {
        flex: 1,
        justifyContent: 'space-around',
    },
    activityRowPage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 0,
    },
    actIconPage: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
    },
    actLabelPage: {
        color: '#7A4A1F',
        fontSize: 16,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        flex: 1,
    },
    actValuePage: {
        color: '#1a1a1a',
        fontSize: 18,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginRight: 10,
    },
    //third page
    bigFrameBoxPage: {
        flex: 1,
        padding: 12,
        marginBottom: 70,
        marginTop: 90,
    },
    bigFrameContentPage: {
        flex: 1,
    },
    sectionTitleHeaderPage2: {
        color: '#FFE4A1',
        fontSize: 16,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    achievementsGridPage: {
        flex: 1,
        justifyContent: 'space-around',
    },
    achievementRowPageContainer: {
        marginVertical: 0,
    },
    achievementRowPage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    achievementIconPage: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
        marginTop: 2,
    },
    achievementTextContainer: {
        flex: 1,
    },
    achievementLabelPage: {
        color: '#7A4A1F',
        fontSize: 16,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginTop: 5,
    },
    achievementValuePage: {
        color: '#1a1a1a',
        fontSize: 18,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginTop: 5,
        marginRight: 10,
    },
    achievementRecordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 2,
        marginRight: 10,
    },
    recordIconPage: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
        marginBottom: 1,
        marginTop: 10,
    },
    achievementRecordLabelPage: {
        color: '#7A4A1F',
        fontSize: 16,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    achievementRecordValuePage: {
        color: '#1a1a1a',
        fontSize: 18,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    achievementRecordPage: {
        color: '#FFD700',
        fontSize: 12,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
    hippo: {
        position: 'absolute',
        bottom: -80,
        left: -20,
        width: 220,
        height: 220,
        resizeMode: 'contain',
        zIndex: 100,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalFrame: {
        width: '100%',
        aspectRatio: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingBottom: 30,
    },
    modalTitle: {
        color: '#7A4A1F',
        fontSize: 24,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalText: {
        color: '#7A4A1F',
        fontSize: 16,
        fontFamily: 'Comic Sans MS',
        marginBottom: 30,
    },
    modalCloseBtn: {
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCloseIcon: {
        width: 210,
        height: 210,
        resizeMode: 'contain',
    },
    closeBtn: {
        backgroundColor: '#A65437',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
    },
    closeBtnText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
    },
});
