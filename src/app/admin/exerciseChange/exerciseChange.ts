import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-exerciseChange',
    templateUrl: './exerciseChange.html',
    styleUrls: ['./exerciseChange.css']
})

export class ExerciseChangeComponent{

    levels: string[] = ['Легкий','Средний','Сложный']
    selectLevel = 'Легкий';

    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute){}

    ngOnInit(){
        //const id = this.activateRoute.snapshot.params['id'];
        //this.authorizationsService.getUsers().subscribe(users => this.users = users);
    }
}