import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-difficultyLevelChange',
    templateUrl: './difficultyLevelChange.html',
    styleUrls: ['./difficultyLevelChange.css']
})

export class DifficultyLevelChangeComponent{

    levels: string[] = ['Легкий','Средний','Сложный']
    selectLevel = 'Легкий';

    area1 = true;
    area2= false;
    area3= false;
    area4= false;

    id: number;

    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute){}

    ngOnInit(){
        this.id = this.activateRoute.snapshot.params['id'];
        //this.authorizationsService.getUsers().subscribe(users => this.users = users);
    }
}
