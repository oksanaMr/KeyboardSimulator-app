import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsService } from 'src/app/statistics.server';
import { MatRadioChange, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.html',
    styleUrls: ['./statistics.css']
})

export class StatisticsAdminComponent{
    userStatistics  = [{done: "1256", id_exercise: '1', mistakes: "4", time: "12c", speed: "263 з/мин"},
    {done: "1568", id_exercise: '1', mistakes: "4", time: "12c", speed: "263 з/мин"},
    {done: "459", id_exercise: '2', mistakes: "4", time: "15c", speed: "230 з/мин"},
    {done: "7895", id_exercise: '3', mistakes: "3", time: "36c", speed: "180 з/мин"},
    {done: "789", id_exercise: '4', mistakes: "6", time: "32c", speed: "156 з/мин"},
    {done: "6321", id_exercise: '5', mistakes: "8", time: "40c", speed: "56 з/мин"},
    {done: "987", id_exercise: '6', mistakes: "7", time: "10c", speed: "64 з/мин"},
    {done: "985", id_exercise: '7', mistakes: "1", time: "20c", speed: "100 з/мин"},
    {done: "7412", id_exercise: '8', mistakes: "0", time: "25c", speed: "145 з/мин"},
    {done: "9632", id_exercise: '9', mistakes: "2", time: "29c", speed: "233 з/мин"},
    {done: "7852", id_exercise: '9', mistakes: "2", time: "29c", speed: "233 з/мин"},
    {done: "7896", id_exercise: '9', mistakes: "2", time: "29c", speed: "233 з/мин"}];

    displayedColumns: string[] = ['id_exercise','done', 'mistakes','time','speed'];
    dataSource;

    levels: string[] = ['Таблица','График']
    selectLevel = 'Таблица';
    condition : boolean = true;

    title = 'Статистика';
    type = 'LineChart';
    data =
    [
        ['1',789,8,10,56],
        ['2',456,1,36,233],
        ['3',32,2,15,180],
        ['4',896,6,40,64],
        ['5',123,5,19,100],
        ['6',412,7,50,145],
        ['7',663,4,45,156],
        ['8',23,5,39,256],
    ];
    columnNames = ['Упражнение','Выполнено','Ошибки','Время','Скорость'];
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
        this.statisticsService.getAllStatistics().subscribe(userStatistics => {this.dataSource = new MatTableDataSource(userStatistics)});
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