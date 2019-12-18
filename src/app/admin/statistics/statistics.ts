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
    data = [];
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
    columnNames = ['Упражнение','Выполнено','Ошибки','Время','Скорость'];
    options = {
        hAxis : {
            title : 'Упражнение'
        },
        vAxis : {
            title : 'Значения'
        },
        colors: ['#0000FF', '#009900', '#CC0000', '#DD9900'],

    };
    width = 750;
    height = 550;

    view = [1,2,3,4];
    defaultColors = ['#0000FF', '#009900', '#CC0000', '#DD9900'];

    constructor(
        private router: Router,
        private statisticsService: StatisticsService,
        private activateRoute: ActivatedRoute){}

    ngOnInit(){
        this.statisticsService.getAllStatistics().subscribe(userStatistics => {this.dataSource = new MatTableDataSource(userStatistics);
        for(let i=0; i< userStatistics.length; i++){
            this.data.push(Object.values(userStatistics[i]));
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

    onSelect($event: ChartEvent){
        console.log($event);
        if($event.row == null){
            console.log($event.row == null);
            if($event.column == this.view[$event.column - 1]){
                console.log($event.column == this.view[$event.column - 1]);
                this.view[$event.column - 1] = null;
                console.log(this.view[$event.column - 1]);
                this.options.colors[$event.column - 1] = '#CCCCCC';
                console.log(this.options.colors[$event.column - 1]);
                const wrapper = this.chart.wrapper;
                wrapper.setView("0");
                wrapper.draw(document.getElementById('charts'));
            }
            else{
                this.view[$event.column - 1] = $event.column;
                this.options.colors[$event.column - 1] = this.defaultColors[$event.column - 1];
                const wrapper = this.chart.wrapper;
                wrapper.draw(document.getElementById('charts'));
            }
        }
    }
}