import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStatistics } from './userStatistics';


@Injectable()
export class StatisticsService {

    constructor(private http: HttpClient) { }

    public getStatisticsUser(id: string) {
        return this.http.get<UserStatistics[]>('http://localhost:8080/getExerciseList/${id}');
    }

}    