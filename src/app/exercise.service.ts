import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

import { Exercise } from '@app/model/exercise';
import { Dificulty } from './models/dificulty';
import { KeyboardArea } from './models/keyboardArea';

const BASE_PATH = 'http://localhost:8080/exercise';
const BASE_PATH_DIFF = 'http://localhost:8080/dificulty_lvl';
const BASE_PATH_AREA = 'http://localhost:8080/keyboard_area';
const BASE_PATH_DIFFKEY = 'http://localhost:8080/diff_key';

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
        if (textE == ""){textE =" "}
        return this.http.get<Exercise>(`${BASE_PATH}/newExercise/${textF}/${textE}/${diff_id}`);
    }

    public getKeyboardArea(diff_id: number){
        return this.http.get<KeyboardArea[]>(`http://localhost:8080/diff_key/getZone/${diff_id}`);
    }

    public saveDiff(diff_id: number, title: string, max_length: number, min_length: number, mistakes: number, 
        pressing_time:number, kArea1: number, kArea2: number, kArea3: number, kArea4: number, kArea5: number){
        return this.http.get<Dificulty>(`${BASE_PATH_DIFFKEY}/setdif/${diff_id}/${title}/${max_length}/${min_length}/
            ${mistakes}/${pressing_time}/${kArea1}/${kArea2}/${kArea3}/${kArea4}/${kArea5}`);
    }

    public getAllKeyboardArea(){
        return this.http.get<KeyboardArea[]>(`${BASE_PATH_AREA}`);
    }
}
