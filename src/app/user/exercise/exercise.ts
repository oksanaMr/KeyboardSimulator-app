import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { ExerciseService } from 'src/app/exercise.service';
import { Exercise } from '@app/model/exercise';
import { AuthorizationsService } from 'src/app/authorization.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.html',
    styleUrls: ['./exercise.css']
})

export class ExerciseComponent implements OnInit {
    user: User;
    exerciseList$: Observable<Exercise[]>;
    exercise = "";

    constructor(
        public router: Router,
        public userService: AuthorizationsService,
        public exerciseService: ExerciseService) { }


    ngOnInit() {
        this.exerciseList$ = this.userService.currentUser$.pipe(
            mergeMap(user => this.exerciseService.getExerciseList(user.diff_id))
        );
    }

    selectExercise() {
        if (this.exercise != "") {
            this.router.navigate(['/do-exercise', this.exercise]);
        }
    }

}