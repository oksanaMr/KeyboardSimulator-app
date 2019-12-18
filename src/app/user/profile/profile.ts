import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { AuthorizationsService } from 'src/app/authorization.service';
import { MatRadioChange } from '@angular/material';
import { SoundControllerService } from 'src/app/sound-controller.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.html',
    styleUrls: ['./profile.css']
})

export class ProfileComponent implements OnInit {
    user: User;
    levels: string[] = ['Слабый', 'Средний', 'Продвинутый']
    selectLevel: string;

    diffIdMap = {
        1: this.levels[0],
        2: this.levels[1],
        3: this.levels[2]
    };

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public authorizationsService: AuthorizationsService,
        private sound: SoundControllerService
    ) { }

    ngOnInit() {
        const userId = this.activatedRoute.snapshot.params.id;

        this.authorizationsService.getUser(userId).subscribe(user => {
            this.user = user;
            this.selectLevel = this.diffIdMap[user.diff_id];
        });

        this.sound.soundControl.backgroundMusic();
    }

    changeLevel($event: MatRadioChange, i: number) {
        this.user.diff_id = i + 1;
        this.authorizationsService.updateDiff(this.user).subscribe(user => {
            this.user = user;
        });
    }

}
