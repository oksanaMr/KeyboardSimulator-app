import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserStatistics } from './userStatistics';
import { Statistic } from '@app/model/statistic';
import { Observable } from 'rxjs';
import { AllStatistics } from './models/AllStatistics';

const BASE_PATH = 'http://localhost:8080/statistic';

@Injectable()
export class StatisticsService {

    constructor(private http: HttpClient) { }

    public getStatisticsUser(id: number) {
        return this.http.get<Statistic[]>(`${BASE_PATH}/${id}`);
    }


    saveStatistic(statistic: Statistic) {
        return this.http.post(BASE_PATH, statistic);
    }

    getStatisticByUserId(id: string) {
        return this.http.get<Statistic[]>(`${BASE_PATH}/${id}`);
    }

    public getAllStatistics(){
        return this.http.get<AllStatistics[]>(`${BASE_PATH}/statisticsAdmin`);
    }
}
