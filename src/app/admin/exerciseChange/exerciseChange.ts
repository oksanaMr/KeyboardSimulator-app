import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/exercise.service';
import { Exercise } from '@app/model/exercise';
import { MatRadioChange } from '@angular/material';

@Component({
    selector: 'app-exerciseChange',
    templateUrl: './exerciseChange.html',
    styleUrls: ['./exerciseChange.css']
})

export class ExerciseChangeComponent{

    levels: string[] = ['Легкий','Средний','Сложный']
    selectLevel = 'Легкий';
    exercise : Exercise;
    flag : boolean;

    diffIdMap = {
        1: this.levels[0],
        2: this.levels[1],
        3: this.levels[2]
    };


    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private exerciseService : ExerciseService){}

    ngOnInit(){
        const id = this.activateRoute.snapshot.params['id'];
        if(id == 0){
            this.flag = false;
        }
        else {
            this.exerciseService.getExercise(id).subscribe(exercise => this.exercise = exercise);
            this.flag = true;
            this.selectLevel = this.diffIdMap[this.exercise.diff_id];
        }
    }

    generateExercise(){
        this.exerciseService.generateExercise(this.exercise).subscribe(exercise => this.exercise = exercise);
    }

    saveExercise(){
        if(this.flag){
            this.exerciseService.newExercise(this.exercise).subscribe(exercise => this.exercise = exercise);
        }
        else{
            this.exerciseService.saveExercise(this.exercise).subscribe(exercise => this.exercise = exercise);
        }
    }

    changeLevel($event: MatRadioChange, i: number) {
        this.exercise.diff_id = i + 1;
    }
}