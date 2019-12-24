import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/statistics.server';
import { UserStatistics } from 'src/app/userStatistics';
import { AuthorizationsService } from 'src/app/authorization.service';
import { User } from 'src/app/user';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Statistic } from '@app/model/statistic';
import { ExerciseService } from 'src/app/exercise.service';
import { Exercise } from '@app/model/exercise';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.html',
    styleUrls: ['./statistics.css']
})

export class StatisticsComponent implements OnInit {

    displayedColumns: string[] = ['date', 'exercise_id', 'mistakes', 'time', 'speed'];
    dataSource: Statistic[];
    user: User;
    exerciseMap: Map<number,number>  = new Map();
    diffMap: Map<number,number> = new Map();
    diff_id: number;

    constructor(
        private router: Router,
        private statisticsService: StatisticsService,
        public authorizationsService: AuthorizationsService,
        public exerciseService: ExerciseService,
        private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        const userId = this.activateRoute.snapshot.params.id;
        this.exerciseService.getDiff(1).subscribe(diff => this.diffMap.set(diff.id, diff.max_num_of_mistakes));
        this.exerciseService.getDiff(2).subscribe(diff => this.diffMap.set(diff.id, diff.max_num_of_mistakes));
        this.exerciseService.getDiff(3).subscribe(diff => this.diffMap.set(diff.id, diff.max_num_of_mistakes));
        this.statisticsService.getStatisticByUserId(userId).subscribe(statistics => {this.dataSource = statistics;
        for(let i=0; i< this.dataSource.length; i++){
            this.exerciseService.getExercise(this.dataSource[i].exercise_id).subscribe(exercise => {this.exerciseMap.set(this.dataSource[i].exercise_id, this.diffMap.get(exercise.diff_id));
            console.log(this.exerciseMap)});
        }});
        

        /*this.dataSource$ = this.activateRoute.paramMap.pipe(
            map(paramMap => paramMap.get('id')),
            switchMap(id => this.statisticsService.getStatisticByUserId(id)),
            map((statistics) => statistics.map(statistic => ({
                mistakes: statistic.num_of_mistakes,
                speed: `${statistic.speed} зн / мин`,
                time: `${statistic.exercise_time} с`,
                date: new Date(statistic.date),
                id_exercise: statistic.exercise_id
            })))
        );*/
       // const userId = this.activateRoute.snapshot.params.id;
        this.authorizationsService.getUser(userId).subscribe(user => {
            this.user = user;
        });
    }
}