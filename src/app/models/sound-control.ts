import { Howl } from 'howler';

export class SoundControl {
    isStarted = false;
    allMuted = false;
    _volume = 1;

    set volume(value) {
        this._volume = value / 100;
    }

    get volume() {
        return this._volume * 100;
    }

    _backgroundMusic = new Howl({
        src: ['assets/sounds/background.mp3'],
        loop: true,
        volume: 0.5
    });

    _tap = new Howl({
        src: ['assets/sounds/tap.mp3'],
        volume: 1
    });

    _victory = new Howl({
        src: ['assets/sounds/victory.mp3'],
        volume: 1
    });

    _trombone = new Howl({
        src: ['assets/sounds/trombone.mp3'],
        volume: 1
    });

    _error = new Howl({
        src: ['assets/sounds/error.mp3'],
        volume: 1
    });

    tap = () => this._tap.play();

    victory = () => this._victory.play();

    trombone = () => {
        this._trombone.play();
    }

    error = () => this._error.play();

    backgroundMusic = () => {
        if (!this.isStarted) {
            this._backgroundMusic.play();
        }
        this.isStarted = true;
    }

    mute = () => {
        this.allMuted = !this.allMuted;
        [this._backgroundMusic, , this._error, this._trombone, this._victory, this._tap].forEach(sound => sound.mute(this.allMuted))
    }

    destroy() {
        this._backgroundMusic.unload();
        if (this._tap) {
            this._tap.unload();
        }
    }

    trainDestroy() {
        this._tap.unload();
    }
}