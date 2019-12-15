import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/user';
import { ExerciseService } from 'src/app/exercise.service';
import { Exercise } from '@app/model/exercise';
import { AuthorizationsService } from 'src/app/authorization.service';
import { Observable } from 'rxjs';
import { mergeMap, mergeMapTo } from 'rxjs/operators';

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
        private router: Router,
        public route: ActivatedRoute,
        public userService: AuthorizationsService,
        public exerciseService: ExerciseService) { }


    ngOnInit() {
        const userId = this.route.snapshot.params.id;
        this.userService.getUser(userId).subscribe(user => {
            this.user = user;
        });
        console.log(userId);
        this.exerciseList$ =
            this.userService.getUser(userId).pipe(mergeMap(user =>
                this.exerciseService.getExerciseList(user.diff_id))
            );
    }

    selectExercise() {
        if (this.exercise != "") {
            this.router.navigate(['/do-exercise', this.exercise]);
        }
    }

    link1(){
        this.router.navigate(['/profile', this.user.id]);
    }

    link2(){
        this.router.navigate(['/exercise', this.user.id]);
    }

    link3(){
        this.router.navigate(['/profile', this.user.id]);
    }

}