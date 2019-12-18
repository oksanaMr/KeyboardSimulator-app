import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/statistics.server';
import { MatRadioChange, MatTableDataSource } from '@angular/material';
import { ChartEvent } from 'angular-google-charts';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.html',
    styleUrls: ['./statistics.css']
})

export class StatisticsAdminComponent implements OnInit{

    @ViewChild('chart', {static: false})
    chart: GoogleChartComponent;

    displayedColumns: string[] = ['id_exercise','done', 'mistakes','time','speed'];
    dataSource;

    levels: string[] = ['Таблица','График']
    selectLevel = 'Таблица';
    condition : boolean = true;

    title = 'Статистика';
    type = 'LineChart';
    dataDone = [];
    dataMistakes = [];
    dataTime = [];
    dataSpeed = [];
    /*[
    ['1',789,8,10,56],
    ['2',456,1,36,233],
    ['3',32,2,15,180],
    ['4',896,6,40,64],
    ['5',123,5,19,100],
    ['6',412,7,50,145],
    ['7',663,4,45,156],
    ['8',23,5,39,256],
    ];*/
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
    width = 750;
    height = 550;

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