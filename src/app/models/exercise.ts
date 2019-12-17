import { Dificulty } from './dificulty';

export class Exercise {
    id: number;
    textF: string;
    textE: string;
    diff_id: number;
    dificulty_lvl: Dificulty;
}

export interface MappedExercise {
    text: string;
    maxMistakes: number;
    pressingTime: number;
}