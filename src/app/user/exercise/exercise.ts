import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { ExerciseService } from 'src/app/exercise.service';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.html',
    styleUrls: ['./exercise.css']
})

export class ExerciseComponent {
    user: User;
    exerciseList = ["123", "156", "456", "789", "785", "458"];
    exercise = "";

    constructor(
        public router: Router,
        public exerciseService: ExerciseService) { }


    ngOnInit() {
        //this.exerciseService.getExerciseList(this.user.id_level).subscribe(id=> this.exerciseList = id);
    }

    selectExercise() {
        if (this.exercise != "") {
            this.router.navigate(['/do-exercise', this.exercise]);
            //this.router.navigate(['/doExercise/exercise']);
        }
    }

}