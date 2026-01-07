export type RootStackParamList = {
    onboarding: undefined;
    main: undefined;
    hippoDetail: { hippoId: string };
    settings: undefined;
    feeding: undefined;
    cleaning: undefined;
    playing: undefined;
};

export type HippoStats = {
    health: number;
    hunger: number;
    happiness: number;
    cleanliness: number;
    energy: number;
};

export interface Hippo {
    id: string;
    name: string;
    age: number;
    stats: HippoStats;
    createdAt: Date;
}