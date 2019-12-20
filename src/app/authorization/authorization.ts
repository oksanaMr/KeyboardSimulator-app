import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from '../authorization.service';

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
                    this.router.navigate(['/exerciseAdmin']);
                }
                else { this.router.navigate(['/profile', id]); }//У пользователя идентификатор не равен 1
            },
            error => {
                if(error.status == 500){alert("Неверный логин или пароль. Попробуйте ввести данные еще раз");}
                else {alert("Ошибка соединения с сервером");}
                this.loading = false;
            });
    }
}
