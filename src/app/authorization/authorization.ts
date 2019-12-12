import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from '../authorization.service';
import { User } from '../user';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.html',
    styleUrls: ['./authorization.css']
})

export class AuthorizationComponent {
    private loginu: "";
    private passwordu: "";
    private loading = false;

    constructor(
        private authorizationsService: AuthorizationsService,
        private router: Router) { }

    autho() {
        this.loading = true;
        this.authorizationsService.authorization(this.loginu, this.passwordu).subscribe(
            id => {
                //В базе данных идентификатор адинистратора должен быть равен 1
                if (id == "1") {
                    this.router.navigate(['/exercise', id]);
                }
                else { this.router.navigate(['/profile', id]); }//У пользователя идентификатор не равен 1
            },
            error => {
                this.loading = false;
            });
    }
}
