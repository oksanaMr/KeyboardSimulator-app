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
        4: false
    }

    id: number;

    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute){}

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
        for(let i = 1; i< 5; i++){
            this.kAreaMap[i] = false;
        };
        console.log(this.diff_id);
        this.exerciseService.getDiff(this.diff_id).subscribe(difficulty => this.difficulty = difficulty);
        this.exerciseService.getKeyboardArea(this.diff_id).subscribe(areas => {this.keyboardArea = areas;
            for(let i = 0; i< areas.length; i++){
                this.kAreaMap[areas[i].id] = true;
            }});
    }

    saveLevel(){
        if ( this.kAreaMap[1] == false && this.kAreaMap[2] == false && this.kAreaMap[3] == false && this.kAreaMap[4] == false){
            alert("Выберете хотя бы одну зону клавиатуры!");
        }
        else {
            this.keyboardArea = [];
            for(let i = 1; i< 5; i++){
                if(this.kAreaMap[i] == true){
                    this.keyboardArea.push(this.allKeyboardArea[i-1]);
                }
                else{
                    this.keyboardArea.push(this.keys);
                }
            };
            console.log(this.difficulty);
            console.log(this.keyboardArea);
            this.exerciseService.saveDiff(this.difficulty, this.keyboardArea[0],this.keyboardArea[1],this.keyboardArea[2],this.keyboardArea[3]).subscribe(difficulty => this.difficulty = difficulty);
        }
    }
}