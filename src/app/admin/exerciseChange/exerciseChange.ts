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

export class ExerciseChangeComponent implements OnInit{

    levels: string[] = ['Легкий','Средний','Сложный']
    selectLevel = 'Легкий';
    exercise : Exercise;
    flag : boolean;
    text : string;

    diffIdMap = {
        1: this.levels[0],
        2: this.levels[1],
        3: this.levels[2]
    };

    id:number;

    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private exerciseService : ExerciseService){}

    ngOnInit(){
        this.id = this.activateRoute.snapshot.params['id'];
        if(this.id == 0){
            this.flag = false;
            this.exercise.diff_id = 1;
        }
        else {
            this.exerciseService.getExercise(this.id).subscribe(exercise => {this.exercise = exercise;
                this.selectLevel = this.diffIdMap[exercise.diff_id];
                this.text = exercise.textF + exercise.textE;} );        
            this.flag = true;
        }
    }

    generateExercise(){
        this.exerciseService.generateExercise(this.exercise.diff_id).subscribe(exercise => {
        this.text = exercise.textF + exercise.textE;
        this.exercise.textF = exercise.textF;
        this.exercise.textE = exercise.textE;
        console.log(this.exercise);});
    }

    saveExercise(){
        if(this.text.length > 255){
            this.exercise.textF= this.text.substr(0,255);
            this.exercise.textE = this.text.substr(255,this.text.length);
        }
        else {
            this.exercise.textF = this.text;
        }
        if(!this.flag){
            this.exerciseService.newExercise(this.exercise.diff_id,this.exercise.textF, this.exercise.textE).subscribe(exercise => this.exercise = exercise);
        }
        else{
            this.exerciseService.saveExercise(this.exercise).subscribe(exercise => this.exercise = exercise);
        }
    }

    changeLevel($event: MatRadioChange, i: number) {
        this.exercise.diff_id = i + 1;
        console.log(this.exercise);
    }
}