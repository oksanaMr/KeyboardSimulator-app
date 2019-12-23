import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/statistics.server';
import { UserStatistics } from 'src/app/userStatistics';
import { AuthorizationsService } from 'src/app/authorization.service';
import { User } from 'src/app/user';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.html',
    styleUrls: ['./statistics.css']
})

export class StatisticsComponent implements OnInit {

    displayedColumns: string[] = ['date', 'id_exercise', 'mistakes', 'time', 'speed'];
    dataSource$: Observable<any>;
    user: User;

    constructor(
        private router: Router,
        private statisticsService: StatisticsService,
        public authorizationsService: AuthorizationsService,
        private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        this.dataSource$ = this.activateRoute.paramMap.pipe(
            map(paramMap => paramMap.get('id')),
            switchMap(id => this.statisticsService.getStatisticByUserId(id)),
            map((statistics) => statistics.map(statistic => ({
                mistakes: statistic.num_of_mistakes,
                speed: `${statistic.speed} зн / мин`,
                time: `${statistic.exercise_time} с`,
                date: new Date(statistic.date),
                id_exercise: statistic.exercise_id
            })))
        );
        const userId = this.activateRoute.snapshot.params.id;
        this.authorizationsService.getUser(userId).subscribe(user => {
            this.user = user;
        });
    }
}