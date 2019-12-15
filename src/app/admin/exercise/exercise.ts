import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/exercise.service';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.html',
    styleUrls: ['./exercise.css']
})

export class ExerciseAdminComponent{
    exerciseData = [{id: '1'},
    {id: '16'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
    {id: '9'},
    {id: '10'},
    {id: '33'}];

    displayedColumns: string[] = ['exercise', 'edit', 'delete'];
    dataSource = this.exerciseData;

    constructor(
        private router: Router,
        private exerciseService: ExerciseService,
        private activateRoute: ActivatedRoute){}

    ngOnInit(){
    //const id = this.activateRoute.snapshot.params['id'];
    //this.exerciseService.getExercises().subscribe(exerciseData => this.exerciseData = exerciseData);
    }

    editExercise(id: string){

    }

    deteleExercise(id: string){

    }
}