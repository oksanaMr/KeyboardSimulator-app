import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/statistics.server';
import { UserStatistics } from 'src/app/userStatistics';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.html',
    styleUrls: ['./statistics.css']
})

export class StatisticsComponent implements OnInit {
    userStatistics: UserStatistics[] = [{ date: "12.03.19", id_exercise: '1', mistakes: "4", time: "12c", speed: "263 з/мин" },
    { date: "13.03.19", id_exercise: '1', mistakes: "4", time: "12c", speed: "263 з/мин" },
    { date: "19.05.19", id_exercise: '2', mistakes: "4", time: "15c", speed: "230 з/мин" },
    { date: "20.06.19", id_exercise: '3', mistakes: "3", time: "36c", speed: "180 з/мин" },
    { date: "31.07.19", id_exercise: '4', mistakes: "6", time: "32c", speed: "156 з/мин" },
    { date: "1.08.19", id_exercise: '5', mistakes: "8", time: "40c", speed: "56 з/мин" },
    { date: "5.09.19", id_exercise: '6', mistakes: "7", time: "10c", speed: "64 з/мин" },
    { date: "7.10.19", id_exercise: '7', mistakes: "1", time: "20c", speed: "100 з/мин" },
    { date: "10.11.19", id_exercise: '8', mistakes: "0", time: "25c", speed: "145 з/мин" },
    { date: "23.12.19", id_exercise: '9', mistakes: "2", time: "29c", speed: "233 з/мин" },
    { date: "23.12.19", id_exercise: '9', mistakes: "2", time: "29c", speed: "233 з/мин" },
    { date: "23.12.19", id_exercise: '9', mistakes: "2", time: "29c", speed: "233 з/мин" }];

    displayedColumns: string[] = ['date', 'id_exercise', 'mistakes', 'time', 'speed'];
    dataSource$: Observable<any>;

    userId;

    constructor(
        private router: Router,
        private statisticsService: StatisticsService,
        private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        this.userId = this.activateRoute.snapshot.params.id;
        this.dataSource$ =
            this.statisticsService.getStatisticByUserId(this.userId).pipe(
                map((statistics) => statistics.map(statistic => ({
                    mistakes: statistic.num_of_mistakes,
                    speed: `${statistic.speed} зн / мин`,
                    time: `${statistic.exercise_time} с`,
                    date: new Date(statistic.date),
                    id_exercise: statistic.exercise_id
                })))
            );
    }
}
