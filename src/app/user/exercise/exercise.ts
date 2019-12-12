import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { ExerciseService } from 'src/app/exercise.service';
import { Exercise } from '@app/model/exercise';
import { AuthorizationsService } from 'src/app/authorization.service';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.html',
    styleUrls: ['./exercise.css']
})

export class ExerciseComponent implements OnInit {
    user: User;
    exerciseList: Exercise[];
    exercise = "";

    constructor(
        public router: Router,
        public userService: AuthorizationsService,
        public exerciseService: ExerciseService) { }


    ngOnInit() {
        this.exerciseService.getExerciseList(this.userService.currentUser.dif_id).subscribe(exercies => this.exerciseList = exercies);
    }

    selectExercise() {
        if (this.exercise != "") {
            this.router.navigate(['/do-exercise', this.exercise]);
        }
    }

}