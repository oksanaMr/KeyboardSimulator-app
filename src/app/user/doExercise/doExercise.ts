import { Observable, interval, Subscription, fromEvent, timer, combineLatest, of } from 'rxjs';
import { shareReplay, takeWhile, switchMap, mapTo, scan, startWith, map, withLatestFrom, switchMapTo, tap } from 'rxjs/operators';
import { OnInit, OnDestroy, ViewEncapsulation, Component, HostListener } from '@angular/core';
import Keyboard from 'simple-keyboard';

import { KeyboardTrain } from '@app/model/keyboard-train';
import { keyboardSettings } from './keyboard-layout';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ExerciseService } from 'src/app/exercise.service';
import { Exercise, MappedExercise } from '@app/model/exercise';
import { MatDialog } from '@angular/material';
import { TrainResultComponent } from './train-result/train-result.component';

@Component({
    selector: 'app-do-exercise',
    templateUrl: './do-exercise.component.html',
    styleUrls: ['./do-exercise.component.scss', '../../../../node_modules/simple-keyboard/build/css/index.css'],
    encapsulation: ViewEncapsulation.None,
})
export class DoExerciseComponent implements OnInit, OnDestroy {
    readonly pattern = `съешь еще этих мягких французских булок да выпей чаю`;
    isStarted = false;

    keyPress$: Observable<any>;

    lastKeyPress$: Observable<any>;

    secondGenerator$ = interval(1000);
    secondCounter$: Observable<any>;
    keyPressCount$: Observable<any>;
    average$: Observable<any>;
    subscription$: Subscription;

    keyboard: Keyboard;
    exercise: Exercise;
    mappedExercise: MappedExercise;
    showKeyboard = true;

    keyboardTrain = new KeyboardTrain(this.pattern);

    @HostListener('document:keydown.shift') shiftDown() {
        this.keyboard.setOptions({
            layoutName: 'shift'
        });
    }

    @HostListener('document:keyup.shift') shiftUp() {
        this.keyboard.setOptions({
            layoutName: 'default'
        });
    }


    constructor(
        private router: ActivatedRoute,
        private route: Router,
        public dialog: MatDialog,
        private exerciseService: ExerciseService
    ) { }

    ngOnInit() {
        this.router.paramMap.pipe(
            map(paramMap => paramMap.get('id')),
            tap(console.log),
            switchMap(id => of({
                id: 1,
                dificulty_lvl: {
                    id: 1,
                    max_length: 2,
                    max_num_of_mistakes: 5,
                    min_length: 1,
                    pressing_time: 10, // рассчитываю, что это секунды
                    title: ''
                },
                textF: 'съешь еще этих мягких ',
                textE: ' французских булок да выпей чаю'
            } as Exercise)),
            // когда будет готов сервер, раскоментируйте и закомент. строчку выше
            // switchMap(id => this.exerciseService.getExercise(id)),
            tap(exercise => this.exercise = exercise),
            map(exercise => ({
                text: exercise.textF + exercise.textE,
                maxMistakes: exercise.dificulty_lvl.max_num_of_mistakes,
                pressingTime: exercise.dificulty_lvl.pressing_time * 1000
            }))
        ).subscribe((mappedExercise: MappedExercise) => {

            this.keyboard = new Keyboard({
                physicalKeyboardHighlight: true,
                ...keyboardSettings
            });

            this.mappedExercise = mappedExercise;

            this.keyboardTrain = new KeyboardTrain(
                mappedExercise.text,
                mappedExercise.maxMistakes
            );
        });
    }

    handleStartClick() {
        this.isStarted = true;
        this.initObservables();
    }

    handleStopClick() {
        this.keyboardTrain.stop();
    }

    private initObservables() {
        this.keyPress$ = fromEvent(document, 'keypress').pipe(
            shareReplay(1),
            takeWhile(_ => !this.keyboardTrain.done)
        );


        this.lastKeyPress$ = this.keyPress$.pipe(
            switchMap(() => timer(this.exercise.dificulty_lvl.pressing_time * 1000)),
            takeWhile(_ => !this.keyboardTrain.done)
        );

        this.secondGenerator$ = interval(1000);
        this.secondCounter$ = this.secondGenerator$.pipe(
            mapTo(1),
            scan((acc, curr) => acc + curr, 0),
            startWith(0),
            takeWhile(_ => !this.keyboardTrain.done)
        );
        this.keyPressCount$ = this.keyPress$.pipe(
            mapTo(1),
            scan((acc, curr) => acc + curr, 0),
            startWith(0),
            shareReplay(1),
            takeWhile(_ => !this.keyboardTrain.done)
        );
        this.average$ = combineLatest(
            this.secondCounter$,
            this.keyPressCount$
        ).pipe(
            map(([secondCounter, keyPressCounter]) => secondCounter === 0 ? 0 : Math.ceil((keyPressCounter / secondCounter) * 60)),
            takeWhile(_ => !this.keyboardTrain.done)
        );


        this.subscription$ = this.keyPress$.subscribe((({ key }: KeyboardEvent) => {
            this.keyboard.setInput(key);
            this.keyboardTrain.toNextSymbol(key);
        }));

        this.subscription$.add(this.lastKeyPress$.subscribe(() => {
            this.keyboardTrain.incrementErrorsCount();
        }));

        this.checkStopTrain();
    }

    private checkStopTrain() {
        this.subscription$.add(this.keyboardTrain.stop$.pipe(
            withLatestFrom(this.secondCounter$, this.average$),
        ).subscribe(([train, time, average]) => {
            this.keyboard.clearInput();
            this.isStarted = false;
            this.clearSubscriptions();

            const dialogRef = this.dialog.open(
                TrainResultComponent,
                {
                    width: '35vw',
                    data: {
                        time,
                        average,
                        errors: train.errors
                    }
                }
            );

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    location.reload();
                } else {
                    this.route.navigate(['../statistics']);
                }
            });
        }));
    }

    private initTrain() {
        this.keyboardTrain = new KeyboardTrain(
            this.mappedExercise.text,
            this.mappedExercise.maxMistakes
        );
    }

    private clearSubscriptions() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

    ngOnDestroy() {
        this.clearSubscriptions();
    }
}
