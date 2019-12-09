import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable()
export class ExerciseService {

    constructor(private http: HttpClient) { }

    public getExerciseList(id_level:string) {
        return this.http.get('http://localhost:8080/getExerciseList/${id_level}');
    }

    public getExercise(id_exercise:string) {
        return this.http.get<User>('http://localhost:8080/getExercise/${id_exercise}');
    }
}    