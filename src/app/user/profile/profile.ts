import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { AuthorizationsService } from 'src/app/authorization.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.html',
    styleUrls: ['./profile.css']
})

export class ProfileComponent {
    user: User;
    levels: string[] = ['Слабый', 'Средний', 'Продвинутый']
    selectLevel = 'Слабый';

    constructor(
        public authorizationsService: AuthorizationsService,
    ) { }

    ngOnInit() {
        this.selectLevel = this.authorizationsService.currentUser.id_level;
    }

    changeLevel(level: string) {
        this.user.id_level = level;
        this.authorizationsService.changeLevel([this.user.id, this.user.id_level]);
    }

}