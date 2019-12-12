import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { AuthorizationsService } from 'src/app/authorization.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.html',
    styleUrls: ['./profile.css']
})

export class ProfileComponent implements OnInit {
    user: User;
    levels: string[] = ['Слабый', 'Средний', 'Продвинутый']
    selectLevel = 'Слабый';

    diffIdMap = {
        1: 'Слабый',
        2: 'Средний',
        3: 'Продвинутый'
    };

    constructor(
        public authorizationsService: AuthorizationsService,
    ) { }

    ngOnInit() {
        this.authorizationsService.currentUser$.subscribe(user => {
            this.selectLevel = this.diffIdMap[user.diff_id];
        });
    }

    changeLevel(level: string) {
        this.user.diff_id = level;
        this.authorizationsService.changeLevel([this.user.id, this.user.diff_id]);
    }

}