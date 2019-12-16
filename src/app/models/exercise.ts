import { Dificulty } from './dificulty';

export interface Exercise {
    id: number;
    textF: string;
    textE: string;
    diff_id: number;
    dificulty_lvl: Dificulty;
    text: string;
}

export interface MappedExercise {
    text: string;
    maxMistakes: number;
    pressingTime: number;
}