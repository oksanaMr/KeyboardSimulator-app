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

    public getExerciseList(id_level: string): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${BASE_PATH}/${id_level}`);
    }

    public getExercise(id_exercise: string): Observable<Exercise> {
        return this.http.get<Exercise>(`${BASE_PATH}/getExercise/${id_exercise}`);
    }

    public getDiff(id: string) {
        return this.http.get<Dificulty>(`${BASE_PATH_DIFF}/${id}`);
    }
}
