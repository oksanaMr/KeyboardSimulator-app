import { Exercise } from './exercise';

export interface Statistic {
    id?: number;
    exercise_time: number;
    num_of_mistakes: number;
    speed: number;
    date: number;
    exercise: Exercise;
}
