import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/exercise.service';
import { Dificulty } from '@app/model/dificulty';
import { KeyboardArea } from '@app/model/keyboardArea';
import { MatRadioChange } from '@angular/material';

@Component({
    selector: 'app-difficultyLevelChange',
    templateUrl: './difficultyLevelChange.html',
    styleUrls: ['./difficultyLevelChange.css']
})

export class DifficultyLevelChangeComponent{

    levels: string[] = ['Легкий','Средний','Сложный']
    selectLevel = 'Легкий';
    diff_id: number;
    difficulty: Dificulty
    keyboardArea: KeyboardArea[] = [];
    allKeyboardArea: KeyboardArea[];
    keys: KeyboardArea = {
        id: 0,
        description: " "
    }

    kAreaMap = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
    }

    id: number;

    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private exerciseService: ExerciseService){}

    ngOnInit(){
        this.id = this.activateRoute.snapshot.params['id'];
        this.exerciseService.getDiff(1).subscribe(difficulty => this.difficulty = difficulty);
        this.exerciseService.getKeyboardArea(1).subscribe(areas => {this.keyboardArea = areas;
            for(let i = 0; i< areas.length; i++){
                this.kAreaMap[areas[i].id] = true;
            }});
        this.exerciseService.getAllKeyboardArea().subscribe(allArea => this.allKeyboardArea = allArea);
    }

    changeLevel($event: MatRadioChange, i: number) {
        this.diff_id = i+1;
        for(let i = 1; i< 6; i++){
            this.kAreaMap[i] = false;
        };
        this.exerciseService.getDiff(this.diff_id).subscribe(difficulty => this.difficulty = difficulty);
        this.exerciseService.getKeyboardArea(this.diff_id).subscribe(areas => {this.keyboardArea = areas;
            for(let i = 0; i< areas.length; i++){
                this.kAreaMap[areas[i].id] = true;
            }});
    }

    saveLevel(){
        if ( this.kAreaMap[1] == false && this.kAreaMap[2] == false && this.kAreaMap[3] == false && this.kAreaMap[4] == false 
            && this.kAreaMap[5] == false){
            alert("Выберете хотя бы одну зону клавиатуры!");
        }
        else {
            this.keyboardArea = [];
            for(let i = 1; i< 6; i++){
                if(this.kAreaMap[i] == true){
                    this.keyboardArea.push(this.allKeyboardArea[i-1]);
                }
                else{
                    this.keyboardArea.push(this.keys);
                }
            };
            this.exerciseService.saveDiff(this.difficulty.id, this.difficulty.title, this.difficulty.max_length,
                this.difficulty.min_length, this.difficulty.max_num_of_mistakes, this.difficulty.pressing_time,
                this.keyboardArea[0].id, this.keyboardArea[1].id, this.keyboardArea[2].id, this.keyboardArea[3].id, this.keyboardArea[4].id)
                 .subscribe(difficulty => {this.difficulty = difficulty;
                    alert("Уровень сложности успешно сохранен");},
                    error => alert("Ошибка соединения с сервером")
                    );
        }
    }
}