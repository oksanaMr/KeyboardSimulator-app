import { Subject } from 'rxjs';

export class KeyboardTrain {

    constructor(
        public readonly pattern: string,
        public readonly maxErrors: number = 3
    ) { }

    get nextSymbol() {
        return this.pattern[this.currentIndex + 1];
    }

    get currentSymbol() {
        return this.pattern[this.currentIndex];
    }

    get enteredPart() {
        return this.pattern.slice(0, this.currentIndex).split('');
    }

    get tail() {
        return this.pattern.slice(this.currentIndex).split('');
    }

    get done() {
        return this.isStopped || (this.isErrorState || (this.currentIndex === this.pattern.length));
    }

    set errors(value: number) {
        this._errors = value;
        if (value > this.maxErrors) {
            this.stop$.next(this);
        }
    }

    get errors() {
        return this._errors;
    }

    get isErrorState() {
        return this.errors > this.maxErrors;
    }

    currentIndex = 0;
    stop$ = new Subject<KeyboardTrain>();
    errorIndex = -1;
    timeoutError = false;
    isStopped = false;

    private _errors = 0;


    toNextSymbol(char: string) {
        if (this.currentSymbol === char) {
            this.currentIndex++;
            setTimeout(() => this.checkIsEnd());
            return true;
        } else {
            this.errors++;
            this.errorIndex = this.currentIndex - this.enteredPart.length;
            setTimeout(() => this.errorIndex = -1, 500);
            return false;
        }
    }

    incrementErrorsCount() {
        this.errors++;
        this.timeoutError = true;
        setTimeout(() => this.timeoutError = false, 500);
    }

    stop() {
        this.isStopped = true;
    }

    private checkIsEnd() {
        if (this.done) {
            this.stop$.next(this);
        }
    }
}
