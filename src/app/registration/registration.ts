import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from '../authorization.service';

@Component({
selector: 'app-registration',
templateUrl: './registration.html',
styleUrls: ['./registration.css']
})

export class RegistrationComponent{
    private loginu:"";
    private passwordu:"";
    private loading = false;

    constructor(
    private authorizationsService: AuthorizationsService,
    private router: Router){}

    register(){
        this.loading = true;
        this.authorizationsService.registration(this.loginu, this.passwordu).subscribe(
            id => {
                this.router.navigate(['/profile', id]);
            },
            error => {
                if(error.status == 500){alert("Логин уже занят. Придумайте новый");}
                else {alert("Ошибка соединения с сервером");}
                this.loading = false;
        });
    }
}
