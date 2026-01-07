// context/HippoContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hippo, HippoContextType, HippoStats } from '@/types/hippo';

const HippoContext = createContext<HippoContextType | undefined>(undefined);

const initialStats: HippoStats = {
    health: 100,
    hunger: 50,
    happiness: 70,
    cleanliness: 60,
    energy: 80,
};

const initialHippo: Hippo = {
    id: '1',
    name: 'Hippo',
    age: 1,
    stats: initialStats,
    createdAt: new Date(),
    lastFed: new Date(),
    lastCleaned: new Date(),
    lastPlayed: new Date(),
};

export function HippoProvider({ children }: { children: React.ReactNode }) {
    const [hippo, setHippo] = useState<Hippo | null>(initialHippo);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

    // Обновление статистик со временем (имитация)
    useEffect(() => {
        const interval = setInterval(() => {
            if (hippo) {
                setHippo(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        stats: {
                            health: Math.max(0, prev.stats.health - 0.1),
                            hunger: Math.min(100, prev.stats.hunger + 0.2),
                            happiness: Math.max(0, prev.stats.happiness - 0.1),
                            cleanliness: Math.max(0, prev.stats.cleanliness - 0.15),
                            energy: Math.min(100, prev.stats.energy + 0.1),
                        },
                    };
                });
            }
        }, 30000); // Каждые 30 секунд

        return () => clearInterval(interval);
    }, [hippo]);

    const updateStats = (newStats: Partial<HippoStats>) => {
        if (!hippo) return;

        setHippo(prev => prev ? {
            ...prev,
            stats: {
                ...prev.stats,
                ...newStats,
                // Ограничиваем значения 0-100
                health: Math.max(0, Math.min(100, newStats.health ?? prev.stats.health)),
                hunger: Math.max(0, Math.min(100, newStats.hunger ?? prev.stats.hunger)),
                happiness: Math.max(0, Math.min(100, newStats.happiness ?? prev.stats.happiness)),
                cleanliness: Math.max(0, Math.min(100, newStats.cleanliness ?? prev.stats.cleanliness)),
                energy: Math.max(0, Math.min(100, newStats.energy ?? prev.stats.energy)),
            }
        } : null);
    };

    const feed = () => {
        updateStats({
            hunger: Math.max(0, (hippo?.stats.hunger || 0) - 30),
            happiness: Math.min(100, (hippo?.stats.happiness || 0) + 10),
            energy: Math.min(100, (hippo?.stats.energy || 0) + 5),
        });
    };

    const clean = () => {
        updateStats({
            cleanliness: Math.min(100, (hippo?.stats.cleanliness || 0) + 40),
            happiness: Math.min(100, (hippo?.stats.happiness || 0) + 5),
        });
    };

    const play = () => {
        updateStats({
            happiness: Math.min(100, (hippo?.stats.happiness || 0) + 20),
            energy: Math.max(0, (hippo?.stats.energy || 0) - 25),
            hunger: Math.min(100, (hippo?.stats.hunger || 0) + 10),
        });
    };

    const sleep = () => {
        updateStats({
            energy: Math.min(100, (hippo?.stats.energy || 0) + 50),
            health: Math.min(100, (hippo?.stats.health || 0) + 5),
        });
    };

    const resetHippo = () => {
        setHippo(initialHippo);
    };

    const completeOnboarding = (name: string) => {
        setHippo(prev => prev ? { ...prev, name } : prev);
        setHasCompletedOnboarding(true);
    };

    return (
        <HippoContext.Provider value={{
            hippo,
            setHippo,
            updateStats,
            feed,
            clean,
            play,
            sleep,
            resetHippo,
            hasCompletedOnboarding,
            completeOnboarding,
        }}>
            {children}
        </HippoContext.Provider>
    );
}

export function useHippo() {
    const context = useContext(HippoContext);
    if (context === undefined) {
        throw new Error('useHippo must be used within a HippoProvider');
    }
    return context;
}