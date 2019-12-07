import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationsService } from '../authorization.service';
import { User } from '../user';

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
            (data : User) => {
                this.router.navigate(['/profile']);
            },
            error => {
                this.loading = false;
        });
    }
}