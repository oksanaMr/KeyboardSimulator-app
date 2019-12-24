import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/statistics.server';
import { MatRadioChange, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.html',
    styleUrls: ['./statistics.css']
})

export class StatisticsAdminComponent implements OnInit{

    displayedColumns: string[] = ['id_exercise','done', 'mistakes','time','speed'];
    dataSource;

    levels: string[] = ['Таблица','Графики']
    selectLevel = 'Таблица';
    condition : boolean = true;

    title = 'Статистика';
    type = 'LineChart';

    dataDone = [];
    dataMistakes = [];
    dataTime = [];
    dataSpeed = [];

    columnNames1 = ['Упражнение','Выполнено'];
    columnNames2 = ['Упражнение','Ошибки'];
    columnNames3 = ['Упражнение','Время'];
    columnNames4 = ['Упражнение','Скорость'];
    options = {
        hAxis : {
            title : 'Упражнение'
        },
        vAxis : {
            title : 'Значения'
        },
    };
    width = 700;
    height = 400;

    constructor(
        private router: Router,
        private statisticsService: StatisticsService,
        private activateRoute: ActivatedRoute){}

    ngOnInit(){
        this.statisticsService.getAllStatistics().subscribe(userStatistics => {this.dataSource = new MatTableDataSource(userStatistics);
        for(let i=0; i< userStatistics.length; i++){
            this.dataDone.push([userStatistics[i].id,userStatistics[i].count]);
            this.dataMistakes.push([userStatistics[i].id,userStatistics[i].num_of_mistakes]);
            this.dataTime.push([userStatistics[i].id,userStatistics[i].exercise_time]);
            this.dataSpeed.push([userStatistics[i].id,userStatistics[i].speed]);
        }});
    }

    changeLevel($event: MatRadioChange){
        if($event.value == this.levels[0]){
            this.condition = true;
        }
        else {
            this.condition = false;
        }
    }
}