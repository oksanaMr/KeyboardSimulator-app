import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

import { Exercise } from '@app/model/exercise';


@Injectable()
export class ExerciseService {

    constructor(private http: HttpClient) { }

    public getExerciseList(id_level: string) {
        return this.http.get('http://localhost:8080/getExerciseList/${id_level}');
    }

    public getExercise(id_exercise: string): Observable<Exercise> {
        return this.http.get<Exercise>('http://localhost:8080/getExercise/${id_exercise}');
    }
}
