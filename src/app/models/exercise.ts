import { Dificulty } from './dificulty';

export interface Exercise {
    id: number;
    textF: string;
    textE: string;
    dificulty_lvl: Dificulty;
}

export interface MappedExercise {
    text: string;
    maxMistakes: number;
    pressingTime: number;
}