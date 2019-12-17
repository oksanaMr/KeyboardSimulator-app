import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

import { Exercise } from '@app/model/exercise';
import { Dificulty } from './models/dificulty';

const BASE_PATH = 'http://localhost:8080/exercise';
const BASE_PATH_DIFF = 'http://localhost:8080/dificulty_lvl';

@Injectable()
export class ExerciseService {

    constructor(private http: HttpClient) { }

    public getExerciseList(id_level: number): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${BASE_PATH}/${id_level}`);
    }

    public getExercise(id_exercise: number): Observable<Exercise> {
        return this.http.get<Exercise>(`${BASE_PATH}/getExercise/${id_exercise}`);
    }

    public getDiff(id: number) {
        return this.http.get<Dificulty>(`${BASE_PATH_DIFF}/${id}`);
    }

    public getAllExercise(){
        return this.http.get<Exercise[]>(`${BASE_PATH}`);
    }

    public deleteExercise(id:number){
        return this.http.delete<Exercise[]>(`${BASE_PATH}/${id}`);
    }

    public generateExercise(diff_id: number){
        return this.http.post<Exercise>(`${BASE_PATH}/generate`,diff_id);
    }

    public saveExercise(exercise: Exercise){
        return this.http.put<Exercise>(`${BASE_PATH}`,exercise);
    }

    public newExercise(textF: string, textE: string, diff_id: number){
        const body = { textF: textF, textE : textE, diff_id: diff_id};
        return this.http.post<Exercise>(`${BASE_PATH}/newExercise`,body);
    }
}
