import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserStatistics } from './userStatistics';
import { Statistic } from '@app/model/statistic';

const BASE_PATH = 'http://localhost:8080/statistic';

@Injectable()
export class StatisticsService {

    constructor(private http: HttpClient) { }

    public getStatisticsUser(id: string) {
        return this.http.get<UserStatistics[]>('http://localhost:8080/getExerciseList/${id}');
    }


    saveStatistic(statistic: Statistic) {
        return this.http.post(BASE_PATH, statistic);
    }
}
